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

export const testSchema = {
  type: 'test', // 字段组件的类型名称，必须唯一，不能跟已有组件重复
  icon: 'test', // 容器图标名称，可以去iconfont.cn下载所需的svg文件，放入src/icons/svg目录即可（自动加载）
  formItemFlag: false, // 是否嵌套于el-form-item组件内，因el-alert并不需要显示字段标签，故此处设置为false
  options: { // 组件属性对象，每一个属性值对应一个属性编辑器
    name: '',
    testName: '',
    customClass: '',
  }
}
