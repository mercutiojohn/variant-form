import request from '@/plugin/axios'

// 查询VForm页面管理详细
export function getVformPagesByPageId(pageId) {
  return request({
    url: '/vform/vformPages/byPageId/' + pageId,
    method: 'get'
  })
}