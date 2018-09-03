<template lang="html">
  <div class="sorter-holder">
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
      <input class="mdl-textfield__input" type="text" v-model="sorter.sortLabel" id="sorterHolder" readonly>
      <label class="mdl-textfield__label" for="sorterHolder">Sort by</label>
    </div>
    <ul class="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect sorter-menu" for="sorterHolder">
      <li class="mdl-menu__item" v-for="sorter in sorters" @click="sort(sorter)">
        {{ sorter.sortLabel }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'Sort'
    }
  }
}
</script>

<style lang="css">
</style>
