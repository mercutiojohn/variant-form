<template>
  <td class="table-cell" :class="[customClass]"
      :colspan="widget.options.colspan || 1" :rowspan="widget.options.rowspan || 1"
      :style="styleObj">
    <template v-for="(subWidget, swIdx) in widget.widgetList">
      <template v-if="'container' === subWidget.category">
        <component :is="getComponentByContainer(subWidget)" :widget="subWidget" :key="swIdx" :parent-list="widget.widgetList"
                        :index-of-parent-list="swIdx" :parent-widget="widget">
          <!-- 递归传递插槽！！！ -->
          <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"/>
          </template>
        </component>
      </template>
      <template v-else>
        <component :is="subWidget.type + '-widget'" :field="subWidget" :key="swIdx" :parent-list="widget.widgetList"
                      :index-of-parent-list="swIdx" :parent-widget="widget">
          <!-- 递归传递插槽！！！ -->
          <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
            <slot :name="slot" v-bind="scope"/>
          </template>
        </component>
      </template>
    </template>
  </td>
</template>

<script>
  import emitter from '@/utils/emitter'
  import i18n from "../../../utils/i18n"
  import refMixin from "../../../components/form-render/refMixin"
  import FieldComponents from '@/components/form-designer/form-widget/field-widget/index'

  export default {
    name: "TableCellItem",
    componentName: "ContainerItem",
    mixins: [emitter, i18n, refMixin],
    components: {
      ...FieldComponents,
    },
    props: {
      widget: Object,

      rowIndex: Number,
      colIndex: Number,
    },
    inject: ['refList', 'globalModel'],
    computed: {
      customClass() {
        return this.widget.options.customClass || ''
      },
      styleObj() {
        return {
          'box-sizing':'border-box',
          'overflow': 'hidden',
          width: '100%',
          height: '100%',
          // padding: `${this.widget.options.basic.padding}${this.widget.options.basic.paddingMeasure}` || '',
          padding: `${this.widget.options.basic.padding.top}px ${this.widget.options.basic.padding.right}px ${this.widget.options.basic.padding.bottom}px ${this.widget.options.basic.padding.left}px` || '',
          background: `${this.widget.options.basic.backgroundType === 'gradient' ? this.widget.options.basic.gradient : this.widget.options.basic.backgroundType === 'color' ? this.widget.options.basic.backgroundColor : 'none'}` || 'none',
          // Flex
          display: 'flex',
          'flex-direction': this.widget.options.flex.flexDirection  || '',
          'flex-wrap': this.widget.options.flex.flexWrap || '',
          'justify-content': this.widget.options.flex.justifyContent || '',
          'align-items': this.widget.options.flex.alignItems || '',
          gap: `${this.widget.options.flex.gap}px` || '',
          // Radius
          'border-radius': `${this.widget.options.basic.radius.topLeft}px ${this.widget.options.basic.radius.topRight}px ${this.widget.options.basic.radius.bottomRight}px ${this.widget.options.basic.radius.bottomLeft}px` || '',
          // Shadow
          'box-shadow': `${this.widget.options.shadow.isInset ? 'inset' : ''} ${this.widget.options.shadow.offsetX}px ${this.widget.options.shadow.offsetY}px ${this.widget.options.shadow.blur}px ${this.widget.options.shadow.expand}px ${this.widget.options.shadow.color}` || ''
        }
      },
      styleObj() {
        return {
          width: this.widget.options.cellWidth + ' !important' || '', 
          height: this.widget.options.cellHeight + ' !important' || '', 
          'word-break': !!this.widget.options.wordBreak ? 'break-all' : 'normal',
          // width: `${this.widget.options.basic.width}${this.widget.options.basic.widthMeasure}` || 'unset',
          // height: `${this.widget.options.basic.height}${this.widget.options.basic.heightMeasure}` || 'unset',
          // 'overflow': 'hidden',
          // margin: `${this.widget.options.basic.margin}${this.widget.options.basic.marginMeasure}` || '',
          // margin: `${this.widget.options.basic.margin.top}px ${this.widget.options.basic.margin.right}px ${this.widget.options.basic.margin.bottom}px ${this.widget.options.basic.margin.left}px` || '',
          // Border
          // 'border-width': `${this.widget.options.boxBorder.width}px` || '',
          // 'border-style': this.widget.options.boxBorder.style || '',
          // 'border-color': this.widget.options.boxBorder.color || '',
          'border-top': this.widget.options.boxBorder.use && this.widget.options.boxBorder.visible.top ? `${this.widget.options.boxBorder.width}px ${this.widget.options.boxBorder.style} ${this.widget.options.boxBorder.color}` : 'none' || '',
          'border-right': this.widget.options.boxBorder.use && this.widget.options.boxBorder.visible.right ? `${this.widget.options.boxBorder.width}px ${this.widget.options.boxBorder.style} ${this.widget.options.boxBorder.color}` : 'none' || '',
          'border-bottom': this.widget.options.boxBorder.use && this.widget.options.boxBorder.visible.bottom ? `${this.widget.options.boxBorder.width}px ${this.widget.options.boxBorder.style} ${this.widget.options.boxBorder.color}` : 'none' || '',
          'border-left': this.widget.options.boxBorder.use && this.widget.options.boxBorder.visible.left ? `${this.widget.options.boxBorder.width}px ${this.widget.options.boxBorder.style} ${this.widget.options.boxBorder.color}` : 'none' || '',
        }
      }

    },
    created() {
      /* tableCell不生成组件引用，故无须调用initRefList！！ */
      //this.initRefList()
    },
    methods: {

    }
  }
</script>

<style lang="scss" scoped>
  td.table-cell {
    display: table-cell;
    height: 36px;
    //border: 1px dashed #336699;
    border: 1px solid #e5e5e5;
  }

</style>
