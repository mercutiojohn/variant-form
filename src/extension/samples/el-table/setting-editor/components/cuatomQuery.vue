<template>
    <div>
      <el-row>
        <el-form-item  label="选择方式">
            <el-select v-model="listData.setting"   @change="fieldChange()" placeholder="请选择">
                <el-option label="vform表单" value='0'></el-option>
                <!-- <el-option label="代码生成" value='1'></el-option> -->
                <el-option label="自定义" value='2'></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="请求方式"  v-if="listData.setting=='2'">
            <el-select
              v-model="listData.apiType"
              
              placeholder="请选择"
            >
              <el-option label="get" value="get"></el-option>
              <el-option label="post" value="post"></el-option>
              <!-- <el-option label="PUT" value="PUT"></el-option>
              <el-option label="DELETE" value="DELETE"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="请求传参类型"  v-if="listData.setting=='2'&&listData.apiType=='post'">
              <el-select
                v-model="listData.parameterType"               
                placeholder="请选择"
              >
                <el-option label="params" value="params"></el-option>
                <el-option label="data" value="data"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="请求路径"  v-if="listData.setting=='1'||listData.setting=='2'">
            <el-input 
            placeholder="请输入请求路径..."
            v-model="listData.apiUrl"
            class="input-with-select"
          >
            </el-input>
        </el-form-item> 
        <el-form-item  label="路径参数"  v-if="listData.setting=='2'">
            <el-button type="info" icon="el-icon-edit" plain round @click="editData(1)">
                编辑路径参数</el-button>
        </el-form-item>         
        <el-form-item  label="请求体"  v-if="listData.setting=='1'||listData.setting=='2'">
            <el-button type="info" icon="el-icon-edit" plain round @click="editData(2)">
                编辑请求体</el-button>
        </el-form-item>   
        <el-form-item  label="查询数据转换"  v-if="listData.setting=='1'||listData.setting=='2'">
            <el-button type="info" icon="el-icon-edit" plain round @click="editData(3)">
                编辑请求体</el-button>
        </el-form-item>       
      </el-row>
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
      <el-dialog title="url参数" :visible.sync="showDialogFlag"
        v-if="showDialogFlag" :show-close="true" class="small-padding-dialog" append-to-body v-dialog-drag
        :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <!-- <el-alert type="info" :closable="false" :title="eventHeader"></el-alert> -->
        <code-editor :mode="'javascript'" :readonly="false" v-model="listData.urlData" ref="ecEditor"></code-editor>
        <!-- <el-alert type="info" :closable="false" title="}"></el-alert> -->
        <div slot="footer" class="dialog-footer">
        <el-button @click="showDialogFlag = false">
        取消</el-button>
        <el-button type="primary" @click="saveEventHandlerUrl">
        确定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="请求体" :visible.sync="showWidgetEventDialogFlag"
              v-if="showWidgetEventDialogFlag" :show-close="true" class="small-padding-dialog" append-to-body v-dialog-drag
              :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <!-- <el-alert type="info" :closable="false" :title="eventHeader"></el-alert> -->
        <code-editor :mode="'javascript'" :readonly="false" v-model="listData.apiData" ref="ecEditor"></code-editor>
        <!-- <el-alert type="info" :closable="false" title="}"></el-alert> -->
        <div slot="footer" class="dialog-footer">
        <el-button @click="showWidgetEventDialogFlag = false">
        取消</el-button>
        <el-button type="primary" @click="saveEventHandler">
        确定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="数据转换" :visible.sync="showDataConversionFlag"
      v-if="showDataConversionFlag" :show-close="true" class="small-padding-dialog" append-to-body v-dialog-drag
        :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <!-- <el-alert type="info" :closable="false" :title="eventHeader"></el-alert> -->
        <code-editor :mode="'javascript'" :readonly="false" v-model="listData.dataConversion" ref="ecEditor"></code-editor>
        <!-- <el-alert type="info" :closable="false" title="}"></el-alert> -->
        <div slot="footer" class="dialog-footer">
        <el-button @click="showDataConversionFlag = false">
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
  import {getAllFieldWidgets} from "@/utils/util"
  import sortable from '@/utils/Sortable.js'
  import Vue from 'vue'
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
    props: {
      list: {
        type: [Object]
      },
      formId:{

      }
    },
    data () {
      return {
        listData: {},
        num: 1,
        lodding:false,
        showWidgetEventDialogFlag:false,
        eventHandlerCode:'',
        showDialogFlag:false,
        showDataConversionFlag:false,
      }
    },
    methods: {
      getFieldWidgets(widgetList = null) {
        return !!widgetList ? getAllFieldWidgets(widgetList) : getAllFieldWidgets(this.formJson.widgetList)
      },
      // 保存份号编辑
      toSave () {
          this.$emit('close', this.listData)
      },
      editData(data){
        if(data==1){
          this.showDialogFlag=true
        }else if(data==2){
          this.showWidgetEventDialogFlag=true
        }else if(data==3){
          this.showDataConversionFlag=true
        }
        
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
            this.listData.dataConversion=''
            return
          }
        }  
        this.showDataConversionFlag = false
      },
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
            this.listData.apiData=''
            return
          }
        }  
        this.showWidgetEventDialogFlag = false
      },
      saveEventHandlerUrl() {
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
            this.listData.urlData=''
            return
          }
        }  
        this.showDialogFlag = false
      },
      fieldChange(){

      }
       
    },
    // 页面初始化调用方法
    mounted: function () {
      this.listData = JSON.parse(JSON.stringify(this.list))
      console.log(this.listData);
      
    },
    watch: {
    }
  }
  
  </script>
  