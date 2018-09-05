<template lang="html">
  <div class="jb-flex-row">
    <button :disabled="!firstVisible" class="page-control" @click="loadPage(1)">
      <i class="material-icons">first_page</i>
    </button>
    <button :disabled="!firstVisible" class="page-control" @click="loadPage(appState.currPageNum - 1)">
      <i class="material-icons">chevron_left</i>
    </button>
    <p class="page-control">Page {{ appState.currPageNum }} of {{ appState.lastPageNum }}</p>
    <button :disabled="!lastVisible" class="page-control" @click="loadPage(appState.currPageNum + 1)">
      <i class="material-icons">chevron_right</i>
    </button>
    <button :disabled="!lastVisible" class="page-control" @click="loadPage(appState.lastPageNum)">
      <i class="material-icons">last_page</i>
    </button>
  </div>
</template>

<script>
import { state as appState, methods as appMethods } from './../../states/app.js'

export default {
  data () {
    return {
      appState: appState,
    }
  },
  methods: {
    loadPage: function (pageNum) {
      appMethods.loadPage(pageNum)
    }
  },
  computed: {
    firstVisible: function () {
      return this.appState.currPageNum > 1
    },
    lastVisible: function () {
      return this.appState.currPageNum < this.appState.lastPageNum
    }
  }
}
</script>

<style lang="css">
</style>
