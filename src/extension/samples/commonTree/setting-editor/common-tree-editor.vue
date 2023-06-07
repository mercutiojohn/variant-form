<template>
  <div>
    <el-form-item label="禁止父子节点联动" label-width="110px">
        <el-switch
          v-model="selectedWidget.options.checkStrictlyTree"
          size="mini"
        />
    </el-form-item>
    <el-form-item label="显示过滤框" label-width="110px">
      <el-switch
        v-model="selectedWidget.options.filter"
        size="mini"
      />
    </el-form-item>
    <el-form-item label="显示复选框" label-width="110px">
      <el-switch
        v-model="selectedWidget.options.showCheckBox"
        size="mini"
      />
    </el-form-item>
    <el-form-item label="默认展开所有节点" label-width="110px">
      <el-switch
        v-model="selectedWidget.options.defaultExpandAllNode"
        size="mini"
      />
    </el-form-item>
    <!-- <el-form-item label="展开/收缩" label-width="110px">
      <el-switch
        v-model="selectedWidget.options.expandRetractAllNode"
        size="mini"
      />
    </el-form-item> -->
    <!-- <el-form-item label="选中/取消选中" label-width="110px">
      <el-switch
        v-model="selectedWidget.options.selectClearAllNode"
        size="mini"
      />
    </el-form-item> -->
    <el-form-item label="点击可收缩" label-width="110px">
      <el-switch
        v-model="selectedWidget.options.expandOnClickNode"
        size="mini"
      />
    </el-form-item>
    <!-- <el-form-item label="懒加载" label-width="110px">
      <el-switch
        v-model="selectedWidget.options.lazy"
        size="mini"
      />
    </el-form-item> -->
    <!-- <el-form-item label="允许添加删除节点" label-width="110px">
      <el-switch
        v-model="selectedWidget.options.nodeEdit"
        size="mini"
      />
    </el-form-item> -->
    <el-form-item label="静态树数据" label-width="110px">
      <el-switch
        v-model="selectedWidget.options.staticFlag"
        size="mini"
      />
    </el-form-item>
    <el-form-item v-if="selectedWidget.options.staticFlag" label="静态树数据编辑" label-width="110px">
      <el-button type="info" icon="el-icon-edit" plain round @click="editStaticData">
        编辑字段</el-button>
    </el-form-item>
    <el-form-item v-if="!selectedWidget.options.staticFlag" label="自定义动态数据" label-width="110px">
      <el-button type="info" icon="el-icon-edit" plain round @click="editData">
        编辑字段</el-button>
    </el-form-item>
    <el-dialog title="静态数据" :visible.sync="showStaticDataFlag"
      v-if="showStaticDataFlag" :show-close="true" class="small-padding-dialog" append-to-body v-dialog-drag
        :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <!-- <el-alert type="info" :closable="false" :title="eventHeader"></el-alert> -->
        <code-editor :mode="'javascript'" :readonly="false" v-model="staticData" ref="ecEditor"></code-editor>
        <!-- <el-alert type="info" :closable="false" title="}"></el-alert> -->
        <div slot="footer" class="dialog-footer">
        <el-button @click="showStaticDataFlag = false">
        取消</el-button>
        <el-button type="primary" @click="savStaticDataConversion">
        确定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="自定义配置" :visible.sync="showDataFlag"
      v-if="showDataFlag" :show-close="true" class="small-padding-dialog" append-to-body v-dialog-drag
        :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <!-- <el-alert type="info" :closable="false" :title="eventHeader"></el-alert> -->
        <code-editor :mode="'javascript'" :readonly="false" v-model="selectedWidget.options.apiData" ref="ecEditor"></code-editor>
        <!-- <el-alert type="info" :closable="false" title="}"></el-alert> -->
        <div slot="footer" class="dialog-footer">
        <el-button @click="showDataFlag = false">
        取消</el-button>
        <el-button type="primary" @click="saveDataConversion">
        确定</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import i18n from "@/utils/i18n"
  import eventMixin from "@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin"
  import CodeEditor from '@/components/code-editor/index'
  export default {
    name: "common-tree-attribute-editor",
    mixins: [i18n, eventMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,

    },
    components: {
      CodeEditor
    },
    watch: {

  },
    computed:{
    },
    data() {
      return {
        showDataFlag:false,
        showStaticDataFlag:false,
        staticData:'',
      }
    },
    methods:{
      editData(){
        this.showDataFlag=true     
      },
      editStaticData(){
        this.showStaticDataFlag=true
      },
      saveDataConversion(){
        const codeHints = this.$refs.ecEditor.getEditorAnnotations()       
        let syntaxErrorFlag = false
        if (!!codeHints && (codeHints.length > 0)) {
          codeHints.forEach((chItem) => {
            if (chItem.type === 'error') {
              syntaxErrorFlag = true
            }
          })

          if (syntaxErrorFlag) {
            this.$message.error(this.i18nt('designer.setting.syntaxCheckWarning'))
            this.selectedWidget.options.apiData=''
            return
          }
        }  
        this.showDataFlag = false
      },
      savStaticDataConversion(){
        const codeHints = this.$refs.ecEditor.getEditorAnnotations()       
        let syntaxErrorFlag = false
        if (!!codeHints && (codeHints.length > 0)) {
          codeHints.forEach((chItem) => {
            if (chItem.type === 'error') {
              syntaxErrorFlag = true
            }
          })

          if (syntaxErrorFlag) {
            this.$message.error(this.i18nt('designer.setting.syntaxCheckWarning'))
            this.selectedWidget.options.treeData=''
            return
          }
        }  
        this.selectedWidget.options.treeData = JSON.parse(this.staticData)
        this.showStaticDataFlag = false
      },
    },
    created(){
       this.staticData = JSON.stringify(this.selectedWidget.options.treeData)
      // if(this.selectedWidget.options.data.dynamicData){
      //   this.formData = this.selectedWidget.options.data.dynamicData
      // }
      
    }

  }
</script>

<style scoped>

</style>
