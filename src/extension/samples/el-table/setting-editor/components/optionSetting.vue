<template>
    <div>
      <Table :data="listData" ref="multipleTable" size="mini" max-height="600px">
        <!-- <TableColumn prop="name" header-align="center" align="left" label="机构" >
        </TableColumn>
        <TableColumn prop="sendamount" header-align="center" align="center" label="打印份数" >
            <template slot-scope="scope">
                <el-input :maxlength="2" @change="checkNum(scope.$index)" v-model="scope.row.sendamount" ></el-input>
            </template>
        </TableColumn> -->
        <TableColumn align="center" width="30">
          <template slot-scope="scope">
            <svg-icon
              class="drag"
              style="cursor: grab"
              icon-class="drag-handle-dots-2"
              class-name="color-svg-icon"
            />
          </template>
        </TableColumn>
        <TableColumn  prop="label" header-align="center" align="left" min-width="120" label="label" >
            <template slot-scope="scope" >
                <el-input  v-model="scope.row.label" ></el-input>
            </template>
        </TableColumn>
       
        <TableColumn  prop="value" header-align="center" align="left" min-width="80" label="value" >
          <template slot-scope="scope"  >
              <el-input  v-model="scope.row.value" ></el-input>
          </template>
        </TableColumn>    
        <TableColumn
          label="操作"
          width="150px"
          align="center"
          fixed="right"
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
  import SvgIcon from "@/components/svg-icon";
  import { Button, Table, TableColumn,Input } from 'element-ui'
  import {getAllFieldWidgets} from "@/utils/util"
  import sortable from '@/utils/Sortable.js'
  import Vue from 'vue'
  import common from '../../anji/anji-crud/mixins/common'
  export default {
    name: 'edit-table-optionSetting',
    inject: ['setFunction'],
    components: {
      Table,
      TableColumn,
      Button,
      ELInput: Input,
      SvgIcon
    },
    mixins: [
      common
    ],
    props: {
      list: {
        type: [Array]
      },
      formId:{

      },
      columnsCss:{

      }
    },
    data () {
      return {
        listData: [],
        num: 1,
        customCodeEditing: '',
        customCodeIndex: -1
      }
    },
    methods: {
      addDict(index,item) {
        item.push({ 
          label: "",
          value:"",
        });
      },
      delDict(index,rows) {
        // if (rows.length<=1) {
        //   this.$message.error("至少保留一条");
        //   return;
        // }
        rows.splice(index, 1);
        console.log(index,rows);
      },
      // 保存份号编辑
      toSave () {
          this.$emit('close', this.listData)
      },
      setSort(){
            const el = this.$refs.multipleTable.$el.querySelector('.el-table__body-wrapper tbody')
            const _this=this
            sortable.create(el,{
              draggable:".el-table__row",
              handle:'.drag',          
              // ghostClass:'sortable-ghost',
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
      this.listData = this.deepClone(this.list)
      if ( this.listData.length==0) {
        this.addDict(0, this.listData)
      }
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
  