<template lang="html">
  <div class="all-filters-layout" @keyup.esc="close">
    <div class="top-status-bar jb-shadow--2dp">
      <p class="status__title">Showing {{ filterGroup.filters.length }} of type {{ filterGroup.filterType }}</p>
      <div class="jb-flex-spacer"></div>
      <div class="status__icon" @click="$emit('onAllFilterConfirm', selectedFilters)">
        <i class="material-icons">check</i>
      </div>
      <div class="status__icon" @click="close">
        <i class="material-icons">clear</i>
      </div>
    </div>

    <div class="filter-group">
      <div class="filter-group__selected">
        <p v-if="selectedFilters.length === 0">No filters selected</p>
        <span class="selected-filter jb-chip"
          v-for="selectedFilter in selectedFilters">
          <span class="jb-chip__text">{{ selectedFilter.label }}</span>
          <i class="material-icons delete-filter-icon" @click="removeSelectedFilter(selectedFilter)">cancel</i>
        </span>
      </div>
      <div class="filter-group__filters">
        <div v-for="(filter, index) in filterGroup.filters" class="filter">
          <label class="filter__value" :for="compId + '_filter_' + index">
            <input type="checkbox" class="filter__input" v-model="filter.selected"
              :id="compId + '_filter_' + index" @change="onFilterSelected(filterGroup, filter)">
            <span>{{ filter.label }}</span>
          </label>
        </div>
      </div>
    </div>
  </div>

</div>

</template>

<script>
import { state as appState, methods as appMethods } from './../../states/app.js'

export default {
  props: [
    'filterGroup',
    'compId'
  ],
  data () {
    return {
      appState: appState,
      selectedFilters: [],
      evtListener: null
    }
  },
  methods: {
    onFilterSelected: function (filterGroup, filter) {
      if (filter.selected) {
        this.selectedFilters.push(filter)
      } else {
        let filterInd = this.selectedFilters.findIndex(selectedFilter => selectedFilter.value === filter.value)
        this.selectedFilters.splice(filterInd, 1)
      }
    },
    close: function () {
      this.$emit('onAllFilterClose')
    }
  },
  created () {
    let filterType = this.filterGroup.filterType
    this.filterGroup.filters.forEach(filter => {
      if (appMethods.findSelectedFilter({ type: filterType, value: filter.value })) {
        filter.selected = true
        this.selectedFilters.push(filter)
      }
    })

    let fnClose = this.close
    this.evtListener = function (e) {
      if (e.which === 27) {
        fnClose()
      }
    }
    document.addEventListener('keyup', this.evtListener)
  },
  beforeDestroy () {
    document.removeEventListener('keyup', this.evtListener)
  }
}
</script>

<style lang="css" scoped>
.all-filters-layout {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #FAFAFA;
  overflow: scroll;
}

.top-status-bar {
  display: flex;
  align-items: center;
  height: 64px;
  padding-left: 32px;
  padding-right: 32px;
}

.status__title {
  font-size: 1.4em;
}

.status__icon {
  padding: 16px;
  cursor: pointer;
}

.filter-group {
  padding: 16px 32px 32px;
}

.filter-group__selected {

}

.delete-filter-icon {
  cursor: pointer;
}

.selected-filter {
  margin-left: 8px;
  margin-top: 8px;
}
.selected-filter:first-child {
  margin-left: 0;
}

.filter-group__filters {
  display: flex;
  flex-wrap: wrap;
  margin-top: 24px;
}

.filter {
  width: 25%;
}

.filter__value {
  cursor: pointer;
}

.filter__input {
  cursor: pointer;
}
</style>
