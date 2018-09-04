import Vue from 'vue'
import App from './App.vue'

require('typeface-montserrat')
import './common/css/util.css'
import './common/css/elements.css'
import './common/css/theme.css'

import Sorter from './models/Sorter.js'
import appState from './states/app.js'

initApp()

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

function initApp() {
  appState.sorters = [
    new Sorter({ type: 'publishedOn', inDescOrder: true, displayLabel: 'Latest Posts First' }),
    new Sorter({ type: 'publishedOn', inDescOrder: false, displayLabel: 'Oldest Posts First' }),
    new Sorter({ type: 'publisher', inDescOrder: false, displayLabel: 'Publisher (A - Z)' }),
    new Sorter({ type: 'publisher', inDescOrder: true, displayLabel: 'Publisher (Z - A)' }),
  ]
  appState.sorter = appState.sorters[0]

  appState.filterLimit = 5

  console.log(appState)

  appState.loadFilters()
  appState.loadFeed()
}
