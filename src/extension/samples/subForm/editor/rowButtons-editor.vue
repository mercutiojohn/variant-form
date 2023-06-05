<template>
  <div>
    <el-form-item label="自定义操作列" label-width="150px">
      <el-button type="info" icon="el-icon-edit" plain round @click="editData">
        编辑</el-button>
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
  import rowButtons from "./rowButtons"
  export default {
    name: "rowButtons-editor",
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
      // getTableData(){
      //   let tableList = []
      //   this.selectedWidget.options.widgetList?.forEach((item)=>{
      //     let data={
      //       field:item.id,
      //       name:item.label
      //     }
      //     tableList.push(data)
      //   })
      //   return tableList
      // }

    },
    data() {
      return {
        editNumberVisible:false,
        eventParams: [],
        newSelectedWidget:{},
        btnList: []
      }
    },
    methods:{
      editData(){
        this.btnList = this.selectedWidget.options.rowButtons
        this.editNumberVisible = true
      },
      toClose(data){
        this.selectedWidget.options.rowButtons = data
        this.editNumberVisible = false
        this.btnList = []
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
