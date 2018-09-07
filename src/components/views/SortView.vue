<template lang="html">
  <div class="sorter-holder">
    <label class="options-label" for="sorterHolder">Sort by</label>
    <select class="sort-select" v-model="appState.sorter" id="sorterHolder" @change="onSorterChange">
      <option :id="index" :value="refSorter" v-for="(refSorter, index) in appState.sorters">
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
      appMethods.loadPage(1)
    }
  },
}
</script>

<style lang="css" scoped>
.sorter-holder {
}

.sort-select {
  display: block;
  width: 100%;
  margin-top: 8px;
  padding: 8px;
  border-radius: 4px;
  background: #FFFFFF;
}

</style>
