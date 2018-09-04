import Vue from 'vue'
import App from './App.vue'

require('typeface-montserrat')
import './common/util.css'

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
