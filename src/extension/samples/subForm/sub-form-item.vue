<template>
  <container-item-wrapper :widget="widget">
    <div :key="widget.id" class="sub-form-container" v-show="!widget.options.hidden">
      
      <el-table
        :data="formModel[widget.options.name]"
        class="column-table"
        highlight-current-row
        border
      >
        <el-table-column
          v-if="leftActionColumn && !actionDisabled"
          label="操作"
          :header-align="widget.options.labelAlign === 'label-left-align' ? 'left' : widget.options.labelAlign === 'label-right-align' ? 'right' : 'center'"
          align="center"
          class-name="small-padding fixed-width"
          fixed="left"
        >
          <template slot-scope="scope">
            <template v-if="!widget.options.rowButtons.length">
              <el-tooltip
                :disabled="actionDisabled"
                class="item"
                effect="dark"
                content="下方添加行"
                placement="top-end"
              >
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-plus"
                  @click="insertSubFormRow(scope.$index)"
                ></el-button>
              </el-tooltip>
              <el-tooltip
                :disabled="actionDisabled"
                class="item"
                effect="dark"
                content="删除当前行"
                placement="top-end"
              >
                <el-button
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="deleteSubFormRow(scope.$index)"
                ></el-button>
              </el-tooltip>
            </template>
            <template v-for="(item, index) in widget.options.rowButtons">
              <el-button
                v-if="showBtn(item, scope.row)"
                :icon="item.icon || ''"
                :key="index"
                :disabled="actionDisabled"
                :type="item.type || 'text'"
                size="small"
                @click="itemClick(item, scope.row, scope.$index)"
              >{{ getLabel(scope.row, item.label) }}</el-button>
            </template>
          </template>
        </el-table-column>
        <el-table-column
          v-if="!!widget.options.showRowNumber"
          label="序号"
          :header-align="widget.options.labelAlign === 'label-left-align' ? 'left' : widget.options.labelAlign === 'label-right-align' ? 'right' : 'center'"
          align="center"
          class-name="small-padding fixed-width"
          fixed="left"
          width="120"
        >
          <template slot-scope="scope">{{scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column
          v-for="(subWidget, swIdx) in widget.widgetList"
          :header-align="getLabelAlign(widget,subWidget)"
          align="center"
          :width="subWidget.options.columnWidth || 'auto'"
          :key="swIdx"
          v-if="!subWidget.options.hidden"
        >
          <div slot="header" slot-scope="scope" :class="subWidget.options.labelAlign || 'label-left-align'">
            <span v-if="subWidget.options.required" style="content: '*';color: #f56c6c;margin-right: 4px;">*</span>
            <span v-if="!!subWidget.options.labelIconClass" class="custom-label">
              <template v-if="subWidget.options.labelIconPosition === 'front'">
                <template v-if="!!subWidget.options.labelTooltip">
                  <el-tooltip :content="subWidget.options.labelTooltip" effect="light">
                    <i :class="subWidget.options.labelIconClass"></i>
                  </el-tooltip>
                  {{ subWidget.options.label }}
                </template>
                <template v-else>
                  <i :class="subWidget.options.labelIconClass"></i>
                  {{ subWidget.options.label }}
                </template>
              </template>
              <template v-else-if="subWidget.options.labelIconPosition === 'rear'">
                <template v-if="!!subWidget.options.labelTooltip">
                  {{ subWidget.options.label }}
                  <el-tooltip :content="subWidget.options.labelTooltip" effect="light">
                    <i :class="subWidget.options.labelIconClass"></i>
                  </el-tooltip>
                </template>
                <template v-else>
                  {{ subWidget.options.label }}
                  <i :class="subWidget.options.labelIconClass"></i>
                </template>
              </template>
            </span>
            <template v-else>
              <span :title="subWidget.options.labelTooltip">
                {{ subWidget.options.label }}
              </span>
            </template>
          </div>
          <template slot-scope="scope">
            <div
              class="sub-form-table-column hide-label"
              :key="subWidget.id + 'tc' + rowIdData[scope.$index]"
            >
              <!-- :style="{ width: subWidget.options.columnWidth }" -->
              <!-- {{subWidget.id + 'tc' + rowIdData[scope.$index]}} -->
              <component
                :is="subWidget.type + '-widget'"
                :field="fieldSchemaData[scope.$index][swIdx]"
                :key="fieldSchemaData[scope.$index][swIdx].id"
                :parent-list="widget.widgetList"
                :index-of-parent-list="swIdx"
                :parent-widget="widget"
                :sub-form-row-id="rowIdData[scope.$index]"
                :sub-form-row-index="scope.$index"
                :sub-form-col-index="swIdx"
                :disabled="widgetDisabled || subWidget.options.disabled"
              >
                <!-- 子表单暂不支持插槽！！！ -->
              </component>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          v-if="!leftActionColumn && !actionDisabled"
          label="操作"
          :header-align="widget.options.labelAlign === 'label-left-align' ? 'left' : widget.options.labelAlign === 'label-right-align' ? 'right' : 'center'"
          align="center"
          class-name="small-padding fixed-width"
          fixed="right"
        >
          <template slot-scope="scope">
            <template v-if="!widget.options.rowButtons.length">
              <el-tooltip class="item" effect="dark" content="下方添加行" placement="top-end">
                <el-button
                  :disabled="actionDisabled"
                  size="mini"
                  type="text"
                  icon="el-icon-plus"
                  @click="insertSubFormRow(scope.$index)"
                ></el-button>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除当前行" placement="top-end">
                <el-button
                  :disabled="actionDisabled"
                  size="mini"
                  type="text"
                  icon="el-icon-delete"
                  @click="deleteSubFormRow(scope.$index)"
                ></el-button>
              </el-tooltip>
            </template>
            <template v-for="(item, index) in widget.options.rowButtons">
              <el-button
                v-if="showBtn(item, scope.row)"
                :icon="item.icon || ''"
                :key="index"
                :disabled="actionDisabled"
                :type="item.type || 'text'"
                size="small"
                @click="itemClick(item, scope.row, scope.$index)"
              >{{ getLabel(scope.row, item.label) }}</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
      <div class="add-block" v-if="!actionDisabled">
        <el-button
          type="text"
          icon="el-icon-plus"
          size="mini"
          :disabled="actionDisabled"
          @click="addSubFormRow"
        >{{widget.options.addRowText}}</el-button>
      </div>
    </div>
  </container-item-wrapper>
</template>

<script>
import i18n from "@/utils/i18n";
import emitter from "@/utils/emitter";
import { deepClone, generateId } from "@/utils/util";
import refMixin from "@/components/form-render/refMixin";
import ContainerItemWrapper from "@/components/form-render/container-item/container-item-wrapper";
import containerItemMixin from "@/components/form-render/container-item/containerItemMixin";
import FieldComponents from "@/components/form-designer/form-widget/field-widget/index";

export default {
  name: "sub-form-item",
  componentName: "ContainerItem",
  mixins: [emitter, i18n, refMixin, containerItemMixin],
  components: {
    ContainerItemWrapper,
    ...FieldComponents
  },
  props: {
    widget: Object
  },
  inject: ["refList", "sfRefList", "globalModel"],
  // , "getReadMode"
  data() {
    return {
      rowIdData: [],
      fieldSchemaData: [],
      actionDisabled: false
    };
  },
  computed: {
    // isReadMode () {
    //   return this.getReadMode();
    // },
    leftActionColumn() {
      return "left" === (this.widget.options.actionColumnPosition || "right");
    },
    widgetDisabled() {
      return !!this.widget.options.disabled;
    }
  },
  created() {
    this.initRefList();
    this.registerSubFormToRefList();
    this.initRowIdData(true);
    this.initFieldSchemaData();
    this.initEventHandler();
  },
  mounted() {
    this.handleSubFormFirstRowAdd(); //默认添加首行后，主动触发相关事件！！
  },
  beforeDestroy() {
    this.unregisterFromRefList();
  },
  methods: {
    getLabelAlign(widget, subWidget) {
      const wid =
        widget.options.labelAlign === "label-left-align"
          ? "left"
          : widget.options.labelAlign === "label-right-align"
          ? "right"
          : "center";
      const sub_wid =
        subWidget.options.labelAlign === "label-left-align"
          ? "left"
          : subWidget.options.labelAlign === "label-right-align"
          ? "right"
          : "center";
      return sub_wid || wid;
      // return subWidget.options.labelAlign || widget.options.labelAlign;
    },

    registerSubFormToRefList() {
      if (this.widget.type === "sub-form") {
        this.sfRefList[this.widget.options.name] = this;
      }
    },

    initRowIdData(initFlag) {
      if (this.widget.type === "sub-form") {
        this.rowIdData.splice(0, this.rowIdData.length); //清除数组必须用splice，length=0不会响应式更新！！
        let subFormModel = this.formModel[this.widget.options.name];
        if (!!subFormModel && subFormModel.length > 0) {
          subFormModel.forEach(() => {
            this.rowIdData.push("id" + generateId());
          });

          if (!!initFlag) {
            //注意：事件触发需延期执行，SumFormDataChange事件处理代码中可能存在尚未创建完成的组件！！
            setTimeout(() => {
              this.handleSubFormRowChange(subFormModel);
            }, 800);
          }
        }
      }
    },

    addToRowIdData() {
      this.rowIdData.push("id" + generateId());
    },

    insertToRowIdData(rowIndex) {
      this.rowIdData.splice(rowIndex, 0, "id" + generateId());
    },

    deleteFromRowIdData(rowIndex) {
      this.rowIdData.splice(rowIndex, 1);
    },

    getRowIdData() {
      return this.rowIdData;
    },

    getWidgetRefOfSubForm(widgetName, rowIndex) {
      let realWidgetName = widgetName + "@row" + this.rowIdData[rowIndex];
      return this.getWidgetRef(realWidgetName);
    },

    initFieldSchemaData() {
      //初始化fieldSchemaData！！！
      if (this.widget.type !== "sub-form") {
        return;
      }

      let rowLength = this.rowIdData.length;
      this.fieldSchemaData.splice(0, this.fieldSchemaData.length); //清除数组必须用splice，length=0不会响应式更新！！
      if (rowLength > 0) {
        for (let i = 0; i < rowLength; i++) {
          let fieldSchemas = [];
          this.widget.widgetList.forEach(swItem => {
            fieldSchemas.push(this.cloneFieldSchema(swItem));
          });
          this.fieldSchemaData.push(fieldSchemas);
        }
      }
    },

    addToFieldSchemaData(rowIndex) {
      let fieldSchemas = [];
      this.widget.widgetList.forEach(swItem => {
        fieldSchemas.push(this.cloneFieldSchema(swItem));
      });

      if (rowIndex === undefined) {
        this.fieldSchemaData.push(fieldSchemas);
      } else {
        this.fieldSchemaData.splice(rowIndex, 0, fieldSchemas);
      }
    },

    deleteFromFieldSchemaData(rowIndex) {
      this.fieldSchemaData.splice(rowIndex, 1);
    },

    cloneFieldSchema(fieldWidget) {
      let newFieldSchema = deepClone(fieldWidget);
      newFieldSchema.id = fieldWidget.type + generateId();
      return newFieldSchema;
    },

    initEventHandler() {
      if (this.widget.type !== "sub-form") {
        return;
      }

      this.$on("setFormData", newFormData => {
        this.initRowIdData(false);
        this.initFieldSchemaData();

        let subFormData = newFormData[this.widget.options.name] || [];
        setTimeout(() => {
          //延时触发SubFormRowChange事件, 便于更新计算字段！！
          this.handleSubFormRowChange(subFormData);
        }, 800);
      });
    },

    handleSubFormFirstRowAdd() {
      if (this.widget.type !== "sub-form") {
        return;
      }

      if (!!this.widget.options.showBlankRow && this.rowIdData.length === 1) {
        let oldSubFormData = this.formModel[this.widget.options.name] || [];
        this.handleSubFormRowAdd(oldSubFormData, this.rowIdData[0]);
        this.handleSubFormRowChange(oldSubFormData);
      }
    },

    addSubFormRow() {
      let newSubFormDataRow = {};
      this.widget.widgetList.forEach(subFormItem => {
        if (!!subFormItem.formItemFlag) {
          newSubFormDataRow[subFormItem.options.name] =
            subFormItem.options.defaultValue;
        }
      });

      let oldSubFormData = this.formModel[this.widget.options.name] || [];
      oldSubFormData.push(newSubFormDataRow);
      this.addToRowIdData();
      this.addToFieldSchemaData();

      this.handleSubFormRowAdd(
        oldSubFormData,
        this.rowIdData[oldSubFormData.length - 1]
      );
      this.handleSubFormRowChange(oldSubFormData);
    },

    insertSubFormRow(beforeFormRowIndex) {
      let newSubFormDataRow = {};
      this.widget.widgetList.forEach(subFormItem => {
        if (!!subFormItem.formItemFlag) {
          newSubFormDataRow[subFormItem.options.name] =
            subFormItem.options.defaultValue;
        }
      });

      let oldSubFormData = this.formModel[this.widget.options.name] || [];
      oldSubFormData.splice(beforeFormRowIndex, 0, newSubFormDataRow);
      this.insertToRowIdData(beforeFormRowIndex);
      this.addToFieldSchemaData(beforeFormRowIndex);

      this.handleSubFormRowInsert(
        oldSubFormData,
        this.rowIdData[beforeFormRowIndex]
      );
      this.handleSubFormRowChange(oldSubFormData);
    },

    deleteSubFormRow(formRowIndex) {
      this.$confirm(
        this.i18nt("render.hint.deleteSubFormRow") + "?",
        this.i18nt("render.hint.prompt"),
        {
          confirmButtonText: this.i18nt("render.hint.confirm"),
          cancelButtonText: this.i18nt("render.hint.cancel")
        }
      )
        .then(() => {
          let oldSubFormData = this.formModel[this.widget.options.name] || [];
          let deletedDataRow = deepClone(oldSubFormData[formRowIndex]);
          oldSubFormData.splice(formRowIndex, 1);
          this.deleteFromRowIdData(formRowIndex);
          this.deleteFromFieldSchemaData(formRowIndex);

          this.handleSubFormRowDelete(oldSubFormData, deletedDataRow);
          this.handleSubFormRowChange(oldSubFormData);
        })
        .catch(() => {
          //
        });
    },

    handleSubFormRowChange(subFormData) {
      // this.$forceUpdate();
      if (!!this.widget.options.onSubFormRowChange) {
        let customFunc = new Function(
          "subFormData",
          this.widget.options.onSubFormRowChange
        );
        customFunc.call(this, subFormData);
      }
    },

    handleSubFormRowAdd(subFormData, newRowId) {
      if (!!this.widget.options.onSubFormRowAdd) {
        let customFunc = new Function(
          "subFormData",
          "newRowId",
          this.widget.options.onSubFormRowAdd
        );
        customFunc.call(this, subFormData, newRowId);
      }
    },

    handleSubFormRowInsert(subFormData, newRowId) {
      if (!!this.widget.options.onSubFormRowInsert) {
        let customFunc = new Function(
          "subFormData",
          "newRowId",
          this.widget.options.onSubFormRowInsert
        );
        customFunc.call(this, subFormData, newRowId);
      }
    },

    handleSubFormRowDelete(subFormData, deletedDataRow) {
      if (!!this.widget.options.onSubFormRowDelete) {
        let customFunc = new Function(
          "subFormData",
          "deletedDataRow",
          this.widget.options.onSubFormRowDelete
        );
        customFunc.call(this, subFormData, deletedDataRow);
      }
    },

    // 是否disabled
    isDisabledButton(item, row) {
      return false;

      if (typeof item.isDisable === "function") {
        return item.isDisable(row);
      } else {
        return !!item.disabled;
      }
    },
    // 是否显示
    showBtn(item, row) {
      // const row = row
      return item.tableHideCustom
        ? !!item.isHide
          ? eval(item.isHide)
          : true
        : !item.tableHide;
    },
    itemClick(item, row, index) {
      console.log("[itemClick]", item);
      if (item.action == "add") {
        this.insertSubFormRow(index);
      } else if (item.action == "delete") {
        this.deleteSubFormRow(index);
      } else {
        if (!!item.customFunc) {
          let customFuncInst = new Function(
            "item",
            "row",
            "index",
            item.customFunc
          );
          customFuncInst.call(this, item, row, index);
        }
      }
    },
    getLabel(item, label) {
      return label;

      if (typeof label == "function") {
        return label(item);
      } else {
        return label;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sub-form-container {
  margin-bottom: 8px;
  text-align: left; //IE浏览器强制居左对齐

  ::v-deep .el-row.header-row {
    padding-bottom: 0;
  }

  ::v-deep .el-row.sub-form-row {
    padding-top: 3px;
    padding-bottom: 3px;

    .row-number-span {
      margin-left: 16px;
    }
  }
}
::v-deep .el-table__cell .sub-form-table-column {
  width: 100%;
}

div.action-header-column {
  display: inline-block;
  width: 120px;

  .action-label {
    margin-right: 12px;
  }

  .action-button {
    padding-left: 8px;
    padding-right: 8px;
  }
}

div.field-header-column {
  display: inline-block;
  //overflow: hidden;
  //white-space: nowrap;  //文字超出长度不自动换行
  //text-overflow: ellipsis;  //文字超出长度显示省略号

  span.custom-label i {
    margin: 0 3px;
  }
}

div.field-header-column.is-required:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}

div.label-left-align {
  text-align: left;
}

div.label-center-align {
  text-align: center;
}

div.label-right-align {
  text-align: right;
}

div.sub-form-action-column {
  display: inline-block;
  width: 120px;

  ::v-deep .el-form-item {
    margin-bottom: 0;
  }

  ::v-deep .el-button {
    font-size: 18px;
    padding: 0;
    background: #dcdfe6;
    border: 4px solid #dcdfe6;
  }
}

div.sub-form-action-column.hide-label {
  ::v-deep .el-form-item__label {
    display: none;
  }
}

div.sub-form-table-column {
  display: inline-block;
  //width: 200px;

  ::v-deep .el-form-item {
    margin-left: 4px;
    margin-right: 4px;
    margin-bottom: 0;
  }

  ::v-deep .el-form-item__content {
    margin-left: 0 !important;
  }
}

div.sub-form-table-column.hide-label {
  ::v-deep .el-form-item__label {
    display: none;
  }
}
.add-block {
  padding: 5px;
  border: 1px solid #ebeef5;
  border-top: none;
  display: flex;
  justify-content: center;
}
</style>