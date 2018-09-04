<template lang="html">
  <div class="sorter-holder">
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" v-model="sorter" id="sorterHolder" readonly>
      <label class="mdl-textfield__label" for="sorterHolder">Sort by</label>
    </div>
    <ul class="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect sorter-menu" for="sorterHolder">
      <li class="mdl-menu__item" v-for="refSorter in sorters" @click="sort(refSorter)">
        {{ refSorter.displayLabel }}
      </li>
    </ul>
  </div>
</template>

<script>
import { state as appState, methods as appMethods } from './../../states/app.js'

export default {
  data () {
    return {
      sorter: appState.sorter,
      sorters: appState.sorters
    }
  },
  methods: {
    sort: sorter => {
    }
  },
}
</script>

<style lang="css">
</style>
