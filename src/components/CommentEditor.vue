<template>
  <section :id="respondId" class="comment-editor" role="form" ref="editor" v-if="isCurrReply">
    <h3 id="reply-title" class="comment-reply-title" v-if="isReply">
      <small>
        <a
          rel="nofollow"
          href="#respond-0"
          class="cancel-comment-reply-link"
          @click="cancelReply"
        >Cancel Reply</a>
      </small>
    </h3>
    <form class="comment-form">
      <div class="comment-textarea" v-if="!previewMode">
        <textarea
          required="required"
          aria-required="true"
          tabindex="4"
          :placeholder="options.comment_content_placeholder || '你是我一生只会遇见一次的惊喜 ...'"
          v-model="comment.content"
          class="commentbody"
        ></textarea>
        <label class="input-label">{{options.comment_content_placeholder || '你是我一生只会遇见一次的惊喜 ...'}}</label>
      </div>
      <div class="comment-preview markdown-body" v-else v-html="renderedContent"></div>
      <!-- 上传图片预览 -->
      <div id="upload-img-show"></div>
      <!-- 表情开关 -->
      <p id="emotion-toggle" class="no-select">
        <span @click="handleToogleDialogEmoji">{{!emojiDialogVisible ? '戳我试试 OωO' : '嘿嘿嘿 ヾ(≧∇≦*)ゝ'}}</span>
      </p>
      <transition name="emoji-fade">
        <VEmojiPicker :pack="emojiPack" @select="handleSelectEmoji" v-show="emojiDialogVisible"/>
      </transition>
      <div class="author-info">
        <!-- 用户头像信息 -->
        <div class="commentator">
          <img :src="avatar" class="avatar">
          <div class="socila-check" :class="[checkType.back]">
            <i :class="[checkType.icon]" aria-hidden="true"></i>
          </div>
        </div>
        <PopupInput
          class="cmt-popup cmt-author"
          popupStyle="margin-left: -115px;width: 230px;"
          popupText="输入QQ号将自动拉取昵称和头像"
          inputType="text"
          placeholder="* 昵称"
          id="author"
          v-model="comment.author"
          @blurInput="pullInfo"
        />
        <PopupInput
          class="cmt-popup"
          popupStyle="margin-left: -65px;width: 130px;"
          popupText="你将收到回复通知"
          inputType="text"
          placeholder="* 电子邮件"
          id="email"
          v-model="comment.email"
          @blurInput="pullInfo"
        />
        <PopupInput
          class="cmt-popup"
          popupStyle="margin-left: -55px;width: 110px;"
          popupText="禁止小广告😀"
          inputType="text"
          placeholder="个人站点"
          id="url"
          v-model="comment.authorUrl"
        />
      </div>
      <ul class="comment-buttons">
        <li v-if="comment.content" class="middle" style="margin-right:5px">
          <a
            class="button-preview-edit"
            href="javascript:void(0)"
            rel="nofollow noopener"
            @click="handlePreviewContent"
          >{{previewMode?'编辑':'预览'}}</a>
        </li>
        <!-- <li
            class="middle"
            style="margin-right:5px"
          >
            <a
              class="button-preview-edit"
              href="javascript:void(0)"
              rel="nofollow noopener"
              @click="handleGithubLogin"
            >Github 登陆</a>
        </li>-->
        <li class="middle">
          <a
            class="button-submit"
            href="javascript:void(0)"
            tabindex="5"
            rel="nofollow noopener"
            @click="handleSubmitClick"
          >提交</a>
        </li>
      </ul>
    </form>
  </section>
</template>
<script>
import Vue from 'vue'
import marked from "l-marked";
import md5 from "md5";
import VEmojiPicker from "./EmojiPicker/VEmojiPicker";
import emojiData from "./EmojiPicker/data/emojis2.js";
import { renderedEmojiHtml } from "@/utils/emojiutil";
import { isEmpty, isObject, getUrlKey, return2Br, isQQ } from "@/utils/util";
import { validEmail, queryStringify } from "@/utils/util";
import commentApi from "../api/comment";
import axios from "axios";
import PopupInput from "./PopupInput";
import globals from "@/utils/globals.js";

