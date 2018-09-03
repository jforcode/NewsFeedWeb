<template lang="html">
  <div class="">
    <form @submit.prevent.default="search">
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label search-box">
        <input class="mdl-textfield__input" type="text" id="searchBox" v-model="searchTerm">
        <label class="mdl-textfield__label" for="searchBox">Search Title or Publisher</label>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'Search'
    }
  }
}
</script>

<style lang="css">
</style>
