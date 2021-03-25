import request from '@/utils/request'

export const getActivityList = () => {
  return request({
    url: '/api/activity/list',
    method: 'GET'
  })
}
