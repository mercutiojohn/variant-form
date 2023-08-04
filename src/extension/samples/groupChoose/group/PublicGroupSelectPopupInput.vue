<template>
  <section>
    <el-dialog :title="title" :visible.sync="editVisible" :append-to-body="true">
      <PublicGroupSelectPopup
        v-if= "editVisible"
        ref="transferunit"
        @need-close="editVisible=false"
        :groupList="groupList"
        :groupName="groupName"
        :showCheckbox = "showCheckbox"
        @sendGroup="getGroup"
        windowHight="700px"
      ></PublicGroupSelectPopup>
    </el-dialog>
    <el-input
      readonly
      v-model="this.groupNames"
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
  </section>
</template>

<script>
import PublicGroupSelectPopup from './PublicGroupSelectPopup.vue'

export default {
  name: 'CommonGroup',
  components: {
    PublicGroupSelectPopup
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
      groupList:[],
      groupName:[],
      groupNames:'',
      groupIds:'',
      title: '机构选择'
    }
  },
  methods: {
    search () {
      if(!this.options.disabled){
        this.groupList = this.groupIds.split(",");
        this.groupName = this.groupNames.split("、");
        this.editVisible = true
      }
    },
    getGroup(data) {
      // 接收弹窗传送回来的承办单位名称、承办单位id
      this.groupNames = data.unitNames;
      this.groupIds = data.unitIds;
      if(this.groupNames !='' && this.groupIds != ''){
        this.value = this.groupNames+"|"+this.groupIds
      }else{
        this.value = ""
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
      this.groupNames = this.value.split("|")[0]
      this.groupIds = this.value.split("|")[1]
    }
  },
  watch: {
    value(newVal){
      console.log(newVal);
      if (newVal && newVal.split("|").length==2) {
        this.groupNames = newVal.split("|")[0]
        this.groupIds = newVal.split("|")[1]
      }
    }
  }
}
</script>

<style scoped>
</style>
