<template lang="html">
  <div class="status-bar">
    <div class="jb-flex-row">
      <span>{{ statusDisplay }}</span>
      <div class="jb-flex-spacer"></div>
      <PaginationView />
    </div>
    <SelectedFiltersView />
  </div>
</template>

<script>
import { state as appState, methods as appMethods } from './../../states/app.js'

import SelectedFiltersView from './../views/SelectedFiltersView.vue'
import PaginationView from './../views/PaginationView.vue'

export default {
  data () {
    return {
      appState: appState
    }
  },
  computed: {
    statusDisplay: function () {
      return this.appState.feed.length
        ? 'Showing ' + this.appState.feed.length + ' of ' + this.appState.countAllFeed + ' results'
        : ''
    }
  },
  components: {
    SelectedFiltersView,
    PaginationView
  }
}
</script>

<style lang="css">
.status-bar {
}
</style>
