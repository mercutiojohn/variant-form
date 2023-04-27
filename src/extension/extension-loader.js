import Vue from 'vue'

import {
  addContainerWidgetSchema,
  addCustomWidgetSchema
} from '@/components/form-designer/widget-panel/widgetsConfig'
import * as PERegister from '@/components/form-designer/setting-panel/propertyRegister'
import * as PEFactory from '@/components/form-designer/setting-panel/property-editor-factory'

import {registerCWGenerator} from '@/utils/sfc-generator'
import {registerFWGenerator} from '@/utils/sfc-generator'

/* Container 容器组件 */
// Card 卡片
import {cardSchema} from "@/extension/samples/extension-schema"
import CardWidget from '@/extension/samples/card/card-widget'
import CardItem from '@/extension/samples/card/card-item'
import {cardTemplateGenerator} from '@/extension/samples/extension-sfc-generator'

/* Widget 字段组件 */
// Alert 提示
import {alertSchema} from "@/extension/samples/extension-schema"
import AlertWidget from '@/extension/samples/alert/alert-widget'
import {alertTemplateGenerator} from '@/extension/samples/extension-sfc-generator'
// UserChoose 人员选择
import {userChooseSchema} from "@/extension/samples/extension-schema"
import UserChooseWidget from '@/extension/samples/userChoose/user-choose-widget'
// import {alertTemplateGenerator} from '@/extension/samples/extension-sfc-generator'

// subForm 子表
import {subFormSchema} from "@/extension/samples/extension-schema"
import SubFormWidget from '@/extension/samples/subForm/sub-form-widget'
import SubFormItem from '@/extension/samples/subForm/sub-form-item'
// import {cardTemplateGenerator} from '@/extension/samples/extension-sfc-generator'

