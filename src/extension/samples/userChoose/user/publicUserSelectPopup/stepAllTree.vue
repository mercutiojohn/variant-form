<template>
  <div style="height: 490px; overflow-x: hidden; border: 1px solid #f2f2f2">
    <el-tree
      class="filter-tree"
      :data="data"
      node-key="id"
      :props="defaultProps"
      ref="tree"
      show-checkbox
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      :default-checked-keys="defaultKeys"
      @check-change="handleCheckChange"
      :check-strictly="true"
      @node-click="handleNodeClick"
      @setCheckedNodes="defaultKeys"
    ></el-tree>
    <div v-show="false" :style="getGroupId"></div>
  </div>
</template>

<script>
// import { getPersonData, getParentId } from "../../api/transferunit";
// import { PersonTreeData } from "../../api/tree";
export default {
  name: "stepAllTree",
  inject:['getPersonData','getParentId','PersonTreeData'],
  data() {
    return {
      data: [],
      selectData: [],
      defaultKeys: this.selectUser,
      defaultProps: {
        label: "name",
        children: "children",
      },
      groupId: "",
      newGroupId: "",
      toGroupId: "",
    };
  },
  props: {
    selectMode: {
      type: Boolean,
      default: false,
    },
    filterText: {
      type: String,
      default: "",
    },
    selectUser: {
      type: [Array],
      default: () => [],
    },
    // receiveType: {
    //   type: Array,
    //   default: []
    // },
    newOperator: {
      type: String,
      default: "",
    },
  },
  computed: {},
  methods: {
    getParentIdx() {
      var _this = this;

      this.getParentId({
        groupId: _this.groupId,
      }).then((response) => {
        if (response.data != "" && response.data != undefined) {
          _this.newGroupId = response.data[0].id;
        }

        _this.getTreeData();
      });
    },
    getTreeData() {
      // if(this.groupId=='000000'){
      //   this.toGroupId='000000'
      // }else{
      //   this.toGroupId=this.newGroupId
      // }
      this.toGroupId = "000000";
      this.getPersonData({ groupId: this.toGroupId }).then((res) => {
        this.data = res.data;
        this.data[0].parentid = "0";
        this.data = this.PersonTreeData(this.data);
        // console.log(this.data[0])
        //console.log(this.selectUser,'++++')
        // if (this.selectUser.length > 0) {
        //   this.data.forEach(element => {
        //     if (!element.disabled) {
        //       this.selectUser.forEach(el => {
        //         if (el.id.trim() == element.id.trim()) {
        //           console.log(el.id,'+++++++',element.id)
        //           this.defaultKeys.push(element.id)
        //         }
        //       })
        //     }
        //   })
        // }
        // this.$nextTick(()=>{
        //   this.selectData = this.$refs.tree.getCheckedNodes(true)
        // })
        // //console.log(this.selectData,'-----')

        // this.data = treeData(res.data)
      });
    },
    handleNodeClick(data, node, data1) {
      console.log(data, 8888);
      console.log(node, 9999);
      console.log(data1, 7777);

      // if (checked && !indeterminate) {
      //   //判断状态，是否未单选模式
      //   if (this.selectMode && this.$refs.tree.getCheckedNodes(true).length > 1) {
      //     this.$refs.tree.setCheckedKeys([])
      //     this.$refs.tree.setChecked(data.id, true, false)
      //   }
      // }
      if (!node.disabled) {
        if (!node.checked) {
          //判断状态，是否未单选模式
          if (
            this.selectMode &&
            this.$refs.tree.getCheckedNodes(true).length > 0
          ) {
            this.$refs.tree.setCheckedKeys([]);
          }
          this.$refs.tree.setChecked(data.id, true, false);
        } else {
          this.$refs.tree.setChecked(data.id, false, false);
        }

        this.selectData = this.$refs.tree.getCheckedNodes(true);
      }

      // this.handleCheckChange(data,!node.checked,false)
      // this.selectData = this.$refs.tree.getCheckedNodes(true)
    },
    //节点选中状态发生变化时的回调
    handleCheckChange(data, checked, indeterminate) {
      // debugger
      console.log(data, 111);
      console.log(checked, 222);
      console.log(indeterminate, 333);
      //console.log(data,'++++++++++')
      if (checked && !indeterminate) {
        //判断状态，是否未单选模式
        if (
          this.selectMode &&
          this.$refs.tree.getCheckedNodes(true).length > 1
        ) {
          this.$refs.tree.setCheckedKeys([]);
          this.$refs.tree.setChecked(data.id, true, false);
        }
      }
      this.selectData = this.$refs.tree.getCheckedNodes(true);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    clearData() {
      this.$refs.tree.setCheckedKeys([]);
    },
    getGroupId() {
      
    }
  },
  mounted: function () {
    this.getTreeData();
    //this.getParentIdx();
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
};
</script>

<style>
</style>
