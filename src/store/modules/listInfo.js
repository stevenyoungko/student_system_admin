import { getClassList, getCityList } from '@/api/listInfo'

// cache construtor
function $_constructor(type, data, everStore = false) {
  this.everStore = everStore
  this.type = type
  this.data = data
}

const state = {
  classList: new $_constructor('array', []),
  cityList: new $_constructor('array', [])
}

const mutations = {
  SET_CLASS: (state, payload) => {
    state.classList.data = payload
    state.classList.everStore = true
  },
  SET_CITY: (state, payload) => {
    state.cityList.data = payload
    state.cityList.everStore = true
  }
}

const actions = {
  async getClassList({ commit, state }) {
    if (state.classList.everStore) return state.classList.data

    try {
      const { data } = await getClassList()
      commit('SET_CLASS', data)
      return data
    } catch (error) {
      // do nothing
    }
  },
  async getCityList({ commit, state }) {
    if (state.cityList.everStore) return state.cityList.data

    try {
      const { data } = await getCityList()
      commit('SET_CITY', data)
      return data
    } catch (error) {
      // do nothing
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
