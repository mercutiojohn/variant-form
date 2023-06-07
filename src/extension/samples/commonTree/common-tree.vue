<template>
  <main class="el-main">
    <Row v-if="options.filter" style="border: 0">
      <ElCol>
        <Form  @submit.native.prevent>
          <FormItem
            label="检索："
            label-width="60px"
          >
            <ElInput
              v-model="filterText"
              placeholder="请输入节点名进行检索"
              size="mini"
            ></ElInput>
          </FormItem>
        </Form>
      </ElCol>
    </Row>
    <Tree
      v-if="hackReset"
      node-key="id"
      :data="treeData"
      :load="options.loadNode"
      :props="treeProps"
      :lazy="options.lazy"
      :expand-on-click-node="options.expandOnClickNode"
      :default-expand-all="options.defaultExpandAllNode"
      highlight-current
      @node-click="treeNodeClick"
      @check-change="treeCheckChange"
      :show-checkbox="options.showCheckBox"
      :filter-node-method="filterNode"
      :check-strictly="options.checkStrictlyTree"
      ref="tree"
    >
    <template #default="{ node, data }">
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span>{{node.label}}</span>
            </span>
            <span v-if="options.nodeEdit">
              <el-button style="font-size: 12px;" type="text" @click="append(data)" >新增</el-button>
              <el-button style="font-size: 12px;" type="text" @click="remove(node,data)">删除</el-button>
            </span>
          </span>
    </template>
    </Tree>
  </main>
</template>

