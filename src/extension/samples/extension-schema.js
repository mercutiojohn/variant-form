// 容器组件

export const cardSchema = {
  type: 'card',
  category: 'container',
  icon: 'card',
  widgetList: [],
  options: {
    name: '',
    label: '卡片',
    hidden: false,
    folded: false,
    showFold: true,
    cardWidth: '100%',
    shadow: 'never',
    customClass: '',
  }
}

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
    actionColumnPosition: "right",
    customClass: "",
    onSubFormRowAdd: "",
    onSubFormRowInsert: "",
    onSubFormRowDelete: "",
    onSubFormRowChange: "",
    addRowText: "新增行",
    rowButtons: [
      {
        label: '新增',
        icon: 'el-icon-plus',
        action: 'add',
        customFunc: '',
        tableHide: false,
        tableHideCustom: false,
        isHide: '',
        settingData:''
      },
      {
        label: '删除',
        icon: 'el-icon-delete',
        action: 'delete',
        customFunc: '',
        tableHide: false,
        tableHideCustom: false,
        isHide: '',
        settingData: ''
      }
    ],
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
      //自定义表格列css样式
      columnsCss: "  // if(row.pageType=='form'&&item.field=='pageType'){\r\n  //         return {\r\n  //           color:'blue !important',\r\n  //           'background-color':'green',\r\n  //           padding:'5px 10px',\r\n  //         }\r\n  //       }",
      // 使用菜单做为页面标题
      //是否使用内部弹窗（不要修改）
      dialogFlag:false,
      //查询条件控制（不包括查询重置按钮）
      queryFormFieldsFlag:true,
      //查询条件显隐
      queryFormHide:true,
      title: "数据集",
      labelWidth: "120px",
      queryFormFields: [
        {
          inputType: "input",
          label: "",
          field: "",
          disabled:false
        },
      ],
      // 表格列
      columns: [
        {
          label: "",
          field: "id",
          primaryKey: true, // 根据主键查询详情或者根据主键删除时, 主键的
          tableHide: true, // 表格中不显示
          editHide: true, // 编辑弹框中不显示
          customCode: {
            template: '',
            methods: ''
          }
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
          headerAlign:'center',
          sortable:true,
          customCode: {
            template: '',
            methods: ''
          }
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
          headerAlign:'center',
          sortable:true,
          customCode: {
            template: '',
            methods: ''
          }
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
          headerAlign:'center',
          sortable:true,
          customCode: {
            template: '',
            methods: ''
          }
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
          headerAlign:'center',
          sortable:true,
          customCode: {
            template: '',
            methods: ''
          }
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
          headerAlign:'center',
          sortable:true,
          customCode: {
            template: '',
            methods: ''
          }
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
          headerAlign:'center',
          sortable:true,
          customCode: {
            template: '',
            methods: ''
          }
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
          headerAlign:'center',
          sortable:true,
          customCode: {
            template: '',
            methods: ''
          }
        }
      ],
      //表格列按钮
      rowButtons: [
        {
          id:'edit',
          label: "编辑",
          permission: "resultsetManage:update",
          click: row => {
            return 'handleOpenEditView("edit")'
            // return this.operateDataset("edit", row);
          },
          isHide:'',
          tableHide:false,
          setting:false,
          settingData:'',
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
          tableHide:false,
          setting:false,
          settingData:'',
        }
      ],
       // 表头按钮
       tableButtons: [
        {
          id:'add',
          label: "新增",
          type: "primary",
          permission: "resultsetManage:add",
          icon: "el-icon-plus",
          plain: false,
          tableHide:false,
          size:'medium',
          setting:false,
          settingData:'',
          // click: () => {
          //   return this.$refs.listPage.handleOpenEditView("add");
          // }
        },
        {
          id:'delete',
          label: "删除",
          type: "danger",
          permission: "resultsetManage:delete",
          icon: "el-icon-delete",
          plain: false,
          tableHide:false,
          size:'medium',
          setting:false,
          settingData:'',
          // click: () => {
          //   return this.$refs.listPage.handleDeleteBatch();
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
    formId:'',
    tableButtonEdit:[],
    rowButtonEdit:[],
    queryFormFields:[],
    cuatomQuery:{
      apiUrl:'',
      apiType:'',
      apiData:'',
      setting:'0',
      urlData:'',
      parameterType:'',
      dataConversion:'',
    },
    pageQueryDataFlag:true,
    //查询条件控制（不包括查询重置按钮）
    queryFormFieldsFlag:true,
    //查询条件显隐
    queryFormHide:true,
  },


}

