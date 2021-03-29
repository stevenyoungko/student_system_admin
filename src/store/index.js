import Vue from 'vue'
import Vuex from 'vuex'

// modules
import tagsView from './modules/tagsView'
import user from './modules/user'
import listInfo from './modules/listInfo'

// getters
import getters from './getters/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    tagsView,
    user,
    listInfo
  },
  getters
})

export default store
