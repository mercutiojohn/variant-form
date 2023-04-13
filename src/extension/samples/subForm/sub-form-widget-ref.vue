<template>
  <container-wrapper
    :designer="designer"
    :widget="widget"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
  >
    <div
      class="sub-form-container"
      :class="{ selected: selected }"
      @click.stop="selectWidget(widget)"
    >
      <el-form label-position="top">
        <draggable
          :list="widget.widgetList"
          handle=".drag-handler"
          @add="onSubFormDragAdd"
          @end="onSubFormDragEnd"
          @update="onContainerDragUpdate"
          group="dragGroup"
          ghost-class="ghost"
          animation="200"
        >
          <transition-group class="sub-form-table" name="fade" tag="div">
            <div
              v-for="(t, n) in widget.widgetList"
              :key="t.id + 'tc'"
              class="sub-form-table-column"
              :style="{ width: t.options.columnWidth }"
            >
              <component
                :key="t.id"
                :is="t.type + '-widget'"
                tag="component"
                :field="t"
                :designer="designer"
                :parent-list="widget.widgetList"
                :index-of-parent-list="n"
                :parent-widget="widget"
                :design-state="true"
                :sub-form-item-flag="true"
              ></component>
            </div>
          </transition-group>
        </draggable>
      </el-form>
    </div>
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
  name: "sub-form-widget",
  componentName: "ContainerWidget",
  mixins: [i18n, containerMixin, refMixinDesign],
  inject: ["refList"],
  components: { ContainerWrapper, Draggable, ...FieldComponents },
  props: {
    widget: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,
  },
  provide() {
    const self = this;
    return {
      getSubFormFieldFlag() {
        return true;
      },
      getSubFormName() {
        return self.widget.options.name;
      },
    };
  },
  computed: {
    selected() {
      return this.widget.id === this.designer.selectedId;
    },
    customClass() {
      return this.widget.options.customClass || "";
    },
  },
  watch: {},
  created() {
    this.initRefList();
  },
  mounted() {},
  methods: {
    onSubFormDragAdd(e, t) {
      const newIndex = e.newIndex;
      if (t[newIndex]) {
        this.designer.setSelected(t[newIndex]);
      }
      this.designer.emitHistoryChange();
      console.log("test", "onSubFormDragAdd");
      this.designer.emitEvent("field-selected", this.widget);
    },
    onSubFormDragEnd(e) {
      console.log("sub form drag end: ", e);
    },
  },
};
</script>