import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import element from 'element-ui'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(element)

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
new Vue({
  render: h => h(App)
}).$mount('#app')
