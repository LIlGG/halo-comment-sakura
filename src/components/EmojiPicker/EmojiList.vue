<template>
  <div id="container-emoji" class="motion-container" :class="categoryClass">
     <component
      :is="categoryEmoji" 
      v-for="(emoji, index) in data[category]"
      :key="index"
      :data="emoji"
      @click.native="onSelect(emoji, type)"
    />
  </div>
</template>

<script>
import BilibiliEmoji from './BilibiliEmoji'
import MenheraEmoji from './MenheraEmoji'
import TiebaEmoji from './TiebaEmoji'

export default {
  name: 'EmojiList',
  components: {
    BilibiliEmoji,
    MenheraEmoji,
    TiebaEmoji
  },
  data: () => ({
    categories: [
      { name: 'bilibili', title: 'bilibili~' },
      { name: 'menhera', title: '(✪ω✪)' },
      { name: 'tieba', title: 'Tieba' },
    ]
  }),
  props: {
    data: {type: Object},
    category: { type: String }
  },
  methods: {
    onSelect(emoji, type) {
      this.$emit('select', emoji, type)
    },
  },
  computed: {
    categoryClass() {
      return this.category + "-container";
    },
    categoryEmoji() {
      return this.category + "Emoji";
    },
    type() {
      if(this.category === "bilibili") {
        return "Math";
      } else if(this.category === "tieba") {
        return "BBCode"
      }
      return "";
    }
  },
  watch: {
    data() {
      this.$refs['container-emoji'].scrollTop = 0
    }
  }
}
</script>