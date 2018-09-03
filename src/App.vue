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
import AppBarLayout from './components/AppBarLayout.vue'
import OptionsLayout from './components/OptionsLayout.vue'
import ContentLayout from './components/ContentLayout.vue'

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
* {
  font-family: 'Montserrat', sans-serif;
}

html, body {
  height: 100%;
}


</style>