export default {
  name: "CommentEditor",
  components: {
    VEmojiPicker,
    PopupInput,
  },
  props: {
    targetId: {
      type: Number,
      required: false,
      default: 0
    },
    target: {
      type: String,
      required: false,
      default: "posts",
      validator: function(value) {
        return ["posts", "sheets", "journals"].indexOf(value) !== -1;
      }
    },
    replyComment: {
      type: Object,
      required: false,
      default: () => {}
    },
    options: {
      required: false,
      default: []
    },
    configs: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      emojiPack: emojiData,
      emojiDialogVisible: false,
      comment: {
        author: null,
        authorUrl: null,
        email: null,
        content: "",
       
      },
      previewMode: false,
      infoes: [],
      warnings: [],
      successes: [],
      checkType: {
        back: "gravatar-check",
        icon: "fa fa-google"
      },
      globalData: globals,
      lockPullAvatar: false,
      avatar: this.configs.gravatarSource + "?d=mm"
    };
  },
  computed: {
    renderedContent() {
      let html = this.comment.content ? marked(this.comment.content) : "";
      return return2Br(renderedEmojiHtml(html));
    },
    commentValid() {
      return (
        !isEmpty(this.comment.author) &&
        !isEmpty(this.comment.email) &&
        !isEmpty(this.comment.content)
      );
    },
    isReply() {
      return this.globalData.replyId != 0;
    },
    isCurrReply() {
      return (
        !this.replyComment || this.globalData.replyId == this.replyComment.id
      );
    },
    respondId() {
      return "respond-" + (!this.replyComment ? 0 : this.replyComment.id);
    }
  },
  created() {
    // Get info from local storage
    var author = localStorage.getItem("comment-author");
    var authorUrl = localStorage.getItem("comment-authorUrl");
    var email = localStorage.getItem("comment-email");
    var avatar = localStorage.getItem("avatar");
    this.comment.author = author ? author : "";
    this.comment.authorUrl = authorUrl ? authorUrl : "";
    this.comment.email = email ? email : "";
    this.avatar = avatar ? avatar : this.avatar;
    // this.handleGetGithubUser();
  },
  // mounted() {
  //   autosize(document.querySelector("textarea"));
  // },
  methods: {
    handleSubmitClick() {
      if (isEmpty(this.comment.author)) {
        this.$tips( "昵称不能为空", 5000);
        return;
      }
      if (isEmpty(this.comment.email)) {
        this.$tips( "邮箱不能为空", 5000);
        return;
      }
      if (isEmpty(this.comment.content)) {
        this.$tips( "评论内容不能为空", 5000);
        return;
      }
      // Submit the comment
      this.comment.postId = this.targetId;
      if (this.replyComment) {
        // Set parent id if available
        this.comment.parentId = this.replyComment.id;
      }
      commentApi
        .createComment(this.target, this.comment)
        .then(response => {
          // Store comment author, email, authorUrl
          localStorage.setItem("comment-author", this.comment.author);
          localStorage.setItem("comment-email", this.comment.email);
          localStorage.setItem("comment-authorUrl", this.comment.authorUrl);
          localStorage.setItem("avatar", this.avatar);

          // clear comment
          this.comment.content = "";
          this.handleCommentCreated(response.data.data);
        })
        .catch(error => {
          this.handleFailedToCreateComment(error.response);
        });
    },
    handlePreviewContent() {
      this.previewMode = !this.previewMode;
    },
    handleCommentCreated(createdComment) {
      if (createdComment.status === "PUBLISHED") {
        // 成功后直接新增新的评论node
        try {
          this.createdNewNode(createdComment)
          this.$tips( "评论成功！", 5000);
        } catch {
          this.$tips( "评论成功，刷新即可显示最新评论！", 5000);
        }
      } else {
        // Show tips
        this.$tips( "您的评论已经投递至博主，等待博主审核！", 5000);
      }
    },
    createdNewNode(newComment) {
      let elDom = this.$root.$el;
      let pr = { 
          targetId: this.targetId,
          target: this.target,
          options: this.options,
          configs: this.configs,
          comment: newComment
      }

      pr = newComment.parentId == 0 ? pr : {...pr, ...{
        isChild: true,
        parent: this.replyComment,
        depth: this.$parent.selfAddDepth
      }}
      
      const CommentNode = () => import('./CommentNode.vue');
      // 创建一个组件
      let comment = new Vue({
        render: (h) => {
          return h(
            CommentNode,
            {
              props: pr
            }
          )
        }
      });
      
      let dom;
      if(newComment.parentId == 0) {
        dom = elDom.getElementsByClassName("commentwrap")[0];
      } else {
        // 获取li
        let parentDom = elDom.getElementsByClassName("comment-" + this.replyComment.id)[0];
        // 获取li下的ul节点
        let replyDom = parentDom.getElementsByTagName("ul");
        if(replyDom.length > 0) {
          dom = replyDom[0];
        } else {
          dom = document.createElement("ul");
          dom.setAttribute('class', 'children');
          parentDom.appendChild(dom);
        }
      }
      let nodeDom = document.createElement('div');
      if(dom.children[0]) {
        dom.insertBefore(nodeDom, dom.children[0]);
      } else {
        dom.appendChild(nodeDom);
      }

      comment.$mount(nodeDom);
    },
    handleFailedToCreateComment(response) {
      if (response.status === 400) {
        this.$tips(response.data.message);
        if (response.data) {
          const errorDetail = response.data.data;
          if (isObject(errorDetail)) {
            Object.keys(errorDetail).forEach(key => {
              this.$tips(errorDetail[key]);
            });
          }
        }
      }
    },
    handleToogleDialogEmoji() {
      this.emojiDialogVisible = !this.emojiDialogVisible;
    },
    handleSelectEmoji(args) {
      if (args.length == 0) {
        return;
      }
      let emoji, type;
      if (args.length > 0) {
        emoji = args[0];
      }
      if (args.length > 1) {
        type = args[1];
      }
      let emojiComment;
      if (!type) {
        emojiComment = emoji.name;
      } else {
        if (type === "Math") {
          emojiComment = "f(x)=∫(" + emoji.name + ")sec²xdx";
        } else if (type === "BBCode") {
          emojiComment = ":" + emoji.name + ":";
        }
      }

      this.comment.content += " " + emojiComment + " ";
    },
    handleGithubLogin() {
      const githubOauthUrl = "http://github.com/login/oauth/authorize";
      const query = {
        client_id: "a1aacd842bc158abd65b",
        redirect_uri: window.location.href,
        scope: "public_repo"
      };
      window.location.href = `${githubOauthUrl}?${queryStringify(query)}`;
    },
    handleGetGithubUser() {
      const accessToken = this.handleGetGithubAccessToken();
      axios
        .get(
          "https://cors-anywhere.herokuapp.com/https://api.github.com/user",
          {
            params: {
              access_token: accessToken
            }
          }
        )
        .then(function(response) {
          this.$tips(response);
        })
        .catch(error => {
          this.$tips(error);
        });
    },
    handleGetGithubAccessToken() {
      const code = getUrlKey("code");
      if (code) {
        axios
          .get(
            "https://cors-anywhere.herokuapp.com/https://github.com/login/oauth/access_token",
            {
              params: {
                client_id: "a1aacd842bc158abd65b",
                client_secret: "0daedb3923a4cdeb72620df511bdb11685dfe282",
                code: code
              }
            }
          )
          .then(function(response) {
            let args = response.split("&");
            let arg = args[0].split("=");
            let access_token = arg[1];
            this.$tips(access_token);
            return access_token;
          })
          .catch(error => {
            this.$tips(error);
          });
      }
    },
    cancelReply() {
      // 当replyId为0时则为回复博主
      this.globalData.replyId = 0;
      this.globalData.isReplyData = false;
    },
    pullInfo() {
      let author = this.comment.author;
      if (author.length != 0 && isQQ(author)) {
        // 如果是QQ号，则拉取QQ头像
        this.pullQQInfo(()=> {
          this.$tips( "拉取QQ信息失败！尝试拉取Gravatar", 2000);
          // 如果QQ拉取失败，则尝试拉取Gravatar
          this.pullGravatarInfo();
        });
        return;
      }
      // 防止刚拉取完QQ头像就拉取Gravatar头像
      if(this.lockPullAvatar) {
        this.lockPullAvatar = false;
        return;
      }
      // 否则拉取Gravatar头像
      this.pullGravatarInfo()
    },
    pullQQInfo(errorQQCallback) {
      let _self = this;
      // 拉取QQ昵称，头像等
      axios
        .get("https://api.lixingyong.com/api/qq", {
          params: {
            id: _self.comment.author
          }
        })
        .then(function(res) {
          let data = res.data;
          if (!!data.code && data.code == 500) {
            errorQQCallback();
          }
          _self.$tips( "拉取QQ头像成功！", 2000);
          _self.comment.author = data.nickname;
          _self.comment.email = data.email;
          _self.avatar = data.avatar;
          _self.lockPullAvatar = true;
        })
        .catch(() => {
          errorQQCallback();
        });
    },
    pullGravatarInfo() {
      if (!this.comment.email || !validEmail(this.comment.email)) {
        this.avatar = (
          this.configs.gravatarSource +
          "?d=" +
          this.options.comment_gravatar_default
        );
      }
      const gravatarMd5 = md5(this.comment.email);

      this.avatar = (
        this.configs.gravatarSource +
        `/${gravatarMd5}?s=256&d=` +
        this.options.comment_gravatar_default
      );
    }
  }
};
</script>