// DataTable 增删改查
import {tableSchema} from "@/extension/samples/extension-schema"
import elTableWidget from '@/extension/samples/el-table/el-table-widget'
import elTableItem from '@/extension/samples/el-table/el-table-item'
import elTableEditEditor from '@/extension/samples/el-table/setting-editor/el-table-tableEdit-editor'
import elTableButtonEditEditor from '@/extension/samples/el-table/setting-editor/el-table-tableButtonEdit-editor'
import elRowButtonEditEditor from '@/extension/samples/el-table/setting-editor/el-table-rowButtonEdit-editor'
import elQueryFormFieldsEditor from '@/extension/samples/el-table/setting-editor/el-table-queryFormFields-editor'
import elTableFormIdEditor from '@/extension/samples/el-table/setting-editor/el-table-formId-editor'
export const loadExtension = function () {

  /**
   * 加载容器组件步骤：
   * 1. 加载组件Json Schema;
   * 2. 全局注册容器组件，容器组件有两种状态——设计期和运行期，故需要注册两个组件；
   * 3. 全局注册属性编辑器组件（基本属性、高级属性、事件属性）；
   * 4. 注册容器组件的代码生成器；
   * 5. 加载完毕。
   */
  addContainerWidgetSchema(cardSchema)  //加载组件Json Schema
  /* -------------------------------------------------- */
  Vue.component(CardWidget.name, CardWidget)  //注册设计期的容器组件
  Vue.component(CardItem.name, CardItem)  //注册运行期的容器组件

  /* -------------------------------------------------- */
  PERegister.registerCPEditor('card-folded', 'card-folded-editor',
      PEFactory.createBooleanEditor('folded', 'extension.setting.cardFolded'))

  PERegister.registerCPEditor('card-showFold', 'card-showFold-editor',
      PEFactory.createBooleanEditor('showFold', 'extension.setting.cardShowFold'))

  PERegister.registerCPEditor('card-cardWidth', 'card-cardWidth-editor',
      PEFactory.createInputTextEditor('cardWidth', 'extension.setting.cardWidth'))

  let shadowOptions = [
    {label: 'never', value: 'never'},
    {label: 'hover', value: 'hover'},
    {label: 'always', value: 'always'},
  ]
  PERegister.registerCPEditor('card-shadow', 'card-shadow-editor',
      PEFactory.createSelectEditor('shadow', 'extension.setting.cardShadow',
          {optionItems: shadowOptions}))
  /* -------------------------------------------------- */
  registerCWGenerator('card', cardTemplateGenerator)  //注册容器组件的代码生成器
  /* -------------------------------------------------- */
  /* 容器组件加载完毕 end */

  /**
   * 加载字段组件步骤：
   * 1. 加载组件Json Schema;
   * 2. 全局注册字段组件，字段组件设计期和运行期共用，故需要仅需注册一个组件；
   * 3. 全局注册属性编辑器组件（基本属性、高级属性、事件属性）；
   * 4. 注册字段组件的代码生成器；
   * 5. 加载完毕。
   */
  addCustomWidgetSchema(alertSchema)  //加载组件Json Schema

  /* -------------------------------------------------- */
  Vue.component(AlertWidget.name, AlertWidget)  //注册组件
  /* -------------------------------------------------- */
  PERegister.registerCPEditor('alert-title', 'alert-title-editor',
      PEFactory.createInputTextEditor('title', 'extension.setting.alertTitle'))

  let typeOptions = [
    {label: 'success', value: 'success'},
    {label: 'warning', value: 'warning'},
    {label: 'info', value: 'info'},
    {label: 'error', value: 'error'},
  ]
//   PERegister.registerCPEditor('alert-type', 'alert-type-editor',
//       PEFactory.createSelectEditor('type', 'extension.setting.alertType',
//           {optionItems: typeOptions}))
  /* type属性映射已存在，无须再注册，故只需注册属性编辑器即可！！ */
  Vue.component('alert-type-editor',
      PEFactory.createSelectEditor('type', 'extension.setting.alertType',
          {optionItems: typeOptions}))

  PERegister.registerCPEditor('alert-description', 'alert-description-editor',
      PEFactory.createInputTextEditor('description', 'extension.setting.description'))

  PERegister.registerCPEditor('alert-closable', 'alert-closable-editor',
      PEFactory.createBooleanEditor('closable', 'extension.setting.closable'))

  PERegister.registerCPEditor('alert-closeText', 'alert-closeText-editor',
      PEFactory.createInputTextEditor('closeText', 'extension.setting.closeText'))

  PERegister.registerCPEditor('alert-center', 'alert-center-editor',
      PEFactory.createBooleanEditor('center', 'extension.setting.center'))

  PERegister.registerCPEditor('alert-showIcon', 'alert-showIcon-editor',
      PEFactory.createBooleanEditor('showIcon', 'extension.setting.showIcon'))

  let effectOptions = [
    {label: 'light', value: 'light'},
    {label: 'dark', value: 'dark'},
  ]
  PERegister.registerCPEditor('alert-effect', 'alert-effect-editor',
      PEFactory.createRadioButtonGroupEditor('effect', 'extension.setting.effect',
          {optionItems: effectOptions}))

  PERegister.registerEPEditor('alert-onClose', 'alert-onClose-editor',
      PEFactory.createEventHandlerEditor('onClose', []))
  /* -------------------------------------------------- */
  registerFWGenerator('alert', alertTemplateGenerator)  //注册字段组件的代码生成器
  /* -------------------------------------------------- */
  /* 字段组件加载完毕 end */
  
  /* UserChoose 组件加载测试 start */
  addCustomWidgetSchema(userChooseSchema)  //加载组件Json Schema
  /* -------------------------------------------------- */
  Vue.component(UserChooseWidget.name, UserChooseWidget)  //注册组件
  /* -------------------------------------------------- */
  PERegister.registerCPEditor('test-testName', 'test-testName-editor',
      PEFactory.createInputTextEditor('testName', 'extension.setting.alertTitle'))
  /* -------------------------------------------------- */
  //  registerFWGenerator('userChoose', alertTemplateGenerator)  //注册字段组件的代码生成器
  /* -------------------------------------------------- */
  /* UserChoose 组件加载测试完毕 end */

  /* SubForm 容器组件加载 start */
  addContainerWidgetSchema(subFormSchema)  //加载组件Json Schema
  /* -------------------------------------------------- */
  Vue.component(SubFormWidget.name, SubFormWidget)  //注册设计期的容器组件
  Vue.component(SubFormItem.name, SubFormItem)  //注册运行期的容器组件
  /* -------------------------------------------------- */
//   PERegister.registerCPEditor('subForm-folded', 'subForm-folded-editor',
//       PEFactory.createBooleanEditor('folded', 'extension.setting.cardFolded'))

//   PERegister.registerCPEditor('subForm-showFold', 'subForm-showFold-editor',
//       PEFactory.createBooleanEditor('showFold', 'extension.setting.cardShowFold'))

//   PERegister.registerCPEditor('subForm-cardWidth', 'subForm-cardWidth-editor',
//       PEFactory.createInputTextEditor('cardWidth', 'extension.setting.cardWidth'))

  let actionColumnPositionOptions = [
    {label: '居左', value: 'left'},
    {label: '居右', value: 'right'}
  ]
  PERegister.registerCPEditor('actionColumnPosition', 'subForm-actionColumnPosition-editor',
  PEFactory.createRadioButtonGroupEditor('actionColumnPosition', 'designer.setting.actionColumnPosition',
          {optionItems: actionColumnPositionOptions}))
  /* -------------------------------------------------- */
//   registerCWGenerator('subForm', cardTemplateGenerator)  //注册容器组件的代码生成器
  /* -------------------------------------------------- */
  /* SubForm 容器组件加载完毕 end */

  /* 表格组件加载 start */
  addCustomWidgetSchema(tableSchema)  //加载组件Json Schema
  Vue.component(elTableWidget.name, elTableWidget)
  Vue.component(elTableItem.name, elTableItem)
  Vue.component(elTableEditEditor.name, elTableEditEditor)
  Vue.component(elTableButtonEditEditor.name, elTableButtonEditEditor)
  Vue.component(elRowButtonEditEditor.name, elRowButtonEditEditor)
  Vue.component(elQueryFormFieldsEditor.name, elQueryFormFieldsEditor)
  Vue.component(elTableFormIdEditor.name, elTableFormIdEditor)  
  PERegister.registerCPEditor('tableEdit', 'tableEdit-editor',
  PEFactory.createEventHandlerEditor('tableEdit', [])) 
  PERegister.registerCPEditor('tableButtonEdit', 'tableButtonEdit-editor',
  PEFactory.createEventHandlerEditor('tableButtonEdit', [])) 
  PERegister.registerCPEditor('rowButtonEdit', 'rowButtonEdit-editor',
  PEFactory.createEventHandlerEditor('rowButtonEdit', [])) 
  PERegister.registerCPEditor('queryFormFields', 'queryFormFields-editor',
  PEFactory.createEventHandlerEditor('queryFormFields', [])) 
  PERegister.registerCPEditor('formId', 'formId-editor',
  PEFactory.createInputTextEditor('formId', [])) 
  /* 表格组件加载 end */
}
