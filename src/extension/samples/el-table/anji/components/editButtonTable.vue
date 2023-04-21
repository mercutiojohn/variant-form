<template>
    <div>
      <Table :data="listData" ref="multipleTable" row-key="id" max-height="450" 
                 style="margin-top: -20px" tooltip-effect="dark">
        <!-- <TableColumn prop="name" header-align="center" align="left" label="机构" >
        </TableColumn>
        <TableColumn prop="sendamount" header-align="center" align="center" label="打印份数" >
            <template slot-scope="scope">
                <el-input :maxlength="2" @change="checkNum(scope.$index)" v-model="scope.row.sendamount" ></el-input>
            </template>
        </TableColumn> -->
        <TableColumn  prop="label" header-align="center" align="left" label="字段名称" >
            <template slot-scope="scope" >
                <el-input  v-model="scope.row.label" ></el-input>
            </template>
        </TableColumn>
        <TableColumn  prop="type" header-align="center" align="left" label="类型" >
            <template slot-scope="scope"  >
                <el-input  v-model="scope.row.type" ></el-input>
            </template>
        </TableColumn>
        <TableColumn  prop="itemId" header-align="center" align="left" label="绑定id" >
            <template slot-scope="scope"  >
                <el-input  v-model="scope.row.itemId" ></el-input>
            </template>
        </TableColumn>
      </Table>
      <div style="text-align: center;margin-top: 20px">
        <Button  size="medium" type="primary" @click="toSave">
          保存
        </Button>
      </div>
    </div>
  </template>
  <script>
  import { Button, Table, TableColumn,Input } from 'element-ui'
  import sortable from './Sortable.js'
  import Vue from 'vue'
  export default {
    name: 'edit-table',
    components: {
      Table,
      TableColumn,
      Button,
      ELInput: Input,
    },
    props: {
      list: {
        type: [Array]
      }
    },
    data () {
      return {
        listData: [],
        num: 1,
      }
    },
    methods: {
      // 保存份号编辑
      toSave () {
          this.$emit('close', this.listData)
      },
      setSort(){
            const el = this.$refs.multipleTable.$el.querySelector('.el-table__body-wrapper tbody')
            const _this=this
            sortable.create(el,{
            ghostClass:'sortable-ghost',
                // setData:function(dataTransfer){
                //     dataTransfer.setData('Text', '')
                // },
                onEnd({newIndex,oldIndex}){
                  if(newIndex==oldIndex)return
                  _this.listData.splice(newIndex,0,_this.listData.splice(oldIndex,1)[0])
                  var newArray=_this.listData.slice(0)
                  _this.listData=[]
                  _this.$nextTick(function() {
                    _this.listData=newArray
                  })          
                }
            })
        },
       
    },
    // 页面初始化调用方法
    mounted: function () {
      this.listData = JSON.parse(JSON.stringify(this.list))
      console.log(this.listData);
      document.body.ondrag=function(event){
        event.preventDefault()
        event.stopPropagation()
      }
      this.setSort()
      
    },
    watch: {
    }
  }
  
  </script>
  