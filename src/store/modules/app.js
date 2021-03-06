const state = {
  globalLoading: false
}

const mutations = {
  SET_GLOBAL_LOADING: (state, show) => {
    state.globalLoading = show
  }
}

const actions = {
  setGlobalLoading({ commit }, show) {
    commit('SET_GLOBAL_LOADING', show)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
