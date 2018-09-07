<template lang="html">
  <div class="filter-group">
    <p class="filter-group__label options-label">Select {{ filterGroup.filterType }}</p>
    <div class="filter-group__filters">
      <div v-for="(filter, index) in filterGroup.filters" class="filter">
        <label class="filter__value" :for="compId + '_filter_' + index">
          <input type="checkbox" class="filter__input" v-model="filter.selected"
            :id="compId + '_filter_' + index" @change="onFilterSelected(filter)">
          <span>{{ filter.label }}</span>
        </label>
      </div>
    </div>
    <div v-if="filterGroup.moreAvailable" class="jb-flex-row jb-mr-tp">
      <div class="jb-flex-spacer"></div>
      <button class="filter-group__show-all" @click="loadAllFilters">
        SHOW ALL
      </button>
    </div>
    <transition name="fade">
      <AllFiltersLayout v-if="showAllFilters"
        :filter-group="allFilterGroup"
        :comp-id="'allPubs'"
        @onAllFilterClose="onAllFilterClose"
        @onAllFilterConfirm="onAllFilterConfirm" />
    </transition>
  </div>
</template>

<script>
import AllFiltersLayout from './../layout/AllFiltersLayout.vue'
import { state as appState, methods as appMethods } from './../../states/app.js'

export default {
  props: [
    'compId',
    'filterGroup'
  ],
  data () {
    return {
      showAllFilters: false,
      allFilterGroup: {}
    }
  },
  methods: {
    onFilterSelected: function (filter) {
      appMethods.selectFilter(this.filterGroup, filter)
      appMethods.loadPage(1)
    },
    loadAllFilters: async function () {
      let allFilters = await appMethods.getAllFilters({
        filterType: this.filterGroup.filterType
      })

      if (allFilters) {
        this.showAllFilters = true
        this.allFilterGroup = allFilters
      }
    },
    onAllFilterClose: function () {
      this.showAllFilters = false
      this.allFilterGroup = {}
    },
    onAllFilterConfirm: function (selectedFilters) {
      this.showAllFilters = false
      this.allFilterGroup = {}
      selectedFilters.forEach(selectedFilter => {
        appMethods.selectFilter(this.filterGroup, selectedFilter)
        var thisFilter = this.filterGroup.filters.find(filter => filter.value === selectedFilter.value)
        thisFilter.selected = true
      })
      appMethods.loadPage(1)
    }
  },
  components: {
    AllFiltersLayout
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
  background: transparent;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  transition: all .2s;
  color: var(--primary-color);
}
.filter-group__show-all:hover {
  background-color: #EAEAEA;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
