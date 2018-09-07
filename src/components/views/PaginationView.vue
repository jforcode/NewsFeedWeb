<template lang="html">
  <div class="pagination-holder">
    <button :disabled="!firstVisible" class="page-control" @click="loadPage(1)">
      <i class="material-icons">first_page</i>
    </button>
    <button :disabled="!firstVisible" class="page-control" @click="loadPage(appState.currPageNum - 1)">
      <i class="material-icons">chevron_left</i>
    </button>
    <span class="page-status">Page {{ appState.currPageNum }} of {{ appState.lastPageNum }}</span>
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

<style lang="css" scoped>
.pagination-holder {
  display: flex;
  align-items: center;
}

.page-control {
  background: transparent;
  border: none;
  border-radius: 50%;
  padding: 8px;
  margin-left: 8px;
  margin-right: 8px;
  color: var(--primary-color);
  cursor: pointer;
  transition: all .2s;
}
.page-control:hover {
  background: #EEEEEE;
}
.page-control[disabled] {
  color: gray;
  cursor: inherit;
}
.page-control[disabled]:hover {
  background: inherit;
}

.page-status {
  margin-left: 8px;
  margin-right: 8px;
  font-size: 1rem;
}
</style>
