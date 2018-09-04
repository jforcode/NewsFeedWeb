<template lang="html">
  <dialog class="mdl-dialog all-pubs-dialog" id="allPubsDialog">
    <div class="all-pubs__title-holder">
      <p class="mdl-dialog__title all-pubs__title">All Publishers ({{ allPublishers.length }})</p>
      <div class="mdl-layout-spacer"></div>
      <span>{{ numSelectedAllPublishers }} selected</span>
    </div>
    <div class="mdl-dialog__content all-pubs">
      <div v-for="publ in allPublishers" class="all-pubs__col">
        <input type="checkbox" :id="'allPub_'+publ.id" v-model="publ.selected" class="filter__input" @change="onAllPublisherSelected(publ)">
        <label class="filter__value" :for="'allPub_'+publ.id">{{ publ.publisher }}</label>
      </div>
    </div>
    <div class="mdl-dialog__actions">
      <button type="button" class="mdl-button mdl-color--primary mdl-color-text--white" @click="selectPublishersFromDialog">Apply Filters</button>
      <button type="button" class="mdl-button" @click="closeAllPubsDialog">Cancel</button>
    </div>
  </dialog>
</template>

<script>
export default {
  data () {
    return {
      message: 'All filters'
    }
  }
}
</script>

<style lang="css">
</style>
