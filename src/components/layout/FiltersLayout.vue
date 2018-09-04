<template lang="html">
  <div class="">
    <p class="filter-type mdl-color-text--primary">Select Category</p>
    <div v-show="loading.categories" class="mdl-progress mdl-js-progress mdl-progress__indeterminate  mdl-menu__item--full-bleed-divider"></div>
    <div v-show="!loading.categories" class="filter-holder">
      <div v-for="category in categories" class="filter">
        <input type="checkbox" :id="'cat_'+category.id" v-model="category.selected" @change="onCategorySelected(category)" class="filter__input">
        <label class="filter__value" :for="'cat_'+category.id">{{ category.value }}</label>
      </div>
    </div>

    <hr />

    <p class="filter-type mdl-color-text--primary">Select Publisher</p>
    <div v-show="loading.publishers" class="mdl-progress mdl-js-progress mdl-progress__indeterminate"></div>
    <div v-show="!loading.publishers" class="filter-holder">
      <div v-for="publ in publishers" class="filter">
        <input type="checkbox" :id="'pub_'+publ.id" v-model="publ.selected" @change="onPublisherSelected(publ)" class="filter__input">
        <label class="filter__value" :for="'pub_'+publ.id">{{ publ.publisher }}</label>
      </div>
    </div>
    <button v-show="countPublishers > publishers.length" class="mdl-button mdl-js-button mdl-color-text--primary filter__show-all" @click="loadAllPublishers">SHOW ALL</button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      message: 'Filters'
    }
  }
}
</script>

<style lang="css">
</style>
