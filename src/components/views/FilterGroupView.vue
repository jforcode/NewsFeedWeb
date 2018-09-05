<template lang="html">
  <div class="filter-group">
    <p class="filter-group__label">Select {{ filterGroup.filterType }}</p>
    <div class="filter-group__filters">
      <div v-for="(filter, index) in filterGroup.filters" class="filter">
        <label class="filter__value" :for="compId + '_filter_' + index">
          <input type="checkbox" class="filter__input" v-model="filter.selected"
            :id="compId + '_filter_' + index" @change="onFilterSelected(filterGroup, filter)">
          <span>{{ filter.label }}</span>
        </label>
      </div>
    </div>
    <button v-if="filterGroup.moreAvailable" class="filter-group__show-all" @click="loadAllFilters">
      SHOW ALL
    </button>
  </div>
</template>

<script>
import { state as appState, methods as appMethods } from './../../states/app.js'

export default {
  props: [
    'compId',
    'filterGroup'
  ],
  methods: {
    onFilterSelected: function (filterGroup, filter) {
      appMethods.selectFilter(filterGroup, filter)
      appMethods.loadPage(1)
    },
    loadAllFilters: function () {

    }
  }
}
</script>

<style lang="css" scoped>
.filer-group {

}

.filter-group__label {

}

.filter-group__filters {

}

.filter {

}

.filter__input {

}

.filter__value {

}

.filter-group__show-all {

}
</style>
