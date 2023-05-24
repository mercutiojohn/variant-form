import request from '@/plugin/axios'
import { getShareToken, getToken } from "@/utils/auth";
// 保存大屏设计
export function insertDashboard(data) {
  return request({
    url: "/reportDashboard/insertDash",
    method: "post",
    data
  });
}

export function reportPageList(data) {
  return request({
    url: "/reportDashboard/reportPageList",
    method: "post",
    data
  });
}

export function saveMain(data) {
  return request({
    url: "/reportDashboard/saveMain",
    method: "post",
    data
  });
}

export function deleteById(data){
  return request({
    url: "/reportDashboard/deleteById",
    method: "post",
    data
  })
}

//预览详情
export function detailDashboard(data){
  return request({
    url: "/reportDashboard/detailDashboard",
    method: 'get',
    params: {reportCode: data}
  });
}
//恢复默认
export function restoreDefault(data){
  return request({
    url: "/reportDashboard/restoreDefault",
    method: "post",
    data
  })
}
//恢复最新
export function restoreNew(data){
  return request({
    url: "/reportDashboard/restoreNew",
    method: "post",
    data
  })
}
//获取模板组件列表
export function getTemplateList(data){
  return request({
    url: "/reportDashboard/getTemplateList",
    method: "post",
    data
  });
}

//获取用户设置的模板组件ID
export function getUserTemplate(data){
  return request({
    url: "/reportDashboard/getUserTemplate",
    method: "post",
    data
  });
}

//保存用户设置的模板组件ID
export function saveTemplateSet(data){
  return request({
    url: "/reportDashboard/saveTemplateSet",
    method: "post",
    data
  });
}

// 获取动态数据
export function getData(data) {
  return request({
    url: 'reportDashboard/getData',
    method: 'post',
    headers: { 'Share-Token': getShareToken(), 'Authorization': getToken() },
    data,
  })
}