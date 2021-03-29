import request from '@/utils/request'

export const getAuthorityList = () => request({
  url: '/api/authority/list',
  method: 'GET'
})

export const getAuthorityItem = (id) => request({
  url: `/api/branch/authority/${id}`,
  method: 'GET'
})

export const putActivityItem = (id, data) => request({
  url: `/api/branch/${id}`,
  method: 'PUT',
  data
})
