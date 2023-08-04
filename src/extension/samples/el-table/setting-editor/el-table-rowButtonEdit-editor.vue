<template>
  <div>
    <el-form-item label="操作列按钮" label-width="150px">
      <el-button type="info" icon="el-icon-edit" plain round @click="editData">
        编辑
      </el-button>
    </el-form-item>
    <el-drawer title="自定义操作列" :visible.sync="editNumberVisible" :append-to-body="true" size="700px">
        <rowButtons
          v-if="editNumberVisible"
          @need-close="editNumberVisible = false"
          :list="btnList"
          :getTableData="getTableData"
          windowHight="700px"
          @close="toClose"
        ></rowButtons>
    </el-drawer>
  </div>
</template>

<script>
  import Vue from 'vue'
  import i18n from "@/utils/i18n"
  import eventMixin from "@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin"
  import rowButtons from "./components/rowButton"
  export default {
    name: "el-table-rowButtonEdit-editor",
    mixins: [i18n, eventMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,

    },
    components: {
      rowButtons
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
      btnList(){
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
