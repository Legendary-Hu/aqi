import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router'
import './plugins/element.js'
import VueJsonp from 'vue-jsonp'
import echarts from 'echarts'
import 'echarts/map/js/china'
Vue.prototype.$echarts = echarts

Vue.use(VueJsonp)
Vue.config.productionTip = false
Vue.use(ElementUI)


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')




