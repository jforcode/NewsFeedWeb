import Vue from 'vue'
import App from './App.vue'

require('typeface-montserrat')
import './common/css/util.css'
import './common/css/elements.css'
import './common/css/theme.css'

import { state as appState, methods as appMethods } from './states/app.js'

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

appMethods.initSelf()
