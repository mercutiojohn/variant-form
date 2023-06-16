<template>
  <container-item-wrapper :widget="widget" :style="styleOuterObj">
    <div @click.stop="selectWidget(widget)" :style="styleObj" class="card-container" :ref="widget.id" :class="[customClass]" v-show="!widget.options.hidden">
      <template v-if="!!widget.widgetList && (widget.widgetList.length > 0)">
        <template v-for="(subWidget, swIdx) in widget.widgetList">
          <template v-if="'container' === subWidget.category">
            <component :is="getComponentByContainer(subWidget)" :widget="subWidget" :key="swIdx" :parent-list="widget.widgetList"
                       :index-of-parent-list="swIdx" :parent-widget="widget">
              <!-- 递归传递插槽！！! -->
              <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
                <slot :name="slot" v-bind="scope"/>
              </template>
            </component>
          </template>
          <template v-else>
            <component :is="subWidget.type + '-widget'" :field="subWidget" :designer="null" :key="swIdx" :parent-list="widget.widgetList"
                       :index-of-parent-list="swIdx" :parent-widget="widget">
              <!-- 递归传递插槽！！！ -->
              <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
                <slot :name="slot" v-bind="scope"/>
              </template>
            </component>
          </template>
        </template>
      </template>
    </div>
    <!-- <el-card :key="widget.id" class="card-container" :class="[!!widget.options.folded ? 'folded' : '', customClass]"
             :shadow="widget.options.shadow" :style="{width: widget.options.cardWidth + '!important' || ''}"
             :ref="widget.id" v-show="!widget.options.hidden">
      <div slot="header" class="clear-fix">
        <span>{{widget.options.label}}</span>
        <i v-if="widget.options.showFold" class="float-right"
           :class="[!widget.options.folded ? 'el-icon-arrow-down' : 'el-icon-arrow-up']" @click="toggleCard"></i>
      </div>
      <template v-if="!!widget.widgetList && (widget.widgetList.length > 0)">
        <template v-for="(subWidget, swIdx) in widget.widgetList">
          <template v-if="'container' === subWidget.category">
            <component :is="getComponentByContainer(subWidget)" :widget="subWidget" :key="swIdx" :parent-list="widget.widgetList"
                       :index-of-parent-list="swIdx" :parent-widget="widget">
              <!- 递归传递插槽！！！ ->
              <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
                <slot :name="slot" v-bind="scope"/>
              </template>
            </component>
          </template>
          <template v-else>
            <component :is="subWidget.type + '-widget'" :field="subWidget" :designer="null" :key="swIdx" :parent-list="widget.widgetList"
                       :index-of-parent-list="swIdx" :parent-widget="widget">
              <!- 递归传递插槽！！！ ->
              <template v-for="slot in Object.keys($scopedSlots)" v-slot:[slot]="scope">
                <slot :name="slot" v-bind="scope"/>
              </template>
            </component>
          </template>
        </template>
      </template>
    </el-card> -->
  </container-item-wrapper>
</template>

<script>
  import emitter from '@/utils/emitter'
  import i18n from "@/utils/i18n"
  import refMixin from "@/components/form-render/refMixin"
  import ContainerItemWrapper from '@/components/form-render/container-item/container-item-wrapper'
  import containerItemMixin from "@/components/form-render/container-item/containerItemMixin"
  import FieldComponents from '@/components/form-designer/form-widget/field-widget/index'

  export default {
    name: "grid-box-item",
    componentName: 'ContainerItem',
    mixins: [emitter, i18n, refMixin, containerItemMixin],
    components: {
      ContainerItemWrapper,
      ...FieldComponents,
    },
    props: {
      widget: Object,
    },
    inject: ['refList', 'sfRefList', 'globalModel'],
    computed: {
      customClass() {
        return this.widget.options.customClass || ''
      },
      styleObj() {
        return {
          'box-sizing': 'border-box',
          'overflow': 'hidden',
          width: '100%',
          height: '100%',
          // padding: `${this.widget.options.basic.padding}${this.widget.options.basic.paddingMeasure}` || '',
          padding: `${this.widget.options.basic.padding.top}px ${this.widget.options.basic.padding.right}px ${this.widget.options.basic.padding.bottom}px ${this.widget.options.basic.padding.left}px` || '',
          background: `${this.widget.options.basic.backgroundType === 'gradient' ? this.widget.options.basic.gradient : this.widget.options.basic.backgroundType === 'color' ? this.widget.options.basic.backgroundColor : 'none'}` || 'none',
          // Grid
          display: 'grid',
          'grid-template-columns': `repeat(${this.widget.options.grid.columns}, 1fr)`,
          'grid-template-rows': `auto`,
          'grid-row-gap': `${this.widget.options.grid.rowGap}px`,
          'grid-column-gap': `${this.widget.options.grid.columnGap}px`,
          'max-width': '100%',
        }
      },
      styleOuterObj() {
        return {
          width: `${this.widget.options.basic.width}${this.widget.options.basic.widthMeasure}` || 'unset',
          height: `${this.widget.options.basic.height}${this.widget.options.basic.heightMeasure}` || 'unset',
          'overflow': 'hidden',
          // Radius
          'border-radius': `${this.widget.options.basic.radius.topLeft}px ${this.widget.options.basic.radius.topRight}px ${this.widget.options.basic.radius.bottomRight}px ${this.widget.options.basic.radius.bottomLeft}px` || '',
          // Shadow
          'box-shadow': this.widget.options.shadow.use ? `${this.widget.options.shadow.isInset ? 'inset' : ''} ${this.widget.options.shadow.offsetX}px ${this.widget.options.shadow.offsetY}px ${this.widget.options.shadow.blur}px ${this.widget.options.shadow.expand}px ${this.widget.options.shadow.color}` : 'none',
          // margin: `${this.widget.options.basic.margin}${this.widget.options.basic.marginMeasure}` || '',
          margin: `${this.widget.options.basic.margin.top}px ${this.widget.options.basic.margin.right}px ${this.widget.options.basic.margin.bottom}px ${this.widget.options.basic.margin.left}px` || '',
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
      this.initRefList()
    },
    beforeDestroy() {
      this.unregisterFromRefList()
    },
    methods: {
      toggleCard() {
        this.widget.options.folded = !this.widget.options.folded
      },

    },
  }
</script>

<style lang="scss" scoped>
  ::v-deep .el-card__header {
    // padding: 10px 12px;
  }

  .folded ::v-deep .el-card__body {
    display: none;
  }

  .clear-fix:before, .clear-fix:after {
    display: table;
    content: "";
  }

  .clear-fix:after {
    clear: both;
  }

  .float-right {
    float: right;
  }

</style>
