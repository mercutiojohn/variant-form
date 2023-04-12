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
