<template lang="html">
  <div class="applied-filters">
    <span v-if="appState.searchTerm" class="applied-filter jb-chip">
      <span class="jb-chip__text">{{ appState.searchTerm }}</span>
    </span>
    <span v-if="appState.sorter" class="applied-filter jb-chip">
      <span class="jb-chip__text">{{ appState.sorter ? appState.sorter.displayLabel : "" }}</span>
    </span>
    <span class="applied-filter jb-chip"
      v-for="selectedFilter in appState.selectedFilters">
      <span class="jb-chip__text">{{ selectedFilter.label }}</span>
      <button type="button" class="delete-filter-icon" @click="removeSelectedFilter(selectedFilter)">
        <i class="material-icons">cancel</i>
      </button>
    </span>
  </div>
</template>

<script>
import { state as appState, methods as appMethods } from './../../states/app.js'

export default {
  data () {
    return {
      appState: appState
    }
  },
  methods: {
    removeSelectedFilter: function (selectedFilter) {
      appMethods.removeSelectedFilter({ type: selectedFilter.type, value: selectedFilter.value })
      appMethods.removeFilter({ type: selectedFilter.type, value: selectedFilter.value })
      appMethods.loadPage(1)
    }
  }
}
</script>

<style lang="css" scoped>
.delete-filter-icon {
  
}
</style>
