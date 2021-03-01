import Vue from 'vue'
import App from './App.vue'

// styles
import '@/styles/index.less'

// router
import router from '@/router/index'

// vuex
import store from '@/store/index'

// ant-design-vue
// 按須加載需要的 antd 組件
import '@/plugins/antd-vue'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
