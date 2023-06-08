<template>
  <div>
    <el-form-item :label="i18nt('extension.setting.customCode')" label-width="150px">
      <el-button type="info" icon="el-icon-edit" plain round @click="editCustomCodeData(optionModel.customCode)">
        {{i18nt('extension.setting.customCodeBtn')}}
      </el-button>
    </el-form-item>
    <!-- <el-dialog :title="i18nt('extension.setting.customCode')" :visible.sync="editNumberVisible"
               v-if="editNumberVisible" :show-close="true" class="small-padding-dialog" append-to-body v-dialog-drag
               :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <el-form :model="optionModel.customApiForm" ref="apiForm" :rules="rules" label-position="right" label-width="130px" size="medium"
          @submit.native.prevent>
          <el-form-item :label="i18nt('designer.setting.dsRequestURL')" prop="uri">
            <span slot="label">
              {{i18nt('designer.setting.dsRequestURL')}}
              <el-tooltip content="可以使用形如 ${id} 的形式来动态绑定路由 param 和 query 的变量，以及 formData 中的变量" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </span>
            <el-autocomplete
              popper-class="my-autocomplete"
              class="inline-input"
              v-model="customApiForm.uri"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              clearable
            >
              <template slot-scope="{ item }">
                <div class="summary">{{ item.summary }}</div>
                <div style="display: flex; gap:5px; align-items: center;">
                  <el-tag class="method" size="mini">{{ item.method.toUpperCase() }}</el-tag>
                  <span class="url">{{ item.url }}</span>
                </div>
              </template>
            </el-autocomplete>
          </el-form-item>
          <el-form-item :label="i18nt('designer.setting.dsRequestMethod')" prop="method">
            <el-select v-model="optionModel.customApiForm.method" style="width:100%" v-if="!optionModel.customApiForm.methodAutoDetect" class="full-width-input">
              <el-option v-for="(item, index) in methodOptions" :key="index" :label="item.label" :value="item.value"
                :disabled="item.disabled"></el-option>
            </el-select>
            <el-input v-model="optionModel.customApiForm.methodAutoDetectCondition" v-else class="code-input" type="text" clearable placeholder="如: !!query.id ? 'put' : 'post'"></el-input>
            <el-switch v-model="optionModel.customApiForm.methodAutoDetect" active-text="条件判断"></el-switch>
            <el-tooltip placement="top">
              <div slot="content">通过条件判断请求方法<br/>可使用 params 和 query 路由参数变量</div>
              <i class="el-icon-question"></i>
            </el-tooltip>
            <p class="description" v-if="optionModel.customApiForm.methodAutoDetect"></p>
          </el-form-item>
          <el-form-item v-if="optionModel.customApiForm.method !== 'get' || optionModel.customApiForm.method !== 'delete' || !!optionModel.customApiForm.methodAutoDetect" :label="i18nt('designer.setting.dsRequestData')" prop="data">
            <span slot="label">
              {{i18nt('designer.setting.dsRequestData')}}
              <el-tooltip content="可以使用形如 ${id} 的形式来动态绑定路由 param 和 query 的变量，以及 formData 中的变量" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </span>
            <el-alert class="code-wrapper top" type="info" :closable="false" title="{ ...formData,"></el-alert>
            <code-editor :mode="'json'" :readonly="false" v-model="optionModel.customApiForm.data" ref="dataEditor" :userWorker="false"></code-editor>
            <el-alert class="code-wrapper bottom" type="info" :closable="false" title="}"></el-alert>
            <el-switch v-model="optionModel.customApiForm.dataUseCondition" active-text="条件判断"></el-switch>
            <el-tooltip placement="top">
              <div slot="content">通过条件判断是否传递除 formData 内包含之外的请求体字段<br/>可使用 params 和 query 路由参数变量</div>
                <i class="el-icon-question"></i>
            </el-tooltip>
            <el-input v-model="optionModel.customApiForm.dataCondition" v-if="optionModel.customApiForm.dataUseCondition" class="code-input" type="text" clearable placeholder="如: !!query.id"></el-input>
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
          <el-form-item prop="dataHandlerCode">
            <span slot="label">
              {{i18nt('designer.setting.dataHandler')}}
              <el-tooltip content="可以使用形如 ${id} 的形式来动态绑定路由 param 和 query 的变量，以及 formData 中的变量" placement="top">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </span>
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
    </el-dialog> -->
    <el-dialog 
        :title="i18nt('extension.setting.customCode')" 
        :visible.sync="showTableCustomCodeFlag"
        v-if="showTableCustomCodeFlag"
        :show-close="true"
        class="small-padding-dialog"
        append-to-body
        v-dialog-drag
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :destroy-on-close="true"
      >
        <el-divider content-position="left">可使用<code>field</code>属性</el-divider>
        <el-alert type="info" :closable="false" title="<template>"></el-alert>
        <code-editor :mode="'html'" :readonly="false" v-model="customCodeEditing.template" ref="customCodeEditor"></code-editor>
        <el-alert type="info" :closable="false" title="</template>"></el-alert>
        <el-divider></el-divider>
        <el-alert type="info" :closable="false" title="methods:"></el-alert>
        <code-editor :mode="'javascript'" :readonly="false" v-model="customCodeEditing.methods" ref="customMethodsEditor"></code-editor>
        <el-alert type="info" :closable="false" title=""></el-alert>
        <el-divider></el-divider>
        <el-alert type="info" :closable="false" title="data () { return {"></el-alert>
        <code-editor :mode="'javascript'" :readonly="false" v-model="customCodeEditing.dataFields" ref="dataFieldsEditor"></code-editor>
        <el-alert type="info" :closable="false" title="} }"></el-alert>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showTableCustomCodeFlag = false">
          取消</el-button>
          <el-button type="primary" @click="saveCustomCode">
          确定</el-button>
        </div>
      </el-dialog>
  </div>
</template>

<script>
  import swaggerApiMixin from "@/components/form-designer/setting-panel/mixins/swaggerApiMixin"
  import i18n from "@/utils/i18n"
  import eventMixin from "@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin"
  import CodeEditor from '@/components/code-editor/index'
  import {
    deepClone,
  } from "@/utils/util"
  export default {
    name: "customApiForm-editor",
    mixins: [i18n, eventMixin, swaggerApiMixin],
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
        showTableCustomCodeFlag: false,
        customCodeEditing: {},
      }
    },
    methods:{
      saveCustomCode() {
        this.optionModel.customCode = deepClone(this.customCodeEditing)
        this.showTableCustomCodeFlag = false
        this.customCodeEditing = {}
      },
      editCustomCodeData(data) {
        this.customCodeEditing = data ? deepClone(data) : {
          template: "<div>\n  {{ getData(field) }}\n</div>",
          methods: "{\n  getData(field){\n    return field;\n  }\n}\n",
          dataFields: ""
        }
        this.showTableCustomCodeFlag = true
      },
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
.inline-input {
  width: 100%;
}
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .url {
      font-size: 12px;
      color: #b4b4b4;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    
    .method {
      font-size: 12px;
      width: 60px;
      text-align: center;
    }

    .summary {
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .highlighted .summary {
      color: #ddd;
    }
  }
}
</style>
