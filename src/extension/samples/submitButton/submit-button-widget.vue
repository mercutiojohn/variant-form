<template>
  <static-content-wrapper :designer="designer" :field="field" :design-state="designState" :display-style="field.options.displayStyle"
                     :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
                     :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
    <el-button ref="fieldEditor" :type="field.options.type" :size="field.options.size"
               :plain="field.options.plain" :round="field.options.round"
               :circle="field.options.circle" :icon="field.options.icon"
               :disabled="field.options.disabled"
               @click.native="handleSubmitButtonWidgetClick">
      {{field.options.label}}</el-button>
  </static-content-wrapper>
</template>

<script>
  import StaticContentWrapper from '@/components/form-designer/form-widget/field-widget/static-content-wrapper'
  import emitter from '@/utils/emitter'
  import i18n from "@/utils/i18n";
  import fieldMixin from "@/components/form-designer/form-widget/field-widget/fieldMixin";
  import { assembleAxiosConfig, replaceParams } from '@/utils/util'

  export default {
    name: "submit-button-widget",
    componentName: 'FieldWidget',  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
    mixins: [emitter, fieldMixin, i18n],
    inject: ['request', 'router', 'currentRoute'],
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
    computed: {

    },
    beforeCreate() {
      /* 这里不能访问方法和属性！！ */
    },

    created() {
      /* 注意：子组件mounted在父组件created之后、父组件mounted之前触发，故子组件mounted需要用到的prop
         需要在父组件created中初始化！！ */
      this.registerToRefList()
      this.initEventHandler()

      this.handleOnCreated()
    },

    mounted() {
      this.handleOnMounted()
    },

    beforeDestroy() {
      this.unregisterFromRefList()
    },

    methods: {
      handleSubmitButtonWidgetClick() {
        console.log("[handleSubmitButtonWidgetClick]")
        this.excecuteCustomSubmit()
        this.handleButtonWidgetClick()
      },
      async excecuteCustomSubmit() {
        const customApiStatus = this.field.options.customApiStatus ? !!eval(this.field.options.customApiStatus) : true
        console.log("[excecuteCustomSubmit] excecuteOrNot", !this.designState && !!this.field.options.useCustomApi && !!this.field.options.customApiForm && customApiStatus, this.field.options)
        if (!this.designState && !!this.field.options.useCustomApi && !!this.field.options.customApiForm && customApiStatus ) {
          // console.log('[自定义接口] useCustomApi:', this.field.options.useCustomApi)
          // console.log('[自定义接口] customApiForm:', this.field.options.customApiForm)

          const customURIForm = this.field.options.customApiForm
          this.getFormRef().disableForm()
          const formData = await this.getFormRef().getFormData()

          const query = this.currentRoute?.query || {}
          const params = this.currentRoute?.params || {}
          const replacementParams = {
            ...query,
            ...params
          }
          // console.log('[自定义接口] queryParams:', replacementParams, this.$route)

          const url = replaceParams(customURIForm.uri, replacementParams)
          let method = customURIForm.method
          if(!!customURIForm.methodAutoDetect && !!customURIForm.methodAutoDetectCondition){
            try {
              // console.log('[自定义接口] methodAutoDetectCondition',customURIForm.methodAutoDetectCondition,eval(customURIForm.methodAutoDetectCondition))
              method = eval(customURIForm.methodAutoDetectCondition)
            } catch (e) {
              // console.log('[自定义接口] methodAutoDetectCondition 条件解析失败！',e.message,e)
            }
          }
          const customParams = assembleAxiosConfig(customURIForm.params, replacementParams)
          let transformedData = replaceParams(customURIForm.data, replacementParams)
          if (customURIForm.dataUseCondition) {
            const dataCondition = eval(customURIForm.dataCondition)
            if(!dataCondition) {
              transformedData = {}
            }
          }
          let data = formData
          try {
            data = {
              ...formData,
              ...JSON.parse('{'+ transformedData + '}')
            }
          } catch (e) {
            // console.log('[自定义接口] transformedData 参数转换失败！',e.message,e)
          }
          // console.log('[自定义接口] 请求', 'url:', url, 'method:', method, 'params:', params, 'data:', data)
          let response = await this.request({
            url, 
            method, 
            customParams,
            data
          })
          let dhFn = new Function('response', customURIForm.dataHandlerCode)
          dhFn.call(null, response)
          this.getFormRef().enableForm()
        }
      },
    }

  }
</script>

<style lang="scss" scoped>
  // @import "../../../../styles/global.scss"; //* static-content-wrapper已引入，还需要重复引入吗？ *//

</style>
