<template>
  <static-content-wrapper :designer="designer" :field="field" :design-state="designState"
                          :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
                          :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
    <el-divider ref="fieldEditor" direction="horizontal" :content-position="field.options.contentPosition">
      <span :style="fontStyle">{{field.options.label}}</span>
    </el-divider>
  </static-content-wrapper>
</template>

<script>
  import StaticContentWrapper from './static-content-wrapper'
  import emitter from '@/utils/emitter'
  import i18n, {translate} from "@/utils/i18n";
  import fieldMixin from "@/components/form-designer/form-widget/field-widget/fieldMixin";

  export default {
    name: "divider-widget",
    componentName: 'FieldWidget',  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
    mixins: [emitter, fieldMixin, i18n],
    props: {
      field: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,
      designer: Object,

      designState: {
        type: Boolean,
        default: false
      },

      subFormRowIndex: { /* 子表单组件行索引，从0开始计数 */
        type: Number,
        default: -1
      },
      subFormColIndex: { /* 子表单组件列索引，从0开始计数 */
        type: Number,
        default: -1
      },
      subFormRowId: { /* 子表单组件行Id，唯一id且不可变 */
        type: String,
        default: ''
      },

    },
    components: {
      StaticContentWrapper,
    },
    computed: {
      fontStyle() {
        // let defaultFontStyle = {}
        if (!!this.field.options.font && !!this.field.options.font.use) {
          let fontObj = this.field.options.font
          return {
            'font-family': fontObj.family,
            'font-size': `${fontObj.size}${fontObj.sizeMeasure}!important`,
            'color': fontObj.color,
            'font-weight': fontObj.weight
          }
        }

        // if (!!this.designer) {
        //   let fontObj = this.formConfig.font
        //   return {
        //     'font-family': fontObj.family,
        //     'font-size': `${fontObj.size}${fontObj.sizeMeasure}`,
        //     'font-color': fontObj.color,
        //     'font-color': fontObj.color,
        //     'font-weight': fontObj.weight
        //   } || defaultFontStyle
        // } else {
        //   let fontObj = this.formConfig.font
        //   return {
        //     'font-family': fontObj.family,
        //     'font-size': `${fontObj.size}${fontObj.sizeMeasure}`,
        //     'font-color': fontObj.color,
        //     'font-color': fontObj.color,
        //     'font-weight': fontObj.weight
        //   } || defaultFontStyle
        // }
      },
    },
    beforeCreate() {
      /* 这里不能访问方法和属性！！ */
    },

    created() {
      /* 注意：子组件mounted在父组件created之后、父组件mounted之前触发，故子组件mounted需要用到的prop
         需要在父组件created中初始化！！ */
      this.registerToRefList()
      this.initEventHandler()

      this.handleOnCreated()
    },

    mounted() {
      this.handleOnMounted()
    },

    beforeDestroy() {
      this.unregisterFromRefList()
    },

    methods: {

    }

  }
</script>

<style lang="scss" scoped>
  @import "../../../../styles/global.scss"; //* static-content-wrapper已引入，还需要重复引入吗？ *//

</style>
