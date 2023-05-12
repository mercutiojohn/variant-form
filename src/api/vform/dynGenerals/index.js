import request from '@/plugin/axios'
/**
 * 模板接口
 */
//  新增模板文件列表
export function addRecord (pageId, data) {
  return request({
    url: '/dyn/vf/addRecord/' + pageId,
    method: 'post',
    data
  })
}
//  删除模板文件列表
export function delRecordById (pageId, data) {
  return request({
    url: '/dyn/vf/delRecordById/' + pageId,
    method: 'delete',
    data
  })
}
//  删除模板文件列表
export function delRecordByIds (pageId,data) {
  return request({
    url: '/dyn/vf/delRecordByIds/' + pageId,
    method: 'post',
    data
  })
}
//  保存文件信息修改
export function updateRecord (pageId, data) {
  return request({
    url: '/dyn/vf/updateRecord/' + pageId,
    method: 'put',
    data
  })
}

//  单个查询
export function getRecordById (pageId, taskId) {
  return request({
    url: '/dyn/vf/getRecordById/' + pageId + '/' + taskId,
    method: 'get'
  })
}

//  单个查询
export function getRecordByProcinstId (pageId, procinstId) {
  return request({
    url: '/dyn/vf/getRecordByProcinstId/' + pageId + '/' + procinstId,
    method: 'get'
  })
}

//  多条件查询
export function queryListCond (pageId, data) {
  return request({
    url: '/dyn/vf/queryListCond/' + pageId,
    method: 'post',
    data
  })
}
//  自定义查询
export function customQuery (url, method, data) {
  return request({
    url,
    method,
    data
  })
}