<template lang="html">
  <div class="applied-filters">
    <span v-if="displaySearchTerm" class="applied-filter mdl-chip mdl-chip--deletable">
      <span class="mdl-chip__text">{{ displaySearchTerm }}</span>
      <button type="button" class="mdl-chip__action" @click="clearSearchTerm">
        <i class="material-icons">cancel</i>
      </button>
    </span>
    <span v-if="sorter && !loading.feeds" class="applied-filter mdl-chip">
      <span class="mdl-chip__text">{{ sorter ? sorter.sortLabel : "" }}</span>
    </span>
    <span class="applied-filter mdl-chip mdl-chip--deletable" v-for="catFilter in appliedFilters.getFilters(consts.category)">
      <span class="mdl-chip__text">{{ catFilter.displayValue }}</span>
      <button type="button" class="mdl-chip__action" @click="removeCategoryFilter(catFilter.key)">
        <i class="material-icons">cancel</i>
      </button>
    </span>
    <span class="applied-filter mdl-chip mdl-chip--deletable" v-for="publFilter in appliedFilters.getFilters(consts.publisher)">
      <span class="mdl-chip__text">{{ publFilter.displayValue }}</span>
      <button type="button" class="mdl-chip__action" @click="removePublisherFilter(publFilter.key)">
        <i class="material-icons">cancel</i>
      </button>
    </span>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>
