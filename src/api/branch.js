import request from '@/utils/request'

export function getBranchList() {
  return request({
    url: '/api/api/branch/list',
    method: 'GET'
  })
}
