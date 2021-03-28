import request from '@/utils/request'

export const getClassList = () => request({
  url: '/api/class/list',
  method: 'GET'
})
