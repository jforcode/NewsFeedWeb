<template lang="html">
  <div class="filter-group">
    <p class="filter-group__label">Select {{ filterGroup.filterType }}</p>
    <div class="filter-group__filters">
      <div v-for="(filter, index) in filterGroup.filters" class="filter">
        <label class="filter__value" :for="compId + '_filter_' + index">
          <input :id="compId + '_filter_' + index" type="checkbox" @change="onFilterSelected" class="filter__input">
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

export default {
  props: [
    'compId',
    'filterGroup'
  ],
  data () {
    return {

    }
  },
  methods: {
    onFilterSelected: () => {},
    loadAllFilters: () => {}
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
