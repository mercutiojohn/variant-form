<template>
  <container-wrapper :designer="designer" :widget="widget" :parent-widget="parentWidget" :parent-list="parentList"
                     :index-of-parent-list="indexOfParentList">
    <div :key="widget.id" class="chart-container"
         :class="[selected ? 'selected' : '', customClass]" @click.stop="selectWidget(widget)">
      <lineChart 
        v-model="fieldModel"
        :option="widget.options"
        @focus="handleFocusCustomEvent" 
        @blur="handleBlurCustomEvent" 
        @input="handleInputCustomEvent"
        @change="handleChangeEvent"
      ></lineChart>
    </div>
  </container-wrapper>
</template>

<script>
  import containerMixin from "@/components/form-designer/form-widget/container-widget/containerMixin"
  import ContainerWrapper from "@/components/form-designer/form-widget/container-widget/container-wrapper"
  import emitter from '@/utils/emitter'
  import i18n from "@/utils/i18n"
  import fieldMixin from "@/components/form-designer/form-widget/field-widget/fieldMixin"

  import lineChart from './line-chart'

  export default {
    name: "lineChartWidget",
    componentName: 'FieldWidget',  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
    mixins: [emitter, fieldMixin, i18n, containerMixin],
    props: {
      widget: Object,
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
      ContainerWrapper,
      lineChart
    },
    created() {
      this.field=this.widget
      this.initFieldModel()
      this.registerToRefList()
      this.initEventHandler()
      this.buildFieldRules()

      this.handleOnCreated()
    },

    mounted() {
      this.handleOnMounted()
    },

    beforeDestroy() {
      this.unregisterFromRefList()
    },
    computed: {
      selected() {
        return this.widget.id === this.designer.selectedId
      },

      customClass() {
        return this.widget.options.customClass || ''
      },
    },
    methods: {
      handleCloseCustomEvent() {
        if (!!this.widget.options.onClose) {
          let changeFn = new Function(this.widget.options.onClose)
          changeFn.call(this)
        }
      }

    },
    data() {
      return {
        oldFieldValue: null, //field组件change之前的值
        fieldModel: null,
        rules: [],
      }
    }
  }
</script>

<style lang="scss" scoped>
.chart-container.selected {
    outline: 2px solid $--color-primary !important;
  }
</style>
