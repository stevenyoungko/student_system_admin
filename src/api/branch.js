import request from '@/utils/request'

export const getBranchList = () => {
  return request({
    url: '/api/branch/list',
    method: 'GET'
  })
}
