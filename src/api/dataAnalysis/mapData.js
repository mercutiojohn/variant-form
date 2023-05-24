import request from '@/plugin/axios'

// 查询数据大屏地图数据列表
export function listMapData(query) {
  return request({
    url: '/dataAnalysis/mapData/list',
    method: 'get',
    params: query
  })
}

// 查询数据大屏地图数据详细
export function getMapData(id) {
  return request({
    url: '/dataAnalysis/mapData/' + id,
    method: 'get'
  })
}

// 查询数据大屏地图数据详细
export function getMapDataByMapId(mapId) {
  return request({
    url: '/dataAnalysis/mapData/byMapId/' + mapId,
    method: 'get'
  })
}

// 新增数据大屏地图数据
export function addMapData(data) {
  return request({
    url: '/dataAnalysis/mapData',
    method: 'post',
    data: data
  })
}

// 修改数据大屏地图数据
export function updateMapData(data) {
  return request({
    url: '/dataAnalysis/mapData',
    method: 'put',
    data: data
  })
}

// 删除数据大屏地图数据
export function delMapData(id) {
  return request({
    url: '/dataAnalysis/mapData/' + id,
    method: 'delete'
  })
}

// 导出数据大屏地图数据
export function exportExcel(data){
  return request({
    url: "/dataAnalysis/mapData/export",
    method: "post",
    data: data,
    //解决浏览器导出乱码
    responseType: 'blob'
  })
}

// 获取地图组件的默认静态数据
export function selectMapStaticData(data){
  return request({
    url: "/dataAnalysis/mapData/selectMapStaticDataById",
    method: "post",
    data: data
  })
}