<template lang="html">
  <div class="">
    <form @submit.prevent.default="search">
      <label for="searchBox">Search Title or Publisher</label>
      <br />
      <input class="jb-mr-tp--sm" type="text" id="searchBox"
        v-model="appState.searchTerm">
    </form>
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
    search: function () {
      appMethods.loadFeed()
    }
  }
}
</script>

<style lang="css">
</style>
