<!--
/**
 * author: vformAdmin
 * email: vdpadmin@163.com
 * website: https://www.vform666.com
 * date: 2021.08.18
 * remark: 如果要分发VForm源码，需在本文件顶部保留此文件头信息！！
 */
-->

<template>
    <container-item-wrapper :widget="widget">

    <div :key="widget.id" class="table-container"
    v-show="!widget.options.hidden">
         <anji-crud ref="listPage" :option="crudOption" :formId="formId">
          </anji-crud>
    </div>

  </container-item-wrapper>
</template>

<script>
  import {
  reportDataSetList,
  reportDataSetAdd,
  reportDataSetDeleteBatch,
  reportDataSetUpdate,
  reportDataSetDetail
} from "./api/index.js";
  import i18n from "@/utils/i18n"
  import containerMixin from "@/components/form-designer/form-widget/container-widget/containerMixin"
  import ContainerWrapper from "@/components/form-designer/form-widget/container-widget/container-wrapper"
  import TableCellWidget from "@/components/form-designer/form-widget/container-widget/table-cell-widget"
  import refMixinDesign from "@/components/form-designer/refMixinDesign"
  import anjiCrud from './anji/anji-crud/anji-crud'
  import fieldMixin from "@/components/form-designer/form-widget/field-widget/fieldMixin";
  import common from './anji/anji-crud/mixins/common'
  export default {
    name: "el-table-item",
    componentName: 'ContainerWidget',
    mixins: [i18n, containerMixin, refMixinDesign,fieldMixin,common],
    inject: ['refList'],
    components: {
      ContainerWrapper,
      TableCellWidget,
      anjiCrud
    },
    props: {
      // field: Object,
      widget: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,
      designer: Object,
    },
    data() {
      return {
        dialogVisibleSetDataSet: false,
        dataSet: {},
        dialogCaseResult: false,
        crudOption: {
          //自定义表格列css样式
          columnsCss:'',
          // 使用菜单做为页面标题
          //是否使用内部弹窗（不要修改）
          dialogFlag:false,
          //查询条件控制（不包括查询重置按钮）
          queryFormFieldsFlag:true,
          //查询条件显隐
          queryFormHide:true,
          title: "数据集",
          // 详情页中输入框左边文字宽度
          labelWidth: "120px",
          // 查询表单条件
          queryFormFields: [
          {
              inputType: "",
              label: "",
              field: ""
            },
            // {
            //   inputType: "anji-select", //form表单类型 input|input-number|anji-select(传递url或者dictCode)|anji-tree(左侧树)|date|datetime|datetimerange
            //   anjiSelectOption: {
            //     url: "/dataSource/queryAllDataSource",
            //     label: "sourceName",
            //     option: "sourceCode",
            //     mergeLabel: true
            //   },
            //   label: "数据源",
            //   field: "sourceCode"
            // },
            // {
            //   inputType: "anji-select", //form表单类型 input|input-number|anji-select(传递url或者dictCode)|anji-tree(左侧树)|date|datetime|datetimerange
            //   anjiSelectOption: {
            //     dictCode: "",
            //     option:[  
            //       {name:'sql',code:'sql'},
            //       {name:'http',code:'http'}
            //     ],
            //   },
            //   label: "数据集类型",
            //   field: "setType"
            // }
          ],
          // 表头按钮
          tableButtons: [
            {
              label: "删除",
              type: "danger",
              permission: "resultsetManage:delete",
              icon: "el-icon-delete",
              plain: false,
              id:'delete',
              setting:false,
              settingData:'',
              click: (row,item) => {
                return this.$refs.listPage.handleDeleteBatch(row,item);
              }
            },
            {
              label: "新增",
              type: "primary",
              permission: "resultsetManage:add",
              icon: "el-icon-plus",
              plain: false,
              setting:false,
              settingData:'',
              id:'add',
              click: (row,item) => {
                return this.$refs.listPage.handleOpenEditView("add",row,item);
              }
            },
          ],
          // 表格行按钮
          rowButtons: [
            {
              id:'edit',
              label: "编辑",
              permission: "resultsetManage:update",
              setting:false,
              settingData:'',
              click: (row,item) => {
                return this.$refs.listPage.handleOpenEditView("edit",row,item);
              }
            },
            // {
            //   label: "数据预览",
            //   permission: "resultsetManage:query",
            //   click: this.dataView
            // },
            {
              id:'delete',
              label: "删除",
              permission: "resultsetManage:delete",
              setting:false,
              settingData:'',
              click: (row,item) => {
                return this.$refs.listPage.handleDeleteBatch(row,item);
              }
            }
          ],
          // 操作按钮
          buttons: {
            rowButtonsWidth: 180, // row自定义按钮表格宽度
            query: {
              api: reportDataSetList,
              permission: "resultsetManage:query",
              sort: "update_time",
              order: "DESC"
            },
            queryByPrimarykey: {
              api: reportDataSetDetail,
              permission: "resultsetManage:detail"
            },
            add: {
              api: reportDataSetAdd,
              permission: "resultsetManage:insert",
              isShow: false
            },
            delete: {
              api: reportDataSetDeleteBatch,
              permission: "resultsetManage:delete"
            },
            edit: {
              api: reportDataSetUpdate,
              permission: "resultsetManage:update",
              isShow: false
            }
          },
          // 表格列
          columns: [
            {
              label: "",
              field: "id",
              primaryKey: true, // 根据主键查询详情或者根据主键删除时, 主键的
              tableHide: true, // 表格中不显示
              editHide: true // 编辑弹框中不显示
            },
            {
              label: "数据集编码", //数据集编码
              placeholder: "",
              field: "setCode",
              editField: "setCode",
              inputType: "input",
              rules: [
                { min: 1, max: 50, message: "不超过50个字符", trigger: "blur" }
              ],
              disabled: false
            },
            {
              label: "数据集名称", //数据集名称
              placeholder: "",
              field: "setName",
              editField: "setName",
              inputType: "input",
              rules: [
                { min: 1, max: 100, message: "不超过100个字符", trigger: "blur" }
              ],
              disabled: false
            },
            {
              label: "描述", //数据集描述
              placeholder: "",
              field: "setDesc",
              editField: "setDesc",
              inputType: "input",
              rules: [
                { min: 1, max: 255, message: "不超过255个字符", trigger: "blur" }
              ],
              disabled: false
            },
            {
              label: "数据源编码", //数据源编码
              placeholder: "",
              field: "sourceCode",
              editField: "sourceCode",
              inputType: "input",
              rules: [
                { min: 1, max: 50, message: "不超过50个字符", trigger: "blur" }
              ],
              disabled: false
            },
            {
              label: "数据集类型", //数据源编码
              placeholder: "",
              field: "setType",
              editField: "setType",
              inputType: "input",
              rules: [
                { min: 1, max: 50, message: "不超过50个字符", trigger: "blur" }
              ],
              disabled: false
            },
            {
              label: "动态查询sql或者接口中的请求体", //动态查询sql或者接口中的请求体
              placeholder: "",
              field: "dynSentence",
              editField: "dynSentence",
              tableHide: true,
              inputType: "input",
              rules: [
                {
                  min: 1,
                  max: 2048,
                  message: "不超过2048个字符",
                  trigger: "blur"
                }
              ],
              disabled: false
            },
            {
              label: "结果案例", //结果案例
              placeholder: "",
              field: "caseResult",
              tableHide: true,
              editField: "caseResult",
              inputType: "input",
              rules: [
                {
                  min: 1,
                  max: 65535,
                  message: "不超过65535个字符",
                  trigger: "blur"
                }
              ],
              disabled: false
            },
            {
              label: "状态", //0--已禁用 1--已启用  DIC_NAME=ENABLE_FLAG
              placeholder: "",
              field: "enableFlag",
              fieldTableRowRenderer: row => {
                if( row["enableFlag"]=='0'){
                  return  '已禁用'
                }else{
                  return '已启用'
                }
              },
              colorStyle: {
                0: "table-danger", //key为editField渲染的值（字典的提交值）'红色': 'danger','蓝色': 'primary','绿色': 'success','黄色': 'warning','灰色': 'info','白色'：''
                1: "table-success"
              },
              editField: "enableFlag",
              inputType: "input",
              rules: [],
              disabled: false
            },
            {
              label: "删除标记", //0--未删除 1--已删除 DIC_NAME=DELETE_FLAG
              placeholder: "",
              field: "deleteFlag",
              editField: "deleteFlag",
              tableHide: true,
              inputType: "input",
              rules: [],
              disabled: false
            }
          ]
        }
      };
    },
    computed: {
      // selected() {
      //   return this.widget.id === this.designer.selectedId
      // },

      // customClass() {
      //   return this.widget.options.customClass || ''
      // },
      // newCrudOption(){
      //   let crudOption={}
      //   crudOption=this.deepClone(this.crudOption)
      //   crudOption.queryFormFields=this.widget.options.crudOption.queryFormFields
      //   crudOption.columns=this.widget.options.crudOption.columns
      //   crudOption.itemId=this.widget.options.crudOption.itemId         
      //   let tableButtons=this.getData(crudOption.tableButtons,this.widget.options.crudOption.tableButtons)
      //   crudOption.tableButtons=tableButtons
      //   let rowButtons=this.getData(crudOption.rowButtons,this.widget.options.crudOption.rowButtons)
      //   crudOption.rowButtons=rowButtons
      //   console.log(this.crudOption);
      //   return this.crudOption
      // },
      formId(){
        
        return  this.widget.options.formId
      }
    },
    watch: {
      //
    },
    created() {
      let crudOption={}
      crudOption=this.deepClone(this.crudOption)
      this.crudOption.cuatomQuery=this.widget.options.cuatomQuery
      this.crudOption.queryFormFields=this.widget.options.crudOption.queryFormFields
      this.crudOption.columns=this.widget.options.crudOption.columns
      this.crudOption.itemId=this.widget.options.crudOption.itemId         
      let tableButtons=this.getData(crudOption.tableButtons,this.widget.options.crudOption.tableButtons)
      this.crudOption.tableButtons=tableButtons
      let rowButtons=this.getData(crudOption.rowButtons,this.widget.options.crudOption.rowButtons)
      this.crudOption.rowButtons=rowButtons
      this.crudOption.pageQueryDataFlag=this.widget.options.pageQueryDataFlag
      this.crudOption.queryFormFieldsFlag=this.widget.options.queryFormFieldsFlag
      this.crudOption.queryFormHide=this.widget.options.queryFormHide
      this.crudOption.columnsCss=this.widget.options.crudOption.columnsCss
      console.log(crudOption);
      this.field=this.widget
      // this.initFieldModel()
      // this.registerToRefList()
      // this.initEventHandler()
      // this.initRefList()
      this.handleOnCreated()
    },
    mounted() {
      this.handleOnMounted()
      //
    },
    methods: {
      getData(defaultData,queryData){
        // console.log('2342',defaultData,queryData);
        
        let defaultDataId=[]
        let finallyData=[]
        defaultData.forEach((item)=>{
          defaultDataId[item.id]=item
        })
        queryData.forEach((item)=>{
          (defaultDataId[item.id])&&(item.click= defaultDataId[item.id].click)
          //是否隐藏
          if(!item.tableHide){
            finallyData.push(item)
          }
        })
        // console.log(this.crudOption.tableButtons);
        
        // console.log(finallyData);
        return finallyData
      }

    }
  }
</script>

<style lang="scss" scoped>
   div.table-container {
    table.table-layout {
      width: 100%;
      table-layout: fixed;
      border-collapse: collapse;
    }
  }

</style>
