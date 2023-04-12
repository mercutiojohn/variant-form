
//线性数据转换树形数据，根目录默认parendId为0
export function treeData (list) {

    let cloneData = JSON.parse(JSON.stringify(list)) ;   // 对源数据深度克隆
    //debugger
    return cloneData.filter(father => {
  
      let branchArr = cloneData.filter(child => {
  
          if ('parentId' in child&&child.parentId !== "" &&child.parentId !== null) {
            //parentid
            return father.id === child.parentId
          }
        }
      ) ;   //返回每一项的子级数组
      branchArr.length > 0 ? father.children = branchArr : ''   //如果存在子级，则给父级添加一个children属性，并赋值
      return father.parentId === '0';      //返回第一层
    });
  }
  
  //线性数据转换树形数据，根目录默认parendId为0
  export function lowTreeData (list) {
  
    let cloneData = JSON.parse(JSON.stringify(list)) ;   // 对源数据深度克隆
    //debugger
    return cloneData.filter(father => {
  
      let branchArr = cloneData.filter(child => {
  
          if ('parentid' in child&&child.parentid !== "" &&child.parentid !== null) {
            //parentid
            return father.id === child.parentid
          }
        }
      ) ;   //返回每一项的子级数组
      branchArr.length > 0 ? father.children = branchArr : ''   //如果存在子级，则给父级添加一个children属性，并赋值
      return father.parentid.trim() === '0';      //返回第一层
    });
  }
  
  
  //线性数据转换树形数据，根目录默认parendId为0
  export function PersonTreeData (list) {
  
    let cloneData = JSON.parse(JSON.stringify(list)) ;   // 对源数据深度克隆
    //debugger
    return cloneData.filter(father => {
  
      let branchArr = cloneData.filter(child => {
          if ('parentid' in child&&child.parentid !== "" &&child.parentid !== null) {
            //parentid
            return father.id === child.parentid
          }
        }
      ) ;
      //返回每一项的子级数组
      branchArr.length > 0 ? father.children = branchArr : ''   //如果存在子级，则给父级添加一个children属性，并赋值
      if(father.type === 'group'){
        father.disabled =  true
      }
      return father.parentid.trim() === '0';      //返回第一层
    });
  }
  
  
  //线性数据转换树形数据，根目录默认parendId为0
  export function emailPersonTree (list) {
  
    let cloneData = JSON.parse(JSON.stringify(list)) ;   // 对源数据深度克隆
    //debugger
    return cloneData.filter(father => {
  
      let branchArr = cloneData.filter(child => {
          if ('parentid' in child&&child.parentid !== "" &&child.parentid !== null) {
            //parentid
            return father.id === child.parentid
          }
        }
      ) ;
      //返回每一项的子级数组
      branchArr.length > 0 ? father.children = branchArr : ''   //如果存在子级，则给父级添加一个children属性，并赋值
      if(father.type === 'group' && father.children === undefined){
        father.disabled =  true
      }
      return father.parentid.trim() === '0';      //返回第一层
    });
  }
  
  //线性数据转换树形数据，根目录默认parendId为0
  export function operatorTreeData (list) {
  
    let cloneData = JSON.parse(JSON.stringify(list)) ;   // 对源数据深度克隆
    //debugger
    return cloneData.filter(father => {
  
      let branchArr = cloneData.filter(child => {
          if ('parentid' in child&&child.parentid !== "" &&child.parentid !== null) {
            //parentid
            return father.id === child.parentid
          }
        }
      ) ;
      //返回每一项的子级数组
      branchArr.length > 0 ? father.children = branchArr : ''   //如果存在子级，则给父级添加一个children属性，并赋值
      return father.parentid.trim() === '0';      //返回第一层
    });
  }
  
  
  //公文交换组织机构树： 线性数据转换树形数据，根目录默认parendId为0
  export function orgTree (list) {
  
    let cloneData = JSON.parse(JSON.stringify(list)) ;   // 对源数据深度克隆
    //debugger
    return cloneData.filter(father => {
  
      let branchArr = cloneData.filter(child => {
  
          if ('orgNo' in child&&child.orgNo !== "" &&child.orgNo !== null) {
            //parentid
            return father.orgId === child.orgNo
          }
        }
      ) ;   //返回每一项的子级数组
      branchArr.length > 0 ? father.children = branchArr : ''   //如果存在子级，则给父级添加一个children属性，并赋值
      return father.orgNo === '0';      //返回第一层
    });
  }
  
  //公文交换组织机构树： 线性数据转换树形数据，根目录默认parendId为0(发文)
  export function sendOrgTree (list) {
  
    let cloneData = JSON.parse(JSON.stringify(list)) ;   // 对源数据深度克隆
    //debugger
    return cloneData.filter(father => {
  
      let branchArr = cloneData.filter(child => {
  
          if ('orgno' in child&&child.orgno !== "" &&child.orgno !== null) {
            //parentid
            return father.orgid === child.orgno
          }
        }
      ) ;   //返回每一项的子级数组
      branchArr.length > 0 ? father.children = branchArr : ''   //如果存在子级，则给父级添加一个children属性，并赋值
      return father.orgno === '0';      //返回第一层
    });
  }
  
  //
  export function createTreeData (list) {
  
    let cloneData = JSON.parse(JSON.stringify(list)) ;   // 对源数据深度克隆
    //debugger
    return cloneData.filter(father => {
  
      let branchArr = cloneData.filter(child => {
  
          if ('parentid' in child&&child.parentid !== "" &&child.parentid !== null) {
            //parentid
            return father.id === child.parentid
          }
        }
      ) ;   //返回每一项的子级数组
      branchArr.length > 0 ? father.children = branchArr : ''   //如果存在子级，则给父级添加一个children属性，并赋值
      return father.parentid.trim() === '0';      //返回第一层
    });
  
  
  }
  