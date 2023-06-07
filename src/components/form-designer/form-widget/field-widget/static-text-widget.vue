<template>
  <static-content-wrapper :designer="designer" :field="field" :design-state="designState"
                          :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
                          :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
    <div ref="fieldEditor" :style="styleObj">
      <!-- :style="!!field.options.fontSize ? `font-size: ${field.options.fontSize};`: ''" -->
      <pre :style="fontStyle">{{field.options.textContent}}</pre></div>
  </static-content-wrapper>
</template>

<script>
  import StaticContentWrapper from './static-content-wrapper'
  import emitter from '@/utils/emitter'
  import i18n, {translate} from "@/utils/i18n";
  import fieldMixin from "@/components/form-designer/form-widget/field-widget/fieldMixin";

  export default {
    name: "static-text-widget",
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
        let others = {
          'white-space': !!this.field.options.preWrap ? 'pre-wrap' : 'pre', 
          'text-align': !!this.field.options.textAlign ? this.field.options.textAlign : 'left',
          margin: `${this.field.options.basic.margin.top}px ${this.field.options.basic.margin.right}px ${this.field.options.basic.margin.bottom}px ${this.field.options.basic.margin.left}px` || '',
          // padding: `${this.field.options.basic.padding}${this.field.options.basic.paddingMeasure}` || '',
          padding: `${this.field.options.basic.padding.top}px ${this.field.options.basic.padding.right}px ${this.field.options.basic.padding.bottom}px ${this.field.options.basic.padding.left}px` || '',
          // Border
          'border-top': this.field.options.boxBorder.use && this.field.options.boxBorder.visible.top ? `${this.field.options.boxBorder.width}px ${this.field.options.boxBorder.style} ${this.field.options.boxBorder.color}` : 'none' || '',
          'border-right': this.field.options.boxBorder.use && this.field.options.boxBorder.visible.right ? `${this.field.options.boxBorder.width}px ${this.field.options.boxBorder.style} ${this.field.options.boxBorder.color}` : 'none' || '',
          'border-bottom': this.field.options.boxBorder.use && this.field.options.boxBorder.visible.bottom ? `${this.field.options.boxBorder.width}px ${this.field.options.boxBorder.style} ${this.field.options.boxBorder.color}` : 'none' || '',
          'border-left': this.field.options.boxBorder.use && this.field.options.boxBorder.visible.left ? `${this.field.options.boxBorder.width}px ${this.field.options.boxBorder.style} ${this.field.options.boxBorder.color}` : 'none' || '',
        }
        // let defaultFontStyle = {}
        if (!!this.field.options.font && !!this.field.options.font.use) {
          let fontObj = this.field.options.font
          return {
            ...others,
            'font-family': fontObj.family,
            'font-size': `${fontObj.size}${fontObj.sizeMeasure}!important`,
            'color': fontObj.color,
            'font-weight': fontObj.weight
          }
        } else {
          return others
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
      styleObj() {
        return {
          'box-sizing': 'border-box',
          'overflow': 'hidden',
          width: `${this.field.options.basic.width}${this.field.options.basic.widthMeasure}` || 'unset',
          height: `${this.field.options.basic.height}${this.field.options.basic.heightMeasure}` || 'unset',
          background: `${this.field.options.basic.backgroundType === 'gradient' ? this.field.options.basic.gradient : this.field.options.basic.backgroundType === 'color' ? this.field.options.basic.backgroundColor : 'none'}` || 'none',
          // Flex
          // display: 'flex',
          // 'flex-direction': this.field.options.flex.flexDirection  || '',
          // 'flex-wrap': this.field.options.flex.flexWrap || '',
          // 'justify-content': this.field.options.flex.justifyContent || '',
          // 'align-items': this.field.options.flex.alignItems || '',
          // gap: `${this.field.options.flex.gap}px` || '',
          // Radius
          'border-radius': `${this.field.options.basic.radius.topLeft}px ${this.field.options.basic.radius.topRight}px ${this.field.options.basic.radius.bottomRight}px ${this.field.options.basic.radius.bottomLeft}px` || '',
          // Shadow
          // 'box-shadow': this.field.options.shadow.use ? `${this.field.options.shadow.isInset ? 'inset' : ''} ${this.field.options.shadow.offsetX}px ${this.field.options.shadow.offsetY}px ${this.field.options.shadow.blur}px ${this.field.options.shadow.expand}px ${this.field.options.shadow.color}` : 'none',
          // margin: `${this.field.options.basic.margin}${this.field.options.basic.marginMeasure}` || '',
        }
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
