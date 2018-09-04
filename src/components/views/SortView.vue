<template lang="html">
  <div class="sorter-holder">
    <label class="mdl-textfield__label" for="sorterHolder">Sort by</label>
    <br />
    <select class="jb-mr-tp--sm" v-model="appState.sorter" id="sorterHolder" @change="onSorterChange">
      <option :value="refSorter" v-for="refSorter in appState.sorters">
        {{ refSorter.displayLabel }}
      </option>
    </select>
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
    onSorterChange: function () {
      appMethods.loadFeed()
    }
  },
}
</script>

<style lang="css">
</style>
