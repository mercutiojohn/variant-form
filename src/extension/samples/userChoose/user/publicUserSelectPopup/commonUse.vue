<template>
  <div style="height:490px;overflow-x: hidden;border: 1px solid #f2f2f2">
    <div style="margin: 15px;margin-right:15px;text-align: right;">
      <!-- <Button size="medium" type="primary" @click="toAddCommonUser" style="font-family: 黑体;background-color: #095fff;color: white;border-radius:15px;border: 1px solid #095fff;">添加常用人</Button> -->
      <Button type="primary" size="medium"  @click="toAddCommonUser"
            style="margin-top: 0px;margin-bottom: 10px;font-size:16px;">添加常用人</Button>
    </div>
    <el-checkbox-group v-model="selectData" @change="handleCheckedUserChange">
      <div  v-for="user in data">
        <el-checkbox
        :label="user"
        v-if="filterText==''||user.name.indexOf(filterText)!=-1"
        :key="user.id"
      >{{user.name}}</el-checkbox>
      </div>

    </el-checkbox-group>
    <Dialog :visible.sync="vis" v-if="vis" @close="clearData()" width="30%" :append-to-body="true">
          <el-input style="margin-bottom: 5px"
            placeholder="输入关键字进行过滤"
            v-model="searchText">
          </el-input>
      <stepAllTree
        ref="add"
        :selectMode="selectMode1"
        :selectUser.sync="data"
        :filterText.sync="searchText"
        :selectUser = "ids"
        :newOperator="newOperator"
      ></stepAllTree>
      <div style="text-align: center;margin-top: 20px">
      <!-- <Button size="medium" type="primary" @click="add" style="font-family: 黑体;background-color: #095fff;color: white;border-radius:15px;border: 1px solid #095fff;">保存</Button> -->
      <Button type="primary" size="medium"   @click="add"
            style="margin-top: 0px;margin-bottom: 10px;font-size:16px;">保存</Button>
      </div>
    </Dialog>
  </div>
</template>

<script>
import { Button, Dialog } from 'element-ui'
// import { getCommonUseData, addContacts } from '../../api/transferunit'
import stepAllTree from './stepAllTree'
export default {
  name: 'commonUse',
  inject:['getCommonUseData','addContacts'],
  components: {
    Button,
    Dialog,
    stepAllTree
  },
  data() {
    return {
      data: [],
      ids:[],
      selectData: [],
      vis: false,
      selectMode1: false,
      searchText: this.filterText,
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
  methods: {
    toAddCommonUser(){
      var array = []
      this.data.forEach(element => {
        array.push(element.id)
      });
      this.ids = array
      this.vis = true
    },
    getCommonUse() {
      this.getCommonUseData().then(res => {
        this.data = res.data
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    handleCheckedUserChange(value) {
      if (this.selectMode && value.length > 1) {
        value.splice(0, 1)
      }
    },
    clearData() {
      this.selectData = []
      this.searchText = ''
    },
    add() {
      var checkData = this.$refs.add.$refs.tree.getCheckedNodes()
      // if (checkData.length >= 0) {
        addContacts({ selectData: checkData }).then(res => {
          this.vis = false
          this.getCommonUseData()
        })
      // }
      this.selectData = []
      this.searchText = ''
    }
  },
  mounted: function() {
    this.getCommonUse()
  },
  watch: {
  }
}
</script>

<style scoped>
/deep/.el-checkbox__label{
  font-size: 18px;
  text-align: left;
}
/deep/.el-checkbox-group{
  font-size: 18px;
  text-align: left;
  margin-left: 30px;
  margin-top:10px;
}
</style>
