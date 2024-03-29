<template>
  <div class="halo-comment serif" id="halo-comment">
    <comment-editor v-if="isReply" :targetId="id" :target="target" :options="options" :configs="mergedConfigs" class="bottom-comment"/>
    <div class="comment-load-button" v-if="!mergedConfigs.autoLoad && !loaded">
      <a
        class="button-load"
        href="javascript:void(0)"
        rel="nofollow noopener"
        @click="loadComments"
      >加载评论</a>
    </div>
    <comment-loading v-show="commentLoading" :configs="mergedConfigs"/>
    <ul class="commentwrap" v-if="comments.length >=1">
      <template v-for="(comment, index) in comments">
        <CommentNode
          :targetId="id"
          :target="target"
          :comment="comment"
          :options="options"
          :configs="mergedConfigs"
          :key="index"
          :depth="1"
        />
      </template>
    </ul>
    <div v-if="loaded && !commentLoading && comments.length<=0" class="comment-empty">{{mergedConfigs.notComment || '暂无评论'}}</div>
    <div v-if="pagination.pages > 1" class="comment-page">
      <pagination
        :page="pagination.page"
        :size="pagination.size"
        :total="pagination.total"
        @change="handlePaginationChange"
      />
    </div>
  </div>
</template>
<script>
import "./index";
import defaultConfig from "@/config/defaultconfig";
import commentApi from "../api/comment";
import optionApi from "../api/option";
import globals from '@/utils/globals.js';
import VueLazyload from 'vue-lazyload'
import Tips from '@/plugins/Tips';
import { removeJsonEmpty } from "@/utils/util";
import Vue from 'vue';

Vue.use( VueLazyload, {
  error: 'https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.1/img/Sakura/images/Transparent_Akkarin.th.jpg',
  loading: 'https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.1.3/img/svg/loader/trans.ajax-spinner-preloader.svg',
  attempt: 1
})

Vue.use(Tips);

export default {
  name: "Comment",
  props: {
    id: {
      type: Number,
      required: false,
      default: 0
    },
    type: {
      type: String,
      required: false,
      default: "post",
      validator: function(value) {
        return ["post", "sheet", "journal"].indexOf(value) !== -1;
      }
    },
    configs: {
      type: Object,
      required: false,
      default: () => (defaultConfig)
    }
  },
  data() {
    return {
      comments: [],
      pagination: {
        pages: 0,
        page: 0,
        sort: "",
        size: 5,
        total: 0
      },
      commentLoading: false,
      loaded: false,
      repliedSuccess: null,
      replyingComment: null,
      options: {
        comment_gravatar_default: "mm"
      },
      globalData: globals
    };
  },
  computed: {
    target() {
      // pluralize it
      return `${this.type}s`;
    },
    mergedConfigs() {
      var jsonConfig;
      if (typeof(this.configs) === "string") {
        jsonConfig = JSON.parse(this.configs);
      } else if (typeof(this.configs) === "object") {
        jsonConfig = this.configs;
      } else {
        throw new TypeError("参数类型错误");
      }
      // 移除值为空的
      removeJsonEmpty(jsonConfig);
      
      return Object.assign(
        defaultConfig,
        jsonConfig
      );
    },
    isReply() {
      return this.globalData.replyId == 0;
    }
  },
  created() {
    if (this.mergedConfigs.autoLoad) {
      this.loadComments();
    }
    this.loadOptions();
  },
  methods: {
    loadComments() {
      this.comments = [];
      this.commentLoading = true;
      commentApi
        .listComments(this.target, this.id, "tree_view", this.pagination)
        .then(response => {
          this.comments = response.data.data.content;
          this.pagination.size = response.data.data.rpp;
          this.pagination.total = response.data.data.total;
          this.pagination.pages = response.data.data.pages;
        })
        .finally(() => {
          this.commentLoading = false;
          this.loaded = true;
        });
    },
    loadOptions() {
      optionApi.list().then(response => {
        this.options = response.data.data;
      });
    },
    handlePaginationChange(page) {
      this.pagination.page = page;
      this.loadComments();
    }
  }
};
</script>
<style lang="scss">
$color: #898c7b;
@import "../styles/global";
@import url("https://fonts.googleapis.com/css?family=Noto+SerifMerriweather|Merriweather+Sans|Source+Code+Pro|Ubuntu:400,700|Noto+Serif+SC");
@import "../styles/github-markdown";
</style>
