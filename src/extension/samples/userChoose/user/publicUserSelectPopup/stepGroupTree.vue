<template>
  <div style="height:490px;overflow-x: hidden;overflow-y:scroll;border: 1px solid #f2f2f2">
    <el-tree
      class="filter-tree"
      :data="data"
      node-key="id"
      :props="defaultProps"
      ref="groupTree"
      show-checkbox
      default-expand-all
      :filter-node-method="filterNode"
      @check-change="handleCheckChange"
      check-strictly = "true"
    ></el-tree>
  </div>
</template>

<script>
import { getGroupUserTree } from '../../api/transferunit'
import { treeData } from '../../api/tree'
export default {
  name: 'stepGroupTree',
  data() {
    return {
      data: [],
      selectData:[],
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  props: {
    selectMode: {
      type: Boolean,
      default: false
    },
    filterText: {
      type: String,
      default: ''
    },
    newOperator: {
      type: String,
      default: ''
    }
  },
  methods:{
    getTreeData() {
      getGroupUserTree({groupId:this.newOperator}).then(res => {
        this.data = treeData(res.data)
      })
    },
    //节点选中状态发生变化时的回调
    handleCheckChange(data, checked, indeterminate) {
      if (checked && !indeterminate) {
        //判断状态，是否未单选模式
        if (this.selectMode && this.$refs.groupTree.getCheckedNodes(true).length > 1) {
          this.$refs.groupTree.setCheckedKeys([])
          this.$refs.groupTree.setChecked(data.id, true, false)
        }
      }
      this.selectData = this.$refs.groupTree.getCheckedNodes(true)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    clearData(){
      this.$refs.groupTree.setCheckedKeys([])
    }
  },
  mounted: function() {
    this.getTreeData()
  },
  watch: {
    filterText(val) {
      this.$refs.groupTree.filter(val)
    }
  }
}
</script>

<style>

</style>
