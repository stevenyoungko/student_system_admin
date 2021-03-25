import request from '@/utils/request'

export const getResourceList = () => request({
  url: '/api/list_resource/list',
  method: 'GET'
})
