<template>
  <container-item-wrapper :widget="widget">
    <!-- <el-card class="card-container" 
      :shadow="widget.options.shadow" 
    >
      <div slot="header" class="clear-fix">
        <span>{{widget.options.label}}</span>
        <i v-if="widget.options.showFold" class="float-right"
           :class="[!widget.options.folded ? 'el-icon-arrow-down' : 'el-icon-arrow-up']" @click="toggleCard"></i>
      </div>
    </el-card> -->
    <!-- {{widget}} -->
    <el-table
      :key="widget.id" 
      :data="columnForm.tableCreatorTableColumnList"
      :row-class-name="rowTableCreatorTableColumnIndex"
      @selection-change="handleTableCreatorTableColumnSelectionChange"
      v-show="!widget.options.hidden"
      :ref="widget.id"
      row-key="uuid"
      ref="tableCreatorTableColumn"
      class="column-table"
      :class="[!!widget.options.folded ? 'folded' : '', customClass]"
      :style="{width: widget.options.cardWidth + '!important' || ''}"
      highlight-current-row
      border
    >
      <!--  height="calc(100vh - 220px)" -->
      <!-- <el-table-column type="selection" width="50" align="center" /> -->
      <el-table-column label="" align="center" width="40" class-name="allowDrag">
        <template>
          <div class="drag-line-box">
            <i class="drag-line"></i>
            <i class="drag-line"></i>
            <i class="drag-line"></i>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column label="序号" align="center" prop="index" width="60" class-name="allowDrag" /> -->
      <!-- <el-table-column label="uuid" align="center" prop="uuid" width="60" class-name="allowDrag" /> -->
      <!-- <el-table-column label="字段名" prop="name">
        <template slot-scope="scope">
          <el-form-item :prop="'tableCreatorTableColumnList.' + scope.$index + '.name'" required style="margin-bottom:0"
          >
            <el-input v-model="scope.row.name" placeholder="" />
          </el-form-item>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="字段描述" prop="comment">
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
      </el-table-column> -->

      <!-- :label="field.options.label"  -->
      <!-- v-if="!!widget.widgetList && (widget.widgetList.length > 0)" -->
      <!-- :class="[
        getFieldAlign(widget, field),
        getFieldCellClass(widget, field),
      ]" -->
      <el-table-column 
          :label="subWidget.label"
          prop="test" 
          width="70" 
          align="center"
          v-for="(subWidget, swIdx) in widget.widgetList"
          :key="widget.id + 'td' + swIdx.id"
          class="field-cell"
          :style="{ width: subWidget.options.columnWidth }"
        >
          <template slot-scope="scope" v-if="'container' === subWidget.category">
            <component :is="getComponentByContainer(subWidget)" :widget="subWidget" :key="swIdx" :parent-list="widget.widgetList"
                      :index-of-parent-list="swIdx" :parent-widget="widget">
              <!-- 递归传递插槽！！！ -->
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
        </el-table-column>
      <!-- <el-table-column label="test" prop="test" width="70" align="center">
        <template slot-scope="scope" v-if="!!widget.widgetList && (widget.widgetList.length > 0)">
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
      </el-table-column> -->
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
      <!-- <el-button type="normal" icon="el-icon-plus" size="mini" @click="initDefaultFields">添加默认字段</el-button> -->
      <!-- <el-button type="normal" icon="el-icon-delete" size="mini" @click="handleDeleteTableCreatorTableColumn">删除</el-button> -->
    </div>
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
    name: "sub-form-item",
    componentName: 'ContainerItem',
    mixins: [emitter, i18n, refMixin, containerItemMixin],
    components: {
      ContainerItemWrapper,
      ...FieldComponents,
    },
    props: {
      widget: Object,
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
    inject: ['refList', 'sfRefList', 'globalModel'],
    // inject: ["refList", "sfRefList", "globalModel", "getReadMode"],
    // provide: ['getSubFormName','getSubFormFieldFlag'],
    computed: {
      customClass() {
        return this.widget.options.customClass || ''
      },

    },
    created() {
      this.initRefList()
    },
    beforeDestroy() {
      this.unregisterFromRefList()
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
      toggleCard() {
        this.widget.options.folded = !this.widget.options.folded
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
    },
  }
</script>

<style lang="scss" scoped>
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
.add-block{
  padding: 5px;
  border: 1px solid #EBEEF5;
  border-top: none;
  display: flex;
  justify-content: center;
}
</style>
