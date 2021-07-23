<template>
  <div>
    <li
      :id="'comment-'+comment.id"
      class="comment"
      :class="commentClass"
      itemtype="http://schema.org/Comment"
      itemprop="comment"
    >
      <div class="contents">
        <div class="main shadow">
          <div class="profile">
            <a :href="comment.authorUrl" rel="nofollow" target="_blank">
              <img :alt="comment.author" v-lazy="avatar" class="avatar" height="80" width="80">
            </a>
          </div>
          <div class="commentinfo">
            <section class="commeta">
              <div class="left">
                <h4 class="author">
                  <a :href="comment.authorUrl" rel="nofollow" target="_blank">
                    <img :alt="comment.author" :src="avatar" class="avatar" height="24" width="24">
                    <span v-if="comment.isAdmin" class="bb-comment isauthor" title="博主">博主</span>
                    {{ comment.author }}
                  </a>
                </h4>
              </div>
              <a
                rel="nofollow"
                class="comment-reply-link"
                onclick="return false;"
                :style="editing?'display:block;':''"
                href="javascript:void(0);"
                @click="handleReplyClick"
              >Reply</a>
              <div class="right">
                <div class="info">
                  <time
                    class="comment-time"
                    itemprop="datePublished"
                    :datetime="comment.createTime"
                  >发布于 {{ createTimeAgo }}</time>
                  <span
                    v-if="configs.showUserAgent"
                    class="useragent-info"
                    v-html="compileUserAgent"
                  ></span>
                </div>
              </div>
            </section>
          </div>
          <div class="body markdown-body">
            <!-- 将所有的评论内容约束为一段 -->
            <p v-html="compileContent"></p>
          </div>
        </div>
      </div>
      <hr>
      <ul v-if="comment.children" class="children">
        <template v-for="(children, index) in comment.children">
          <CommentNode
            :isChild="true"
            :targetId="targetId"
            :target="target"
            :comment="children"
            :options="options"
            :configs="configs"
            :key="index"
            :depth="selfAddDepth"
            :parent="comment"
          />
        </template>
      </ul>
    </li>
    <CommentEditor
      :targetId="targetId"
      :target="target"
      :replyComment="comment"
      :options="options"
      :configs="configs"
    />
  </div>
</template>
<script>
import "./index";
import { timeAgo, return2Br } from "@/utils/util";
import ua from "ua-parser-js";
import marked from "l-marked";
import { renderedEmojiHtml } from "@/utils/emojiutil";
import CommentEditor from "./CommentEditor.vue";
import globals from "@/utils/globals.js";

export default {
  name: "CommentNode",
  components: {
    CommentEditor
  },
  props: {
    parent: {
      type: Object,
      required: false,
      default: undefined
    },
    depth: {
      type: Number,
      required: false,
      default: 1
    },
    isChild: {
      type: Boolean,
      required: false,
      default: false
    },
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
    comment: {
      type: Object,
      required: false,
      default: () => {}
    },
    options: {
      type: Object,
      required: false,
      default: () => {}
    },
    configs: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      editing: false,
      level: [
        {
          name: "小萌新~",
          icon:
            "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/level/level_0.svg"
        },
        {
          name: "小魔仙",
          icon:
            "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/level/level_1.svg"
        },
        {
          name: "初露头角",
          icon:
            "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/level/level_2.svg"
        },
        {
          name: "大水笔",
          icon:
            "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/level/level_3.svg"
        },
        {
          name: "后宫团",
          icon:
            "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/level/level_4.svg"
        },
        {
          name: "有豪宅",
          icon:
            "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/level/level_5.svg"
        },
        {
          name: "德国骨科",
          icon:
            "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/level/level_6.svg"
        }
      ],
      globalData: globals
    };
  },
  created() {
    const renderer = {
      image(href, title) {
        return `
          <img src="${href}" title="${title}" class="lazyload comment_inline_img" onerror="imgError(this)">`;
      },
      link(href, title, text) {
        return `<a href="${href}" title="${title}" target="_blank" rel="nofollow">${text}</a>`
      }
    }

    marked.use({ renderer });
  },
  computed: {
    avatar() {
      const gravatarSource = this.options.gravatar_source || this.configs.gravatarSource;
      
      return (
        gravatarSource +
        `/${this.comment.gravatarMd5}?s=256&d=` +
        this.options.comment_gravatar_default
      );
    },
    compileContent() {
      var at = "";
      if (this.parent != undefined) {
        at =
          '<a href="' +
          this.parent.authorUrl +
          '" class="comment-at"> @' +
          this.parent.author +
          " </a>";
      }
      // 获取转换后的marked
      let markedHtml = marked(at + this.comment.content);
      // 处理其中的img
      // 处理表情包
      let emoji = renderedEmojiHtml(markedHtml);
      // 将回车转换为br
      return return2Br(emoji);
    },
    createTimeAgo() {
      return timeAgo(this.comment.createTime);
    },
    compileUserAgent() {
      var parser = new ua();
      parser.setUA(this.comment.userAgent);
      var result = parser.getResult();

      var browserImg =
        "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/ua/svg/" +
        result.browser.name.toLowerCase() +
        ".svg";
      var uaImg = "";

      switch (result.os.name) {
        case "Windows":
          switch (result.os.version) {
            case "7":
            case "8":
            case "10":
              uaImg =
                "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/ua/svg/windows_win" +
                result.os.version +
                ".svg";
              break;
            case "":
              uaImg =
                "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/ua/svg/windows_" +
                result.os.version +
                ".svg";
              break;
            default:
              uaImg =
                "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/ua/svg/windows.svg";
              break;
          }
          break;
        default:
          uaImg =
            "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/Sakura/images/ua/svg/" +
            result.os.name.replace(/\s+/g, "").toLowerCase() +
            ".svg";
          break;
      }

      return (
        `( <img src="` +
        browserImg +
        ` ">  ` +
        result.browser.name +
        " " +
        result.browser.version +
        ` 
       <img src="` +
        uaImg +
        `"> ` +
        result.os.name +
        " " +
        result.os.version +
        ` )`
      );
    },
    selfAddDepth() {
      return this.depth + 1;
    },
    commentClass() {
      return "depth-" + this.depth + " comment-" + this.comment.id;
    }
  },
  methods: {
    handleReplyClick() {
      // 设置状态为回复状态
      this.globalData.replyId = this.comment.id;
    }
  }
};
</script>