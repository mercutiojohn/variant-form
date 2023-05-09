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
  <container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList"
                     :index-of-parent-list="indexOfParentList">

    <div :key="widget.id" class="table-container"
         :class="[selected ? 'selected' : '', customClass]" @click.stop="selectWidget(widget)">
         <anji-crud ref="listPage"  :option="newCrudOption" :formId="formId">
          </anji-crud>
    </div>

  </container-wrapper>
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
  // import emitter from '@/utils/emitter'
  import containerMixin from "@/components/form-designer/form-widget/container-widget/containerMixin"
  import ContainerWrapper from "@/components/form-designer/form-widget/container-widget/container-wrapper"
  import TableCellWidget from "@/components/form-designer/form-widget/container-widget/table-cell-widget"
  import refMixinDesign from "@/components/form-designer/refMixinDesign"
  import anjiCrud from './anji/anji-crud/anji-crud'
  import fieldMixin from "@/components/form-designer/form-widget/field-widget/fieldMixin";
  import common from './anji/anji-crud/mixins/common'
  import {getAllFieldWidgets} from "@/utils/util"
  export default {
    name: "el-table-widget",
    componentName: 'ContainerWidget',
    mixins: [i18n, containerMixin, refMixinDesign,fieldMixin,common],
    inject: ['refList','setFunction'],
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
      designState: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        flag:false,
        dialogVisibleSetDataSet: false,
        dataSet: {},
        dialogCaseResult: false,
        // queryParams: {
        //   pageId: null,
        //   title: null,
        //   status: null,
        //   pageType: "form",
        //   genTableName: null,
        //   genTableStatus: null,
        //   bindPageId: null,
        //   asTemplate: null,
        //   createTime: null,
        //   updateTime: null,
        // },
        // //分页参数
        // pageQueryData:{
        //   currentPage: 1,
        //   pageSize: 1000,
        //   total: 0,
        // },
        crudOption: {
          //是否使用内部弹窗（不要修改）
          dialogFlag:false,
          //查询条件控制（不包括查询重置按钮）
          queryFormFieldsFlag:true,
          //查询条件显隐
          queryFormHide:true,
          // 使用菜单做为页面标题
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
              id:'delete',
              permission: "resultsetManage:delete",
              icon: "el-icon-delete",
              plain: false,
              click: () => {
                return this.$refs.listPage.handleDeleteBatch();
              }
            },
            {
              label: "新增",
              type: "primary",
              id:'add',
              permission: "resultsetManage:add",
              icon: "el-icon-plus",
              plain: false,
              click: () => {
                return this.$refs.listPage.handleOpenEditView("add");
              }
            },
            
          ],
          // 表格行按钮
          rowButtons: [
            {
              id:'edit',
              label: "编辑",
              permission: "resultsetManage:update",
              click: row => {
                return this.$refs.listPage.handleOpenEditView("edit",row);
                // return this.operateDataset("edit", row);
              },
              isHide:'',
              tableHide:false
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
              click: row => {
                return this.$refs.listPage.handleDeleteBatch(row);
              },
              isHide:'',
              tableHide:false
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
              disabled: false,
            }
          ]
        }
      }
    },
    computed: {
      selected() {
        return this.widget.id === this.designer.selectedId
      },

      customClass() {
        return this.widget.options.customClass || ''
      },
      newCrudOption(){
        // this.crudOption=this.widget.options.crudOption
        let crudOption={

        }
        //传入增删改查组件的属性
        crudOption=this.deepClone(this.crudOption)
        crudOption.queryFormFields=this.widget.options.crudOption.queryFormFields
        crudOption.columns=this.widget.options.crudOption.columns
        crudOption.itemId=this.widget.options.crudOption.itemId   
        // crudOption.formList=this.widget.options.crudOption.formList      
        let tableButtons=this.getData(crudOption.tableButtons,this.widget.options.crudOption.tableButtons)
        crudOption.tableButtons=tableButtons
        let rowButtons=this.getData(crudOption.rowButtons,this.widget.options.crudOption.rowButtons)
        crudOption.rowButtons=rowButtons
        console.log(crudOption);
        // let formId=this.formId
        return  crudOption
      },
      formId(){
        let formId=this.widget.options.formId
        if(this.flag&&!!formId){
          this.getLatestData(formId)
        }else{
          this.flag=true
        }    
        return  formId
      }
    },
    watch: {
      //
    },
    created() {

      // this.crudOption.queryFormFields=this.widget.options.crudOption.queryFormFields
      // this.crudOption.columns=this.widget.options.crudOption.columns
      // let tableButtons=this.getData(this.crudOption.tableButtons,this.widget.options.crudOption.tableButtons)
      // this.crudOption.tableButtons=tableButtons
      // this.formId=this.widget.options.formId
      this.field=this.widget
      // this.widget.options.crudOption.formList=this.setFunction.listVformPages
      this.handleOnCreated()
    },
    mounted() {
      this.handleOnMounted()
    },
    methods: {
      // listVformPages(){
      //   this.setFunction.listVformPages({...this.queryParams,pageQueryData:this.pageQueryData}).then(response => {
      //     // console.log(response.data.rows);
      //     let list=[]
      //     response.data.rows.forEach((item)=>{
      //       let data={
      //         id:item.id,
      //         label:item.title,
      //         value:item.pageId
      //       }
      //       list.push(data)
      //     })
      //     this.widget.options.crudOption.formList=list
      //     // console.log(this.list,'1111111111');
      //   });
      // },
      async getLatestData(formId){

        const {data} = await this.setFunction.getVformPagesByPageId(formId);
        const pageJsonObj=  JSON.parse(data.pageJson)       
        try {
          let widgetList=pageJsonObj.widgetList
          let widgets= this.getFieldWidgets(widgetList)
          // console.log(widgets);
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
                  headerAlign:'center',
                  sortable:true,
                  option:item.field.options
                }
            newTable.push(data)        
          })
          // console.log(newTable);
          this.widget.options.crudOption.columns=newTable
          
        } catch (error) {
          this.widget.options.crudOption.columns=[]
        }
        this.$message.success("切换表单成功");
      },
      getFieldWidgets(widgetList = null) {
        return !!widgetList ? getAllFieldWidgets(widgetList) : getAllFieldWidgets(this.formJson.widgetList)
      },
      getData(defaultData,queryData){
        console.log('2342',defaultData,queryData);
        
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
    padding: 5px;
    border: 1px dashed #336699;
    box-sizing: border-box;

    table.table-layout {
      width: 100%;
      text-align: center;
      //border: 1px solid #c8ebfb;
      border-collapse: collapse;
      table-layout: fixed;

      ::v-deep td {
        height: 48px;
        border: 1px dashed #336699;
        padding: 3px;
        display: table-cell;
      }

      .form-widget-list {
        border: 1px dashed #336699;
        min-height: 36px;
      }
    }
  }

  .table-container.selected {
    outline: 2px solid $--color-primary !important;
  }

</style>
