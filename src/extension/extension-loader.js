import Vue from 'vue'

import {
  addContainerWidgetSchema,
  addCustomWidgetSchema,
  addAdvancedFieldSchema,
  addBasicFieldSchema
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

// Flex Box 弹性布局
import {flexBoxSchema} from "@/extension/samples/extension-schema"
import FlexBoxWidget from '@/extension/samples/flexBox/flex-box-widget'
import FlexBoxItem from '@/extension/samples/flexBox/flex-box-item'
// import {cardTemplateGenerator} from '@/extension/samples/extension-sfc-generator'

// Grid Box 自动栅格布局
import { gridBoxSchema } from "@/extension/samples/extension-schema"
import GridBoxWidget from '@/extension/samples/gridBox/grid-box-widget'
import GridBoxItem from '@/extension/samples/gridBox/grid-box-item'
// import {cardTemplateGenerator} from '@/extension/samples/extension-sfc-generator'

/* Widget 字段组件 */
// Alert 提示
import {alertSchema} from "@/extension/samples/extension-schema"
import AlertWidget from '@/extension/samples/alert/alert-widget'
import {alertTemplateGenerator} from '@/extension/samples/extension-sfc-generator'
// CustomComponent 自定义组件
import {customComponentSchema} from "@/extension/samples/extension-schema"
import CustomComponentWidget from '@/extension/samples/customComponent/custom-component-widget'
import customCodeEditor from '@/extension/samples/customComponent/editor/customCode-editor'
// SubmitButton 表单提交按钮
import {submitButtonSchema} from "@/extension/samples/extension-schema"
import SubmitButtonWidget from '@/extension/samples/submitButton/submit-button-widget'
import customApiFormEditor from '@/extension/samples/submitButton/editor/customApiForm-editor'
import submitButtonTypeEditor from '@/extension/samples/submitButton/editor/submit-button-type-editor'
// UserChoose 人员选择
import {userChooseSchema} from "@/extension/samples/extension-schema"
import UserChooseWidget from '@/extension/samples/userChoose/user-choose-widget'
// groupChoose 机构选择
import {groupChooseSchema} from "@/extension/samples/extension-schema"
import GroupChooseWidget from '@/extension/samples/groupChoose/group-choose-widget'
// barChart 柱状图
import {barChartSchema} from "@/extension/samples/extension-schema"
import BarChartWidget from '@/extension/samples/barChart/bar-chart-widget'
import BarChartItem from '@/extension/samples/barChart/bar-chart-item'
// barChart 柱状图
import {lineChartSchema} from "@/extension/samples/extension-schema"
import LineChartWidget from '@/extension/samples/lineChart/line-chart-widget'
import LineChartItem from '@/extension/samples/lineChart/line-chart-item'
// pieChart 饼图
import {pieChartSchema} from "@/extension/samples/extension-schema"
import pieChartWidget from '@/extension/samples/pieChart/pie-chart-widget'
import pieChartItem from '@/extension/samples/pieChart/pie-chart-item'

// subForm 子表
import {subFormSchema} from "@/extension/samples/extension-schema"
import SubFormWidget from '@/extension/samples/subForm/sub-form-widget'
import SubFormItem from '@/extension/samples/subForm/sub-form-item'
import rowButtonsEditor from '@/extension/samples/subForm/editor/rowButtons-editor'

// import {cardTemplateGenerator} from '@/extension/samples/extension-sfc-generator'
// 树组件
import {tree} from "@/extension/samples/extension-schema"
import commonTreeWidget from '@/extension/samples/commonTree/common-tree-widget'
import commonTreeItem from '@/extension/samples/commonTree/common-tree-item'
import commonTreeAttributeEditor from '@/extension/samples/commonTree/setting-editor/common-tree-editor'
// DataTable 增删改查
import {tableSchema} from "@/extension/samples/extension-schema"
import elTableWidget from '@/extension/samples/el-table/el-table-widget'
import elTableItem from '@/extension/samples/el-table/el-table-item'
import elTableEditEditor from '@/extension/samples/el-table/setting-editor/el-table-tableEdit-editor'
import elTableButtonEditEditor from '@/extension/samples/el-table/setting-editor/el-table-tableButtonEdit-editor'
import elRowButtonEditEditor from '@/extension/samples/el-table/setting-editor/el-table-rowButtonEdit-editor'
import elQueryFormFieldsEditor from '@/extension/samples/el-table/setting-editor/el-table-queryFormFields-editor'
import elTableFormIdEditor from '@/extension/samples/el-table/setting-editor/el-table-formId-editor'
import elTableCuatomQueryEditor from '@/extension/samples/el-table/setting-editor/el-table-cuatomQuery-editor'
import elTableRowClickEditor from '@/extension/samples/el-table/setting-editor/el-table-rowClick-editor'
//柱状图编辑
import barChartAttributeEditor from '@/extension/samples/barChart/setting-editor/bar-chart-attribute-editor'
//折线图编辑
import lineChartAttributeEditor from '@/extension/samples/lineChart/setting-editor/line-chart-attribute-editor'
//饼图编辑
import pieChartAttributeEditor from '@/extension/samples/pieChart/setting-editor/pie-chart-attribute-editor'
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
  addBasicFieldSchema(alertSchema)  //加载组件Json Schema

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

  /* 自定义组件加载 start */
  addCustomWidgetSchema(customComponentSchema)  //加载组件Json Schema

  /* -------------------------------------------------- */
  Vue.component(CustomComponentWidget.name, CustomComponentWidget)  //注册组件
  /* -------------------------------------------------- */
  PERegister.registerCPEditor('customCode', 'customCode-editor', customCodeEditor)
  /* 自定义组件加载 end */

  /* 弹性布局组件加载 start */
  addContainerWidgetSchema(flexBoxSchema)  //加载组件Json Schema
  /* -------------------------------------------------- */
  Vue.component(FlexBoxWidget.name, FlexBoxWidget)  //注册设计期的容器组件
  Vue.component(FlexBoxItem.name, FlexBoxItem)  //注册运行期的容器组件

  /* -------------------------------------------------- */

  /* -------------------------------------------------- */
  // registerCWGenerator('card', cardTemplateGenerator)  //注册容器组件的代码生成器
  /* -------------------------------------------------- */
  /* 弹性布局组件加载 end */

  /* 自动栅格布局组件加载 start */
  addContainerWidgetSchema(gridBoxSchema)  //加载组件Json Schema
  /* -------------------------------------------------- */
  Vue.component(GridBoxWidget.name, GridBoxWidget)  //注册设计期的容器组件
  Vue.component(GridBoxItem.name, GridBoxItem)  //注册运行期的容器组件

  /* -------------------------------------------------- */

  /* -------------------------------------------------- */
  // registerCWGenerator('card', cardTemplateGenerator)  //注册容器组件的代码生成器
  /* -------------------------------------------------- */
  /* 自动栅格布局组件加载 end */

  /* SubmitButton 组件加载 start */
  addBasicFieldSchema(submitButtonSchema)  //加载组件Json Schema
  /* -------------------------------------------------- */
  Vue.component(SubmitButtonWidget.name, SubmitButtonWidget)  //注册组件
  /* -------------------------------------------------- */
  PERegister.registerCPEditor(
    'submit-button-type', 
    'submit-button-type-editor',
    submitButtonTypeEditor
  )

  PERegister.registerCPEditor(
    'submit-button-useCustomApi', 
    'submit-button-useCustomApi-editor',
    PEFactory.createBooleanEditor('useCustomApi', 'extension.setting.useCustomApi')
  )

  PERegister.registerCPEditor(
    'submit-button-customApiStatus', 
    'submit-button-customApiStatus-editor',
    PEFactory.createInputTextEditor('customApiStatus', 'extension.setting.customApiStatus')
  )

  PERegister.registerCPEditor(
    'submit-button-customApiForm', 
    'submit-button-customApiForm-editor',
    customApiFormEditor
  )


  /* SubmitButton 组件加载完毕 end */

  /* UserChoose 组件加载 start */
  addBasicFieldSchema(userChooseSchema)  //加载组件Json Schema
  /* -------------------------------------------------- */
  Vue.component(UserChooseWidget.name, UserChooseWidget)  //注册组件
  /* -------------------------------------------------- */
  PERegister.registerCPEditor('user-choose-multiSelect', 'user-choose-multiSelect-editor',
      PEFactory.createBooleanEditor('multiSelect', 'extension.setting.multiSelect'))
  // let displayTypeOptions = [
  //   {label: '多行', value: 'textarea'},
  //   {label: '单行', value: 'normal'}
  // ]
  // PERegister.registerCPEditor('user-choose-displayType', 'user-choose-displayType-editor',
  //     PEFactory.createSelectEditor('displayType', 'extension.setting.displayType',
  //     {optionItems: displayTypeOptions}))
  /* -------------------------------------------------- */
  //  registerFWGenerator('userChoose', alertTemplateGenerator)  //注册字段组件的代码生成器
  /* -------------------------------------------------- */
  /* UserChoose 组件加载完毕 end */

  /* GroupChoose 组件加载 start */
  addBasicFieldSchema(groupChooseSchema)  //加载组件Json Schema
  /* -------------------------------------------------- */
  PERegister.registerCPEditor('group-choose-multiSelect', 'group-choose-multiSelect-editor',
      PEFactory.createBooleanEditor('multiSelect', 'extension.setting.multiSelect'))
  // PERegister.registerCPEditor('group-choose-displayType', 'group-choose-displayType-editor',
  //     PEFactory.createSelectEditor('displayType', 'extension.setting.displayType',
  //     {optionItems: displayTypeOptions}))
  /* -------------------------------------------------- */
  Vue.component(GroupChooseWidget.name, GroupChooseWidget)  //注册组件
  /* GroupChoose 组件加载完毕 end */


  /* BarChart 组件加载 start */
  addAdvancedFieldSchema(barChartSchema)  //加载组件Json Schema
  /* -------------------------------------------------- */
  Vue.component(BarChartWidget.name, BarChartWidget)  //注册设计期的容器组件
  Vue.component(BarChartItem.name, BarChartItem)  //注册运行期的容器组件
  /* BarChart 组件加载完毕 end */

  /* LineChart 组件加载 start */
  addAdvancedFieldSchema(lineChartSchema)  //加载组件Json Schema
  /* -------------------------------------------------- */
  Vue.component(LineChartWidget.name, LineChartWidget)  //注册组件
  Vue.component(LineChartItem.name, LineChartItem)  //注册组件
  /* LineChart 组件加载完毕 end */

  /* pieChart 组件加载 start */
  addAdvancedFieldSchema(pieChartSchema)  //加载组件Json Schema
  /* -------------------------------------------------- */
  Vue.component(pieChartWidget.name, pieChartWidget)  //注册组件
  Vue.component(pieChartItem.name, pieChartItem)  //注册组件
  /* LineChart 组件加载完毕 end */

  /* SubForm 容器组件加载 start */
  addContainerWidgetSchema(subFormSchema)  //加载组件Json Schema
  /* -------------------------------------------------- */
  Vue.component(SubFormWidget.name, SubFormWidget)  //注册设计期的容器组件
  Vue.component(SubFormItem.name, SubFormItem)  //注册运行期的容器组件
  /* -------------------------------------------------- */
  PERegister.registerCPEditor('rowButtons', 'rowButtons-editor',rowButtonsEditor)
  PERegister.registerCPEditor('addRowText', 'addRowText-editor',
    PEFactory.createInputTextEditor('addRowText', 'extension.setting.addRowText')  
  )

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

  /* tree 组件加载 start */
  addAdvancedFieldSchema(tree)  //加载组件Json Schema
  /* -------------------------------------------------- */
  Vue.component(commonTreeWidget.name, commonTreeWidget)  //注册组件
  Vue.component(commonTreeItem.name, commonTreeItem)  //注册组件
  Vue.component(commonTreeAttributeEditor.name, commonTreeAttributeEditor)  
  PERegister.registerEPEditor('onNodeClick', 'onNodeClick-editor',
  PEFactory.createEventHandlerEditor('onNodeClick', 'extension.setting.onNodeClick'))    
  PERegister.registerEPEditor('onCheckChange', 'onCheckChange-editor',
  PEFactory.createEventHandlerEditor('onCheckChange', 'extension.setting.onCheckChange')) 
   /* tree组件加载 end */

  /* 表格组件加载 start */
  addAdvancedFieldSchema(tableSchema)  //加载组件Json Schema
  Vue.component(elTableWidget.name, elTableWidget)
  Vue.component(elTableItem.name, elTableItem)
  Vue.component(elTableEditEditor.name, elTableEditEditor)
  Vue.component(elTableButtonEditEditor.name, elTableButtonEditEditor)
  Vue.component(elRowButtonEditEditor.name, elRowButtonEditEditor)
  Vue.component(elQueryFormFieldsEditor.name, elQueryFormFieldsEditor)
  Vue.component(elTableFormIdEditor.name, elTableFormIdEditor)  
  Vue.component(elTableCuatomQueryEditor.name, elTableCuatomQueryEditor) 
  Vue.component(elTableRowClickEditor.name, elTableRowClickEditor) 
  Vue.component(barChartAttributeEditor.name, barChartAttributeEditor)
  Vue.component(lineChartAttributeEditor.name, lineChartAttributeEditor)   
  Vue.component(pieChartAttributeEditor.name, pieChartAttributeEditor)    
  PERegister.registerCPEditor('tableEdit', 'tableEdit-editor',
  PEFactory.createEventHandlerEditor('tableEdit', [])) 
  PERegister.registerCPEditor('tableButtonEdit', 'tableButtonEdit-editor',
  PEFactory.createEventHandlerEditor('tableButtonEdit', [])) 
  PERegister.registerCPEditor('rowButtonEdit', 'rowButtonEdit-editor',
  PEFactory.createEventHandlerEditor('rowButtonEdit', [])) 
  PERegister.registerCPEditor('queryFormFields', 'queryFormFields-editor',
  PEFactory.createEventHandlerEditor('queryFormFields', [])) 
  PERegister.registerCPEditor('rowClick', 'rowClick-editor',
  PEFactory.createInputTextEditor('rowClick', 'extension.setting.rowClick'))  
  PERegister.registerCPEditor('formId', 'formId-editor',
  PEFactory.createInputTextEditor('formId', [])) 
  PERegister.registerCPEditor('cuatomQuery', 'cuatomQuery-editor', 
  PEFactory.createInputTextEditor('cuatomQuery', []))
  PERegister.registerCPEditor('attribute', 'attribute-editor',
  PEFactory.createInputTextEditor('attribute', [])) 
  PERegister.registerCPEditor('checkbox', 'checkbox-editor',
  PEFactory.createBooleanEditor('checkbox', 'extension.setting.checkbox'))
  PERegister.registerCPEditor('pageQueryDataFlag', 'pageQueryDataFlag-editor',
  PEFactory.createBooleanEditor('pageQueryDataFlag', 'extension.setting.pageQueryDataFlag'))
  PERegister.registerCPEditor('showStripe', 'showStripe-editor',
  PEFactory.createBooleanEditor('showStripe', 'extension.setting.showStripe'))
  PERegister.registerCPEditor('showBorder', 'showBorder-editor',
  PEFactory.createBooleanEditor('showBorder', 'extension.setting.showBorder'))
  PERegister.registerCPEditor('queryFormHide', 'queryFormHide-editor',
  PEFactory.createBooleanEditor('queryFormHide', 'extension.setting.queryFormHide'))
  PERegister.registerCPEditor('showInput', 'showInput-editor',
  PEFactory.createBooleanEditor('showInput', 'extension.setting.showInput'))
   /* 表格组件加载 end */
}
