<template lang="html">
  <div class="">
    <div class="status-bar mr-lt">
      <h6>{{ resultsDisplay }}</h6>
      <div class="mdl-layout-spacer"></div>
      <div v-show="paginationVisible" class="flex-row">
        <button :disabled="!firstVisible" class="mdl-button mdl-js-button mdl-button--icon mdl-button--primary page-control" @click="loadPage(1)">
          <i class="material-icons">first_page</i>
        </button>
        <button :disabled="!firstVisible" class="mdl-button mdl-js-button mdl-button--icon mdl-button--primary page-control" @click="loadPage(currPageNum - 1)">
          <i class="material-icons">chevron_left</i>
        </button>
        <p class="page-control mdl-color-text--primary">Page {{ currPageNum }} of {{ lastPageNum }}</p>
        <button :disabled="!lastVisible" class="mdl-button mdl-js-button mdl-button--icon mdl-button--primary page-control" @click="
        loadPage(currPageNum + 1)">
          <i class="material-icons">chevron_right</i>
        </button>
        <button :disabled="!lastVisible" class="mdl-button mdl-js-button mdl-button--icon mdl-button--primary page-control" @click="loadPage(lastPageNum)">
          <i class="material-icons">last_page</i>
        </button>
      </div>
    </div>
    <PaginationView />
  </div>
</template>

<script>
import PaginationView from './../views/PaginationView.vue'

export default {
  data () {
    return {
      resultsDisplay: '',
      paginationVisible: false,
      currPageNum: 0,
      lastPageNum: 0
    }
  },
  computed: {
    firstVisible: () => false,
    lastVisible: () => false,

  },
  components: {
    PaginationView
  }
}
</script>

<style lang="css">
</style>
