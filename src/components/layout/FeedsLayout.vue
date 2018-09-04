<template lang="html">
  <div class="feeds-holder mdl-grid">
    <div class="feed-item mdl-cell mdl-cell--6-col mdl-shadow--2dp" v-for="item in feeds">
      <a :href="item.publisherUrl">
        <span class="feed-item__publisher mdl-color-text--accent">{{ item.publisher }}</span>
      </a>
      <a :href="item.url">
        <p class="feed-item__title">{{ item.title }}</p>
      </a>
      <div class="mdl-layout-spacer"></div>
      <div class="feed-item__bottom-row">
        <i class="material-icons">{{ item.category.id === 'b' ? 'business' : 'laptop' }}</i>
        <span class="feed-item__category mr-lt--sm">{{ item.category.value }}</span>
        <div class="mdl-layout-spacer"></div>
        <span class="feed-item__published-on">{{ item.publishedOnStr }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      feeds: []
    }
  },
  methods: {

  }
}
</script>

<style lang="css">
</style>
