<template>
  <container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList"
                     :index-of-parent-list="indexOfParentList">
    <div 
      :key="widget.id" 
      class="flex-box-container" 
      :class="[
        selected ? 'selected' : '', 
        customClass
      ]" 
      @click.stop="selectWidget(widget)" 
      :style="{
        
      }"
    >
    <draggable :list="widget.widgetList" v-bind="{group:'dragGroup', ghostClass: 'ghost',animation: 200}"
                 handle=".drag-handler"
                 @add="(evt) => onContainerDragAdd(evt, widget.widgetList)"
                 @update="onContainerDragUpdate" :move="checkContainerMove">
        <transition-group 
          name="fade" 
          tag="div" 
          class="form-widget-list" 
          :style="{
            width: `${widget.options.basic.width}${widget.options.basic.widthMeasure}` || '',
            height: `${widget.options.basic.height}${widget.options.basic.heightMeasure}` || '',
            padding: `${widget.options.basic.padding}${widget.options.basic.paddingMeasure}` || '',
            margin: `${widget.options.basic.margin}${widget.options.basic.marginMeasure}` || '',
            // Flex
            display: 'flex',
            'flex-direction': widget.options.flex.flexDirection  || '',
            'flex-wrap': widget.options.flex.flexWrap || '',
            'justify-content': widget.options.flex.justifyContent || '',
            'align-items': widget.options.flex.alignItems || '',
            gap: `${widget.options.flex.gap}px` || '',
            // Border
            'border-width': `${widget.options.boxBorder.width}px` || '',
            'border-style': widget.options.boxBorder.style || '',
            'border-color': widget.options.boxBorder.color || '',
            // Radius
            'border-radius': `${widget.options.basic.radius.topLeft}px ${widget.options.basic.radius.topRight}px ${widget.options.basic.radius.bottomRight}px ${widget.options.basic.radius.bottomLeft}px` || '',
            // Shadow
            'box-shadow': `${widget.options.shadow.isInset ? 'inset' : ''} ${widget.options.shadow.offsetX}px ${widget.options.shadow.offsetY}px ${widget.options.shadow.blur}px ${widget.options.shadow.expand}px ${widget.options.shadow.color}` || ''
          }"
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
    margin: 3px;

    .form-widget-list {
      min-height: 28px;
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
