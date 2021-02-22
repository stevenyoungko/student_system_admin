import axios from 'axios'

// create an axios instance
const service = axios.create({
  baseURL: '', // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60 * 1000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with error request
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // do something before response is received
    return response
  },
  error => {
    // do something with error response
    const { response } = error

    // http status error handler
    switch (response.status) {
      case 400:
        // do something with http 400
        break
      case 401:
        // do something with http 401
        break
      case 403:
        // do something with http 403
        break
      case 404:
        // do something with http 404
        break
      default:
        // do something with other http error status
        break
    }
    return Promise.reject(error)
  }
)

export default service
