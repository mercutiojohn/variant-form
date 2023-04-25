<template>
  <container-item-wrapper :widget="widget">
    <div v-show="!widget.options.hidden" class="sub-form-container">
      <el-row class="header-row">
        <div v-if="leftActionColumn" class="action-header-column">
          <span class="action-label">{{
            i18nt("render.hint.subFormAction")
          }}</span>
          <el-button
            v-if="!isReadMode"
            class="action-button"
            :disabled="widgetDisabled || actionDisabled || insertDisabled"
            round
            type="primary"
            size="mini"
            :title="i18nt('render.hint.subFormAddActionHint')"
            @click="addSubFormRow"
          >
            {{ i18nt("render.hint.subFormAddAction") }}
            <i class="el-icon-plus el-icon-right"></i>
          </el-button>
        </div>
        <div
          v-if="!leftActionColumn && widget.options.showRowNumber"
          class="row-no-header-column"
        >
          <span>{{ i18nt("render.hint.subFormRowNo") }}</span>
        </div>
        <div
          v-for="t in widget.widgetList"
          :key="t.id + 'thc'"
          class="field-header-column"
          :class="[
            getLabelAlign(widget, t),
            t.options.required ? 'is-required' : '',
          ]"
          :style="{ width: t.options.columnWidth }"
        >
          <template v-if="t.options.labelIconClass">
            <span class="custom-label">
              <template v-if="t.options.labelIconPosition === 'front'">
                <template v-if="t.options.labelTooltip">
                  <el-tooltip
                    content="{{ t.options.labelTooltip }}"
                    effect="light"
                  >
                    <i :class="t.options.labelIconClass"></i>
                  </el-tooltip>
                  {{ t.options.label }}
                </template>
                <template v-else>
                  <i :class="t.options.labelIconClass"></i>
                  {{ t.options.label }}
                </template>
              </template>
              <template v-else-if="t.options.labelIconPosition === 'rear'">
                <template v-if="t.options.labelTooltip">
                  {{ t.options.label }}
                  <el-tooltip
                    content="{{ t.options.labelTooltip }}"
                    effect="light"
                  >
                    <i :class="t.options.labelIconClass"></i>
                  </el-tooltip>
                </template>
                <template v-else>
                  {{ t.options.label }}
                  <i :class="t.options.labelIconClass"></i>
                </template>
              </template>
            </span>
          </template>
          <template v-else>
            <span :title="t.options.labelTooltip">{{ t.options.label }}</span>
          </template>
        </div>
        <div v-if="leftActionColumn" class="action-header-column">
          <span class="action-label">{{
            i18nt("render.hint.subFormAction")
          }}</span>
          <el-button
            v-if="!isReadMode"
            class="action-button"
            :disabled="widgetDisabled || actionDisabled || insertDisabled"
            round
            type="primary"
            size="mini"
            :title="i18nt('render.hint.subFormAddActionHint')"
            @click="addSubFormRow"
          >
            {{ i18nt("render.hint.subFormAddAction") }}
            <i class="el-icon-plus el-icon-right"></i>
          </el-button>
        </div>
      </el-row>
      <el-row v-for="(t, n) in rowIdData" :key="t" class="sub-form-row">
        <div v-if="leftActionColumn" class="action-cell">
          <el-button
            v-if="!isReadMode"
            class="action-button"
            :disabled="widgetDisabled || actionDisabled || deleteDisabled(t, n)"
            round
            type="danger"
            size="mini"
            :title="i18nt('render.hint.subFormDeleteActionHint')"
            @click="deleteSubFormRow(t, n)"
          >
            {{ i18nt("render.hint.subFormDeleteAction") }}
            <i class="el-icon-delete el-icon-right"></i>
          </el-button>
        </div>
        <div
          v-if="!leftActionColumn && widget.options.showRowNumber"
          class="row-no-cell"
        >
          <span>{{ n + 1 }}</span>
        </div>
        <div
          v-for="(field, index) in t.widgetData"
          :key="t.id + 'td' + field.id"
          class="field-cell"
          :class="[
            getFieldAlign(widget, field),
            getFieldCellClass(widget, field),
          ]"
          :style="{ width: field.options.columnWidth }"
        >
          <component
            :is="getWidgetComponent(field.type)"
            :widget="field"
            :options="field.options"
            :mode="mode"
            :disabled="widgetDisabled || field.options.disabled"
            :key="field.id"
            :form-data="getFormData(t.id, field.id)"
            @input="onFieldInput(t.id, field.id, $event)"
            @output="onFieldOutput(t.id, field.id, $event)"
          />
        </div>
        <div
          v-if="leftActionColumn && !widget.options.showRowNumber"
          class="action-cell"
        >
          <el-button
            v-if="!isReadMode"
            class="action-button"
            :disabled="widgetDisabled || actionDisabled || deleteDisabled(t, n)"
            round
            type="danger"
            size="mini"
            :title="i18nt('render.hint.subFormDeleteActionHint')"
            @click="deleteSubFormRow(t, n)"
          >
            {{ i18nt("render.hint.subFormDeleteAction") }}
            <i class="el-icon-delete el-icon-right"></i>
          </el-button>
        </div>
      </el-row>
      <div
        v-if="widget.widgetList.length === 0 && !isReadMode && !widgetDisabled"
        class="empty-row-hint"
      >
        {{ i18nt("render.hint.subFormEmptyHint") }}
      </div>
    </div>
  </container-item-wrapper>
