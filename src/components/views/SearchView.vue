<template lang="html">
  <div class="">
    <form @submit.prevent.default="search">
      <label for="searchBox">Search Title or Publisher</label>
      <br />
      <input class="jb-mr-tp--sm" type="text" id="searchBox" v-model="searchTerm">
    </form>
  </div>
</template>

<script>
import appState from './../../states/app.js'

export default {
  data () {
    return {
      searchTerm: ''
    }
  },
  methods: {
    search: function () {

    }
  }
}
</script>

<style lang="css">
</style>
