<template lang="html">
  <div class="">
    <SearchView />
    <SortView />
    <FiltersLayout />
  </div>
</template>

<script>
import SearchView from './../views/SearchView.vue'
import SortView from './../views/SortView.vue'
import FiltersLayout from './FiltersLayout.vue'

export default {
  data () {
    return {

    }
  },
  components: {
    SearchView,
    SortView,
    FiltersLayout
  }
}
</script>

<style lang="css">
</style>
