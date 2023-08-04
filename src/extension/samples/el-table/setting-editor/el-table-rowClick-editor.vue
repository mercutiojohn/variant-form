<template>
    <div>
      <el-form-item label="行点击事件" label-width="150px">
        <el-button type="info" icon="el-icon-edit" plain round @click="editData">
          编辑</el-button>
      </el-form-item>
      <el-dialog
      title="行点击事件"
      :visible.sync="editNumberVisible"
      v-if="editNumberVisible"
      :show-close="true"
      class="small-padding-dialog"
      append-to-body
      v-dialog-drag
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
    >
      <el-alert
        class="code-wrapper top"
        type="info"
        :closable="false"
        title="(row) => { //行数据对象属性"
      ></el-alert>
      <code-editor
        :mode="'javascript'"
        :readonly="false"
        v-model="setData"
        ref="ecEditor"
      ></code-editor>
      <el-alert
        class="code-wrapper bottom"
        type="info"
        :closable="false"
        title="}"
      ></el-alert>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="save"> 确定</el-button>
      </div>
    </el-dialog>
    </div>
  </template>
  
  <script>
    import i18n from "@/utils/i18n"
    import CodeEditor from "@/components/code-editor/index";
    import eventMixin from "@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin"
    export default {
      name: "el-table-rowClick-editor",
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
        //   selectedWidget: {
        //   handler(val) {
        //     console.log(val);
            
        //     this.newSelectedWidget = val;
          
        //   },
        //   deep: true
        // }
      },
      computed:{
        // row(){
        //   console.log(this.selectedWidget.options.cuatomQuery);
          
        //   return  this.selectedWidget.options.cuatomQuery;
        // },
        // formId(){
        //   return  this.selectedWidget.options.formId;
        // },
      },
      data() {
        return {
          editNumberVisible:false,
          setData:''
        }
      },
      methods:{
        editData(){
          this.setData = this.selectedWidget.options.rowClick
          this.editNumberVisible=true
        },
        save(data){
          this.selectedWidget.options.rowClick=this.setData
          this.editNumberVisible=false
        }
      },
      created(){
      }
  
    }
  </script>
  
  <style scoped>
  
  </style>
  