export const flexBoxSchema = {
  type: 'flex-box',
  category: 'container',
  icon: 'card',
  widgetList: [],
  options: {
    name: '',
    label: '弹性容器',
    hidden: false,
    customClass: '',
    basic: {
      width: null,
      widthMeasure:'',
      height: null,
      heightMeasure: '',
      // margin: 10,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      // marginMeasure: 'px',
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
      },
      // paddingMeasure: 'px',
      radius: {
        topLeft: 0,
        topRight: 0,
        bottomRight: 0,
        bottomLeft: 0
      },
      backgroundType: 'none',
      backgroundColor: '',
      gradient: ''
    },
    flex: {
      flexDirection: "row",
      flexWrap: "nowrap",
      justifyContent: "center",
      alignItems: "center",
      gap: 10
    },
    boxBorder: {
      width: 2,
      style: "dashed",
      color: "rgba(0, 0, 0, 0.12)",
      visible: {
        top: true,
        right: true,
        bottom: true,
        left: true
      }
    },
    shadow: {
      isInset: false,
      offsetX: 0,
      offsetY: 0,
      blur: 0,
      expand: 0,
      color: "#00000023"
    }
  }
}

// 原子组件

export const alertSchema = {
  type: 'alert',
  icon: 'alert',
  formItemFlag: false,
  options: {
    name: '',
    title: '提示内容示例',
    type: 'success',
    description: '',
    closable: true,
    closeText: '',
    center: false,
    showIcon: false,
    effect: 'light',
    hidden: false,
    onClose: '',
    customClass: '',
  }
}

export const submitButtonSchema = {
  type: 'submit-button',
  icon: 'button',
  formItemFlag: false,
  options: {
    name: '',
    label: '提交',
    columnWidth: '',
    size: '',
    displayStyle: 'block',
    disabled: false,
    hidden: false,
    type: '',
    plain: false,
    round: false,
    circle: false,
    icon: null,
    useCustomApi: false,
    customApiStatus: '',
    customApiForm: {
      uri: '',
      method: 'post',
      methodAutoDetect: false,
      methodAutoDetectCondition: '',
      data: '',
      dataUseCondition: false,
      dataCondition: '',
      params: [],
      dataHandlerCode: '',
    },
    //-------------------
    customClass: '',  //自定义css类名
    //-------------------
    onCreated: '',
    onMounted: '',
    onClick: '',
  }
}

