<template lang="html">
  <div id="app">
    <AppBarLayout />
    <div class="">
      <OptionsLayout />
      <ContentLayout />
    </div>
  </div>
</template>

<script>
import AppBarLayout from './components/layout/AppBarLayout.vue'
import OptionsLayout from './components/layout/OptionsLayout.vue'
import ContentLayout from './components/layout/ContentLayout.vue'

import { state as appState, methods as appMethods } from './states/app.js'

export default {
  data () {
    return {
      appState: appState
    }
  },
  components: {
    AppBarLayout,
    OptionsLayout,
    ContentLayout
  }
}
</script>

<style lang="css">
html, body {
  height: 100%;
}

body {
  margin: 0;
  background-color: var(--bg-color);
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  line-height: 20px;
}

a {
  text-decoration: none;
  color: var(--primary-text-color-on-light-bg);
}

</style>
