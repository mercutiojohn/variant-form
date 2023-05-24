import request from '@/plugin/axios'
// 参数字典-字典类别定义-参数类型管理列表查询
export function paramClassListToQuery (data) {
  return request({
    url: '/parammain/param-classes',
    method: 'put',
    data
  })
}
// 参数字典-字典类别定义-参数类型管理列表多行删除
export function paramClassListToDel (deleteIds) {
  return request({
    url: '/parammain/param-classes/' + deleteIds,
    method: 'delete'
  })
}
// 参数字典-字典类别定义-基本信息查询
export function basicInforToQuery (paramClassId) {
  return request({
    url: '/parammain/param-classes/' + paramClassId,
    method: 'get'
  })
}
// 参数字典-字典类别定义-基本信息保存
export function basicInforToSave (data) {
  return request({
    url: '/parammain/param-classes',
    method: 'post',
    data
  })
}
// 参数字典-字典类别定义-扩展字段列表查询
export function extendedListToQuery (paramClassId) {
  return request({
    url: '/parammain/param-classes/extention/' + paramClassId,
    method: 'get'
  })
}
// 参数字典-字典类别定义-扩展字段列表删除
export function extendedListToDel (id) {
  return request({
    url: '/parammain/param-classes/extention/' + id,
    method: 'delete'
  })
}
// 参数字典-字典类别定义-扩展字段列表新增保存
export function extendedListToSave (data) {
  return request({
    url: '/parammain/param-classes/extention',
    method: 'post',
    data
  })
}
// 参数字典-字典维护-根据classId查询项下参数列表
export function getParamListByClassId (data) {
  return request({
    url: '/parammain/params',
    method: 'put',
    data
  })
}
// 参数字典-字典维护-保存参数信息
export function saveParamPersistent (data) {
  return request({
    url: '/parammain/params',
    method: 'post',
    data
  })
}
// 参数字典-字典维护-根据选中的参数id删除参数
export function removeParamsById (deletedIds) {
  return request({
    url: '/parammain/params/' + deletedIds,
    method: 'delete'
  })
}
// 批量保存参数
export function saveParamBatch (data) {
  return request({
    url: '/parammain/params/batch',
    method: 'post',
    data
  })
}
// // 据paramId获取参数，如paramId为空则根据parentId获取扩展字段进行新增前的准备，否则根据paramClassId获取扩展字段进行新增前的准备
export function toGetParamById (paramId, parentId, paramClassId) {
  return request({
    url: '/parammain/params/?paramId=' + paramId + '&parentId=' + parentId + '&paramClassId=' + paramClassId,
    method: 'get'
  })
}
/**
 * 将参数导出成XML文件
 * @param {Object} data Object对象，其属性path为需导出参数的文件存放路径，属性modulesStr为需导出参数的模块名
 */
// export function toExportParam (modulesStr, path) {
//   return request({
//     url: '/parammain/export-param?modulesStr=' + modulesStr + '&path=' + path,
//     method: 'get'
//   })
// }
/**
 * 导入XML格式的字典记录
 * @param {Object} data Object对象，其属性path为需导入文件的存放路径
 */
// export function toImportParam (pathStr) {
//   return request({
//     url: '/parammain/import-param/' + pathStr,
//     method: 'get'
//   })
// }
/**
 * 导出参数标签
 * @param {Object} data Object对象，其属性path为需导出参数的文件存放路径，属性modulesStr为需导出参数的模块名
 */
export function toExportParamTagConfig (modulesStr, path) {
  return request({
    url: '/parammain/export-param-tag?modulesStr=' + modulesStr + '&path=' + path,
    method: 'get'
  })
}
/**
 * 将参数字典由参数配置文件导入到系统参数字典
 * @param {Object} data Object对象，其属性modulesStr为需导入的模块名
 */
export function toImportParamTagConfig (modulesStr) {
  return request({
    url: '/parammain/import-param-tag/' + modulesStr,
    method: 'get'
  })
}

/**
 * 获取下拉框参数字典数据
 * @param {*} parameterType 字典类别定义中字典类型 举例：blacklistReason 客户黑名单原因参数字典
 */
export function getSelectParameterDataSet (parameterType) {
  return request({
    url: '/parammain/conversion/' + parameterType + '/',
    method: 'get'
  })
}

/**
 * 参数字典名值转换
 * @param {*} parameterType 字典类别定义中字典类型 举例：blacklistReason 客户黑名单原因参数字典
 * @param {*} parameterValue  需要转换的字典的值 举例：H01
 */
export function parameterDictionaryNameValueConversion (parameterType, parameterValue) {
  return request({
    url: '/parammain/conversion/' + parameterType + '/' + parameterValue,
    method: 'get'
  })
}


/**
 * 导入XML格式的字典记录
 * @param {Object} data Object对象，其属性path为需导入文件的存放路径
 */
export function toImportParam(file) {
  let param = new FormData(); //创建form对象
  param.append('file', file);
  return request({
    url: '/parammain/import',
    method: 'POST',
    data: param,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}


/**
 * 将参数导出成XML文件
 * @param {Object} data Object对象，其属性path为需导出参数的文件存放路径，属性modulesStr为需导出参数的模块名
 */
export function toExportParam(modulesStr) {
  return request({
    url: '/parammain/export?modulesStr=' + modulesStr,
    method: 'get'
  })
}
