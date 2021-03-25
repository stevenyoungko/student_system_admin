import request from '@/utils/request'

export const getGroupList = () => request({
  url: '/api/group/list',
  method: 'GET'
})

