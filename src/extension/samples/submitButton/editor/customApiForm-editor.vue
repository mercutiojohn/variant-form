<template>
  <div>
    <el-form-item :label="i18nt('extension.setting.customApiForm')" label-width="150px">
      <el-button type="info" icon="el-icon-edit" plain round @click="editCustomInitApi">
        {{i18nt('extension.setting.customApiFormBtn')}}</el-button>
    </el-form-item>
    <el-dialog :title="i18nt('extension.setting.customApiForm')" :visible.sync="editNumberVisible"
               v-if="editNumberVisible" :show-close="true" class="small-padding-dialog" append-to-body v-dialog-drag
               :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <el-form :model="optionModel.customApiForm" ref="apiForm" :rules="rules" label-position="right" label-width="130px" size="medium"
          @submit.native.prevent>
          <el-form-item :label="i18nt('designer.setting.dsRequestURL')" prop="uri">
            <el-input v-model="optionModel.customApiForm.uri" type="text" clearable></el-input>
          </el-form-item>
          <el-form-item :label="i18nt('designer.setting.dsRequestMethod')" prop="method">
            <el-select v-model="optionModel.customApiForm.method" style="width:100%" v-if="!optionModel.customApiForm.methodAutoDetect" class="full-width-input">
              <el-option v-for="(item, index) in methodOptions" :key="index" :label="item.label" :value="item.value"
                :disabled="item.disabled"></el-option>
            </el-select>
            <el-input v-model="optionModel.customApiForm.methodAutoDetectCondition" v-else class="code-input" type="text" clearable placeholder="如: !!query.id ? 'put' : 'post'"></el-input>
            <el-switch v-model="optionModel.customApiForm.methodAutoDetect" active-text="条件判断"></el-switch>
            <p class="description" v-if="optionModel.customApiForm.methodAutoDetect">可以使用 <code>params</code> 和 <code>query</code> 路由参数变量</p>
          </el-form-item>
          <el-form-item v-if="optionModel.customApiForm.method !== 'get' || optionModel.customApiForm.method !== 'delete' || !!optionModel.customApiForm.methodAutoDetect" :label="i18nt('designer.setting.dsRequestData')" prop="data">
            <el-alert class="code-wrapper top" type="info" :closable="false" title="{ ...formData,"></el-alert>
            <code-editor :mode="'json'" :readonly="false" v-model="optionModel.customApiForm.data" ref="dataEditor" :userWorker="false"></code-editor>
            <el-alert class="code-wrapper bottom" type="info" :closable="false" title="}"></el-alert>
            <el-switch v-model="optionModel.customApiForm.dataUseCondition" active-text="条件判断"></el-switch>
            <el-input v-model="optionModel.customApiForm.dataCondition" v-if="optionModel.customApiForm.dataUseCondition" class="code-input" type="text" clearable placeholder="如: !!query.id"></el-input>
            <p class="description">可以使用形如 <code>${id}</code> 的形式来动态绑定路由 <code>param</code> 和 <code>query</code> 的变量，以及 <code>formData</code> 中的变量</p>
          </el-form-item>
          <el-form-item :label="i18nt('designer.setting.dsRequestParams')">
            <el-row>
              <el-col :span="6">
                <el-button type="text" icon="el-icon-plus" @click="addRequestParam">
                  {{i18nt('designer.setting.addRequestParam')}}</el-button>
              </el-col>
            </el-row>
            <el-row v-for="(rp, pIdx) in optionModel.customApiForm.params" :key="pIdx" class="rd-row" :gutter="8">
              <el-col :span="8">
                <el-form-item :prop="'params.' + pIdx + '.name'" :rules="nameRules" :label-width="0">
                  <el-input v-model="rp.name" :placeholder="i18nt('designer.setting.dsRequestNameInputPlaceholder')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item :prop="'params.' + pIdx + '.type'" :label-width="0">
                  <el-select v-model="rp.type" :placeholder="i18nt('designer.setting.dsRequestTypeInputPlaceholder')">
                    <el-option :label="i18nt('designer.setting.dsRequestValueStringType')" value="String"></el-option>
                    <el-option :label="i18nt('designer.setting.dsRequestValueNumberType')" value="Number"></el-option>
                    <el-option :label="i18nt('designer.setting.dsRequestValueBooleanType')" value="Boolean"></el-option>
                    <el-option :label="i18nt('designer.setting.dsRequestValueRouterVariableType')" value="RouterParam"></el-option>
                    <!-- <el-option :label="i18nt('designer.setting.dsRequestValueVariableType')" value="Variable"></el-option> -->
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item :prop="'params.' + pIdx + '.value'" :rules="valueRules" :label-width="0">
                  <el-input v-model="rp.value" :placeholder="i18nt('designer.setting.dsRequestValueInputPlaceholder')"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="3">
                <el-button icon="el-icon-delete" plain circle @click="deleteRequestParam(pIdx)"></el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="响应数据处理" prop="dataHandlerCode">
            <el-alert class="code-wrapper top" type="info" :closable="false" title="(response) => {"></el-alert>
            <code-editor :mode="'javascript'" :readonly="false" v-model="optionModel.customApiForm.dataHandlerCode" ref="resInterceptorEditor"></code-editor>
            <el-alert class="code-wrapper bottom" type="info" :closable="false" title="}"></el-alert>
          </el-form-item>
        </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="editNumberVisible = false">
          {{i18nt('designer.hint.cancel')}}</el-button>
        <el-button type="primary" @click="saveCustomInitApi">
          {{i18nt('designer.hint.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import i18n from "@/utils/i18n"
  import eventMixin from "@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin"
  import CodeEditor from '@/components/code-editor/index'

  export default {
    name: "cuatomApiForm-editor",
    mixins: [i18n, eventMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    components: {
      CodeEditor
    },
    data() {
      return {
        editNumberVisible: false,
        customApiForm: {},
        methodOptions: [{
          "label": "GET",
          "value": "get"
        }, {
          "label": "POST",
          "value": "post"
        }, {
          "label": "DELETE",
          "value": "delete"
        }, {
          "value": "put",
          "label": "PUT"
        }],
      }
    },
    methods:{
      editCustomInitApi() {
        this.customApiForm = this.optionModel.customApiForm
        this.editNumberVisible = true
      },

      saveCustomInitApi() {
        this.optionModel.customApiForm = this.customApiForm
        this.editNumberVisible = false
      },

      addRequestParam() {
        this.customApiForm.params.push({
          name: '',
          type: 'String',
          value: ''
        })
      },

      deleteRequestParam(idx) {
        this.customApiForm.params.splice(idx, 1)
      },
    },
    created(){
    }

  }
</script>

<style lang="scss" scoped>
.small-padding-dialog {
  ::v-deep .el-dialog__body {
    padding: 6px 15px 12px 15px;
  }
}
::v-deep.code-input input.el-input__inner {
  font-family: Consolas, monospace!important
}
.description code {
  font-family: Consolas, monospace!important
}
</style>
