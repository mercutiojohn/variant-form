<template>
  <form-item-wrapper :designer="designer" :field="field" :rules="rules" :design-state="designState"
                     :parent-widget="parentWidget" :parent-list="parentList" :index-of-parent-list="indexOfParentList"
                     :sub-form-row-index="subFormRowIndex" :sub-form-col-index="subFormColIndex" :sub-form-row-id="subFormRowId">
  <userTreeApp  v-if="(formConfig && formConfig.layoutType == 'H5') || (designer && designer.formConfig.layoutType == 'H5')"
    v-model="fieldModel"
    :options="field.options"
    :showCheckbox="field.options.multiSelect"
    @focus="handleFocusCustomEvent" 
    @blur="handleBlurCustomEvent" 
    @input="handleInputCustomEvent"
    @change="handleChangeEvent"
  ></userTreeApp>
  <userTree v-else
      v-model="fieldModel"
      :options="field.options"
      :showCheckbox="field.options.multiSelect"
      @focus="handleFocusCustomEvent" 
      @blur="handleBlurCustomEvent" 
      @input="handleInputCustomEvent"
      @change="handleChangeEvent"
    ></userTree>
  </form-item-wrapper>
</template>

<script>
  import FormItemWrapper from '@/components/form-designer/form-widget/field-widget/form-item-wrapper'
  import emitter from '@/utils/emitter'
  import i18n from "@/utils/i18n"
  import fieldMixin from "@/components/form-designer/form-widget/field-widget/fieldMixin"

  import UserTree from './user/PublicUserSelectPopupInput'
  import userTreeApp from './user/PublicUserSelectPopupInputApp'
  
  export default {
    name: "user-choose-widget",
    componentName: 'FieldWidget',  //必须固定为FieldWidget，用于接收父级组件的broadcast事件
    mixins: [emitter, fieldMixin, i18n],
    inject: ['formConfig'],
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
      FormItemWrapper,
      UserTree,
      userTreeApp
    },
    created() {
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
    methods: {
      handleCloseCustomEvent() {
        if (!!this.field.options.onClose) {
          let changeFn = new Function(this.field.options.onClose)
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

</style>
