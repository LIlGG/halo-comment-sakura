<template>
  <div class="comment-loader-container">
    <div
      v-if="configs.loadingStyle==='default'"
      class="comment-loader-default"
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div
      v-else-if="configs.loadingStyle==='circle'"
      class="comment-loader-circle"
    ></div>
    <div
      v-else-if="configs.loadingStyle==='balls'"
      class="comment-loader-balls"
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CommentLoading",
  props: {
    configs: {
      type: Object,
      required: true
    }
  }
};
</script>