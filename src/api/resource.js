import request from '@/utils/request'

export const getResourceList = () => request({
  url: '/api/list_resource/list',
  method: 'GET'
})

export const postResourceItem = (data) => request({
  url: '/api/list_resource/new',
  method: 'POST',
  data
})

export const putResourceItem = (id, data) => request({
  url: `/api/list_resource/${id}`,
  method: 'PUT',
  data
})
