<template>
  <section>
    <el-dialog :title="title" :visible.sync="editVisible" :append-to-body="true" width="500px">
      <nextStep
        v-if= "editVisible"
        @need-close="editVisible=false"
        @sendTranUnit="getTranUnit"
        :selectMode="!showCheckbox"
      ></nextStep>
    </el-dialog>
    <el-input
      readonly
      v-model="this.userNames"
      @click.native="search"
      style="font-size: 16px;"
      :placeholder="options.placeholder"
      :disabled="options.disabled" 
      :size="options.size" 
      class="hide-spin-button"
      :type="inputType"
      :show-password="options.showPassword"
      :prefix-icon="options.prefixIcon" :suffix-icon="options.suffixIcon"  
    >
      <!-- <el-button
        @click.native="search"
        :diasbled ="readonly"
        type="primary"
        size="mini"
        slot="append"
        icon="el-icon-search"
      ></el-button> -->
    </el-input>
  </section>
</template>

<script>
  import nextStep from './publicUserSelectPopup/nextStep.vue'
// import { getDisplayName } from '../../api/commons/index.js'

export default {
  name: 'CommonUser',
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
          columnWidth: '200px',
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
      if(!this.readonly){
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
</style>
