<template>
  <div>
    <el-form label-width="100px" label-position="left">
      <el-form-item label="数据集">
        <el-select
          size="mini"
          v-model="dataSetValue"
          filterable
          placeholder="请选择"
          @change="selectDataSet"
        >
          <el-option
            v-for="item in dataSet"
            :key="item.code"
            :label="item.setName"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in userNameList"
        :key="index"
        :label="item.paramName"
      >
        <el-input v-model.trim="item.sampleItem" size="mini" />
      </el-form-item>
      <el-form-item v-for="item in setParamList" :key="item" :label="item">
        <Dictionary
          v-model="params[item]"
          :dict-key="getDictKey()"
          @input="selectParams($event, item)"
        />
      </el-form-item>
      <el-form-item label="操作">
        <el-col :span="8">
            </el-col>
            <el-col :span="8">
            </el-col>
            <el-col :span="8">
              <el-button
                type="primary"
                plain
                size="mini"
                @click="saveDataBtn"
                >刷新</el-button
          >
        </el-col>
      </el-form-item>
    </el-form>

  </div>
</template>
<script>
// 组件和方法的引用
// import { Form, Row, Col, Button, Input, Table, TableColumn, Pagination, Dialog } from 'element-ui'
import { reportDataSetList, detailBysetId } from "@/api/dataAnalysis/data";
import Dictionary from "./Dictionary";
import { validateEngOrNum } from "@/utils/validators";

export default {
  name: "DynamicComponents",
  components: {
    // Form,
    // Row,
    // ELCol: Col,
    // ELInput: Input,
    // Button,
    // Table,
    // TableColumn,
    // Pagination,
    // Dialog,
    Dictionary
  },
  model: {
    prop: "formData",
    event: "input"
  },
  props: {
    chartType: String,
    dictKey: String,
    formData: Object
  },
  data() {
    return {
      dialogFormVisibleTitle: '',
      visib: false,
      updataDisabled: false,
      isItemFilterType: "", // 选中的转换类型id
      setType: "sql", //数据集类型，主要用于区分http   addSql  addHttp  edit
      tableData2: [],
      sourceList: [],
      dialogSwitchVisible: false,
      dialogTitle: "脚本填写",
      tabsActiveName: "first",
      dataSetValue: "",
      dataSet: [], // 数据集
      userNameList: [], // 用户
      setParamList: [], // 对应的不同的图形数据参数
      params: {},
      chartProperties: {},
      // formData: {
      //   setName: "",
      //   setCode: "",
      //   setDesc: "",
      //   sourceCode: "",
      //   dynSentence: ""
      // },
      formRules: {
        setName: [
          { required: true, message: "数据集名称必填", trigger: "blur" }
        ],
        setCode: [
          { required: true, message: "数据集编码必填", trigger: "blur" },
          { validator: validateEngOrNum, trigger: "blur" }
        ],
        sourceCode: [
          { required: true, message: "数据源必选", trigger: "change" }
        ]
      },
      tableData: [
        {
          paramName: "",
          paramDesc: "",
          paramType: "",
          sampleItem: "",
          mandatory: true,
          requiredFlag: 1,
          validationRules: `function verification(data){\n\t//自定义脚本内容\n\t//可返回true/false单纯校验键入的data正确性\n\t//可返回文本，实时替换,比如当前时间等\n\t//return "2099-01-01 00:00:00";\n\treturn true;\n}`
        }
      ],
      cols: [],
      itemFilterList: [
        {
          transformType: "js",
          transformScript: ``
        }
      ],
    };
  },
  watch: {
    formData: {
      handler(val) {
        this.echoDataSet(val);
      },
      deep: true
    }
  },
  computed: {
    setCode() {
      let code = "";
      this.dataSet.forEach(el => {
        if (el.id == this.dataSetValue) {
          code = el.setCode;
        }
      });
      return code;
    }
  },
  mounted() {
    this.loadDataSet();
    this.echoDataSet(this.formData.dynamicData);
    console.log(this.formData,"this.formData999");
  },
  methods: {
    async loadDataSet() {
      const { data } = await reportDataSetList({ pageQueryData: JSON.stringify({}),condition: JSON.stringify({}),});
      this.dataSet = data.list;
    },
    async selectDataSet() {
      const {  data } = await detailBysetId(this.dataSetValue);
      this.userNameList = data.reportdatasetparamList;
      this.setParamList = data.setParamList;
    },
    async saveDataBtn() {
      const contextData = {};
      const params = {
        chartType: this.chartType,
        setCode: this.setCode,
        chartProperties: this.chartProperties,
        contextData
      };
      console.log(params,"params");
      this.$emit("change", params);
    },
    addDataBtn(){
      this.dialogFormVisibleTitle = '新增数据集';
      this.visib = true;
    },
    editDataBtn(){
      this.dialogFormVisibleTitle = '编辑数据集';
      this.visib = true;
    },
    closeDialog(){
      this.visib = false;
    },
    onJsonChange(value) {},
    onJsonSave(value) {},
    addFilter(){

    },
    reduceFilter(item){

    },
    // 数据源下拉切换
    changeSource() {},
    changeForm(val) {
      if (!val) {
        this.dialogSwitchVisible = false;
        this.jsScriptVisible = false
      }
    },
    async handleClickTabs(tab, event) {
      if (this.setType == "http") {
        //针对http数据源
        this.formData.dynSentence = JSON.stringify(this.httpForm);
      }
      if (tab.paneName == "third") {
        const params = {
          sourceCode: this.formData.sourceCode,
          dynSentence: this.formData.dynSentence,
          reportdatasetparamList: this.tableData,
          reportdatasettransformList: this.itemFilterList,
          setType: this.setType
        };
        const {  data } = await testTransformSet(params);
        
        if (data == null) return;
        this.cols = data.data;
        this.testMassageCode = "200";
      }
    },
    // 必选
    Mandatory(val) {
      if (!this.tableData[val].mandatory) {
        this.tableData[val].requiredFlag = 0;
      } else {
        this.tableData[val].requiredFlag = 1;
      }
    },
    // js 脚本编辑确定
    filterScriptConfirm() {
      const arr = this.toObject(this.tableData2);
      this.itemFilterList.forEach((el, index) => {
        if (el.transformType == "dict") {
          el.transformScript = JSON.stringify(arr);
        } else {
          el.transformScript = this.transformScript;
        }
      });
      this.dialogSwitchVisible = false;
    },
    selectParams(val, key) {
      if(val !=''){
        this.chartProperties[key] = val;
      }else{
        delete this.chartProperties[key]
      }
      
    },
    getDictKey() {
      return this.dictKey == null ? "CHART_PROPERTIES" : this.dictKey;
    },
    // 数据集回显
    async echoDataSet(val) {
      if (!val) return;
      const setCode = val.setCode;

      await this.loadDataSet();

      this.dataSetValue = this.dataSet.filter(
        el => setCode == el.setCode
      )[0].id;

      await this.selectDataSet();;
      this.echoDynamicData(val);
    },
    echoDynamicData(val) {
      const chartProperties = this.deepClone(val.chartProperties);
      this.chartProperties = chartProperties;
      if (this.setParamList.length > 0) {
        for (let i = 0; i < this.setParamList.length; i++) {
          const item = this.setParamList[i];
          if (chartProperties.hasOwnProperty(item)) {
            this.params[item] = chartProperties[item];
          }
        }
      }
    }
  }
};
</script>
<style lang="sass" scoped></style>
