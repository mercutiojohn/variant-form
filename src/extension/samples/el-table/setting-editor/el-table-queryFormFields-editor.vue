<template>
  <div>
    <el-form-item label="查询条件编辑" label-width="150px">
      <el-button type="info" icon="el-icon-edit" plain round @click="editData">
        编辑字段</el-button>
    </el-form-item>
    <el-dialog title="查询条件编辑" :visible.sync="editNumberVisible" width="60%" :append-to-body="true">
        <queryFormFields
          v-if="editNumberVisible"
          @need-close="editNumberVisible=false"
          :list="list"
          windowHight="700px"
          @close="toClose"
          :formId="formId"
          :columns="columns"
        ></queryFormFields>
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import i18n from "@/utils/i18n"
  import eventMixin from "@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin"
  import queryFormFields from "./components/queryFormFields.vue"
  export default {
    name: "el-table-queryFormFields-editor",
    mixins: [i18n, eventMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,

    },
    components: {
      queryFormFields
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
        return  this.selectedWidget.options.crudOption.queryFormFields;
      },
      formId(){
        return  this.selectedWidget.options.formId;
      },
      columns(){
        let columns= this.selectedWidget.options.crudOption.columns
        let data=[]
        const optionType=['select','radio','checkbox']
        const inputType=['input','user-choose','textarea','number','group-choose']
        const dataType=['time','time-range','date','date-range']
        columns.forEach((item)=>{
          if(!!item.label&&!!item.field){
            if(optionType.includes(item.inputType)){
              data.push({
              name:item.label,
              code:item.field,
              type:item.inputType,
              anjiSelectOption: {
                  dictCode: "",
                  option:item.option.optionItems||[]
                },
              })
            }else if(inputType.includes(item.inputType)){
              data.push({
              name:item.label,
              code:item.field,
              type:item.inputType,         
              })
            }else if(dataType.includes(item.inputType)){
              data.push({
              name:item.label,
              code:item.field,
              type:item.inputType,
              format:item.option.format,
              valueFormat:item.option.valueFormat||item.option.format,          
              })             
            }else if(item.inputType=="switch"){
              let option=[]
              option.push({value:'true',label:item.option.activeText,})
              option.push({value:'false',label:item.option.inactiveText,})
              data.push({
              name:item.label,
              code:item.field,
              type:item.inputType,
              anjiSelectOption: {
                  dictCode: "",
                  option:option
              },
              disableValue:item.option.activeText,
              enableValue:item.option.inactiveText           
              })
            }      
          }else{

          }         
        })
        return data
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
        console.log(data);
        
        this.selectedWidget.options.crudOption.queryFormFields=data
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
