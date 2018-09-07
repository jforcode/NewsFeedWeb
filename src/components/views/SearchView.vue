<template lang="html">
  <form @submit.prevent.default="search">
  <div class="search-box">
      <label for="searchBox" class="options-label">Search by Title or Publisher
        <input class="search-box__input" type="text" id="searchBox"
          placeholder="Search"
          v-model="appState.searchTerm">
      </label>
  </div>
</form>
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
      appMethods.loadPage(1)
    }
  }
}
</script>

<style lang="css" scoped>
.search-box {
  box-sizing: border-box;
}

.search-box__label {
  width: 100%;
  box-sizing: border-box;
}

.search-box__input {
  padding: 8px 12px;
  border: 1px solid #BDBDBD;
  border-radius: 4px;
  margin-top: 8px;
  width: 100%;
  display: block;
  box-sizing: border-box;
}
</style>