export const userChooseSchema = {
  type: 'user-choose', // 字段组件的类型名称，必须唯一，不能跟已有组件重复
  icon: 'user-choose', // 容器图标名称，可以去iconfont.cn下载所需的svg文件，放入src/icons/svg目录即可（自动加载）
  formItemFlag: true, // 是否嵌套于el-form-item组件内
  options: { // 组件属性对象，每一个属性值对应一个属性编辑器
    name: '',
    label: '人员选择',
    labelAlign: '',
    type: 'text',
    defaultValue: '',
    placeholder: '',
    columnWidth: '',
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

export const groupChooseSchema = {
  type: 'group-choose', // 字段组件的类型名称，必须唯一，不能跟已有组件重复
  icon: 'group-choose', // 容器图标名称，可以去iconfont.cn下载所需的svg文件，放入src/icons/svg目录即可（自动加载）
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

//柱状图
export const barChartSchema = {

  type: 'bar-chart',
  icon: 'bar-chart',
  category: 'container',
  formItemFlag: true,
  barWidth: '',
  options: {
    name: '',
    label: '柱状图',
    customClass: '',  //自定义css类名
    attribute: '',
    onCreated: '',
    onMounted: '',
    // 配置
    setup: {
      background: "",
      colorX: "#000",
      colorY: "#000",
      customColor: [
        {color: '#ff7f50'},
        {color: "#87cefa"},
        {color: "#da70d6"},
        {color: "#32cd32"},
        {color: "#6495ed"}
      ],
      distance: 5,
      fontColor: "#000",
      fontSize: 14,
      fontSizeX: 14,
      fontSizeY: 14,
      fontWeight: "normal",
      hideX: true,
      isNoTitle: true,
      isShow: true,
      isShowSplitLineX: false,
      isShowSplitLineY: false,
      isShowY: true,
      layerName: "柱状图",
      lineColorX: "#000",
      lineColorY: "#000",
      lineWidthX: 1,
      lineWidthY: 1,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 40,
      marginTop: 50,
      matchColours: "",
      maxWidth: 10,
      minHeight: 0,
      nameColorX: "#000",
      nameColorY: "#000",
      nameFontSizeX: 14,
      nameFontSizeY: 14,
      nameX: "",
      nameY: "",
      radius: 5,
      reversalX: false,
      reversalY: false,
      scale: false,
      splitLineColorX: "#000",
      splitLineColorY: "#000",
      splitLineWidthX: 1,
      splitLineWidthY: 1,
      splitNumberY: "",
      subText: "",
      subTextColor: "rgba(30, 144, 255, 1)",
      subTextFontSize: 20,
      subTextFontStyle: "normal",
      subTextFontWeight: "normal",
      textAlign: "center",
      textAngleX: 0,
      textAngleY: 0,
      textColor: "#FFD700",
      textFontSize: 20,
      textFontStyle: "normal",
      textFontWeight: "normal",
      textInterval: "",
      tipsColor: "#00FEFF",
      tipsFontSize: 16,
      titleText: "",
      verticalShow: false,
    },
    // 数据
    data: {
      dataType: "staticData",
      refreshTime: 5000,
      staticData: [
        {
          axis: "苹果",
          data: 1000
        },
        {
          axis: "三星",
          data: 2229
        },
        {
          axis: "小米",
          data: 3879
        },
        {
          axis: "oppo",
          data: 2379
        },
        {
          axis: "vivo",
          data: 4079
        },
      ]
    },
    // 坐标
    position: {
      height: 200,
      left: 12,
      top: 43,
      width: 400,
      zIndex: 0
    }
  }
}

//折线图
export const lineChartSchema = {
  type: 'line-chart',
  icon: 'line-chart',
  category: 'container',
  formItemFlag: true,
  lineWidth: '',
  options: {
    name: '',
    label: '折线图',
    customClass: '',  //自定义css类名
    attribute: '',
    onCreated: '',
    onMounted: '',
    // 配置
    setup: {
      area: true,
      areaThickness: 5,
      background: "",
      colorX: "#000",
      colorY: "#000",
      customColor: [
        {color: "#87cefa"}
      ],
      distance: 5,
      fontColor: "#000",
      fontSize: 12,
      fontSizeX: 14,
      fontSizeY: 14,
      fontWeight: "normal",
      hideX: true,
      isNoTitle: true,
      isShow: false,
      isShowSplitLineX: false,
      isShowSplitLineY: false,
      isShowY: true,
      layerName: "折线图",
      lineColorX: "#000",
      lineColorY: "#000",
      lineWidth: 4,
      lineWidthX: 1,
      lineWidthY: 1,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 40,
      marginTop: 50,
      markPoint: true,
      matchColours: "",
      maxWidth: 10,
      minHeight: 0,
      nameColorX: "#000",
      nameColorY: "#000",
      nameFontSizeX: 14,
      nameFontSizeY: 14,
      nameX: "",
      nameY: "",
      pointSize: 10,
      radius: 5,
      reversalX: false,
      reversalY: false,
      scale: false,
      smoothCurve: true,
      splitLineColorX: "#000",
      splitLineColorY: "#000",
      splitLineWidthX: 1,
      splitLineWidthY: 1,
      splitNumberY: 0,
      subText: "",
      subTextColor: "rgba(30, 144, 255, 1)",
      subTextFontSize: 20,
      subTextFontStyle: "normal",
      subTextFontWeight: "normal",
      symbol: "circle",
      textAlign: "center",
      textAngleX: 0,
      textAngleY: 0,
      textColor: "#FFD700",
      textFontSize: 20,
      textFontStyle: "normal",
      textFontWeight: "normal",
      textInterval: 0,
      tipsColor: "#00FEFF",
      tipsFontSize: 16,
      titleText: "",
      verticalShow: false,
    },
    // 数据
    data: {
      dataType: "staticData",
      refreshTime: 5000,
      staticData: [
        {
          axis: "苹果",
          data: 1000
        },
        {
          axis: "三星",
          data: 2229
        },
        {
          axis: "小米",
          data: 3879
        },
        {
          axis: "oppo",
          data: 2379
        },
        {
          axis: "vivo",
          data: 4079
        },
      ]
    },
    // 坐标
    position: {
      height: 200,
      left: 12,
      top: 43,
      width: 400,
      zIndex: 0
    }
  }
}

//饼图
export const pieChartSchema = {
  type: 'pie-chart',
  icon: 'pie-chart',
  category: 'container',
  formItemFlag: true,
  lineWidth: '',
  options: {
    name: '',
    label: '饼图',
    customClass: '',  //自定义css类名
    attribute: '',
    onCreated: '',
    onMounted: '',
    // 配置
    setup: {
      area: true,
      areaThickness: 5,
      background: "",
      colorX: "#000",
      colorY: "#000",
      customColor: [
        {color: "#0CD2E6"},
        {color: "#00BFA5"},
        {color: "#FFC722"},
        {color: "#886EFF"},
        {color: "#008DEC"},
      ],
      distance: 5,
      fontColor: "",
      fontSize: 12,
      fontSizeX: 14,
      fontSizeY: 14,
      fontWeight: "normal",
      hideX: true,
      isNoTitle: true,
      isShow: true,
      isShowLegend: true,
      isShowSplitLineX: false,
      isShowSplitLineY: false,
      isShowY: true,
      lateralPosition: "center",
      layerName: "饼图",
      layoutFront: "horizontal",
      egendColor: "#000",
      legendFontSize: 16,
      legendWidth: 15,
      lineColorX: "#000",
      lineColorY: "#000",
      lineWidth: 4,
      lineWidthX: 1,
      lineWidthY: 1,
      longitudinalPosition: "top",
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 40,
      marginTop: 50,
      markPoint: true,
      matchColours: "",
      maxWidth: 10,
      minHeight: 0,
      nameColorX: "#000",
      nameColorY: "#000",
      nameFontSizeX: 14,
      nameFontSizeY: 14,
      nameX: "",
      nameY: "",
      numberValue: true,
      percentage: false,
      piechartStyle: "kongxin",
      pointSize: 10,
      resourceUpload: "",
      reversalX: false,
      reversalY: false,
      scale: false,
      smoothCurve: true,
      splitLineColorX: "#000",
      splitLineColorY: "#000",
      splitLineWidthX: 1,
      splitLineWidthY: 1,
      splitNumberY: 0,
      subText: "",
      subTextColor: "rgba(30, 144, 255, 1)",
      subTextFontSize: 20,
      subTextFontStyle: "normal",
      subTextFontWeight: "normal",
      symbol: "circle",
      textAlign: "center",
      textAngleX: 0,
      textAngleY: 0,
      textColor: "#FFD700",
      textFontSize: 20,
      textFontStyle: "normal",
      textFontWeight: "normal",
      textInterval: 0,
      tipsColor: "#00FEFF",
      tipsFontSize: 16,
      titleText: "",
    },
    // 数据
    data: {
      dataType: "staticData",
      refreshTime: 5000,
      staticData: [
        {
          axis: "苹果",
          data: 1000
        },
        {
          axis: "三星",
          data: 2229
        },
        {
          axis: "小米",
          data: 3879
        },
        {
          axis: "oppo",
          data: 2379
        },
        {
          axis: "vivo",
          data: 4079
        },
      ]
    },
    // 坐标
    position: {
      height: 200,
      left: 12,
      top: 43,
      width: 400,
      zIndex: 0
    }
  }
}