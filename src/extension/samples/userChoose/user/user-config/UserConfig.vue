<template>
  <div style="padding-bottom:50px">
    <el-form
      label-position="top"
      :model="componentConfig"
    >
    <el-collapse v-model="activeNames">
        <el-collapse-item name='1'>
            <template slot="title">
                &nbsp;&nbsp;&nbsp;基本属性
            </template>
      <el-form-item
        label="标题"
        prop="label"
      >
        <el-input v-model="componentConfig.label" :maxlength=30 type="textarea"></el-input>
      </el-form-item>
      <el-form-item  prop="label">
        <el-checkbox  v-model="componentConfig.options.adaptive">是否填充布局文本域</el-checkbox>
      </el-form-item>
      <el-form-item
        label="标题宽度(范围:0-999)"
        v-if="advanceMode === true"
        prop="labelWidth"
      >
        <el-input v-model="componentConfig.labelWidth" :maxlength=3></el-input>
      </el-form-item>
      <el-form-item
        label="宽度(范围:0-999,为空表示100%)"
        v-if="advanceMode === true"
        prop="options.width"
      >
        <el-input v-model="componentConfig.options.width" :maxlength=3></el-input>
      </el-form-item>
      <el-form-item
        label="是否可多选"
        v-if="advanceMode === true"
      >
        <el-switch v-model="componentConfig.options.showCheckbox"></el-switch>
      </el-form-item>
      <!-- <el-form-item
        label="数据绑定"
        v-if="advanceMode === true"
      >

        <CommonSelectTree
          operType="popupType"
          paramType="metadata.bizObjectMateDataTree"
          :localLoad="true"
          :data="model"
          :onlySelectLeaf="false"
          :fullPathCode.sync="componentConfig.boundProperty"
          :displayFullPath="true"
          title="请选择元数据进行绑定"
          :props="props"
          :visible = "vis"
          @show-popup = "showPopup"
        ></CommonSelectTree>

      </el-form-item> -->
      <!-- <el-form-item>
        <el-checkbox v-model="componentConfig.options.hide" style="float:left">隐藏</el-checkbox>
          <div
            style="margin-left:10px"
            v-if="advanceMode === true"
          >
            <el-input
              placeholder="或输入逻辑表达式"
              v-model="componentConfig.options.hideExpression"
              style="margin-left:10px;width:150px"
            ></el-input>
          </div>
      </el-form-item>
      <el-form-item
        label="显示全路径"
        v-if="advanceMode === true"
      >
        <el-switch v-model="componentConfig.options.displayFullPath"></el-switch>
      </el-form-item> -->

      <!-- <el-form-item
        label="是否可多选"
        v-if="advanceMode === true"
      >
        <el-switch v-model="componentConfig.options.showCheckbox"></el-switch>
      </el-form-item> -->
      <!-- <el-form-item
        label="显示查询框"
        v-if="advanceMode === true"
      >
        <el-switch v-model="componentConfig.options.displaySearch"></el-switch>
      </el-form-item> -->
    </el-collapse-item>
  </el-collapse>
      <!-- <el-collapse>
          <el-collapse-item>
              <template slot="title">
                  &nbsp;&nbsp;&nbsp;DOM事件
              </template>
          <el-form-item
            label="onblur事件"
            v-if="advanceMode === true"
          >
            <el-input v-model="componentConfig.options.onblurEvent"></el-input>
          </el-form-item>
          <el-form-item
            label="onchange事件"
            v-if="advanceMode === true"
          >
            <el-input v-model="componentConfig.options.onchangeEvent"></el-input>
          </el-form-item>
          <el-form-item
            label="onclick事件"
            v-if="advanceMode === true"
          >
            <el-input v-model="componentConfig.options.onclickEvent"></el-input>
          </el-form-item>
          <el-form-item
            label="oninput事件"
            v-if="advanceMode === true"
          >
            <el-input v-model="componentConfig.options.oninputEvent"></el-input>
          </el-form-item>
          <el-form-item
            label="onfocus事件"
            v-if="advanceMode === true"
          >
            <el-input v-model="componentConfig.options.onfocusEvent"></el-input>
          </el-form-item>
        </el-collapse-item> -->
      </el-collapse>
      <el-collapse>
        <el-collapse-item>
          <template slot="title">&nbsp;&nbsp;&nbsp;校验</template>
          <el-form-item v-if="advanceMode === true" style="margin-top:10px">
            <el-checkbox v-model="componentConfig.options.required" style="float:left">必填</el-checkbox>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'CommonUserConfig',
  props: {
    advanceMode: {
      type: [Boolean],
      default: () => {
        return false
      }
    },
    componentConfig: {
      type: [Object],
      default: () => {
        return {}
      }
    },
    parameters: {
      type: [Array],
      default: () => {
        return []
      }
    },
    model: {
      type: [Object, Array],
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      vis: false,
      activeNames: ['1'],
      props: {
        label: 'name',
        code: 'id'
      },
      rules: {
        label: [
          { required: true, message: '请输入标题名称', trigger: 'blur' }],
        labelWidth: [
          { required: true, message: '请输入标题宽度', trigger: 'blur' }],
        'options.width': [
          {
            required: true, message: '请输入宽度', trigger: 'blur'
          }
        ]
      },
      tempExp: '',
      validator: {
        type: null,
        required: null,
        pattern: null,
        range: null,
        length: null
      },
      fields: []
    }
  },
  computed: {
    show () {
      if (this.componentConfig && Object.keys(this.componentConfig).length > 0) {
        return true
      }
      return false
    }
  },
  methods: {
    // showPopup(){
    //   if(this.model.length === 0){
    //     this.$message.warning("请先选择服务！")
    //     this.vis = false
    //   }else{
    //     this.vis = true
    //   }
    // },
    handleOptionsRemove (index) {
      if (this.componentConfig.type === 'grid') {
        this.componentConfig.columns.splice(index, 1)
      } else {
        this.componentConfig.options.data.splice(index, 1)
      }
    },
    handleAddOption () {
      this.componentConfig.options.data.push({
        value: '新选项',
        label: '新选项'
      })
    },
    handleAddColumn () {
      this.componentConfig.columns.push({
        span: '12',
        list: []
      })
    },
    generateRule () {
      this.componentConfig.rules = []
      Object.keys(this.validator).forEach(key => {
        if (this.validator[key]) {
          this.componentConfig.rules.push(this.validator[key])
        }
      })
    },
    handleSelectMuliple (value) {
      if (value) {
        if (this.componentConfig.options.defaultValue) {
          this.componentConfig.options.defaultValue = [this.componentConfig.options.defaultValue]
        } else {
          this.componentConfig.options.defaultValue = []
        }
      } else {
        if (this.componentConfig.options.defaultValue.length > 0) {
          this.componentConfig.options.defaultValue = this.componentConfig.options.defaultValue[0]
        } else {
          this.componentConfig.options.defaultValue = ''
        }
      }
    }
  },
  watch: {
    'componentConfig.options.isRange': function (val) {
      if (typeof val !== 'undefined') {
        if (val) {
          this.componentConfig.options.defaultValue = null
        } else {
          if (Object.keys(this.componentConfig.options).indexOf('defaultValue') >= 0) {
            this.componentConfig.options.defaultValue = ''
          }
        }
      }
    },
    'componentConfig.options.required': function (val) {
      if (val) {
        this.validator.required = {
          required: true,
          message: `${this.componentConfig.name}必须填写`
        }
      } else {
        this.validator.required = null
      }

      this.$nextTick(() => {
        this.generateRule()
      })
    },
    'componentConfig.options.dataType': function (val) {
      if (!this.show) {
        return false
      }

      if (val) {
        this.validator.type = {
          type: val,
          message: this.componentConfig.name + '格式不正确'
        }
      } else {
        this.validator.type = null
      }

      this.generateRule()
    },
    'componentConfig.options.pattern': function (val) {
      if (!this.show) {
        return false
      }

      if (val) {
        this.validator.pattern = {
          pattern: eval(val),
          message: this.componentConfig.name + '格式不匹配'
        }
      } else {
        this.validator.pattern = null
      }

      this.generateRule()
    }
  }
}
</script>
<style scoped>
.el-form-item {
  margin-bottom: 0px;
}
</style>
