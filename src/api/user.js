import request from '@/utils/request'

// 登入
export const login = (data) => request({
  url: '/api/login',
  method: 'POST',
  data
})

