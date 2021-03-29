import { getToken, setToken, removeToken } from '@/utils/localStorage'
import { login } from '@/api/user'

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
      login({ account: account.trim(), password: password })
        .then(res => {
          commit('SET_TOKEN', res.data.token)
          resolve('done')
        })
        .catch(error => {
          reject(error)
        })
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
