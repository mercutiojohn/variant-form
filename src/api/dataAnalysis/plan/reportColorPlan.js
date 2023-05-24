import request from '@/plugin/axios'

// 查询数据分析配色方案列表
export function listReportColorPlan(query) {
  return request({
    url: '/plan/reportColorPlan/list',
    method: 'get',
    params: query
  })
}

// 查询数据分析配色方案详细
export function getReportColorPlan(id) {
  return request({
    url: '/plan/reportColorPlan/' + id,
    method: 'get'
  })
}

// 新增数据分析配色方案
export function addReportColorPlan(data) {
  return request({
    url: '/plan/reportColorPlan',
    method: 'post',
    data: data
  })
}

// 修改数据分析配色方案
export function updateReportColorPlan(data) {
  return request({
    url: '/plan/reportColorPlan',
    method: 'put',
    data: data
  })
}

// 删除数据分析配色方案
export function delReportColorPlan(id) {
  return request({
    url: '/plan/reportColorPlan/' + id,
    method: 'delete'
  })
}

// 导出数据分析配色方案
export function exportExcel(data){
  return request({
    url: "/plan/reportColorPlan/export",
    method: "post",
    data: data,
    //解决浏览器导出乱码
    responseType: 'blob'
  })
}