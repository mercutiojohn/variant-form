import request from '@/plugin/axios'
import { getShareToken, getToken } from "@/utils/auth";
// 保存大屏设计
// export function insertDashboard(data) {
//   return request({
//     url: "/reportDashboard/insertDash",
//     method: "post",
//     data
//   });
// }

export function reportPageList(data) {
  return request({
    url: "/report/getPageList",
    method: "post",
    data
  });
}

export function insertTax(data) {
  return request({
    url: "/report/insertTax",
    method: "post",
    data
  });
}
export function update(data) {
  return request({
    url: '/report',
    method: "put",
    data
  });
}
export function updateInfo(data) {
  return request({
    url: '/report/updateInfo',
    method: "put",
    data
  });
}
export function deleteById(data){
  return request({
    url: "/report/"+data,
    method: "delete",
    data
  })
}
//  获取对应数据集的列集合
export function detail(data) {
  return request({
    url: 'dataSet/detailBysetId/' + data,
    method: 'get',
  })
}

//  根据reportCode获取报表表格详情
export function detailByReportCode(data) {
  return request({
    url: 'reportExcel/detailByReportCode/' + data,
    method: 'get',
  })
}
// 预览报表，渲染数据
export function preview(data) {
  return request({
    url: 'reportExcel/preview',
    method: 'post',
    headers: { 'Share-Token': getShareToken(), 'Authorization': getToken() },
    data,
  })
}
// // 获取动态数据
// export function getData(data) {
//   return request({
//     url: 'reportDashboard/getData',
//     method: 'post',
//     headers: { 'Share-Token': getShareToken(), 'Authorization': getToken() },
//     data,
//   })
// }

// 导出报表
export function exportExcel(data) {
  return request({
    url: 'reportExcel/exportExcel',
    method: 'post',
    data
  })
}

export function downloadExcel(data){
  return request({
    url: 'reportExcel/downloadExcel',
    method: 'post',
    data,
    //解决浏览器导出乱码
    responseType: 'blob'
  })
}