<template lang="html">
  <div class="">
    <AppStatusLayout />
    <FeedsLayout />
  </div>
</template>

<script>
import AppStatusLayout from './AppStatusLayout.vue'
import FeedsLayout from './FeedsLayout.vue'

export default {
  data () {
    return {

    }
  },
  components: {
    AppStatusLayout,
    FeedsLayout
  }
}
</script>

<style lang="css">
</style>