</template>

<script>
import emitter from "@/utils/emitter";
import i18n from "@/utils/i18n";
import refMixin from "@/components/form-render/refMixin"
import ContainerItemWrapper from '@/components/form-render/container-item/container-item-wrapper'
import containerItemMixin from "@/components/form-render/container-item/containerItemMixin"
import FieldComponents from '@/components/form-designer/form-widget/field-widget/index'

export default {
  name: "sub-form-item",
  componentName: 'ContainerItem',
  mixins: [emitter, i18n, refMixin, containerItemMixin],
  props: {
    field: Object,
    parentWidget: Object,
    parentList: Array,
    indexOfParentList: Number,
    designer: Object,

    designState: {
      type: Boolean,
      default: false,
    },

    subFormRowIndex: {
      /* 子表单组件行索引，从0开始计数 */ type: Number,
      default: -1,
    },
    subFormColIndex: {
      /* 子表单组件列索引，从0开始计数 */ type: Number,
      default: -1,
    },
    subFormRowId: {
      /* 子表单组件行Id，唯一id且不可变 */ type: String,
      default: "",
    },
  },
  components: {
    ContainerItemWrapper,
    ...FieldComponents,
  },
  provide: ['getSubFormName','getSubFormFieldFlag'],
  data() {
    return {
      rowIdData: [],
      fieldSchemaData: [],
      actionDisabled: !1,
      insertDisabled: !1,
      deleteDisabled: !1
    };
  },
  inject: ["refList", "sfRefList", "globalModel", "getReadMode"],

  created  () {
    this.initRefList(),
    this.registerSubFormToRefList(),
    this.initRowIdData(!0),
    this.initFieldSchemaData(),
    this.initEventHandler();
  },
  mounted  () {
    this.handleSubFormFirstRowAdd();
  },
  beforeDestroy  () {
    this.unregisterFromRefList();
  },
  computed: {
    isReadMode () {
      return this.getReadMode();
    },
    leftActionColumn () {
      return "left" === (this.widget.options.actionColumnPosition || "left");
    },
    widgetDisabled () {
      return !!this.widget.options.disabled;
    }
  },
  methods: {
    getLabelAlign  (e, t) {
      return t.options.labelAlign || e.options.labelAlign;
    },
    registerSubFormToRefList  () {
      if ("sub-form" === this.widget.type) {
        this.sfRefList[this.widget.options.name] = this;
      }
    },
    initRowIdData  (e) {
      var t = this;
      if ("sub-form" === this.widget.type) {
        this.rowIdData.splice(0, this.rowIdData.length);
        var i = this.formModel[this.widget.options.name];
        if (i && i.length > 0) {
          i.forEach(function () {
            t.rowIdData.push("id" + Object(r["f"])());
          });
          if (e) {
            setTimeout(function () {
              t.handleSubFormRowChange(i);
            }, 800);
          }
        }
      }
    },
    addToRowIdData  () {
      this.rowIdData.push("id" + Object(r["f"])());
    },
    insertToRowIdData  (e) {
      this.rowIdData.splice(e, 0, "id" + Object(r["f"])());
    },
    deleteFromRowIdData  (e) {
      this.rowIdData.splice(e, 1);
    },
    getRowIdData  () {
      return this.rowIdData;
    },
    getWidgetRefOfSubForm  (e, t) {
      var i = e + "@row" + this.rowIdData[t];
      return this.getWidgetRef(i);
    },
    deleteSubFormRow  (e) {
      var t = this,
        i = this.formModel[this.widget.options.name] || [],
        n = this.rowIdData[e];
      n &&
        (i.splice(e, 1),
        this.deleteFromRowIdData(e),
        this.deleteFromFieldSchemaData(e),
        this.$nextTick(function () {
          t.handleSubFormRowChange(i);
        }));
    },
    handleSubFormRowAdd  (e, t) {
      this.$emit("subFormRowAdd", e, t);
    },
    handleSubFormRowChange  (e) {
      this.$emit("subFormRowChange", e);
    },
    disableSubForm  () {
      this.$refs.formItem.disabled = !0;
    },
    enableSubForm  () {
      this.$refs.formItem.disabled = !1;
    },
    initFieldSchemaData  () {
      var e = this;
      if ("sub-form" === this.widget.type) {
        var t = this.rowIdData.length;
        if (
          (this.fieldSchemaData.splice(0, this.fieldSchemaData.length), t > 0)
        )
          for (
            var i = function (t) {
                var i = [];
                e.widget.widgetList.forEach(function (t) {
                  i.push(e.cloneFieldSchema(t));
                }),
                  e.fieldSchemaData.push(i);
              },
              n = 0;
            n < t;
            n++
          )
            i(n);
      }
    },
    // ----subform----
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
    getLabelAlign (e, t) {
        return t.options.labelAlign || e.options.labelAlign
    },
    registerSubFormToRefList () {
        "sub-form" === this.widget.type && (this.sfRefList[this.widget.options.name] = this)
    },
    initRowIdData (e) {
        var t = this;
        if ("sub-form" === this.widget.type) {
            this.rowIdData.splice(0, this.rowIdData.length);
            var i = this.formModel[this.widget.options.name];
            i && i.length > 0 && (i.forEach((function() {
                t.rowIdData.push("id" + Object(r["f"])())
            }
            )),
            e && setTimeout((function() {
                t.handleSubFormRowChange(i)
            }
            ), 800))
        }
    },
    addToRowIdData () {
        this.rowIdData.push("id" + Object(r["f"])())
    },
    insertToRowIdData (e) {
        this.rowIdData.splice(e, 0, "id" + Object(r["f"])())
    },
    deleteFromRowIdData (e) {
        this.rowIdData.splice(e, 1)
    },
    getRowIdData () {
        return this.rowIdData
    },
    getWidgetRefOfSubForm (e, t) {
        var i = e + "@row" + this.rowIdData[t];
        return this.getWidgetRef(i)
    },
    initFieldSchemaData () {
        var e = this;
        if ("sub-form" === this.widget.type) {
            var t = this.rowIdData.length;
            if (this.fieldSchemaData.splice(0, this.fieldSchemaData.length),
            t > 0)
                for (var i = function(t) {
                    var i = [];
                    e.widget.widgetList.forEach((function(t) {
                        i.push(e.cloneFieldSchema(t))
                    }
                    )),
                    e.fieldSchemaData.push(i)
                }, n = 0; n < t; n++)
                    i(n)
        }
    },
    addToFieldSchemaData (e) {
        var t = this
          , i = [];
        this.widget.widgetList.forEach((function(e) {
            i.push(t.cloneFieldSchema(e))
        }
        )),
        void 0 === e ? this.fieldSchemaData.push(i) : this.fieldSchemaData.splice(e, 0, i)
    },
    deleteFromFieldSchemaData (e) {
        this.fieldSchemaData.splice(e, 1)
    },
    cloneFieldSchema (e) {
        var t = Object(r["d"])(e);
        return t.id = e.type + Object(r["f"])(),
        t
    },
    initEventHandler () {
        var e = this;
        "sub-form" === this.widget.type && this.$on("setFormData", (function(t) {
            e.initRowIdData(!1),
            e.initFieldSchemaData();
            var i = t[e.widget.options.name] || [];
            setTimeout((function() {
                e.handleSubFormRowChange(i)
            }
            ), 800)
        }
        ))
    },
    handleSubFormFirstRowAdd () {
        var e = this;
        if ("sub-form" === this.widget.type && this.widget.options.showBlankRow && 1 === this.rowIdData.length) {
            var t = this.formModel[this.widget.options.name] || [];
            this.$nextTick((function() {
                e.handleSubFormRowAdd(t, e.rowIdData[0]),
                e.handleSubFormRowChange(t),
                e.widget.options.disabled && e.disableSubForm()
            }
            ))
        }
    },
    addSubFormRow () {
        var e = this
          , t = {};
        this.widget.widgetList.forEach((function(e) {
            e.formItemFlag && (t[e.options.name] = e.options.defaultValue)
        }
        ));
        var i = this.formModel[this.widget.options.name] || [];
        i.push(t),
        this.addToRowIdData(),
        this.addToFieldSchemaData(),
        this.$nextTick((function() {
            e.handleSubFormRowAdd(i, e.rowIdData[i.length - 1]),
            e.handleSubFormRowChange(i)
        }
        ))
    },
    insertSubFormRow (e) {
        var t = this
          , i = {};
        this.widget.widgetList.forEach((function(e) {
            e.formItemFlag && (i[e.options.name] = e.options.defaultValue)
        }
        ));
        var n = this.formModel[this.widget.options.name] || [];
        n.splice(e, 0, i),
        this.insertToRowIdData(e),
        this.addToFieldSchemaData(e),
        this.$nextTick((function() {
            t.handleSubFormRowInsert(n, t.rowIdData[e]),
            t.handleSubFormRowChange(n)
        }
        ))
    },
    deleteSubFormRow (e) {
        var t = this;
        this.$confirm(this.i18nt("render.hint.deleteSubFormRow") + "?", this.i18nt("render.hint.prompt"), {
            confirmButtonText: this.i18nt("render.hint.confirm"),
            cancelButtonText: this.i18nt("render.hint.cancel")
        }).then((function() {
            var i = t.formModel[t.widget.options.name] || []
              , n = Object(r["d"])(i[e]);
            i.splice(e, 1),
            t.deleteFromRowIdData(e),
            t.deleteFromFieldSchemaData(e),
            t.$nextTick((function() {
                t.handleSubFormRowDelete(i, n),
                t.handleSubFormRowChange(i)
            }
            ))
        }
        )).catch((function() {}
        ))
    },
    handleSubFormRowChange (e) {
        if (this.widget.options.onSubFormRowChange) {
            var t = new Function("subFormData",this.widget.options.onSubFormRowChange);
            t.call(this, e)
        }
    },
    handleSubFormRowAdd (e, t) {
        if (this.widget.options.onSubFormRowAdd) {
            var i = new Function("subFormData","newRowId",this.widget.options.onSubFormRowAdd);
            i.call(this, e, t)
        }
    },
    handleSubFormRowInsert (e, t) {
        if (this.widget.options.onSubFormRowInsert) {
            var i = new Function("subFormData","newRowId",this.widget.options.onSubFormRowInsert);
            i.call(this, e, t)
        }
    },
    handleSubFormRowDelete (e, t) {
        if (this.widget.options.onSubFormRowDelete) {
            var i = new Function("subFormData","deletedDataRow",this.widget.options.onSubFormRowDelete);
            i.call(this, e, t)
        }
    },
    setDisabled (e) {
        this.widget.options.disabled = e,
        e ? this.disableSubForm() : this.enableSubForm()
    },
    setInsertDisabled (e) {
        this.insertDisabled = e
    },
    setDeleteDisabled (e) {
        this.deleteDisabled = e
    },
    setSubFormValues (e) {
        var t = this;
        this.$set(this.globalModel.formModel, this.widget.options.name, e),
        this.initRowIdData(!1),
        this.initFieldSchemaData(),
        setTimeout((function() {
            t.handleSubFormRowChange(e)
        }
        ), 800)
    },
    setSubFormFieldValue (e, t, i) {
        var n = this.globalModel.formModel[this.widget.options.name];
        n[i][e] = t,
        this.handleSubFormRowChange(n)
    }
  },
};
</script>

<style scoped>
::v-deep.column-table td {
  padding: 0 !important;
}
::v-deep.column-table .el-form-item__content .el-form-item__error--inline {
  position: absolute;
  transform: translate(-20px, 8px);
  text-align: right;
  pointer-events: none;
  font-size: 13px;
}
::v-deep.column-table .cell {
  overflow: unset !important;
}
::v-deep.column-table .el-form-item__content {
  display: flex;
  flex-direction: column;
}
.drag-line-box {
  display: flex;
  gap: 3px;
  flex-direction: column;
  width: 15px;
}
.drag-line-box .drag-line {
  width: 100%;
  height: 1px;
  background: #cfcfcf;
}
.add-block {
  padding: 5px;
  border: 1px solid #ebeef5;
  border-top: none;
  display: flex;
  justify-content: center;
}
.allowDrag {
  cursor: move;
}
</style>

