import Vue from 'vue'
import App from './App.vue'

require('typeface-montserrat')
import './common/css/util.css'
import './common/css/elements.css'
import './common/css/theme.css'

import Sorter from './models/Sorter.js'

import appState from './states/app.js'

appState.sorters = [
  new Sorter({ sortBy: 'publishedOn', inDescOrder: true, displayLabel: 'Latest Posts First' }),
  new Sorter({ sortBy: 'publishedOn', inDescOrder: false, displayLabel: 'Oldest Posts First' }),
  new Sorter({ sortBy: 'publisher', inDescOrder: false, displayLabel: 'Publisher (A - Z)' }),
  new Sorter({ sortBy: 'publisher', inDescOrder: true, displayLabel: 'Publisher (Z - A)' }),
]

appState.sortBy = appState.sorters[0]

console.log(appState)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
