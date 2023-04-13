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

    <!-- <el-table
      :key="widget.id"
      @click.native.stop="selectWidget(widget)"
      :data="columnForm.tableCreatorTableColumnList"
      :row-class-name="rowTableCreatorTableColumnIndex"
      @selection-change="handleTableCreatorTableColumnSelectionChange"
      row-key="uuid"
      ref="tableCreatorTableColumn"
      class="column-table"
      :style="{width: widget.options.cardWidth + '!important' || ''}"
      :class="[selected ? 'selected' : '', !!widget.options.folded ? 'folded' : '', customClass]"
      highlight-current-row
      border
    >
      <el-table-column label="" align="center" width="40" class-name="allowDrag">
        <template>
          <div class="drag-line-box">
            <i class="drag-line"></i>
            <i class="drag-line"></i>
            <i class="drag-line"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="序号" align="center" prop="index" width="60" class-name="allowDrag" />
      <el-table-column label="字段名" prop="name">
        <template slot-scope="scope">
          <el-form-item :prop="'tableCreatorTableColumnList.' + scope.$index + '.name'" required style="margin-bottom:0"
          >
            <el-input v-model="scope.row.name" placeholder="" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="字段描述" prop="comment">
        <template slot-scope="scope">
          <el-input v-model="scope.row.comment" placeholder="" />
        </template>
      </el-table-column>
      <el-table-column label="数据类型" prop="type">
        <template slot-scope="scope">
          <el-form-item :prop="'tableCreatorTableColumnList.' + scope.$index + '.type'" required style="margin-bottom:0">
            <el-select v-model="scope.row.type" placeholder="">
              <el-option v-for="dict in options.tableDataTypeOptions" :key="dict.code" :label="dict.name" :value="dict.code" />
            </el-select>
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="长度" prop="length" width="200" align="center">
        <template slot-scope="scope">
          <el-form-item :prop="'tableCreatorTableColumnList.' + scope.$index + '.name'" :required="!ifLengthDisabledType(scope.row.type)" style="margin-bottom:0">
            <el-input-number :controls="false" :min="1" v-model="scope.row.length" :disabled="ifLengthDisabledType(scope.row.type)" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="非空" prop="isNull" width="70" align="center">
        <template slot-scope="scope">
          <el-checkbox true-label="1" v-model="scope.row.isNull"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="test" prop="test" width="70" align="center">
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
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" fixed="right" width="120">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="下方添加行" placement="top-end">
            <el-button ton size="mini" type="text" icon="el-icon-plus" @click="addBetweenRow(scope.row.index)"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="删除当前行" placement="top-end">
            <el-button size="mini" type="text" icon="el-icon-delete" @click="deleteRow(scope.row.index)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <div class="add-block">
      <el-button type="text" icon="el-icon-plus" size="mini" @click="handleAddTableCreatorTableColumn">添加行</el-button>
      <el-button type="normal" icon="el-icon-plus" size="mini" @click="initDefaultFields">添加默认字段</el-button>
      <el-button type="normal" icon="el-icon-delete" size="mini" @click="handleDeleteTableCreatorTableColumn">删除</el-button>
    </div> -->
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
    data() {
      return {
        columnForm: {
          tableCreatorTableColumnList: [],
        },
        options: {
          tableDataTypeOptions: [],
        },
      }
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
      handleTableCreatorTableColumnSelectionChange (selection) {
        this.checkedTableCreatorTableColumn = selection.map((item) => item.index)
      },
      /** 添加列按钮操作 */
      addBetweenRow (index) {
        let obj = {}
        obj.name = ''
        obj.comment = ''
        obj.type = ''
        obj.length = ''
        obj.isNull = ''
        obj.createBy = ''
        obj.updateTime = ''
        obj.createTime = ''
        obj.groupId = ''
        obj.updateBy = ''
        obj.uuid = this.uuid(8,16)
        this.columnForm.tableCreatorTableColumnList.splice(index, 0, obj)
      },
      /** 建表工具-列信息添加按钮操作 */
      handleAddTableCreatorTableColumn () {
        let obj = {}
        obj.name = ''
        obj.comment = ''
        obj.type = ''
        obj.length = ''
        obj.isNull = ''
        obj.createBy = ''
        obj.updateTime = ''
        obj.createTime = ''
        obj.groupId = ''
        obj.updateBy = ''
        obj.uuid = this.uuid(8,16)
        this.columnForm.tableCreatorTableColumnList.push(obj)
      },
      deleteRow (index) {
        this.columnForm.tableCreatorTableColumnList.splice(index - 1, 1)
      },
      ifLengthDisabledType (type) {
        return type !== 'varchar'
      },
      uuid (len, radix) {
        let chars = '0123456789abcdefghijklmnopqrstuvwxyz'
        let uuid = []; let i
        radix = radix || chars.length
        if (len) {
          for (i = 0; i < len; i++) {
            uuid[i] = chars[0 | Math.random() * radix]
          }
        } else {
          var r
        }
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
        uuid[14] = '4'
        for (i = 0; i < 36; i++) {
          if (!uuid[i]) {
            r = 0 | Math.random() * 16
            uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r]
          }
        }
        return uuid.join('')
      },
      /** 建表工具-列信息序号 */
      rowTableCreatorTableColumnIndex ({ row, rowIndex }) {
        row.index = rowIndex + 1
      },
    }
  }
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
// ---
.sub-form-container .sub-form-table {
    min-height: 68px;
}
.sub-form-container {
    padding: 8px;
    border: 1px dashed #369;
}
.sub-form-container.selected {
    outline: 2px solid #409eff!important;
}
.sub-form-container .sub-form-table div.sub-form-table-column {
  display: inline-block;
}
</style>
