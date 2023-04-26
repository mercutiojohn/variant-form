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
              <label class="el-form-item__label" style="line-height: 32px"
                >操作</label
              >
              <div class="el-form-item__content">
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
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="!!widget.options.showRowNumber"
          class="sub-form-table-extended index"
          style="width: 60px"
        >
          <div class="field-wrapper design-time-bottom-margin">
            <div class="el-form-item">
              <label class="el-form-item__label" style="line-height: 32px"
                >序号</label
              >
              <div class="el-form-item__content">1</div>
            </div>
          </div>
        </div>
        <draggable
          :list="widget.widgetList"
          handle=".drag-handler"
          @add="onSubFormDragAdd"
          @end="onSubFormDragEnd"
          @update="onContainerDragUpdate"
          group="dragGroup"
          ghost-class="ghost"
          animation="200"
          class="full-width"
        >
          <transition-group class="sub-form-table" name="fade" tag="div">
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
              <label class="el-form-item__label" style="line-height: 32px"
                >操作</label
              >
              <div class="el-form-item__content">
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
    },
  },
  created() {
    this.initRefList();
  },
  data() {
    return {
      columnForm: {
        tableCreatorTableColumnList: [],
      },
      options: {
        tableDataTypeOptions: [],
      },
    };
  },
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
    // ------------------------subform-----------------------------
    /** 复选框选中数据 */
    handleTableCreatorTableColumnSelectionChange(selection) {
      this.checkedTableCreatorTableColumn = selection.map((item) => item.index);
    },
    /** 添加列按钮操作 */
    addBetweenRow(index) {
      let obj = {};
      obj.name = "";
      obj.comment = "";
      obj.type = "";
      obj.length = "";
      obj.isNull = "";
      obj.createBy = "";
      obj.updateTime = "";
      obj.createTime = "";
      obj.groupId = "";
      obj.updateBy = "";
      obj.uuid = this.uuid(8, 16);
      this.columnForm.tableCreatorTableColumnList.splice(index, 0, obj);
    },
    /** 建表工具-列信息添加按钮操作 */
    handleAddTableCreatorTableColumn() {
      let obj = {};
      obj.name = "";
      obj.comment = "";
      obj.type = "";
      obj.length = "";
      obj.isNull = "";
      obj.createBy = "";
      obj.updateTime = "";
      obj.createTime = "";
      obj.groupId = "";
      obj.updateBy = "";
      obj.uuid = this.uuid(8, 16);
      this.columnForm.tableCreatorTableColumnList.push(obj);
    },
    deleteRow(index) {
      this.columnForm.tableCreatorTableColumnList.splice(index - 1, 1);
    },
    ifLengthDisabledType(type) {
      return type !== "varchar";
    },
    uuid(len, radix) {
      let chars = "0123456789abcdefghijklmnopqrstuvwxyz";
      let uuid = [];
      let i;
      radix = radix || chars.length;
      if (len) {
        for (i = 0; i < len; i++) {
          uuid[i] = chars[0 | (Math.random() * radix)];
        }
      } else {
        var r;
      }
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | (Math.random() * 16);
          uuid[i] = chars[i == 19 ? (r & 0x3) | 0x8 : r];
        }
      }
      return uuid.join("");
    },
    /** 建表工具-列信息序号 */
    rowTableCreatorTableColumnIndex({ row, rowIndex }) {
      row.index = rowIndex + 1;
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
  justify-content: center;
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
    display: inline-block;
    border: 1px solid #ebeef5;
    border-left: none;
    &:first-child {
      border-left: 1px solid #ebeef5;
    }
    // .drag-empty {
    //   width: 100%;
    // }
  }
}
.full-width {
  width: 100%;
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
  }
}
::v-deep .el-form-item__label {
  margin: 0 10px;
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
</style>
