import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  store, //vue初始化，注入store属性
  render: h => h(App)
}).$mount('#app')
