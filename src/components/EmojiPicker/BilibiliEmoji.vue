<template>
  <span
    class="emotion-secter emotion-item emotion-select-parent"
    :style="biliSpanStyle"
  >
    <div class="img emotion-select-child" :style="biliImgStyle"></div>
  </span>
</template>

<script>
export default {
  name: 'BilibiliEmoji',
  props: {
    data: { 
      type: Object 
    },
    url: { 
      type: String,
      required: false,
      default: "https://cdn.jsdelivr.net/gh/LIlGG/cdn@1.0.0/img/bili/"
    }
  },
  computed: {
    biliSpanStyle() {
      return "background-image: url("
        + this.url 
        + "hd/ic_emoji_"
        + this.data.name 
        + ".png);"
    },
    biliImgStyle() {
      let background = this.url + this.data.name + ".png";
      let emoji = this.data;
      let dataStyle = "";
      Object.keys(emoji.style).forEach(function(item) {
          dataStyle += item + ":" + emoji.style[item] + ";";
      })

      return "background-image: url("
      + background
      + ");"
      + dataStyle
    }
  }
}
</script>