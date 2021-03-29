/* eslint-disable no-prototype-builtins */
import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 處理 x-www-form-urlencoded
import qs from 'qs'
import { message } from 'ant-design-vue'

// create an axios instance
let axiosQueue = 0
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (config.method === 'put' && config.data.status) {
      config.data.status = config.data.status ? '1' : '0'
    }
    // do something before request is sent
    if (store.getters.token) {
      config.headers['token'] = store.getters.token
    }

    if (config.isLoading) {
      axiosQueue++
      store.dispatch('app/setGlobalLoading', config.isLoading)
    }
    return config
  },
  error => {
    // do something with error request
    console.log(error) // for debug
    store.dispatch('app/setGlobalLoading', false)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    if (response.config.isLoading) {
      if (axiosQueue === 1) {
        store.dispatch('app/setGlobalLoading', !response.config.isLoading)
        axiosQueue--
      } else {
        axiosQueue--
      }
    }
    // 成功
    if (response.config.responseType === 'blob') {
      return response
    } else {
      const res = response.data
      return res
    }
  },
  error => {
    const { response } = error

    if (!response || !response.hasOwnProperty('data')) {
      axiosQueue--
      store.dispatch('app/setGlobalLoading', false)
      console.warn(error.message)
      return [null, error.message]
    }

    if (error.response.config.isLoading) {
      if (axiosQueue === 1) {
        store.dispatch('app/setGlobalLoading', !response.config.isLoading)
        axiosQueue--
      } else {
        axiosQueue--
      }
    }

    // for 取消上傳
    if (error.message === 'cancel_upload' || error.message === undefined) {
      return Promise.reject(error)
    }

    // for timeout 超時處理
    if (error.message.includes('timeout')) {
      message.error({ content: '连线超时', duration: 5 })
      return Promise.reject(error)
    }

    // http status error handler
    switch (response.status) {
      case 400:
        if (response.data.message) {
          const errorMsg = response.data.message.match(/\[.*\]/g)
          message.error({ content: errorMsg, duration: 5 })
        } else message.error({ content: '操作錯誤', duration: 5 })
        break
      case 401:
        message.error({ content: response.data.error_description || '請重新登入。', duration: 5 })
        store.dispatch('user/resetToken').then(res => {
          router.push({ path: '/login' })
        })
        break
      case 403:
        message.error({ content: response.data.error_description || '權限不足，無法使用。', duration: 5 })
        store.dispatch('user/resetToken').then(res => {
          router.push({ path: '/login' })
        })
        break
      case 409:
        message.error({ content: response.data.error_description || '權限不足，無法使用。', duration: 1 })
        break
      default:
        message.error({ content: response.data.error_description || '操作錯誤', duration: 5 })
        break
    }

    return Promise.reject(error)
  }
)

export default service
