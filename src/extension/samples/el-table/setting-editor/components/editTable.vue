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
        <TableColumn  prop="label" header-align="center" align="left" min-width="120" label="字段名称" >
            <template slot-scope="scope" >
                <el-input  v-model="scope.row.label" ></el-input>
            </template>
        </TableColumn>
        <TableColumn  prop="inputType" header-align="center" align="left" min-width="180" label="类型" >
            <template slot-scope="scope">
              <div style="display: flex; gap:5px; align-items:center">
                <el-select v-model="scope.row.inputType" placeholder="请选择">
                  <el-option
                    v-for="dict in inputType"
                    :key="dict"
                    :label="dict.label"
                    :value="dict.value"
                 ></el-option>
                </el-select>
                <el-button
                  type="info"
                  icon="el-icon-edit"
                  plain
                  size="mini"
                  @click="editCustomCodeData(scope.row.customCode,scope.$index)"
                  v-if="scope.row.inputType == 'custom'"
                >
                </el-button>
              </div>
            </template>
        </TableColumn>
        <TableColumn  prop="field" header-align="center" align="left" min-width="120" label="字段" >
            <template slot-scope="scope"  >
                <el-input  v-model="scope.row.field" ></el-input>
            </template>
        </TableColumn>
        <TableColumn  prop="headerAlign" header-align="center" align="left" min-width="160" label="表头对齐方式" >
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
        <TableColumn  prop="tableHide" header-align="center" align="left" min-width="160" label="是否在列表中显示" >
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
        <Button  size="medium" type="primary" @click="getLatestData">
          更新字段
        </Button>
        <el-button  size="medium" type="primary" @click="editData">
          自定义css样式</el-button>
      </div>
      <el-dialog title="自定义样式" :visible.sync="showWidgetEventDialogFlag"
              v-if="showWidgetEventDialogFlag" :show-close="true" class="small-padding-dialog" append-to-body v-dialog-drag
              :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <!-- <el-alert type="info" :closable="false" :title="eventHeader"></el-alert> -->
        <code-editor :mode="'javascript'" :readonly="false" v-model="cssData" ref="ecEditor"></code-editor>
        <!-- <el-alert type="info" :closable="false" title="}"></el-alert> -->
        <div slot="footer" class="dialog-footer">
          <el-button @click="showWidgetEventDialogFlag = false">
          取消</el-button>
          <el-button type="primary" @click="saveEventHandler">
          确定</el-button>
        </div>
      </el-dialog>
      <el-dialog 
        title="自定义回显" 
        :visible.sync="showTableCustomCodeFlag"
        v-if="showTableCustomCodeFlag"
        :show-close="true"
        class="small-padding-dialog"
        append-to-body
        v-dialog-drag
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :destroy-on-close="true"
      >
        <el-divider content-position="left">可使用<code>data</code>, <code>scope</code>, <code>item</code>属性</el-divider>
        <el-alert type="info" :closable="false" title="<template>"></el-alert>
        <code-editor :mode="'html'" :readonly="false" v-model="customCodeEditing.template" ref="customCodeEditor"></code-editor>
        <el-alert type="info" :closable="false" title="</template>"></el-alert>
        <el-divider></el-divider>
        <el-alert type="info" :closable="false" title="methods:"></el-alert>
        <code-editor :mode="'javascript'" :readonly="false" v-model="customCodeEditing.methods" ref="customMethodsEditor"></code-editor>
        <el-alert type="info" :closable="false" title=""></el-alert>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showTableCustomCodeFlag = false">
          取消</el-button>
          <el-button type="primary" @click="saveCustomCode">
          确定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  <script>
  import CodeEditor from '@/components/code-editor/index'
  import { Button, Table, TableColumn,Input } from 'element-ui'
  import {getAllFieldWidgets} from "@/utils/util"
  import sortable from './Sortable.js'
  import Vue from 'vue'
  import common from '../../anji/anji-crud/mixins/common'
  export default {
    name: 'edit-table',
    inject: ['setFunction'],
    components: {
      Table,
      TableColumn,
      Button,
      ELInput: Input,
      CodeEditor
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
        lodding:false,
        inputType:[
          {
            value: 'input',
            label: '单行文本'
          },
          {
            value: 'user-choose',
            label: '人员选择'
          },
          {
            value: 'group-choose',
            label: '组织选择'
          },
          {
            value: 'textarea',
            label: '多行文本'
          },
          {
            value: 'number',
            label: '数字'
          },
          {
            value: 'select',
            label: '下拉选择'
          },
          {
            value: 'radio',
            label: '单选'
          },
          {
            value: 'checkbox',
            label: '复选框'
          },
          {
            value: 'switch',
            label: '开关'
          },
          {
            value: 'time',
            label: '时间'
          },
          {
            value: 'time-range',
            label: '时间范围'
          },
          {
            value: 'date',
            label: '日期'
          },
          {
            value: 'date-range',
            label: '日期范围'
          },
          {
            value: 'custom',
            label: '自定义'
          }
        ],
        showWidgetEventDialogFlag:false,
        cssData:'',
        showTableCustomCodeFlag: false,
        customCodeEditing: '',
        customCodeIndex: -1
      }
    },
    methods: {
      saveEventHandler() {
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
            this.cssData=''
            return
          }
        }  
        this.showWidgetEventDialogFlag = false
      },
      saveCustomCode() {
        /* const codeHints = this.$refs.ecEditor.getEditorAnnotations()       
        let syntaxErrorFlag = false
        if (!!codeHints && (codeHints.length > 0)) {
          codeHints.forEach((chItem) => {
            if (chItem.type === 'error') {
              syntaxErrorFlag = true
            }
          })

          if (syntaxErrorFlag) {
            this.$message.error(this.i18nt('designer.setting.syntaxCheckWarning'))
            this.cssData=''
            return
          }
        }  */
        /* this.listData[this.customCodeIndex].customCode = {
          template: this.deepClone(this.customCodeEditing.template),
          methods: JSON.parse(this.customCodeEditing.template)
        } */
        this.listData[this.customCodeIndex].customCode = this.deepClone(this.customCodeEditing)
        this.showTableCustomCodeFlag = false
        this.customCodeEditing = ''
        this.customCodeIndex = -1
      },
      editCustomCodeData(data, index) {
        this.customCodeEditing = data ? this.deepClone(data) : {
          template: "<div>\n  {{ getData(data, scope) }}\n</div>",
          methods: "{\n  getData(data, scope){\n    return scope.$index + ' - ' + data;\n  }\n}\n        "
        }
        this.customCodeIndex = index
        this.showTableCustomCodeFlag = true
      },
      editData(data){
        this.showWidgetEventDialogFlag=true        
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
                // disabled: item.field.options.,
                contentAlign:'center',
                headerAlign:'left',
                sortable:false,
                optionItems:item.field.options.optionItems,
                customCode: {
                  template: '',
                  methods: {}
                }
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
          customCode: ""
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
          this.$emit('close', this.listData,this.cssData)
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
      this.cssData=this.deepClone(this.columnsCss)
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
  