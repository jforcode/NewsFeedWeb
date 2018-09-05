<template lang="html">
  <div class="content-layout">
    <AppStatusLayout />
    <div class="feeds-holder">
      <FeedItemView class="feed-item jb-shadow--2dp"
        v-for="(item, index) in appState.feed"
        :comp-id="'feed_item_' + index"
        :feed-item="item" />
    </div>
  </div>
</template>

<script>
import AppStatusLayout from './AppStatusLayout.vue'
import FeedItemView from './../views/FeedItemView.vue'
import { state as appState, methods as appMethods } from './../../states/app.js'

export default {
  data () {
    return {
      appState: appState
    }
  },
  components: {
    AppStatusLayout,
    FeedItemView
  }
}
</script>

<style lang="css" scoped>
.content-layout {
  padding: 32px 16px 108px 16px;
}

.feeds-holder {
  display: flex;
  flex-wrap: wrap;
  margin-top: 32px;
}

.feed-item {
  width: 45%;
  margin: 0 16px 16px 0;
}
</style>