<script>
import { Input, Col, Row, Tree, Form, FormItem } from 'element-ui'
// import { getRootNodeData, getChildNodeData, getAllNodeData, searchNodeData, cleanCache } from '@/api/sys/commons/index.js'
import lodash from 'lodash'
export default {
  name: 'Common-tree',
  components: { 'ElInput': Input, 'ElCol': Col, Row, Tree, Form, FormItem },
  props: {
    option: Object,
  },
  inject: ['request','PersonTreeData'],
  data () {
    return {
      filterText: '',
      treeProps : {
        label: 'label',
        children: 'children',
        isLeaf: 'isLeaf',
      },
      options: {
        name: "tree42416",
        attribute:'',
        label: "",
        filter: true,
        draggable: false,
        defaultExpandAllNode: true,
        selectClearAllNode: true,
        expandRetractAllNode: true,
        showCheckBox: true,
        expandOnClickNode: false,
        lazy: false,
        treeDataEdit: true,
        checkStrictlyTree: true,
        staticFlag:true,
        nodeEdit: true,
        size: "default",
        disabled: false,
        hidden: false,
        dsEnabled: false,
        dsName: "",
        dataSetName: "",
        customClass: [],
        onCreated: "",
        onMounted: "",
        onNodeClick: "",
        onNodeCheck: "",
        onNodeContextmenu: "",
        onCheckChange: "",
        apiData:"",
        treeData: [
          { 
            "id":"1",
            "label": "一级 1",
            "children": [
              {
                "id":"4",
                "label": "二级 1-1",
                "children": [
                  {
                    "id":"9",
                    "label": "三级 1-1-1"
                  }
                ]
              }
            ]
          },
          { 
            "id":"2",
            "label": "一级 2",
            "children": [
              {
                "id":"5",
                "label": "二级 2-1",
                "children": [
                  {
                    "id":"10",
                    "label": "三级 2-1-1"
                  }
                ]
              },
              {
                "id":"6",
                "label": "二级 2-2",
                "children": [
                  {
                    "id":"11",
                    "label": "三级 2-2-1"
                  }
                ]
              }
            ]
          },
          {
            "id":"3",
            "label": "一级 3",
            "children": [
              {
                "id":"7",
                "label": "二级 3-1",
                "children": [
                  {
                    "id":"12",
                    "label": "三级 3-1-1"
                  }
                ]
              },
              {
                "id":"8",
                "label": "二级 3-2",
                "children": [
                  {
                    "id":"13",
                    "label": "三级 3-2-1"
                  }
                ]
              }
            ]
          }
        ]
      },
      treeData: [],
      lazy: this.isLazy,
      hackReset: true,
      num:0,
    }
  },
  computed: {
    },
  methods: {
    append(data) {
        const newChild = { id:'test'+this.num++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
        if(this.options.staticFlag){
          this.$emit('newStatic',this.treeData)
        }                
      },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
      if(this.options.staticFlag){
          this.$emit('newStatic',this.treeData)
        }       
    },
    // 懒加载检索时遍历节点设置检索结果
    traverseSetChildren (nodes, data) {
      for (let index = 0; index < nodes.length; index++) {
        const element = nodes[index]
        if (!data[index]) {
          data[index] = []
        }
        // 设置数据
        element.setData(data[index])
        // element.isLeaf = false
        // element.updateLeafState()
        // 如果当前检索关键字有值，则展开当前节点的父节点，否则收起节点
        if (this.filterText) {
          element.parent.expanded = true
        } else {
          element.parent.expanded = false
        }
        // 将当前节点的父节点的加载状态设置为已加载，防止其再次向后台请求数据，由于后台根据父节点获取子节点的接口没有关键字过滤功能，如果发送请求会产生错误的检索结果，同时也会影响性能
        element.parent.loaded = true
      }
      for (let index = 0; index < nodes.length; index++) {
        const element = nodes[index]
        // 递归遍历其下层子节点
        this.traverseSetChildren(element.childNodes, data[index].children)
      }
    },
    filterNode (value, data, node) {
      if (!value) {
        return true
      }
      console.log(data);
      
      let keep = data[this.treeProps.label].indexOf(value) !== -1
      if (!keep) {
        let tmpNode = node.parent
        while (tmpNode && tmpNode !== this.$refs.tree.root) {
          // 如果父节点保留，则其下所有子节点保留
          if (tmpNode.visible) {
            keep = true
            break
          }
          tmpNode = tmpNode.parent
        }
      }

      return keep
    },
    // 多选获取被选中的节点
    getCheckedNodes () {
      return this.$refs.tree.getCheckedNodes()
    },
    // 获取当前节点
    getCurrentNode () {
      return this.$refs.tree.getCurrentNode()
    },
    // 设置被选中的key
    setCheckedKeys (keys) {
      this.$refs.tree.setCheckedKeys(keys)
    },
    // 设置当前key
    setCurrentKey (key) {
      this.$refs.tree.setCurrentKey(key)
    },
    // 懒加载时加载节点
    loadNode (node, resolve) {
      if (node.level === 0) {
        let _this = this
        getRootNodeData(this.type, this.conditions, this.rootConditions).then((response) => {
          // if (response.data.code === 'success') {
          if (this.util.isNotEmpty(response.data)) {
            this.$emit('update:id', response.data[0].id)
            this.$emit('update:code', response.data[0].code)
            this.$emit('tree-parent', response.data[0])
            return resolve(response.data)
          } else {
            // 返回数据为空时resolve一个空数组，resolve方法解析不了null
            return resolve([])
          }
        })
          .catch((e) => {
            console.log(e)
            _this.$message.error('节点数据获取失败')
          })
      } else {
        // 如果当前节点是叶子节点，则不再向后台发送请求
        if (node.data.leaf === true) {
          return resolve([])
        }
        getChildNodeData(this.type, node.data.id, this.conditions)
          .then((response) => {
            return resolve(response.data)
          })
          .catch((e) => {
            this.$message.error('节点数据获取失败')
          })
      }
    },
    // 树节点单选被点击时的回调
    treeNodeClick: function (data, node, component) {

      let mountFunc = new Function('data','node','component',this.options.onNodeClick) 
      mountFunc(data, node, component) 
      // if (this.onlySelectLeaf) {
      //   if (data.leaf) {
      //     this.$emit('update:id', data.id)
      //     this.$emit('update:code', data.code)
      //     this.$emit('tree-node-click', data, node, component)
      //   }
      // } else {
      //   this.$emit('update:id', data.id)
      //   this.$emit('update:code', data.code)
      //   this.$emit('tree-node-click', data, node, component)
      // }
    },
    treeCheckChange(data, checked, indeterminate){
      let mountFunc = new Function('data','checked','indeterminate',this.options.onCheckChange) 
      mountFunc(data, checked, indeterminate) 
    },
    // 不是懒加载时加载全部节点
    async loadAllNodes() {
      if (this.options.staticFlag) {
        this.hackReset = false
        this.treeProps ={
        label: 'label',
        children: 'children',
        isLeaf: 'isLeaf',
      },
        this.treeData =this.options.treeData
        this.hackReset = true
        // 如果从本地获取，直接读取json文件，，因此设置localLoad=true时必须确保本地存在json文件
        // this.treeData = require('@/commons/trees/' + this.type + '.json')
      } else {
        if (!!this.options.apiData) {
          try {
            let mountFunc = new Function('_this','request',this.options.apiData) 
          await mountFunc(this,this.request) 
          } catch (error) {
            
          }  
        } else {
          this.$message.error('加载节点失败')
        }
       
        // getAllNodeData(this.type, this.conditions, this.rootConditions).then((response) => {
        //   this.treeData = response.data
        //   this.$emit('update:id', response.data[0].id)
        //   this.$emit('update:code', response.data[0].code)
        //   this.$emit('tree-parent', response.data[0])
        // }).catch((e) => {
        //   this.$message.error('加载节点失败')
        // })
      }
    },
    // 树节点检索
    search () {
      let val = this.filterText
      if (!this.isLazy) {
        // 如果是非懒加载，直接过滤
        this.$refs.tree.filter(val)
        // 因为需要保留符合条件的父节点下的所有子节点，所以一些不符合条件的节点也通过了filter，因为filter会展开所有通过filter的节点，
        // 所以需要对节点展开状态重新处理

        // 收起所有树节点
        this.$refs.tree.store._getAllNodes().forEach(element => {
          element.expanded = false
        })
        // 展开符合条件的节点
        this.$refs.tree.store._getAllNodes().forEach(element => {
          if (val && element.data[this.treeProps.label].indexOf(val) !== -1) {
            let tmpNode = element.parent
            while (tmpNode && tmpNode !== this.$refs.tree.root) {
              tmpNode.expanded = true
              tmpNode = tmpNode.parent
            }
          }
        })
      } else {
        // 懒加载
        let _this = this
        val = encodeURI(this.filterText)
        // 去抖
        lodash.debounce(() => {
          // 调用后台接口查询
          // 必须在最后拼上反斜杠，因为type中有小数点，不拼反斜杠后台会认为小数点后是后缀，会处理错误
          searchNodeData(_this.type, _this.conditions, _this.rootConditions, val).then((response) => {
            // 递归设置检索结果
            _this.$refs.tree.root.setData(response.data)
            _this.traverseSetChildren(_this.$refs.tree.root.childNodes, response.data)
          }).catch((e) => {
            this.$message.error('加载节点失败')
          })
        }, 500)()
      }
    },
    // 重建树组件，清空缓存
    refreshTree () {
      this.hackReset = false
      this.lazy = this.isLazy
      this.filterText = ''
      let _this = this
      cleanCache(this.type).then((response) => {
        _this.$nextTick(() => {
          this.hackReset = true
        })
      }).catch((_e) => {
      })
    },
    // 重建树组件，不清空缓存
    rebuildTree () {
      this.hackReset = false
      this.lazy = this.isLazy
      this.filterText = ''
      let _this = this
      _this.$nextTick(() => {
        this.hackReset = true
      })
    }
  },
  created() {
    console.log('this.option',this.option);
    
    this.options=this.option
  },
  mounted: function () {
    if (!this.options.lazy) {
      this.loadAllNodes()
    }
  },
  watch: {
    option: {
      handler(val) {    
        this.options= val;
          if (!this.options.lazy) {
          this.loadAllNodes()
        }
      },
      deep: true
    },
    // type (newVal, oldVal) {
    //   this.rebuildTree()
    // },
    // conditions (newVal) {
    //   this.rebuildTree()
    // },
    // rootConditions (newVal) {
    //   this.rebuildTree()
    // },
    filterText (newVal) {
      this.search()
    }
  }
}

</script>
