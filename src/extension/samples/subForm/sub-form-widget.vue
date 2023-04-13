<template>
  <static-content-wrapper :designer="designer" :field="field" :design-state="designState"
                          :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
                          :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
    <el-alert ref="fieldEditor" :title="field.options.title" :type="field.options.type"
              :description="field.options.description" :closable="field.options.closable"
              :center="field.options.center" :close-text="field.options.closeText"
              :show-icon="field.options.showIcon" :effect="field.options.effect" @close="handleCloseCustomEvent"></el-alert>

    <div class="sub-form">
      <el-table
          :data="columnForm.tableCreatorTableColumnList"
          :row-class-name="rowTableCreatorTableColumnIndex"
          @selection-change="handleTableCreatorTableColumnSelectionChange"
          row-key="uuid"
          ref="tableCreatorTableColumn"
          class="column-table"
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
          <el-table-column label="序号" align="center" prop="index" width="60" class-name="allowDrag" />
          <!-- <el-table-column label="uuid" align="center" prop="uuid" width="60" class-name="allowDrag" /> -->
          <el-table-column label="字段名" prop="name">
            <template slot-scope="scope">
              <CommonFormItem :prop="'tableCreatorTableColumnList.' + scope.$index + '.name'" required style="margin-bottom:0"
                :rules="[
                validString(1, 255),
                {
                  pattern:/(^_([a-zA-Z0-9]_?)*$)|(^[a-zA-Z](_?[a-zA-Z0-9])*_?$)/,
                  message:'不符合数据库表字段格式规范'
                }]"
              >
                <el-input v-model="scope.row.name" placeholder="" />
              </CommonFormItem>
            </template>
          </el-table-column>
          <el-table-column label="字段描述" prop="comment">
            <template slot-scope="scope">
              <el-input v-model="scope.row.comment" placeholder="" />
            </template>
          </el-table-column>
          <el-table-column label="数据类型" prop="type"> <!-- width="200"  -->
            <template slot-scope="scope">
              <CommonFormItem :prop="'tableCreatorTableColumnList.' + scope.$index + '.type'" required style="margin-bottom:0">
                <el-select v-model="scope.row.type" placeholder="">
                  <el-option v-for="dict in options.tableDataTypeOptions" :key="dict.code" :label="dict.name" :value="dict.code" />
                </el-select>
              </CommonFormItem>
            </template>
          </el-table-column>
          <el-table-column label="长度" prop="length" width="200" align="center">
            <template slot-scope="scope">
              <CommonFormItem :prop="'tableCreatorTableColumnList.' + scope.$index + '.name'" :required="!ifLengthDisabledType(scope.row.type)" style="margin-bottom:0">
                <el-input-number :controls="false" :min="1" v-model="scope.row.length" :disabled="ifLengthDisabledType(scope.row.type)" /> <!-- :placeholder="ifLengthDisabledType(scope.row.type)?'':'请输入字段长度'"  -->
              </CommonFormItem>
            </template>
          </el-table-column>
          <el-table-column label="非空" prop="isNull" width="70" align="center">
            <template slot-scope="scope">
              <!-- <el-input v-model="scope.row.isNull" placeholder="请输入是否为空" /> -->
              <el-checkbox true-label="1" v-model="scope.row.isNull"></el-checkbox>
            </template>
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
    </div>
  </static-content-wrapper>
</template>

<script>
  import StaticContentWrapper from '@/components/form-designer/form-widget/field-widget/static-content-wrapper'
  import emitter from '@/utils/emitter'
  import i18n from "@/utils/i18n"
  import fieldMixin from "@/components/form-designer/form-widget/field-widget/fieldMixin"

  export default {
    name: "sub-form-widget",
    componentName: 'FieldWidget',  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
    mixins: [emitter, fieldMixin, i18n],
    props: {
      field: Object,
      parentWidget: Object,
      parentList: Array,
      indexOfParentList: Number,
      designer: Object,

      designState: {
        type: Boolean,
        default: false
      },

      subFormRowIndex: { /* 子表单组件行索引，从0开始计数 */
        type: Number,
        default: -1
      },
      subFormColIndex: { /* 子表单组件列索引，从0开始计数 */
        type: Number,
        default: -1
      },
      subFormRowId: { /* 子表单组件行Id，唯一id且不可变 */
        type: String,
        default: ''
      },

    },
    components: {
      StaticContentWrapper,
    },
    data () {
      return {
        columnForm: {
          tableCreatorTableColumnList: [],
        },
        options: {
          tableDataTypeOptions: [],
        },
      }
    },
    created() {
      this.registerToRefList()
      this.initEventHandler()
    },
    beforeDestroy() {
      this.unregisterFromRefList()
    },
    methods: {
      handleCloseCustomEvent() {
        if (!!this.field.options.onClose) {
          let changeFn = new Function(this.field.options.onClose)
          changeFn.call(this)
        }
      },
      // ----subform----
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

<style scoped>
::v-deep.column-table td{
  padding: 0!important;
}
::v-deep.column-table .el-form-item__content .el-form-item__error--inline{
  position: absolute;
  transform: translate(-20px,8px);
  text-align: right;
  pointer-events: none;
  font-size: 13px;
}
::v-deep.column-table .cell{
  overflow: unset !important;
}
::v-deep.column-table .el-form-item__content{
  display: flex;
  flex-direction: column;
}
.drag-line-box{
  display: flex;
  gap:3px;
  flex-direction: column;
  width: 15px;
}
.drag-line-box .drag-line{
  width:100%;
  height: 1px;
  background: #cfcfcf;
}
.add-block{
  padding: 5px;
  border: 1px solid #EBEEF5;
  border-top: none;
  display: flex;
  justify-content: center;
}
.allowDrag{
  cursor: move
}
</style>

