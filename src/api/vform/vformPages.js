import request from '@/plugin/axios'

// 查询VForm页面管理列表
export function listVformPages(query) {
  return request({
    url: '/vform/vformPages/list',
    method: 'get',
    params: query
  })
}

// 查询VForm页面管理详细
export function getVformPages(id) {
  return request({
    url: '/vform/vformPages/' + id,
    method: 'get'
  })
}

// 查询VForm页面管理详细
export function getVformPagesByPageId(pageId) {
  return request({
    url: '/vform/vformPages/byPageId/' + pageId,
    method: 'get'
  })
}

// 新增VForm页面管理
export function addVformPages(data) {
  return request({
    url: '/vform/vformPages',
    method: 'post',
    data: data
  })
}

// 修改VForm页面管理
export function updateVformPages(data) {
  return request({
    url: '/vform/vformPages',
    method: 'put',
    data: data
  })
}

// 删除VForm页面管理
export function delVformPages(id) {
  return request({
    url: '/vform/vformPages/' + id,
    method: 'delete'
  })
}
// 根据JSON生成数据库表
export function genTable (data) {
  return request({
    url: '/vform/vformPages/genTable',
    method: 'post',
    data: data
  })
}
// 创建数据库表
export function createTable (data) {
  return request({
    url: '/vform/vformPages/createTable',
    method: 'post',
    data
  })
}
// 导出VForm页面管理
export function exportExcel(data){
  return request({
    url: "/vform/vformPages/export",
    method: "post",
    data: data,
    //解决浏览器导出乱码
    responseType: 'blob'
  })
}