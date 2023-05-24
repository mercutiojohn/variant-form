<template>
 <div>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="0"> -->
      <!-- <el-form-item prop="title" > -->
        <el-input
          v-model="queryParams.title"
          placeholder="搜索标题"
          clearable
          @keyup.enter.native="handleQuery"
        >
        <el-button slot="append" type="primary" icon="el-icon-search" size="mini" @click="handleQuery"></el-button>
        <!-- <el-button slot="append" style="padding-left:25px" icon="el-icon-refresh" size="mini" @click="resetQuery"></el-button> -->
         <!-- style="border-right:1px solid #dcdfe6; border-radius:0" -->
        </el-input>
      <!-- </el-form-item> -->
      <!-- <el-form-item label="模板ID" prop="templateId" >
        <el-input
          v-model="queryParams.templateId"
          placeholder="请输入模板ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="模板分类" prop="category" >
        <el-select v-model="queryParams.category" placeholder="请选择模板分类" clearable>
          <el-option
            v-for="dict in options.formTemplateCatgoryOptions"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="是否启用" prop="isActive" >
        <el-select v-model="queryParams.isActive" placeholder="请选择是否启用" clearable>
          <el-option
            v-for="dict in options.sysYesNoOptions"
            :key="dict.id"
            :label="dict.name"
            :value="dict.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="更新时间" prop="updateTime" >
        <el-date-picker
          v-model="daterangeUpdateTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime" >
        <el-date-picker
          v-model="daterangeCreateTime"
          style="width: 240px"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </el-form-item> -->
    <!-- </el-form> -->
    <template v-for="(ft, idx) in formTemplates">
      <el-card :key="idx" :bord-style="{ padding: '0' }" shadow="hover" class="ft-card">
        <el-popover placement="right" trigger="hover">
          <img slot="reference" :src="getPic(ft.preview)" style="width: 200px">
          <img :src="getPic(ft.preview)" style="height: 600px;width: 720px">
        </el-popover>
        <div class="bottom clear-fix">
          <!-- <span class="ft-title">#{{ft.id}} {{ft.title}}</span> -->
          <span class="ft-title">{{ft.title}}</span>
          <el-button type="text" class="right-button" @click="loadFormTemplate(ft.id)">
            {{i18nt('designer.hint.loadFormTemplate')}}</el-button>
        </div>
      </el-card>
    </template>
    <el-pagination
      small
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-size="pageQueryData.pageSize"
      :current-page="pageQueryData.currentPage"
      :page-sizes="[10, 15, 20, 25, 30]"
      layout="prev, pager, next"
      :total="pageQueryData.total"
    />
    <!-- layout="total, sizes, prev, pager, next, jumper" -->
  </div>
 </div>
</template>

<script>
import i18n from "@/utils/i18n"

