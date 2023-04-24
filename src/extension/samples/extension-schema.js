// 容器组件

export const cardSchema = {
  type: 'card',
  category: 'container',
  icon: 'card',
  widgetList: [],
  options: {
    name: '',
    label: 'card',
    hidden: false,
    folded: false,
    showFold: true,
    cardWidth: '100%',
    shadow: 'never',
    customClass: '',
  }
}

// export const subFormSchema = {
//   type: 'sub-form',
//   icon: 'sub-form',
//   category: 'container',
//   widgetList: [],
//   options: {
//     name: '',
//     label: '子表单',
//     hidden: false,
//     folded: false,
//     showFold: true,
//     cardWidth: '100%',
//     shadow: 'never',
//     customClass: '',
//   }
// }

/* ref */
export const subFormSchema = {
  type: 'sub-form',
  icon: 'sub-form',
  category: 'container',
  widgetList: [],
  options: {
    name: "",
    showBlankRow: !0,
    showRowNumber: !0,
    labelAlign: "label-center-align",
    hidden: !1,
    disabled: !1,
    actionColumnPosition: "left",
    customClass: "",
    onSubFormRowAdd: "",
    onSubFormRowInsert: "",
    onSubFormRowDelete: "",
    onSubFormRowChange: ""
  }
}

// 原子组件

export const alertSchema = {
  type: 'alert',
  icon: 'alert',
  formItemFlag: false,
  options: {
    name: '',
    title: 'Good things are coming...',
    type: 'info',
    description: '',
    closable: true,
    closeText: '',
    center: true,
    showIcon: false,
    effect: 'light',
    hidden: false,
    onClose: '',
    customClass: '',
  }
}

export const userChooseSchema = {
  type: 'user-choose', // 字段组件的类型名称，必须唯一，不能跟已有组件重复
  icon: 'user-choose', // 容器图标名称，可以去iconfont.cn下载所需的svg文件，放入src/icons/svg目录即可（自动加载）
  formItemFlag: true, // 是否嵌套于el-form-item组件内
  options: { // 组件属性对象，每一个属性值对应一个属性编辑器
    name: '',
    testName: '',
    label: '',
    labelAlign: '',
    type: 'text',
    defaultValue: '',
    placeholder: '',
    columnWidth: '200px',
    size: '',
    labelWidth: null,
    labelHidden: false,
    disabled: false,
    hidden: false,
    showPassword: false,
    required: false,
    requiredHint: '',
    validation: '',
    validationHint: '',
    //-------------------
    customClass: '',  //自定义css类名
    labelIconClass: null,
    labelIconPosition: 'rear',
    labelTooltip: null,
    prefixIcon: '',
    suffixIcon: '',
    appendButton: false,
    appendButtonDisabled: false,
    buttonIcon: 'el-icon-search',
    //-------------------
    onCreated: '',
    onMounted: '',
    onInput: '',
    onChange: '',
    onFocus: '',
    onBlur: '',
    onValidate: '',
    onAppendButtonClick: '',
  }
}

export const tableSchema = { 
  formItemFlag: true, 
    type: 'el-table',
    category: 'container',
    icon: 'table',
    options: {
      name: '',
      hidden: false,
      customClass: '',  //自定义css类名
      onCreated: '',
      onMounted: '',
      tableEdit:[],
      crudOption: {
        // 使用菜单做为页面标题
        dialogFlag:false,
        queryFormFieldsFlag:false,
        title: "数据集",
        labelWidth: "120px",
        queryFormFields: [
          {
            inputType: "input",
            label: "数据集编码333",
            field: "setCode"
          },
          {
            inputType: "input",
            label: "数据集名称",
            field: "setName"
          },
        ],
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
            disabled: false,
            contentAlign:'center',
            headerAlign:'left',
            sortable:true,
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
            disabled: false,
            contentAlign:'center',
            headerAlign:'left',
            sortable:true,
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
            disabled: false,
            contentAlign:'center',
            headerAlign:'left',
            sortable:true,
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
            disabled: false,
            contentAlign:'center',
            headerAlign:'left',
            sortable:true,
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
            disabled: false,
            contentAlign:'center',
            headerAlign:'left',
            sortable:true,
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
            disabled: false,
            contentAlign:'center',
            headerAlign:'left',
            sortable:true,
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
            contentAlign:'center',
            headerAlign:'left',
            sortable:true,
          }
        ],
        //表格列按钮
        rowButtons: [
          {
            label: "编辑",
            permission: "resultsetManage:update",
            click: row => {
              return 'handleOpenEditView("edit")'
              // return this.operateDataset("edit", row);
            },
            tableHide:false
          },
          // {
          //   label: "数据预览",
          //   permission: "resultsetManage:query",
          //   click: this.dataView
          // },
          {
            label: "删除",
            permission: "resultsetManage:delete",
            click: row => {
              return this.$refs.listPage.handleDeleteBatch(row);
            },
            tableHide:false
          }
        ],
         // 表头按钮
         tableButtons: [
          {
            id:'delete',
            label: "删除",
            type: "danger",
            permission: "resultsetManage:delete",
            icon: "el-icon-delete",
            plain: false,
            tableHide:false
            // click: () => {
            //   return this.$refs.listPage.handleDeleteBatch();
            // }
          },
          {
            id:'add',
            label: "新增",
            type: "primary",
            permission: "resultsetManage:add",
            icon: "el-icon-add",
            plain: false,
            tableHide:false
            // click: () => {
            //   return this.$refs.listPage.handleOpenEditView("add");
            // }
          },
        ],
        itemId:'3',
        // 操作按钮
        buttons: {
          rowButtonsWidth: 180, // row自定义按钮表格宽度
          query: {
            api: "reportDataSetList",
            permission: "resultsetManage:query",
            sort: "update_time",
            order: "DESC"
          },
          queryByPrimarykey: {
            api: "reportDataSetDetail",
            permission: "resultsetManage:detail"
          },
          add: {
            api: "reportDataSetAdd",
            permission: "resultsetManage:insert",
            isShow: false
          },
          delete: {
            api: "reportDataSetDeleteBatch",
            permission: "resultsetManage:delete"
          },
          edit: {
            api: "reportDataSetUpdate",
            permission: "resultsetManage:update",
            isShow: false
          }
        },
      },
      formId:'SWP00000000000000276',
      tableButtonEdit:[],
    },

  
}