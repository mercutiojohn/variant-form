<template>
  <static-content-wrapper :designer="designer" :field="field" :design-state="designState"
                          :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
                          :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
    <el-alert ref="fieldEditor" :title="field.options.title" :type="field.options.type"
              :description="field.options.description" :closable="field.options.closable"
              :center="field.options.center" :close-text="field.options.closeText"
              :show-icon="field.options.showIcon" :effect="field.options.effect" @close="handleCloseCustomEvent"></el-alert>

    <div class="gantt-chart">
      <el-table :data="data" style="width: 100%;" :height="tableHeight">
        <el-table-column prop="name" label="任务名称" fixed="left" width="180"></el-table-column>
        <el-table-column prop="start" label="开始时间">
          <template slot-scope="scope">{{ formatDate(scope.row.start) }}</template>
        </el-table-column>
        <el-table-column prop="end" label="结束时间" fixed="right" width="120">
          <template slot-scope="scope">{{ formatDate(scope.row.end) }}</template>
        </el-table-column>
        <el-table-column label="甘特图">
          <template slot-scope="scope">
            <div class="gantt-item" :style="{width: getWidth(scope.row)}"></div>
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
        data: [
          {
            name: "任务1",
            start: new Date("2023-04-10T00:00:00"),
            end: new Date("2023-04-16T00:00:00")
          },
          {
            name: "任务2",
            start: new Date("2023-04-13T00:00:00"),
            end: new Date("2023-04-20T00:00:00")
          },
          {
            name: "任务3",
            start: new Date("2023-04-17T00:00:00"),
            end: new Date("2023-04-28T00:00:00")
          },
          {
            name: "任务4",
            start: new Date("2023-04-21T00:00:00"),
            end: new Date("2023-04-30T00:00:00")
          }
        ],
        startDate: new Date("2023-04-01T00:00:00"),
        endDate: new Date("2023-05-01T00:00:00"),
        tableHeight: 400
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
      getWidth(row) {
        const taskDuration = row.end.getTime() - row.start.getTime();
        const chartDuration = this.endDate.getTime() - this.startDate.getTime();
        return (taskDuration / chartDuration) * 100 + "%";
      },
      formatDate(date) {
        return date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric"
        });
      }

    }
  }
</script>
  
<style scoped>
.gantt-chart {
  overflow-x: auto;
}
.gantt-item {
  height: 20px;
  background-color: #409eff;
}
</style>
