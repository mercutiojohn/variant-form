<template>
  <container-wrapper
    :designer="designer"
    :widget="widget"
    :parent-widget="parentWidget"
    :parent-list="parentList"
    :index-of-parent-list="indexOfParentList"
  >
    <!-- <el-card 
      class="card-container" 
      :shadow="widget.options.shadow" 
    >
      <div slot="header" class="clear-fix">
        <span>{{widget.options.label}}</span>
        <i v-if="widget.options.showFold" class="float-right"
           :class="[!widget.options.folded ? 'el-icon-arrow-down' : 'el-icon-arrow-up']"
           @click="toggleCard"></i>
      </div>
    </el-card> -->
    <span class="test" ref="test"></span>
    <div
      class="sub-form-container"
      :class="{ selected: selected }"
      @click.stop="selectWidget(widget)"
    >
      <el-form label-position="top">
        <div
          v-if="leftActionColumn"
          class="sub-form-table-extended function"
        >
          <div class="field-wrapper design-time-bottom-margin">
            <div class="el-form-item">
              <label :class="[
                widget.options.labelAlign,
                'el-form-item__label',
              ]"
                >操作</label
              >
              <div class="el-form-item__content">
                <template v-if="!widget.options.rowButtons.length">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="下方添加行"
                    placement="top-end"
                  >
                    <el-button
                      :disabled="true"
                      size="mini"
                      type="text"
                      icon="el-icon-plus"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="删除当前行"
                    placement="top-end"
                  >
                    <el-button
                      :disabled="true"
                      size="mini"
                      type="text"
                      icon="el-icon-delete"
                    ></el-button>
                  </el-tooltip>
                </template>
                <template v-for="(item, index) in widget.options.rowButtons">
                  <el-button
                    v-if="!item.tableHide"
                    :icon="item.icon || ''"
                    :key="index"
                    :type="item.type || 'text'"
                    size="small"
                  >
                  {{ item.label }}
                  </el-button>
                </template>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="!!widget.options.showRowNumber"
          class="sub-form-table-extended index"
        >
          <div class="field-wrapper design-time-bottom-margin">
            <div class="el-form-item">
              <label :class="[
                widget.options.labelAlign,
                'el-form-item__label',
              ]"
                >序号</label
              >
              <div class="el-form-item__content">1</div>
            </div>
          </div>
        </div>
        <draggable
          :list="widget.widgetList"
          handle=".drag-handler"
          @add="onSubFormDragAdd($event, widget.widgetList)"
          @end="onSubFormDragEnd"
          @update="onContainerDragUpdate"
          group="dragGroup"
          ghost-class="ghost"
          animation="200"
          :class="{'full-width':true, 'overflowed':overflowed}"
          ref="overflowBox"
        >
          <transition-group class="sub-form-table" name="fade" tag="div" ref="innerTable">
            <div
              v-for="(subWidget, swIdx) in widget.widgetList"
              :key="subWidget.id + 'tc'"
              class="sub-form-table-column"
              :style="{ width: subWidget.options.columnWidth, 'max-width': subWidget.options.columnWidth }"
            >
              <component
                :key="subWidget.id"
                :is="subWidget.type + '-widget'"
                tag="component"
                :field="subWidget"
                :designer="designer"
                :parent-list="widget.widgetList"
                :index-of-parent-list="swIdx"
                :parent-widget="widget"
                :design-state="true"
                :sub-form-item-flag="true"
              ></component>
            </div>
          </transition-group>
        </draggable>
        <!-- <div
          v-show="!widget.widgetList.length"
          class="sub-form-table-extended drag-empty"
        >
          <div class="field-wrapper design-time-bottom-margin">
            <div class="el-form-item">
              <div class="el-form-item__content empty">
                <span>请拖入组件</span>
              </div>
            </div>
          </div>
        </div> -->
        <div
          v-if="!leftActionColumn"
          class="sub-form-table-extended function"
        >
          <div class="field-wrapper design-time-bottom-margin">
            <div class="el-form-item">
              <label :class="[
                widget.options.labelAlign,
                'el-form-item__label',
              ]"
                >操作</label
              >
              <div class="el-form-item__content">
                <template v-if="!widget.options.rowButtons.length">
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="下方添加行"
                    placement="top-end"
                  >
                    <el-button
                      :disabled="true"
                      size="mini"
                      type="text"
                      icon="el-icon-plus"
                    ></el-button>
                  </el-tooltip>
                  <el-tooltip
                    class="item"
                    effect="dark"
                    content="删除当前行"
                    placement="top-end"
                  >
                    <el-button
                      :disabled="true"
                      size="mini"
                      type="text"
                      icon="el-icon-delete"
                    ></el-button>
                  </el-tooltip>
                </template>
                <template v-for="(item, index) in widget.options.rowButtons">
                  <el-button
                    v-if="!item.tableHide"
                    :icon="item.icon || ''"
                    :key="index"
                    :type="item.type || 'text'"
                    size="small"
                  >
                  {{ item.label }}
                  </el-button>
                </template>
              </div>
            </div>
          </div>
        </div>
      </el-form>
    </div>
  </container-wrapper>
</template>

