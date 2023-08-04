<template>
  <div>
    <el-form-item label="头部操作按钮" label-width="150px">
      <el-button type="info" icon="el-icon-edit" plain round @click="editData">
        编辑
      </el-button>
    </el-form-item>
    <el-drawer title="头部操作按钮" :visible.sync="editNumberVisible" :append-to-body="true" size="1000px">
        <editButtonTable
          v-if="editNumberVisible"
          @need-close="editNumberVisible=false"
          :list="list"
          windowHight="700px"
          @close="toClose"
        ></editButtonTable>
    </el-drawer>
  </div>
</template>

<script>
  import Vue from 'vue'
  import i18n from "@/utils/i18n"
  import eventMixin from "@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin"
  import editButtonTable from "./components/editButtonTable.vue"
  export default {
    name: "el-table-tableButtonEdit-editor",
    mixins: [i18n, eventMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,

    },
    components: {
      editButtonTable
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
        return  this.selectedWidget.options.crudOption.tableButtons;
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
        this.selectedWidget.options.crudOption.tableButtons=data
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
