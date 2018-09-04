<template lang="html">
  <div class="">
    <form @submit.prevent.default="search">
      <input class="mdl-textfield__input" type="text" id="searchBox" v-model="searchTerm">
      <label class="mdl-textfield__label" for="searchBox">Search Title or Publisher</label>
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
}
</script>

<style lang="css">
</style>
