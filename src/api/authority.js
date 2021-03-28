import request from '@/utils/request'

export const getAuthorityList = () => request({
  url: '/api/authority/list',
  method: 'GET'
})
