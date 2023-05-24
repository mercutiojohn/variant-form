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
        <TableColumn
            align="center"
            label="拖拽排序"
            min-width="100"
          >
            <template slot-scope="scope">
                <el-button
                style="font-size:30px;"
                type="text"
                icon="el-icon-menu"
                class="drag"
              />
            </template>
        </TableColumn>
        <TableColumn  prop="label" header-align="center" align="left" min-width="120" label="名称" >
            <template slot-scope="scope" >
                <el-input  v-model="scope.row.label" ></el-input>
            </template>
        </TableColumn>
        <TableColumn  prop="field" header-align="center" align="left" min-width="120" label="绑定字段" >
            <template slot-scope="scope"  >
              <el-select v-model="scope.row.field" @change="fieldChange(scope.row)" placeholder="请选择">
                <el-option
                  v-for="dict in columns"
                  :key="dict.code"
                  :label="dict.name"
                  :value="dict.code"
               ></el-option>
              </el-select>
            </template>
        </TableColumn>
        <TableColumn  prop="inputType" header-align="center" align="left" min-width="120" label="类型" >
            <template slot-scope="scope"  >
              <!-- <el-input  v-model="scope.row.inputType" ></el-input> -->
              <el-select v-model="scope.row.inputType" placeholder="请选择">
                <el-option
                  v-for="dict in inputType"
                  :key="dict"
                  :label="dict"
                  :value="dict"
               ></el-option>
              </el-select>
            </template>
        </TableColumn>
        <!-- <TableColumn  prop="tableHide" header-align="center" align="left" min-width="120" label="是否在列表中显示" >
          <template slot-scope="scope"  >
              <el-select v-model="scope.row.tableHide" placeholder="请选择">
                  <el-option label="隐藏" :value='true'></el-option>
                  <el-option label="显示" :value='false'></el-option>
              </el-select>
          </template>
        </TableColumn> -->
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
        <!-- <TableColumn  prop="disabled" header-align="center" align="left" label="是否可编辑" >
            <template slot-scope="scope"  >
                <el-select v-model="scope.row.disabled" placeholder="请选择">
                    <el-option label="可编辑" :value='false'></el-option>
                    <el-option label="不可编辑" :value='true'></el-option>
                </el-select>
            </template>
        </TableColumn> -->
      </Table>
      <div v-if="lodding" style="width: 100%;
                  height: calc(100% - 60px);
                  background-color: rgb(244, 244, 244);
                  position: absolute;
                  top: 60px;
                  left: 0;
                  opacity: 0.3;">
          <div style="position: absolute;left:50%;top:50%;width:50px;height:50px;transform: translate(-50%, -50%);font-size: 40px">
               <i class="el-icon-loading"></i>
          </div>
      </div>
      <div style="text-align: center;margin-top: 20px">
        <Button  size="medium" type="primary" @click="toSave">
          保存
        </Button>
      </div>
    </div>
  </template>
  <script>
  import { Button, Table, TableColumn,Input } from 'element-ui'
  import {getAllFieldWidgets} from "@/utils/util"
  import sortable from './Sortable.js'
  import Vue from 'vue'
  export default {
    name: 'edit-table',
    inject: ['setFunction'],
    components: {
      Table,
      TableColumn,
      Button,
      ELInput: Input,
    },
    props: {
      list: {
        type: [Array]
      },
      formId:{

      },
      columns:{
        type: [Array]
      }
    },
    data () {
      return {
        listData: [],
        num: 1,
        lodding:false,
        inputType:['input','user-choose','group-choose','textarea','number','select','radio','checkbox','switch','time','time-range','date','date-range']
      }
    },
    methods: {
      //下拉框选项改变触发
      fieldChange(row){
        //查询条件
        let columns=this.columns
        const optionType=['select','radio','checkbox','switch']
        const inputType=['input','user-choose','textarea','number','group-choose']
        const dataType=['time','time-range','date','date-range']
        for (let index = 0; index < columns.length; index++) {
          if(columns[index].code==row.field){
            row.inputType=columns[index].type
            row.label=columns[index].name
            if(optionType.includes(columns[index].type)){
              if(!!columns[index].anjiSelectOption){
                row.anjiSelectOption=columns[index].anjiSelectOption||[]
              }  
            }else if(inputType.includes(columns[index].type)){
              row.anjiSelectOption=[]

            }else if(dataType.includes(columns[index].type)){
              row.format=columns[index].format
              row.valueFormat=columns[index].valueFormat||columns[index].format
              row.anjiSelectOption=[]
            }
            // else if(columns[index].type=="switch"){
            //   row.disableValue=columns[index].activeText
            //   row.enableValue=columns[index].inactiveText                     
            // }
            break;   
          }                
        }
      },
      async getLatestData(){
        this.lodding=true
        const {data} = await this.setFunction.getVformPagesByPageId(this.formId);
        const pageJsonObj=  JSON.parse(data.pageJson)
        let widgetList=pageJsonObj.widgetList
        let widgets= this.getFieldWidgets(widgetList)
        console.log(widgets);
        let newTable=[]
        newTable.push({
              label: "",
              field: "task_id",
              primaryKey: true, // 根据主键查询详情或者根据主键删除时, 主键的
              tableHide: true, // 表格中不显示
              editHide: true // 编辑弹框中不显示
        })
        widgets.forEach((item)=>{
          let data={
                label: item.field.options.label, //数据源编码
                placeholder: item.field.options.defaultValue,
                field: item.field.options.name,
                editField: item.field.options.name,
                inputType: item.type,
                // disabled: item.field.options.disabled,
                contentAlign:'center',
                headerAlign:'left',
                sortable:false,
                optionItems:item.field.options.optionItems
              }
          newTable.push(data)        
        })
        console.log(newTable);
        this.listData=newTable
        this.lodding=false
      },
      getFieldWidgets(widgetList = null) {
        return !!widgetList ? getAllFieldWidgets(widgetList) : getAllFieldWidgets(this.formJson.widgetList)
      },
      addDict(index,item) {
        // console.log(index,item);
        item.push({ 
          field: "",
          inputType: "input",
          label: "",
          disabled:false
        });
      },
      delDict(index,rows) {
        if (rows.length<=1) {
          this.$message.error("至少保留一条");
          return;
        }
        if(rows[index].primaryKey){
              this.$confirm("删除确认", "确认要删除吗,可能会影响部分功能?", {
              type: "warning",
              confirmButtonClass: "delete_sure",
              cancelButtonClass: "el-button--danger is-plain"
            }).then(() => {
              rows.splice(index, 1);
              })
        }else{
          rows.splice(index, 1);
        }
        // console.log(index,rows);
        

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
      this.listData = JSON.parse(JSON.stringify(this.list))
      // console.log(this.listData);
      console.log('columns',this.columns);
      
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
  