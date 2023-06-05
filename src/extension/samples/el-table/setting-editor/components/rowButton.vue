<template>
    <div>
      <Table :data="listData" ref="multipleTable"  max-height="450" 
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
        <TableColumn  prop="label" header-align="center" align="left"  min-width="100" label="字段名称" >
            <template slot-scope="scope" >
                <el-input  v-model="scope.row.label" ></el-input>
            </template>
        </TableColumn>
        <TableColumn  prop="id" header-align="center" align="left"   min-width="100" label="按钮类型" >
            <template slot-scope="scope"  >
                <el-select v-model="scope.row.id" placeholder="请选择">
                    <el-option label="edit" value='edit'></el-option>
                    <el-option label="delete" value='delete'></el-option>
                </el-select>
            </template>
        </TableColumn>
<!-- 
        <TableColumn  prop="plain" header-align="center" align="left" label="是否朴素按钮" >
            <template slot-scope="scope"  >
                <el-select v-model="scope.row.plain" placeholder="请选择">
                  <el-option label="是" :value='true'></el-option>
                  <el-option label="否" :value='false'></el-option>
              </el-select>
            </template>
        </TableColumn> -->
        <TableColumn  prop="tableHide" header-align="center" align="left"   min-width="100"  label="是否隐藏" >
          <template slot-scope="scope"  >
              <el-select v-model="scope.row.tableHide" placeholder="请选择">
                  <el-option label="隐藏" :value='true'></el-option>
                  <el-option label="显示" :value='false'></el-option>
              </el-select>
          </template>
        </TableColumn>
        <TableColumn  prop="isHide" header-align="center" align="left" min-width="180" label="字段控制" >
            <template slot-scope="scope"  >
                <el-input  v-model="scope.row.isHide"  placeholder="示例：row.task_id=='SWT00000000000000272'"></el-input>
            </template>
        </TableColumn>
        <TableColumn  prop="setting" header-align="center" align="left"    min-width="100" label="是否自定义配置" >
            <template slot-scope="scope"  >
                <el-select v-model="scope.row.setting" placeholder="请选择">
                    <el-option label="是" :value='true'></el-option>
                    <el-option label="否" :value='false'></el-option>
                </el-select>
            </template>
        </TableColumn>
        <TableColumn  prop="settingData" min-width="120"  header-align="center" align="left"  label="自定义配置" >
            <template slot-scope="scope"  >
                <el-button type="info" icon="el-icon-edit"  :disabled="!scope.row.setting" plain round @click="editData(scope.row.settingData,scope.$index)">
                    自定义配置</el-button>
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
      </Table>
      <div style="text-align: center;margin-top: 20px">
        <Button  size="medium" type="primary" @click="toSave">
          保存
        </Button>
      </div>
      <el-dialog title="自定义配置" :visible.sync="showDataFlag"
      v-if="showDataFlag" :show-close="true" class="small-padding-dialog" append-to-body v-dialog-drag
        :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <!-- <el-alert type="info" :closable="false" :title="eventHeader"></el-alert> -->
        <code-editor :mode="'javascript'" :readonly="false" v-model="setData" ref="ecEditor"></code-editor>
        <!-- <el-alert type="info" :closable="false" title="}"></el-alert> -->
        <div slot="footer" class="dialog-footer">
        <el-button @click="showDataFlag = false">
        取消</el-button>
        <el-button type="primary" @click="saveDataConversion">
        确定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  <script>
  import CodeEditor from '@/components/code-editor/index'
  import { Button, Table, TableColumn,Input } from 'element-ui'
  import sortable from '@/utils/Sortable.js'
  import Vue from 'vue'
  export default {
    name: 'row-button-table',
    components: {
      Table,
      TableColumn,
      Button,
      ELInput: Input,
      CodeEditor,
    },
    props: {
      list: {
        type: [Array]
      },
      getTableData:{
        type:[Array]
      }
    },
    data () {
      return {
        listData: [],
        num: 1,
        showDataFlag:false,
        setData:'',
        index:'',
      }
    },
    methods: {
      //自定义配置
      editData(data,index){
          this.setData=data
          this.index=index
          this.showDataFlag=true
        
      },
      saveDataConversion(){
        const codeHints = this.$refs.ecEditor.getEditorAnnotations()       
        let syntaxErrorFlag = false
        if (!!codeHints && (codeHints.length > 0)) {
          codeHints.forEach((chItem) => {
            if (chItem.type === 'error') {
              syntaxErrorFlag = true
            }
          })

          if (syntaxErrorFlag) {
            this.$message.error(this.i18nt('designer.setting.syntaxCheckWarning'))
            this.listData[this.index].settingData=''
            return
          }
        }  
        this.listData[this.index].settingData=this.setData
        this.showDataFlag = false
      },
      //增加和删除列
      addDict(index,item) {
        console.log(index,item);
        item.push({ 
            id:'edit',
            label: " ",
            permission: "resultsetManage:update",
            click: '',
            isHide:'',
            tableHide:false,
            setting:false,
            settingData:'',
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
  