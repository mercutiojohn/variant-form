<template>
  <div>
    <el-form-item label-width="0">
      <el-divider class="custom-divider" content-position="left">表格配置</el-divider>
    </el-form-item>
    <el-form-item label="表格列" label-width="150px">
      <el-button type="info" icon="el-icon-edit" plain round @click="editData">
        编辑
      </el-button>
    </el-form-item>
    <el-drawer title="表格列字段编辑" :visible.sync="editNumberVisible" :append-to-body="true" size="95%">
        <editTable
          v-if="editNumberVisible"
          @need-close="editNumberVisible=false"
          :list="list"
          windowHight="600px"
          @close="toClose"
          :formId="formId"
          :columnsCss="columnsCss"
        ></editTable>
    </el-drawer>
  </div>
</template>

<script>
  import i18n from "@/utils/i18n"
  import eventMixin from "@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin"
  import editTable from "./components/editTable.vue"
  export default {
    name: "el-table-tableEdit-editor",
    mixins: [i18n, eventMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,

    },
    components: {
      editTable
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
      list(){
        return  this.selectedWidget.options.crudOption.columns;
      },
      formId(){
        return  this.selectedWidget.options.formId;
      },
      columnsCss(){
        return  this.selectedWidget.options.crudOption.columnsCss;
      },
    },
    data() {
      return {
        editNumberVisible:false,
        eventParams: [],
        newSelectedWidget:{}
      }
    },
    methods:{
      editData(){
        this.editNumberVisible=true
      },
      toClose(data,cssData){
        this.selectedWidget.options.crudOption.columns=data  
        this.selectedWidget.options.crudOption.columnsCss=cssData
        this.editNumberVisible=false
      }
    },
    created(){
      // this.newSelectedWidget=this.selectedWidget
    }

  }
</script>

<style scoped>

</style>
