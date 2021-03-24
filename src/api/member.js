import request from '@/utils/request'

export const getMemberList = () => request({
  url: '/api/member/list',
  method: 'GET'
})