export default {
  inject: ['request','useFormTemplate'],
  mixins: [i18n],
  name: "VformTemplate",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 字典数组
      options: {
        sysYesNoOptions: [],
        formTemplateCatgoryOptions: [],
      },
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // VForm模板管理表格数据
      formTemplates: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 更新时间时间范围
      daterangeUpdateTime: [],
      // 创建时间时间范围
      daterangeCreateTime: [],
      //分页参数
      pageQueryData:{
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
      // 查询参数
      queryParams: {
        title: null,
        templateId: null,
        category: null,
        isActive: null,
        updateTime: null,
        createTime: null,
      },
      // 表单参数
      form: {
      },
      // 表单校验
      rules: {
        title: [
          { required: true, message: "模板标题不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
  },
  mounted() {
    this.getList();
  },
  activated() {
    this.getList();
  },
  methods: {
    /** 查询VForm模板管理列表 */
    getList() {
      this.loading = true;
      this.queryParams.params = {};
      if (null != this.daterangeUpdateTime && '' != this.daterangeUpdateTime) {
        this.queryParams = this.addDateRange(this.queryParams, this.daterangeUpdateTime, 'UpdateTime');
      }
      if (null != this.daterangeCreateTime && '' != this.daterangeCreateTime) {
        this.queryParams = this.addDateRange(this.queryParams, this.daterangeCreateTime, 'CreateTime');
      }
      this.listVformTemplate({...this.queryParams,pageQueryData:this.pageQueryData}).then(response => {
        this.formTemplates = response.data.rows;
        this.pageQueryData.total = response.data.total;
        this.loading = false;
      });
    },
    listVformTemplate(query) {
      return this.request({
          url: '/vform/vformTemplate/list',
          method: 'get',
          params: query
      })
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        title: null,
        templateId: null,
        templateJson: null,
        category: null,
        isActive: "0",
        createBy: null,
        delFlag: null,
        updateTime: null,
        createTime: null,
        groupId: null,
        updateBy: null
      };
      //this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.pageQueryData.currentPage = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.daterangeUpdateTime = [];
      this.daterangeCreateTime = [];
      this.queryParams = {},
      //this.resetForm("queryForm");
      this.handleQuery();
      this.getList()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    getVformTemplate(id) {
      return this.request({
        url: '/vform/vformTemplate/' + id,
        method: 'get'
      })
    },
    // 更改每页显示行数
    handleSizeChange(val) {
      this.pageQueryData.pageSize = val
      // console.log(`size页: ${val}`)
      this.getList()
    },
    // 更改当前页码
    handleCurrentChange(val) {
      this.pageQueryData.currentPage = val
      this.getList()
    },
    /** 表格sysYesNo字典转换 */
    sysYesNoFormatter(row, column, cellValue) {
      let codeName = ''
      this.options.sysYesNoOptions.forEach((item) => {
        if (cellValue === item.code) {
          codeName = item.name
        }
      })
      return codeName
    },
    /** 表格formTemplateCatgory字典转换 */
    formTemplateCatgoryFormatter(row, column, cellValue) {
      let codeName = ''
      this.options.formTemplateCatgoryOptions.forEach((item) => {
        if (cellValue === item.code) {
          codeName = item.name
        }
      })
      return codeName
    },
    loadFormTemplate(id) {
      this.$confirm(this.i18nt('designer.hint.loadFormTemplateHint'), this.i18nt('render.hint.prompt'), {
        confirmButtonText: this.i18nt('render.hint.confirm'),
        cancelButtonText: this.i18nt('render.hint.cancel')
      }).then(() => {
        this.getVformTemplateJson(id).then(res => {
          this.useFormTemplate(res.data)
          this.$message.success(this.i18nt('designer.hint.loadFormTemplateSuccess'))
        }).catch(error => {
          this.$message.error(this.i18nt('designer.hint.loadFormTemplateFailed') + ':' + error)
        })
      }).catch(error => {
        console.error(error)
      })
    },
    getVformTemplateJson(id) {
      return this.request({
        url: '/vform/vformTemplate/json/' + id,
        method: 'get'
      })
    },
    getPic(picObjStr){
      console.log(picObjStr)
      if(picObjStr){
        try {
          console.log(JSON.parse(picObjStr))
          console.log(JSON.parse(picObjStr)[0].url)
          return JSON.parse(picObjStr)[0].url
        } catch (error) {
          return ''
        }
      } else {
        return ''
      }
    }
  }
};
</script>
<style lang="scss" scoped>
::v-deep.el-tooltip__popper {
  max-width: 40%;
}
.el-card.ft-card {
  // border: 1px solid #8896B3;
}

.ft-card {
  margin-bottom: 10px;

  .bottom {
    margin-top: 10px;
    line-height: 12px;
  }

  .ft-title {
    font-size: 13px;
    font-weight: bold;
  }

  .right-button {
    padding: 0;
    float: right;
  }

  .clear-fix:before, .clear-fix:after {
    display: table;
    content: "";
  }

  .clear-fix:after {
    clear: both;
  }

}
</style>
