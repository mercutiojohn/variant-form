import request from '@/plugin/axios'

// 查询VForm模板管理列表
export function listVformTemplate(query) {
  return request({
    url: '/vform/vformTemplate/list',
    method: 'get',
    params: query
  })
}

// 查询VForm模板管理详细
export function getVformTemplate(id) {
  return request({
    url: '/vform/vformTemplate/' + id,
    method: 'get'
  })
}

// 新增VForm模板管理
export function addVformTemplate(data) {
  return request({
    url: '/vform/vformTemplate',
    method: 'post',
    data: data
  })
}

// 修改VForm模板管理
export function updateVformTemplate(data) {
  return request({
    url: '/vform/vformTemplate',
    method: 'put',
    data: data
  })
}

// 删除VForm模板管理
export function delVformTemplate(id) {
  return request({
    url: '/vform/vformTemplate/' + id,
    method: 'delete'
  })
}

// 导出VForm模板管理
export function exportExcel(data){
  return request({
    url: "/vform/vformTemplate/export",
    method: "post",
    data: data,
    //解决浏览器导出乱码
    responseType: 'blob'
  })
}