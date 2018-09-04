<template lang="html">
  <div class="options-layout">
    <SearchView />
    <SortView class="jb-mr-tp--lg" />
    <FilterGroupView class="jb-mr-tp--lg"
      v-for="(filterGroup, index) in appState.filterGroups"
      :filter-group="filterGroup"
      :comp-id="'filter_grp_' + index" />
  </div>
</template>

<script>
import SearchView from './../views/SearchView.vue'
import SortView from './../views/SortView.vue'
import FilterGroupView from './../views/FilterGroupView.vue'

import { state as appState, methods as appMethods } from './../../states/app.js'

export default {
  data () {
    return {
      appState: appState
    }
  },
  components: {
    SearchView,
    SortView,
    FilterGroupView
  }
}
</script>

<style lang="css" scoped>
.options-layout {
  padding: 32px;
}
</style>
