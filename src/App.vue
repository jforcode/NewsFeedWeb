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

export default {
  data () {
    return {
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
  font-family: 'Montserrat', sans-serif;
}

a {
  text-decoration: none;
}

</style>
