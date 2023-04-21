<template>
  <div>
    <el-form-item label="编辑" label-width="150px">
      <el-button type="info" icon="el-icon-edit" plain round @click="editData">
        编辑字段</el-button>
    </el-form-item>
    <el-dialog title="表格列编辑" :visible.sync="editNumberVisible" width="60%" :append-to-body="true">
        <editTable
          v-if="editNumberVisible"
          @need-close="editNumberVisible=false"
          :list="list"
          windowHight="700px"
          @close="toClose"
        ></editTable>
    </el-dialog>
  </div>
</template>

<script>
  import i18n from "@/utils/i18n"
  import eventMixin from "@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin"
  import editTable from "../anji/components/editTable.vue"
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
        this.selectedWidget.options.crudOption.columns=data
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
