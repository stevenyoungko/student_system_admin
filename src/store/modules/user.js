import { getToken, setToken, removeToken } from '@/utils/localStorage'

const state = {
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token)
  },
  REMOVE_TOKEN: (state) => {
    state.token = ''
    removeToken()
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { account, password } = userInfo

    return new Promise((resolve, reject) => {
      if (account === 'admin' && password === '123456') {
        commit('SET_TOKEN', 'token-6866')
        resolve('done')
      } else {
        reject('wrong value!')
      }
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve) => {
      commit('REMOVE_TOKEN')
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('REMOVE_TOKEN')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
