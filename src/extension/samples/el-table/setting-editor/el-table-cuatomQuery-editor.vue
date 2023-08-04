<template>
  <div>
    <el-form-item label="自定义接口" label-width="150px">
      <el-button type="info" icon="el-icon-edit" plain round @click="editData">
        编辑</el-button>
    </el-form-item>
    <el-form-item label-width="0">
      <el-divider class="custom-divider"></el-divider>
    </el-form-item>
    <el-drawer title="头部操作按钮" :visible.sync="editNumberVisible" :append-to-body="true" size="700px">
      <cuatomQuery
          v-if="editNumberVisible"
          @need-close="editNumberVisible=false"
          :list="list"
          windowHight="700px"
          @close="toClose"
          :formId="formId"
        ></cuatomQuery>
    </el-drawer>
  </div>
</template>

<script>
  import i18n from "@/utils/i18n"
  import eventMixin from "@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin"
  import cuatomQuery from "./components/cuatomQuery.vue"
  export default {
    name: "el-table-cuatomQuery-editor",
    mixins: [i18n, eventMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,

    },
    components: {
      cuatomQuery
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
        console.log(this.selectedWidget.options.cuatomQuery);
        
        return  this.selectedWidget.options.cuatomQuery;
      },
      formId(){
        return  this.selectedWidget.options.formId;
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
      toClose(data){
        this.selectedWidget.options.cuatomQuery=data
        this.editNumberVisible=false
      }
    },
    created(){
      // this.newSelectedWidget=this.selectedWidget
      console.log('selectedWidget:',this.selectedWidget);
      
    }

  }
</script>

<style scoped>

</style>
