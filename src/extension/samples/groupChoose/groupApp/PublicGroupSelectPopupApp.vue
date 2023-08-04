<template>
  <div>
    <el-input placeholder="输入名称查询单位" v-model="filterText">
    </el-input>
    <Form ref='editForm' label-width='150px'>
      <el-scrollbar style="height: 250px;overflow-y: auto;overflow-x: hidden;border: 1px solid #f2f2f2">
        <el-tree class="filter-tree" :data="data" node-key="id" :default-checked-keys="groupList"
          :props="defaultProps" ref="tree" show-checkbox :filter-node-method="filterNode" :expand-on-click-node="false"
          @check="handleCheckChange" :check-strictly="true" @node-click="handleNodeClick">
        </el-tree>
      </el-scrollbar>
    </Form>
    <Row style="text-align: center;margin-top: 20px">
      <Button size="small" type="primary" @click="getCheckedNodes" v-noMoreClick>
        <div style="font-size:15px">确定</div>
      </Button>
    </Row>
  </div>
</template>

<script>
  import { Form, Row, Col, Input, Select, Option, Button, Radio, RadioGroup } from 'element-ui';
  // import {getNodeData} from '@/api/sys/transferunit'
  // import {lowTreeData} from "@/api/sys/tree"
  export default {
    name: 'PublicGroupSelectPopup',
    inject:['getNodeData','lowTreeData'],
    props: {
      groupList: {
        type: [Array]
      },
      groupName: {
        type: [Array]
      },
      // 是否多选
      showCheckbox: {
        type: [Boolean],
        default:false
      }
      
    },
    components: {
      Row,
      'ELCol': Col,
      Form,
      'ElInput': Input,
      Select,
      Option,
      Button,
      Radio,
      RadioGroup
    },
    data() {
      return {
        filterText: '',
        defaultProps: {
          label: 'name',
          children: 'children'
        },
        rootId: '',
        data: [],
        checkData: []
      }
    },
    methods: {
      handleNodeClick(data, node){
        // 只有叶子节点才添加行点击勾选复选框效果
        if(!node.disabled){
            // if (!node.checked) {
              if(this.showCheckbox){
                if(this.checkData.findIndex(item => item.id === data.id)==-1){
                  this.checkData.push({
                    name: data.name,
                    id: data.id
                  })
                  this.$refs.tree.setChecked(data.id, true, false)
                }else {
                  var arr = []
                    let index = this.checkData.findIndex(item => item.id === data.id)
                    if(index >=0){
                      this.checkData.splice(index,1)
                      this.$refs.tree.setChecked(data.id, false, false)
                    }
                }
              }
              else{
                this.checkData = []
                if (!node.checked) {
                  //判断状态，是否未单选模式
                  if (this.$refs.tree.getCheckedNodes().length > 0) {
                    this.$refs.tree.setCheckedKeys([])
                  }
                  this.$refs.tree.setChecked(data.id, true, false)
                  var selectData = this.$refs.tree.getCheckedNodes()
                  if(selectData != '' && selectData != null) {
                    this.checkData.push({
                      name: selectData[0].name,
                      id: selectData[0].id
                    })
                  }
                }else{
                  this.$refs.tree.setChecked(data.id, false, false)
                }
              }
            // }
        }
      },
      //节点过滤
      filterNode(value, data) {
        if (!value) return true;
        return (data.name.indexOf(value) !== -1);
      },
      floor(arr, data) {
        if(data.children!=undefined){
            data.children.forEach((item, index) => {
                arr.push(item.id)
                this.floor(arr, item)
            })
        }else{
          return arr
        }
      },
      //节点选中状态发生变化时的回调
      handleCheckChange(data, checked, indeterminate) {
      if (checked && !indeterminate){
        //判断状态，是否未单选模式
        if (this.selectMode && this.$refs.tree.getCheckedNodes(true).length > 1) {
          this.$refs.tree.setCheckedKeys([])
          this.$refs.tree.setChecked(data.id, true, false)
        }
      }
      this.selectData = this.$refs.tree.getCheckedNodes(true)
    },

      handleCheckChange(data, checked) {
        if(this.showCheckbox){
          if (checked.checkedKeys.indexOf(data.id) >= 0 || checked.halfCheckedKeys.indexOf(data.id) >= 0) {
            checked.checkedNodes.forEach(node => {
                if(this.checkData.findIndex(item => item.id === node.id)==-1){
                  this.checkData.push({
                    name: node.name,
                    id: node.id
                  })
                }
            })
          } else {
            var arr = []
              let index = this.checkData.findIndex(node => node.id === data.id)
              console.log(index);
              if(index >=0){
                this.checkData.splice(index,1)
              }
            // })
          }
        }else{
          this.checkData = []
          if (checked) {
            //判断状态，是否未单选模式
            if (this.$refs.tree.getCheckedNodes().length > 1) {
              this.$refs.tree.setCheckedKeys([])
              this.$refs.tree.setChecked(data.id, true, false)
            }
            var selectData = this.$refs.tree.getCheckedNodes()
            if(selectData != '' && selectData != null) {
              this.checkData.push({
                name: selectData[0].name,
                id: selectData[0].id
              })
            }
          }
        }
      },
      setCheckedKey(key) {
        this.$refs.tree.setChecked(key, false, false);
        // 删除对象数组中的元素
        for (let i = 0; i < this.checkData.length; i++) {
          if (this.checkData[i].id == key) {
            this.checkData.splice(i, 1)
          }
        }
      },
      getCheckedNodes() {
        var _this = this
        var names = ''
        var unitId = ''
        var unitIds = ''
        var unitName = _this.checkData// 获取当前的选中的数据{对象}
        unitName.forEach(labels => {
          if (this.gwmc != 'notice' && this.rootId === labels.id) {
          } else {
            //获取选中的承办单位名称
            names += '、' + labels.name
            unitIds += ',' + labels.id
          }
        })
        names = names.substr(1) // 删除字符串前面的','
        var unitNames = names
        var arr = unitNames.split(',')//  把字符串转换成数组
        arr = [...new Set(arr)]; // 数组去重
        unitNames = arr.join(',')// 把数组转换成字符串
        unitIds = unitIds.substr(1) // 删除字符串前面的','
        var ids = unitIds
        var arr = ids.split(',')//  把字符串转换成数组
        arr = [...new Set(arr)]; // 数组去重
        unitIds = arr.join(',')// 把数组转换成字符串
        this.$emit('sendGroup', { unitNames, unitIds }) //将承办单位名称、对应id 传送到父级页面
      },
      clear() {
        this.groupList = []
        this.checkData = []
        this.data = []
        this.filterText = ''
      },
      refreshA: function () {
        var _this = this
        this.getNodeData({parentid:'',filter:'',valid:'1'}).then((response) => {
            if(response.data !=null){
              response.data[0].parentid = '0'
              _this.data = this.lowTreeData(response.data)
              _this.data[0].disabled = true
              _this.rootId = _this.data[0].id
              var arr = []
              var len = _this.groupList.length
              for (var i = 0; i < len; i++) {
                if (_this.groupList[i] !== '') {
                  arr.push({
                    name: _this.groupName[i],
                    id: _this.groupList[i],
                    //key: Date.now()
                  })
                }
              }
              _this.checkData = arr
            }else{
              _this.data=[]
              _this.checkData = []
            }
          }).catch((e) => {
            this.$message.error("承办单位信息获取失败！")
          })
      }
    },
    // 初始化加载方法
    mounted: function () {
     this.refreshA()
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
  }
</script>
<style scoped>
/deep/.el-checkbox__inner {
  border-radius: 1px!important;
  transform: scale(1.3)
}
</style>
