<template>
  <div>
    <el-form-item label="绑定表单" label-width="150px">
      <el-select v-model="optionModel.formId">
        <el-option v-for="(sf, sfIdx) in list" :key="sf.id" :label="sf.label" :value="sf.value"></el-option>
      </el-select>
    </el-form-item>
  </div>
</template>

<script>
  import Vue from 'vue'
  import i18n from "@/utils/i18n"
  import eventMixin from "@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin"

  export default {
    name: "el-table-formId-editor",
    mixins: [i18n, eventMixin],
    inject: ['setFunction'],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,

    },
    components: {
    },
    watch: {
    //   optionModel: {
    //   handler(val) {
    //     console.log('val',val);
        
    //     this.list= val.crudOption.formList  
       
    //   },
    //   deep: true
    // }
  },
    computed:{
    },
    data() {
      return {
        list:[],       
      }
    },
    methods:{
    },
    created(){
      // this.newSelectedWidget=this.selectedWidget
      console.log('      console.log(this.setFunction.listVformPages);',this.setFunction.listVformPages);
      
      this.list= this.setFunction.listVformPages  
    }

  }
</script>

<style scoped>

</style>
