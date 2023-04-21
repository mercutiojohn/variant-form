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
        <TableColumn  prop="label" header-align="center" align="left" min-width="120" label="字段名称" >
            <template slot-scope="scope" >
                <el-input  v-model="scope.row.label" ></el-input>
            </template>
        </TableColumn>
        <TableColumn  prop="inputType" header-align="center" align="left" min-width="120" label="类型" >
            <template slot-scope="scope"  >
                <el-input  v-model="scope.row.inputType" ></el-input>
            </template>
        </TableColumn>
        <TableColumn  prop="field" header-align="center" align="left" min-width="120" label="字段" >
            <template slot-scope="scope"  >
                <el-input  v-model="scope.row.field" ></el-input>
            </template>
        </TableColumn>
        <TableColumn  prop="headerAlign" header-align="center" align="left" min-width="120" label="表头对齐方式" >
          <template slot-scope="scope"  >
              <el-select v-model="scope.row.headerAlign" placeholder="请选择">
                <el-option label="左对齐" value='left'></el-option>
                <el-option label="居中对齐" value='center'></el-option>
                <el-option label="右对齐" value='right'></el-option>
              </el-select>
          </template>
        </TableColumn>
        <TableColumn  prop="contentAlign" header-align="center" align="left" min-width="120" label="对齐方式" >
          <template slot-scope="scope"  >
              <el-select v-model="scope.row.contentAlign" placeholder="请选择">
                  <el-option label="左对齐" value='left'></el-option>
                  <el-option label="居中对齐" value='center'></el-option>
                  <el-option label="右对齐" value='right'></el-option>
              </el-select>
          </template>
        </TableColumn>
        <TableColumn  prop="sortable" header-align="center" align="left" min-width="120" label="是否可排序" >
          <template slot-scope="scope"  >
              <el-select v-model="scope.row.sortable" placeholder="请选择">
                  <el-option label="是" :value='true'></el-option>
                  <el-option label="否" :value='false'></el-option>
              </el-select>
          </template>
        </TableColumn>
        <TableColumn  prop="tableHide" header-align="center" align="left" min-width="120" label="是否在列表中显示" >
          <template slot-scope="scope"  >
              <el-select v-model="scope.row.tableHide" placeholder="请选择">
                  <el-option label="隐藏" :value='true'></el-option>
                  <el-option label="显示" :value='false'></el-option>
              </el-select>
          </template>
        </TableColumn>
        <TableColumn
        label="操作"
        width="150px"
        align="center"
        >
          <template slot-scope="scope">
            <el-button
              type="success"
              circle
              plain
              icon="el-icon-plus"
              @click="
                addDict(scope.$index,listData)
              "
            />

            <el-button
              type="danger"
              circle
              plain
              icon="el-icon-delete"
              @click="
                delDict(scope.$index,listData)
              "
            />
          </template>
        </TableColumn>
        <!-- <TableColumn  prop="editField" header-align="center" align="left" label="编辑字段" >
            <template slot-scope="scope"  >
                <el-input  v-model="scope.row.editField" ></el-input>
            </template>
        </TableColumn>
        <TableColumn  prop="disabled" header-align="center" align="left" label="是否可编辑" >
            <template slot-scope="scope"  >
                <el-select v-model="scope.row.disabled" placeholder="请选择">
                    <el-option label="可编辑" :value='false'></el-option>
                    <el-option label="不可编辑" :value='true'></el-option>
                </el-select>
            </template>
        </TableColumn> -->
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
      addDict(index,item) {
        console.log(index,item);
        item.push({ 
          contentAlign: "center",
          disabled: false,
          editField: "",
          field: "",
          headerAlign: "left",
          inputType: "input",
          label: "",
          placeholder: "",
        });
      },
      delDict(index,rows) {
        if (index == 0) {
          this.$message.error("至少保留一条");
          return;
        }
        console.log(index,rows);
        
        rows.splice(index, 1);
      },
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
  