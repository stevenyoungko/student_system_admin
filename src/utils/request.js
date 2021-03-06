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
  baseURL: '', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (store.getters.token) {
      config.headers['Authorization'] = store.getters.token
    }

    if (config.isLoading) {
      axiosQueue++
      store.dispatch('app/setGlobalLoading', config.isLoading)
    }

    if (config.method !== 'get') {
      let tempData
      if (Array.isArray(config.data)) {
        tempData = config.data
      } else {
        tempData = { ...config.data }
      }
      if (config.useJson) {
        config.headers = {
          'Content-Type': 'application/json',
          ...config.headers
        }
        config.data = JSON.stringify(tempData)
      } else if (config.useMuit) {
        config.headers = {
          'Content-Type': 'multipart/form-data',
          ...config.headers
        }
      } else {
        config.headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          ...config.headers
        }
        config.data = qs.stringify(tempData)
      }
    }

    return config
  },
  error => {
    // do something with error request
    console.log(error) // for debug
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
    const data = response.data ? response.data : {}
    return [data, null]
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

    return [null, response.data]
  }
)

export default service
