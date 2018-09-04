import Vue from 'vue'
import App from './App.vue'

require('typeface-montserrat')
import './common/css/util.css'
import './common/css/elements.css'
import './common/css/theme.css'

import Sorter from './models/Sorter.js'

import appState from './states/app.js'

appState.sorters = [
  new Sorter('publishedOn', true, 'Latest Posts First'),
  new Sorter('publishedOn', false, 'Oldest Posts First'),
  new Sorter('publisher', false, 'Publisher (A - Z)'),
  new Sorter('publisher', true, 'Publisher (Z - A)')
]

appState.sortBy = appState.sorters[0]

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
