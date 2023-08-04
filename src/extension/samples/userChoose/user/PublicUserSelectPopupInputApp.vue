<template>
  <section>
    <el-input
      readonly
      v-model="this.userNames"
      @click.native="search"
      style="font-size: 16px;"
      :placeholder="options.placeholder"
      :disabled="options.disabled" 
      :size="options.size" 
      class="hide-spin-button"
      type="textarea"
      :rows="options.rows"
      :show-password="options.showPassword"
      :prefix-icon="options.prefixIcon"
      :suffix-icon="options.suffixIcon"
      @focus="handleFocusCustomEvent"
      @blur="handleBlurCustomEvent"
      @input="handleInputCustomEvent"
      @change="handleChangeEvent"
    >
    </el-input>
    <van-action-sheet :title="title" v-model="editVisible" >
      <nextStep 
        class="content"
        v-if= "editVisible"
        @need-close="editVisible=false"
        @sendTranUnit="getTranUnit"
        :selectMode="!showCheckbox"
        layoutType="H5"
      ></nextStep>
    </van-action-sheet> 
  </section>
</template>

<script>
import nextStep from './publicUserSelectPopup/nextStep.vue'
export default {
  name: 'CommonUserApp',
  components: {
    nextStep
  },
  props: {
    // 只读标识
    readonly: {
      type: [Boolean],
      default:false
    },
    // 是否多选
    showCheckbox: {
      type: [Boolean],
      default:false
    },
    // 值
    value: {
      type: [String],
      default: ''
    },
    options: {
      type: [Object],
      default: () =>{
        return { // 组件属性对象，每一个属性值对应一个属性编辑器
          name: '',
          testName: '',
          label: '',
          labelAlign: '',
          type: 'text',
          placeholder: '',
          columnWidth: '',
          size: '',
          labelWidth: null,
          labelHidden: false,
          disabled: false,
          hidden: false,
          showPassword: false,
          required: false,
          requiredHint: '',
          validation: '',
          validationHint: '',
          //-------------------
          customClass: '',  //自定义css类名
          labelIconClass: null,
          labelIconPosition: 'rear',
          labelTooltip: null,
          prefixIcon: '',
          suffixIcon: '',
          appendButton: false,
          appendButtonDisabled: false,
          buttonIcon: 'el-icon-search',
          //-------------------
          onCreated: '',
          onMounted: '',
          onInput: '',
          onChange: '',
          onFocus: '',
          onBlur: '',
          onValidate: '',
          onAppendButtonClick: '',
        }
      }
    }
  },
  data () {
    return {
      editVisible: false,
      userNames: '',
      userIds: '',
      title: '人员选择'
    }
  },
  methods: {
    search () {
      if(!this.options.disabled){
        this.editVisible = true
      }
    },
    getTranUnit(data) {
      if(data.length>0){
        var id = ''
        var name = ''
        data.forEach(item => {
          name = name + "、" + item.name
          id = id + "," + item.id
        })
        name = name.substr(1)
        id = id.substr(1)
        this.userIds = id
        this.userNames = name
        this.value = this.userNames+"|"+this.userIds
      }else{
        this.userIds = ''
        this.userNames = ''
        this.value = ''
      }
      this.$emit('input', this.value)
      // 关闭弹窗
      this.editVisible = false;
    },
    handleFocusCustomEvent(event){
      this.$emit('handleFocusCustomEvent',event)
    },
    handleBlurCustomEvent(event){
      this.$emit('handleBlurCustomEvent',event)
    },
    handleInputCustomEvent(value){
      this.$emit('handleInputCustomEvent',value)
    },
    handleChangeEvent(value){
      this.$emit('handleChangeEvent',value)
 
    }
  },
  mounted: function () {
    if (this.value && this.value.split("|").length==2) {
      this.userNames = this.value.split("|")[0]
      this.userIds = this.value.split("|")[1]
    }
  },
  watch: {
    value(newVal){
      console.log(newVal);
      if (newVal && newVal.split("|").length==2) {
        this.userNames = newVal.split("|")[0]
        this.userIds = newVal.split("|")[1]
      }
    }
  }
}
</script>

<style scoped>
/deep/.el-dialog__body {
    padding: 10px;
}
</style>
