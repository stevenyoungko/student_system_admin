import request from '@/utils/request'

export const getMemberList = () => request({
  url: '/api/member/list',
  method: 'GET'
})

export const postActivity = (data) => request({
  url: '/api/member/new',
  method: 'POST',
  data
})
