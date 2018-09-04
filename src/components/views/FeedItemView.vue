<template lang="html">
  <div class="feed-item">
    <a :href="feedItem.publisherUrl">
      <span class="feed-item__publisher">{{ feedItem.publisher }}</span>
    </a>
    <a :href="feedItem.url">
      <p class="feed-item__title">{{ feedItem.title }}</p>
    </a>
    <div class="mdl-layout-spacer"></div>
    <div class="feed-item__bottom-row">
      <i class="material-icons">{{ feedItem.category.id === 'b' ? 'business' : 'laptop' }}</i>
      <span class="jb-mr-lt--sm">{{ feedItem.category.value }}</span>
      <div class="jb-flex-spacer"></div>
      <span class="feed-item__published-on">{{ feedItem.publishedOnStr }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: [
    'compId',
    'feedItem'
  ]
}
</script>

<style lang="css" scoped>

.feed-item {
	background-color: #FFFFFF;
	padding: 16px;
	display: flex;
	flex-direction: column;
}

.feed-item__publisher {
	font-style: italic;
  color: #F44336;
}

.feed-item__title {
	margin-top: 4px;
	margin-bottom: 16px;
	font-size: 1.3em;
}

.feed-item__bottom-row {
	display: flex;
	align-items: flex-end;
	margin-top: 16px;
}

.feed-item__category {

}

.feed-item__date {

}
</style>
