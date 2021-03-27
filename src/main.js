import Vue from 'vue'
import App from './App.vue'

// router
import router from '@/router/index'

// vuex
import store from '@/store/index'

// ant-design-vue
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
Vue.use(Antd)

// styles
import '@/styles/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
