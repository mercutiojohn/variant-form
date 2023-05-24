import request from '@/plugin/axios'

export function reportShareList(data) {
  return request({
    url: '/reportShare/pageList',
    method: 'post',
    data
  })
}

export function reportShareAdd(data){
  return request({
    url: "/reportDashboard/share",
    method: "post",
    data
  })
}

export function excelShareAdd(data) {
  return request({
    url: '/reportExcel/share',
    method: 'post',
    data
  })
}

export function reportShareDelay(data) {
  return request({
    url: '/reportShare/shareDelay',
    method: 'post',
    data
  })
}

export function reportShareDeleteBatch(data) {
  return request({
    url: '/reportShare/delete/batch',
    method: 'post',
    data
  })
}

export function reportShareDetail(data) {
  return request({
    url: '/reportShare/' + data.id,
    method: 'get',
    params: {accessKey: data.accessKey}
  })
}

export function reportShareDetailById(data) {
  return request({
    url: '/reportShare/detailById',
    method: 'get',
    params: {shareId: data}
  })
}