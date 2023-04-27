<template>
  <div>
    <el-form-item label="表格操作列按钮编辑" label-width="150px">
      <el-button type="info" icon="el-icon-edit" plain round @click="editData">
        编辑字段</el-button>
    </el-form-item>
    <el-dialog title="表格操作列按钮编辑" :visible.sync="editNumberVisible" :append-to-body="true">
        <rowButton
          v-if="editNumberVisible"
          @need-close="editNumberVisible=false"
          :list="list"
          :getTableData="getTableData"
          windowHight="700px"
          @close="toClose"
        ></rowButton>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import i18n from "@/utils/i18n"
  import eventMixin from "@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin"
  import rowButton from "./components/rowButton.vue"
  export default {
    name: "el-table-rowButtonEdit-editor",
    mixins: [i18n, eventMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,

    },
    components: {
      rowButton
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
        return  this.selectedWidget.options.crudOption.rowButtons;
      },
      getTableData(){
        let tableList=[]
        this.selectedWidget.options.crudOption.columns.forEach((item)=>{
          let data={
            field:item.field,
            name:item.label
          }
          tableList.push(data)
        })
        return tableList
      }

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
      toClose(data){
        this.selectedWidget.options.crudOption.rowButtons=data
        this.editNumberVisible=false
      }
    },
    created(){
      // this.newSelectedWidget=this.selectedWidget
      console.log(this.selectedWidget,'1111111111');
      
    }

  }
</script>

<style scoped>

</style>
