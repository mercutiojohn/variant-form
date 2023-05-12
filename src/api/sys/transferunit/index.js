import request from '@/plugin/axios'


// 获取承办单位及下属人员列表
export function getNodeData(data) {
  return request({
    url: "/addTransferunit/transferunit/getNodeData",
    method: "post",
    data
  });
} 
// 获取承办单位及下属人员列表(内部)
export function getInsideData(data) {
  return request({
    url: "/addTransferunit/transferunit/getInsideData",
    method: "post",
    data
  });
} 
// 获取本单位内部机构
export function getGroupData(data) {
  return request({
    url: "/addTransferunit/transferunit/getGroupData",
    method: "post",
    data
  });
} 

// 获取本单位内部人员
export function getPersonData(data) {
  return request({
    url: "/addTransferunit/transferunit/getPersonData",
    method: "post",
    data
  });
} 

// 获取当前机构的副节点(内部)
export function getParentId(data) {
  return request({
    url: "/addTransferunit/transferunit/getParentId",
    method: "post",
    data
  });
} 
// 获取当前机构的副节点(外部)
export function getOutData(data) {
  return request({
    url: "/servlet/syncResource/getOutData",
    method: "post",
    data
  });
} 
// 获取承办单位及下属人员列表
export function getTransferperson(data) {
  return request({
    url: "/addTransferunit/transferunit/getTransferperson",
    method: "post",
    data
  });
}

export function getUnitExchange(data) {
  return request({
    url: "/addTransferunit/transferunit/getUnitExchange",
    method: "post",
    data
  });
} 
// 获取本市承办单位及下属人员列表-参数字典
export function getData(data) {
  return request({
    url: "/addTransferunit/transferunit/getData",
    method: "post",
    data
  });
} 

export function getExchangeMapping(data) {
  return request({
    url: "/groupMapping/getExchangeGroup",
    method: "post",
    data
  });
}

// 获取本单位内部人员(人员设置功能)
export function gainPersonData(data) {
  return request({
    url: "/addTransferunit/transferunit/gainPersonData",
    method: "post",
    data
  });
} 

// 获取交换组织机构根节点
export function getOutRoot(data) {
  return request({
    url: "/addTransferunit/transferunit/getOutRoot",
    method: "post",
    data
  });
} 

// 获取交换组织机构节点的子节点
export function getNodeChild(data) {
  return request({
    url: "/addTransferunit/transferunit/getNodeChild",
    method: "post",
    data
  });
} 

// 过滤条件搜索组织机构树
export function filterSearch(data){
  return request({
    url: "/addTransferunit/transferunit/filterSearch",
    method: "post",
    data
  });
}

// 查询所有交换的组织机构数据
export function getAllExchangeGroup(data){
  return request({
    url: "/addTransferunit/transferunit/getAllExchangeGroup",
    method: "post",
    data
  });
}

export function getAllGroup(data){
  return request({
    url: "/addTransferunit/transferunit/getAllGroup",
    method: "post",
    data
  });
}

// 查询下一步操作拉出常用用户数据
export function getCommonUseData () {
    return request({
      url: '/addTransferunit/transferunit/getCommonUseData',
      method: 'post'
    })
  }
  // 添加常用人数据
  export function addContacts (data) {
    return request({
      url: '/addTransferunit/transferunit/addContacts',
      method: 'post',
      data
    })
  }

  // 查询下一步操作拉出的本机构的用户树数据
export function getGroupUserTree (data) {
    return request({
      url: '/addTransferunit/transferunit/getGroupUserTree',
      method: 'post',
      data
    })
  }