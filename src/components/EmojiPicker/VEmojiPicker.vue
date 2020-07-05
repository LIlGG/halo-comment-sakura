<template>
  <div class="emotion-box no-select">
    <Categories
      v-if="showCategory"
      @select="onChangeCategory($event)"
    />
    <keep-alive>
    <EmojiList
      :data="emojis"
      :category="category"
      @select="onSelectEmoji(arguments)"
    />
    </keep-alive>
  </div>
</template>

<script>
import Categories from './Categories'
import EmojiList from './EmojiList'

export default {
  name: 'VEmojiPicker',
  props: {
    pack: { type: Array, required: true },
    showCategory: { type: Boolean, default: true },
  },
  components: {
    Categories,
    EmojiList
  },
  data: () => ({
    mapEmojis: {},
    category: 'bilibili'
  }),
  created() {
    this.mapperData(this.pack)
  },
  methods: {
    onChangeCategory(category) {
      this.category = category.name
      this.$emit('changeCategory', this.category)
    },
    onSelectEmoji(data) {
      this.$emit('select', data)
    },
    mapperData(dataEmojis) {
      dataEmojis.forEach(emoji => {
        const _category = emoji['category']

        if (!this.mapEmojis[_category]) {
          this.$set(this.mapEmojis, _category, [emoji])
        } else {
          this.mapEmojis[_category].push(emoji)
        }
      })
    }
  },
  beforeDestroy() {
    delete this.mapEmojis
  },
  computed: {
    emojis() {
      return this.mapEmojis
    }
  }
}
</script>