<script>
import i18n from "@/utils/i18n";
import containerMixin from "@/components/form-designer/form-widget/container-widget/containerMixin";
import Draggable from "vuedraggable";
import ContainerWrapper from "@/components/form-designer/form-widget/container-widget/container-wrapper";
import FieldComponents from "@/components/form-designer/form-widget/field-widget/index";
import refMixinDesign from "@/components/form-designer/refMixinDesign";

export default {
  name: "sub-form-widget",
  componentName: "ContainerWidget",
  mixins: [i18n, containerMixin, refMixinDesign],
  inject: ["refList"],
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
      return this.widget.id === this.designer.selectedId;
    },
    leftActionColumn() {
      return "left" === (this.widget.options.actionColumnPosition || "right");
    },
    customClass() {
      return this.widget.options.customClass || "";
    }
  },
  created() {
    this.initRefList();
  },
  mounted() {
    this.$nextTick(()=>{
      this.updateBoxWidth('')
    })
  },
  watch: {
    widget: {
      handler() {
        this.updateBoxWidth('')
      },
      deep: true
    }
  },
  data() {
    return {
      columnForm: {
        tableCreatorTableColumnList: [],
      },
      options: {
        tableDataTypeOptions: [],
      },
      overflowed: false
    };
  },
  methods: {
    updateBoxWidth(e){
      this.$nextTick(()=>{
        let overflowBoxWidth = this.$refs.overflowBox?.$el.offsetWidth || 0
        let innerTableWidth = 0
        this.$refs.innerTable.$children.forEach((element)=>{
          innerTableWidth += element.$el.offsetWidth
        })
        this.overflowed = overflowBoxWidth < innerTableWidth
        // console.log('[updateBoxWidth]', overflowBoxWidth, innerTableWidth, '[return]:', overflowBoxWidth < innerTableWidth, e)
      })
    },
    onSubFormDragAdd(event, widgetList) {
      // console.log('[onSubFormDragAdd]: [event]',event,'[widgetList]',widgetList)
      const newIndex = event.newIndex;
      if (widgetList[newIndex]) {
        this.designer.setSelected(widgetList[newIndex]);
      }
      this.designer.emitHistoryChange();
      this.designer.emitEvent("field-selected", this.widget);
      this.updateBoxWidth('')
    },
    onSubFormDragEnd(e) {
      // console.log("sub form drag end: ", e);
      this.updateBoxWidth(e)
    },
    getLabelAlign(widget, subWidget) {
      return subWidget.options.labelAlign || widget.options.labelAlign || 'label-center-align';
    },
    // 是否显示
    showBtn(item, row) {
      // const row = row
      return (
        item.tableHideCustom ? 
          !!item.isHide ? 
            eval(item.isHide) 
            :
            true 
          : 
          !item.tableHide
      )
    },
    getLabel(item, label) {
      return label
    },
  },
};
</script>

<style lang="scss" scoped>
.card-container.selected {
  outline: 2px solid $--color-primary !important;
}

.card-container {
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

.clear-fix:before,
.clear-fix:after {
  display: table;
  content: "";
}

.clear-fix:after {
  clear: both;
}

.float-right {
  float: right;
}
// ---
.sub-form-container .sub-form-table {
  min-height: 68px;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  height: 100%;
}
// .ghost {
//   height: 74px;
//   width: 100px;
// }
.sub-form-container {
  padding: 8px;
  border: 1px dashed #369;
}
.sub-form-container.selected {
  outline: 2px solid #409eff !important;
}
.sub-form-container .sub-form-table div.sub-form-table-column {
  display: inline-block;
  border-right: 1px solid #ebeef5;
  border-left: none;
  // padding: 10px;
}
.sub-form-container .sub-form-table .ghost + div.sub-form-table-column {
  border-left: 1px solid #ebeef5;
}
// .sub-form-container .sub-form-table div.sub-form-table-column:first-child {
//   border-left: 1px solid #ebeef5;
// }
::v-deep .sub-form-container .el-form {
  display: flex;
  align-items: stretch;
  justify-content: center;
  .sub-form-table-extended {
    flex-shrink: 0;
    display: inline-block;
    border: 1px solid #ebeef5;
    border-left: none;
    &:first-child {
      border-left: 1px solid #ebeef5;
    }
    .index{
      width: 60px
    }
    // .drag-empty {
    //   width: 100%;
    // }
  }
}
.full-width {
  width: 100%;
  overflow: hidden;
  border: 1px solid #ebeef5;
  border-left: none;
  background: #eee;
  &:first-child {
    border-left: 1px solid #ebeef5;
  }
  .sub-form-table-column {
    background: #fff;
    width: 100%;
    max-width: 220px;
    min-width: 180px;
  }
}
.full-width.overflowed {
  overflow-x: scroll;
}
::v-deep .el-form-item__label {
  line-height: 32px;
  padding: 10px;
  width: 100%;
  text-align: center;
}
::v-deep .el-form-item__content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}
::v-deep .el-form-item__content:not(.empty) {
  border-top: 1px solid #ebeef5;
}
.label-center-left {
  text-align: left;
}

.label-center-align {
  text-align: center;
}

.label-right-align {
  text-align: right;
}
::v-deep .static-content-item {
  margin-top: 52px;
  border-top: 1px solid #ebeef5;
  padding: 10px;
  display:flex !important;
  align-items: center;
  justify-content: center;
}
</style>
