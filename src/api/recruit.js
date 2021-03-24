import request from '@/utils/request'

export const getRecruitList = () => request({
  url: '/api/recruit/list',
  method: 'GET'
})
