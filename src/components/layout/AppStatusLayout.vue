<template lang="html">
  <div class="status-bar">
    <div class="jb-flex-row jb-flex-row--centered">
      <span class="status">{{ statusDisplay }}</span>
      <div class="jb-flex-spacer"></div>
      <PaginationView />
    </div>
    <SelectedFiltersView class="jb-mr-tp" />
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
        : 'Loading...'
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

.status {
  font-size: 1.4em;
}
</style>
