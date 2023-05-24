import request from '@/plugin/axios'

//获取模板组件列表
export function queryAllDataSource(data){
  return request({
    url: "/dataSource/queryAllDataSource",
    method: "post",
    data
  });
}
// 
export function testConnection(data) {
  return request({
    url: "/dataSource/testConnection",
    method: "post",
    data
  });
}
export function reportDataSourceAdd(data) {
  return request({
    url: "/dataSource/addSource",
    method: "post",
    data
  });
}
export function reportDataSourceDeleteBatch(data) {
  return request({
    url: "/dataSource/deleteSource",
    method: "post",
    data
  });
}
//数据集

export function reportDataSetList(data) {
  return request({
    url: 'dataSet/queryAllDataSet',
    method: 'post',
    data,
  })
}

export function reportDataSetAdd(data) {
  return request({
    url: 'dataSet',
    method: 'post',
    data
  })
}

export function reportDataSetDeleteBatch(data) {
  return request({
    url: 'dataSet/delete/batch',
    method: 'post',
    data
  })
}

export function reportDataSetUpdate(data) {
  return request({
    url: 'dataSet',
    method: 'put', data,
  })
}

export function reportDataSetDetail(data) {
  return request({
    url: 'dataSet/' + data.id,
    method: 'get',
    params: { accessKey: data.accessKey }
  })
}

// 测试数据转换，以及返回数据table列表
export function testTransformSet (data) {
  return request({
    url: '/dataSet/testTransform',
    method: 'post',
    data,
  })
}
export function addDataSet (data) {
  return request({
    url: '/dataSet/insertSet',
    method: 'post',
    data,
  })
}

// 获取数据集信息
export function detailBysetId(data) {
  return request({
    url: 'dataSet/detailBysetId/' + data,
    method: 'get',
  })
}
export function dataSetPreview (data) {
  return request({
    url: `/dataSet/detailBysetId/${data.id}`,
    method: 'get',
  })
}

export function editDataSet(data) {
  return request({
    url: 'dataSet',
    method: 'put', data,
  })
}

export function getInter(data){
  return request({
    url: "/v2/api-docs",
    method: "get"
  })
}
// 数据集高级规则js验证
export function verificationSet (data) {
  return request({
    url: '/dataSetParam/verification',
    method: 'post',
    data,
  })
}