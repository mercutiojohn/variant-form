// import request from '../../plugin/axios'

function promiseWrap (data) {
  let callback = function nullFunc() {}
  let promise = new window.Promise(function (resolve, reject) {
    callback = function(response, error) {
      !error ? resolve(response) : reject(error);
    };
  });
  try {
    // const result = JSON.stringify(data)
    const result = data
    console.log('[mock-api]', data)
    callback(result)
  } catch (error) {
    callback(data, 'error')
  }

  return promise
}

// 获取承办单位及下属人员列表
export function getNodeData(data, axiosInstance) {
  if(axiosInstance){
    return axiosInstance({
      url: "/addTransferunit/transferunit/getNodeData",
      method: "post",
      data
    });
  }
  else {
    const res = require('./nodeData.json')
    return promiseWrap(res)
  }
} 

// 查询下一步操作拉出常用用户数据
export function getCommonUseData (axiosInstance) {
  if(axiosInstance){
    return axiosInstance({
      url: '/addTransferunit/transferunit/getCommonUseData',
      method: 'post'
    })
  }
  else {
    return promiseWrap()
  }

}

// 添加常用人数据
export function addContacts (axiosInstance, data) {
  if(axiosInstance){
    return axiosInstance({
      url: '/addTransferunit/transferunit/addContacts',
      method: 'post',
      data
    })
  }
  else {
    return promiseWrap()
  }
}

// 获取本单位内部人员
export function getPersonData(axiosInstance, data) {
  if(axiosInstance){
    return axiosInstance({
      url: "/addTransferunit/transferunit/getPersonData",
      method: "post",
      data
    });
  }
  else {
    const res = require('./personData.json')
    return promiseWrap(res)
  }
} 

// 获取当前机构的副节点(内部)
export function getParentId(axiosInstance, data) {
  if(axiosInstance){
    return axiosInstance({
      url: "/addTransferunit/transferunit/getParentId",
      method: "post",
      data
    });
  }
  else {
    return promiseWrap({})
  }
} 

// 查询下一步操作拉出的本机构的用户树数据
export function getGroupUserTree (axiosInstance, data) {
  if(axiosInstance){
    return axiosInstance({
      url: '/addTransferunit/transferunit/getGroupUserTree',
      method: 'post',
      data
    })
  }
  else {
    return promiseWrap({})
  }
}

// -------------------