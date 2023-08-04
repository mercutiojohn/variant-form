<template>
  <div>
    <el-form-item label="自定义操作列" label-width="150px">
      <el-button type="info" icon="el-icon-edit" plain round @click="editData">
        编辑</el-button>
    </el-form-item>
    <el-drawer title="自定义操作列" :visible.sync="editNumberVisible" :append-to-body="true" size="700px">
        <actionBarButtonsList
          v-if="editNumberVisible"
          @need-close="editNumberVisible = false"
          :list="btnList"
          :getTableData="getTableData"
          windowHight="700px"
          @close="toClose"
        ></actionBarButtonsList>
    </el-drawer>
  </div>
</template>

<script>
  import Vue from 'vue'
  import i18n from "@/utils/i18n"
  import eventMixin from "@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin"
  import actionBarButtonsList from "./actionBarButtonsList"
  export default {
    name: "actionBarButtonsList-editor",
    mixins: [i18n, eventMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,

    },
    components: {
      actionBarButtonsList
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
        this.btnList = this.selectedWidget.options.actionBarButtonsList
        this.editNumberVisible = true
      },
      toClose(data){
        this.selectedWidget.options.actionBarButtonsList = data
        this.editNumberVisible = false
        this.btnList = []
      }
    },
    created(){
      // console.log(this.selectedWidget,'[selectedWidget]');
      // this.newSelectedWidget=this.selectedWidget
    }

  }
</script>

<style scoped>

</style>
