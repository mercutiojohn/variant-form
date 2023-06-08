<template>
  <container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList"
                     :index-of-parent-list="indexOfParentList" :style="styleOuterObj">
    <div 
      :key="widget.id" 
      class="flex-box-container" 
      :class="[
        selected ? 'selected' : '', 
        customClass
      ]" 
      @click.stop="selectWidget(widget)"
    >
    <draggable :list="widget.widgetList" v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 200}"
                 handle=".drag-handler"
                 @add="(evt) => onContainerDragAdd(evt, widget.widgetList)"
                 @update="onContainerDragUpdate" :move="checkContainerMove">
        <transition-group 
          name="fade" 
          tag="div" 
          class="form-widget-list" 
          :style="styleObj"
        >
          <template v-for="(subWidget, swIdx) in widget.widgetList">
            <template v-if="'container' === subWidget.category">
              <component :is="subWidget.type + '-widget'" :widget="subWidget" :designer="designer" :key="subWidget.id" :parent-list="widget.widgetList"
                         :index-of-parent-list="swIdx" :parent-widget="widget"></component>
            </template>
            <template v-else>
              <component :is="subWidget.type + '-widget'" :field="subWidget" :designer="designer" :key="subWidget.id" :parent-list="widget.widgetList"
                         :index-of-parent-list="swIdx" :parent-widget="widget" :design-state="true"></component>
            </template>
          </template>
        </transition-group>
      </draggable>
    </div>
    <!-- <el-card :key="widget.id" class="flex-box-container" @click.native.stop="selectWidget(widget)"
             :shadow="widget.options.shadow" :style="{width: widget.options.cardWidth + '!important' || ''}"
             :class="[selected ? 'selected' : '', !!widget.options.folded ? 'folded' : '', customClass]">
      <div slot="header" class="clear-fix">
        <span>{{widget.options.label}}</span>
        <i v-if="widget.options.showFold" class="float-right"
           :class="[!widget.options.folded ? 'el-icon-arrow-down' : 'el-icon-arrow-up']"
           @click="toggleCard"></i>
      </div>
      <draggable :list="widget.widgetList" v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 200}"
                 handle=".drag-handler"
                 @add="(evt) => onContainerDragAdd(evt, widget.widgetList)"
                 @update="onContainerDragUpdate" :move="checkContainerMove">
        <transition-group name="fade" tag="div" class="form-widget-list">
          <template v-for="(subWidget, swIdx) in widget.widgetList">
            <template v-if="'container' === subWidget.category">
              <component :is="subWidget.type + '-widget'" :widget="subWidget" :designer="designer" :key="subWidget.id" :parent-list="widget.widgetList"
                         :index-of-parent-list="swIdx" :parent-widget="widget"></component>
            </template>
            <template v-else>
              <component :is="subWidget.type + '-widget'" :field="subWidget" :designer="designer" :key="subWidget.id" :parent-list="widget.widgetList"
                         :index-of-parent-list="swIdx" :parent-widget="widget" :design-state="true"></component>
            </template>
          </template>
        </transition-group>
      </draggable>
    </el-card> -->
  </container-wrapper>
</template>

<script>
  import i18n from "@/utils/i18n"
  import containerMixin from "@/components/form-designer/form-widget/container-widget/containerMixin"
  import Draggable from 'vuedraggable'
  import ContainerWrapper from "@/components/form-designer/form-widget/container-widget/container-wrapper"
  import FieldComponents from '@/components/form-designer/form-widget/field-widget/index'
  import refMixinDesign from "@/components/form-designer/refMixinDesign"

  export default {
    name: "flex-box-widget",
    componentName: 'ContainerWidget',
    mixins: [i18n, containerMixin, refMixinDesign],
    inject: ['refList'],
    components: {
      Draggable,
      ContainerWrapper,
      ...FieldComponents,
    },
    props: {
      widget: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,
      designer: Object,
    },
    computed: {
      selected() {
        return this.widget.id === this.designer.selectedId
      },

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
          // Flex
          display: 'flex',
          'flex-direction': this.widget.options.flex.flexDirection  || '',
          'flex-wrap': this.widget.options.flex.flexWrap || '',
          'justify-content': this.widget.options.flex.justifyContent || '',
          'align-items': this.widget.options.flex.alignItems || '',
          gap: `${this.widget.options.flex.gap}px` || '',
        }
      },
      styleOuterObj() {
        return {
          width: `${this.widget.options.basic.width}${this.widget.options.basic.widthMeasure}` || 'unset',
          height: `${this.widget.options.basic.height}${this.widget.options.basic.heightMeasure}` || 'unset',
          'overflow': 'hidden',
          background: `${this.widget.options.basic.backgroundType === 'gradient' ? this.widget.options.basic.gradient : this.widget.options.basic.backgroundType === 'color' ? this.widget.options.basic.backgroundColor : 'none'}` || 'none',
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
    methods: {
      /**
       * 检查接收哪些组件拖放，如不接受某些组件拖放，则根据组件类型判断后返回false
       * @param evt
       * @returns {boolean}
       */
      checkContainerMove(evt) {
        return true
      },
    }
  }
</script>

<style lang="scss" scoped>
  .flex-box-container.selected {
    outline: 2px solid $--color-primary !important;
  }

  .flex-box-container {
    border: 1px dashed #369;
    margin: 3px;
    height: calc(100% - 8px);
    > div {
      height: 100%;
    }
    .form-widget-list {
      min-height: 28px;
      height: 100%;
    }
  }

  ::v-deep .el-card__header {
    padding: 10px 12px;
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
