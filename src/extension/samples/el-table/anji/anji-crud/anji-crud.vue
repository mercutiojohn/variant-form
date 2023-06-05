<template>

  <div :class="[hasTreeFieldInQueryForm ? 'page-container' : 'app-container']">
    <div v-if="hasTreeFieldInQueryForm" class="left-container">
      <!-- <AnjiTree
        ref="queryFormTree"
        v-model.trim="queryParams[queryFormTreeField.field]"
        :is-open="queryFormTreeField.anjiTreeOption.isOpen"
        :enable-filter="queryFormTreeField.anjiTreeOption.enableFilter"
        :label-name="queryFormTreeField.label"
        :url="queryFormTreeField.anjiTreeOption.url"
        @node-click="handleTreeNodeCheck"
      /> -->
    </div>
    <div class="right-container">
      <div class="top_part">
     
        <!-- 查询表单开始 -->
        <el-form
          v-if="queryFormTreeHide"
          ref="formSearch"
          :model="queryParams"
          label-width="100px"
        >
          <div >
              <el-row :span="24">
                <template v-for="(item, index) in queryFormFieldExcludeTree">
                  <el-col
                    v-if="index < 9999 || showMoreSearch"
                    :key="item.field"
                    :span="6"
                  >
                    <el-form-item
                      :label="item.label"
                      :rules="item.rules"
                      :prop="item.field"
                    >
                      <!-- 输入框 -->
                      <el-input
                        v-if="
                          item.inputType == 'input' ||
                            item.inputType == 'number'
                            ||item.inputType=='textarea'
                            ||item.inputType=='user-choose'
                            ||item.inputType=='group-choose'
                        "
                        v-model.trim="queryParams[item.field]"
                        :placeholder="item.placeholder || '请输入'"
                        :clearable="item.clearable !== false"
                        :disabled="item.disabled"
                        @change="value => queryFormChange(item.field, value)"
                      />
                      <!-- 开关 -->
                      <!-- <el-switch
                        v-else-if="item.inputType == 'switch'"
                        v-model.trim="queryParams[item.field]"
                        :disabled="item.disabled"
                        :active-value="item.disableValue"
                        :inactive-value="item.enableValue"
                        active-color="#5887fb"
                        inactive-color="#ccc"
                        @change="value => queryFormChange(item.field, value)"
                      /> -->
                      <!-- 下拉框 -->
                      <Select 
                          v-else-if="item.inputType == 'select'||item.inputType == 'radio'||item.inputType == 'switch'||item.inputType == 'checkbox'"         
                          v-model.trim="queryParams[item.field]"
                          :disabled="item.disabled"
                          :multiple="false" 
                          :multiple-limit="item.inputType == 'checkbox'?9999:item.anjiSelectOption.multipleLimit"
                          @change="value => queryFormChange(item.field, value)"
                          >
                          <Option
                            v-for="item1 in item.anjiSelectOption.option"
                            :key="item1.value"
                            :label="item1.label"
                            :value="item1.value"
                          ></Option>
                      </Select>
                      <!-- <el-checkbox-group
                        v-else-if="item.inputType == 'checkbox'" 
                        :disabled="item.disabled" 
                        v-model="queryParams[item.field]"
                        @change="value => queryFormChange(item.field, value)"
                      >
                        <template>
                          <el-checkbox v-for="(item1,index) in item.anjiSelectOption.option" 
                          :key="index" :label="item1.value"  :disabled="item.disabled"                     
                                        >{{item1.label}}</el-checkbox>
                        </template>
                      </el-checkbox-group> -->
                      <!-- <anji-select
                        v-else-if="item.inputType == 'anji-select'"
                        v-model.trim="queryParams[item.field]"
                        :multiple="item.anjiSelectOption.multiple"
                        :dict-code="item.anjiSelectOption.dictCode"
                        :url="item.anjiSelectOption.url"
                        :method="item.anjiSelectOption.method"
                        :query-param="item.anjiSelectOption.queryParam"
                        :option="item.anjiSelectOption.option"
                        :label="item.anjiSelectOption.label"
                        :disabled-options="
                          item.anjiSelectOption.disabledOptions
                        "
                        :disabled="item.disabled"
                        :merge-label="item.anjiSelectOption.mergeLabel"
                        :local-options="item.anjiSelectOption.localOptions"
                        @change="value => queryFormChange(item.field, value)"
                      /> -->
                      <!-- 日期时间框  -->
                      <el-date-picker
                        v-else-if="item.inputType == 'date---'"
                        v-model="queryParams[item.field]"
                        style="width: 100%"
                        :placeholder="item.placeholder || '请选择'"
                        :type="item.inputType"
                        :format="item.format"
                        :value-format="item.valueFormat"
                        :clearable="item.clearable !== false"
                        @change="value => queryFormChange(item.field, value)"
                      />
                      <el-date-picker
                        v-else-if="item.inputType == 'date-range'||item.inputType == 'date'"
                        v-model="queryParams[item.field]"
                        style="width: 100%"
                        :placeholder="item.placeholder || '请选择'"
                        type="daterange"
                        :format="item.format"
                        :value-format="item.valueFormat"
                        :clearable="item.clearable !== false"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        @change="value => queryFormChange(item.field, value)"
                      ></el-date-picker>
                      <el-time-picker
                        v-else-if="item.inputType == 'time---'"
                        v-model="queryParams[item.field]"
                        style="width: 100%"                       
                        :placeholder="item.placeholder || '请选择'"
                        :format="item.format" 
                        :value-format="item.valueFormat"
                        :clearable="item.clearable !== false"
                        @change="value => queryFormChange(item.field, value)"
                      />
                      <el-time-picker 
                        v-else-if="item.inputType == 'time-range'||item.inputType == 'time'"
                        v-model="queryParams[item.field]"
                        style="width: 100%"                       
                        :placeholder="item.placeholder || '请选择'"
                        is-range
                        :format="item.format" 
                        :value-format="item.valueFormat"
                        :clearable="item.clearable !== false"
                        range-separator="-"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        @change="value => queryFormChange(item.field, value)"
                        />
                      <anji-cascader
                        v-else-if="item.inputType == 'anji-cascader'"
                        v-model.trim="queryParams[item.field]"
                        :disabled="item.disabled"
                        :single-display="item.anjiCascader.singleDisplay"
                        :url="item.anjiCascader.url"
                        @change="
                          value => queryFormChange(item.field, value, null)
                        "
                      />
                      <!-- 待扩展的表单类型，请自行扩展 -->
                      <el-input
                        v-else
                        placeholder="组件不支持此类型表单请至组件内部自行扩展"
                        disabled
                      />
                    </el-form-item>
                  </el-col>

                  <!-- <el-button
                  
                  v-if="queryFormFieldExcludeTree.length > 3"
                  class="button"
                  size="mini"
                  plain
                  @click="handleToggleMoreSearch"
                >
                  <i
                    :class="
                      queryParams.showMoreSearch
                        ? 'el-icon-arrow-up'
                        : 'el-icon-arrow-down'
                    "
                  />
                  {{ queryParams.showMoreSearch == true ? "展开" : "收起" }}
                </el-button> -->
                </template>
                <ElCol :span="2"  v-if="queryFormFieldExcludeTree.length > 9999"> 
                  <div style="height:1px;"></div>                 
                </ElCol>
                <ElCol :span="3"  v-if="queryFormFieldExcludeTree.length > 9999">
                    <el-button size="medium" type="text" :icon=" showMoreSearch?'':'el-icon-search'" @click="handleToggleMoreSearch">
                        {{ showMoreSearch == true ? "收起": "高级查询" }}
                          </el-button>
                </ElCol>
                <ElCol :span="6" style="margin-top: 1px;" >
                  <el-button style="float:right;margin-right: 15px;height: 32px;" icon="el-icon-refresh" size="mini" @click="handleResetForm()">重置</el-button>
                  <el-button style="float:right;margin-right: 15px;height: 32px;" type="primary" icon="el-icon-search" size="mini" @click="handleQueryForm('query')">搜索</el-button>
                </ElCol>
              </el-row>
              <!-- <el-row :span="24">
                  <el-button style="float:right;margin-right: 15px;" icon="el-icon-refresh" size="mini" @click="handleResetForm()">重置</el-button>
                  <el-button style="float:right;margin-right: 15px;" type="primary" icon="el-icon-search" size="mini" @click="handleQueryForm('query')">搜索</el-button>
              </el-row> -->
          </div>
        </el-form>
      
        <!-- 查询表单结束 -->
        
      </div>

      <!-- 表格开始 -->
      <div class="main_part">
        <div class="page_main">
          <!-- 批量操作 -->
        <div style="padding-bottom: 8px">
            <slot name="tableButtons" :selection="checkRecords" />
            <el-button
              v-for="(item, index) in option.tableButtons"
              :key="index"
              :plain="item.plain"
              :icon="item.icon"
              :type="item.type"
              :disabled="isDisabledButton(item, checkRecords)"
              @click="item.click('',item)"
              style="font-size: 16px;"
              :size="item.size"
              >{{ handlegetLable(checkRecords, item.label) }}
            </el-button>
          </div>
          <Table
            ref="tables"
            class="elTable"
            align="center"
            :data="records"
            :row-class-name="tableRowClassName"
            border
            @selection-change="handleSelectionChange"
            @sort-change="handleSortChange"
            @row-dblclick="handleSelectionDblclick"
            @row-contextmenu="rowContextMenu"
          >
          <template v-for="(item, index) in option.columns">              
                    <el-table-column
                      v-if="item.tableHide != true && item.columnType != 'expand'"
                      :key="index"
                      :prop="item.field"
                      :label="fieldLabel(item)"
                      :min-width="item.minWidth || 120"
                      :sortable="item.sortable"
                      show-overflow-tooltip
                      :align="item.contentAlign"
                      :header-align="item.headerAlign"
                    >
                      <template slot-scope="scope">
                        <div v-if="item.inputType == 'custom'" >
                          <component :is="'custom-slot-' + item.field" :item="item" :scope="scope" :data="scope.row[item.field]"></component>
                        </div>
                        <div v-else-if="item.columnType == 'imgPreview'||item.inputType == 'imgPreview'">
                          <!-- 图片缩略图-->
                          <el-image
                            style="width: 25%; height: 50%"
                            fit="contain"
                            :src="scope.row[item.field]"
                            :preview-src-list="[scope.row[item.field]]"
                          />
                        </div>
                        <div v-else-if="item.inputType == 'color'" >
                           <div :style="{width:'100%',height:'22px','background-color':scope.row[item.field]}"></div>
                        </div>
                        <!-- <div v-else-if="item.inputType == 'rate'" >
                          <el-rate  v-model="scope.row[item.field]"
                            disabled="true"
                            :max="item.option.max"
                            :low-threshold="item.option.lowThreshold" :high-threshold="item.option.highThreshold"
                            :allow-half="item.option.allowHalf"
                            :show-text="item.option.showText" :show-score="item.option.showScore">
                          </el-rate>
                        </div> -->
                        <div v-else :style="getDataStyle(scope.row,item)" >
                        {{ getDataName(scope.row,item)}} 
                          <!-- <div v-else :style="getDataStyle(scope.row,item)"  v-html="`<div style=''>${scope.row[item.field]||''} <div style='width:14px;height:14px;'><svg viewBox='0 0 100 100'><path d='
                            M 50 50
                            m 0 -39
                            a 39 39 0 1 1 0 78
                            a 39 39 0 1 1 0 -78
                            ' stroke='#e5e9f2' stroke-width='21.4' fill='none' class='el-progress-circle__track' style='stroke-dasharray: 245.044px, 245.044px; stroke-dashoffset: 0px;'></path><path d='
                            M 50 50
                            m 0 -39
                            a 39 39 0 1 1 0 78
                            a 39 39 0 1 1 0 -78
                            ' stroke='#20a0ff' fill='none' stroke-linecap='round' stroke-width='21.4' class='el-progress-circle__path' style='stroke-dasharray: 245.044px, 245.044px; stroke-dashoffset: 0px; transition: stroke-dasharray 0.6s ease 0s, stroke 0.6s ease 0s;'></path></svg>
                          </div> </div>`">
                          </div> -->
                          <!-- <span v-if="item.inputType == 'switch' && !item.colorStyle">
                            <el-switch
                              v-model.trim="scope.row[item.field]"
                              :active-value="1"
                              :inactive-value="0"
                              active-color="#5887fb"
                              inactive-color="#ccc"
                              @change="switchChange(scope.row, item.switchOption)"
                            />
                          </span>

                          <span v-else-if="item.mergeColumn"
                            >{{ scope.row[item.field] }}({{
                              scope.row[item.mergeColumn]
                            }})</span
                          >

                          <span
                            v-else-if="item.colorStyle"
                            :class="item.colorStyle[scope.row[item.editField]]"
                            >{{ fieldValueByRowRenderer(scope.row, item) }}</span
                          >
                          <span v-else>{{
                            fieldValueByRowRenderer(scope.row, item)
                          }}</span> -->
                        </div>
                      </template>
                    </el-table-column>
          </template>
            <!--多选-->
            <el-table-column fixed v-if="selectionChange" type="selection" width="50" align="center" />
            <!--隐藏列-->
            <!-- <el-table-column v-if="tableExpandColumns.length > 0" type="expand">
              <template slot-scope="scope">
                <p
                  v-for="item in tableExpandColumns"
                  :key="item.field"
                  class="table-expand-item"
                >
                  <span class="titel"> {{ item.label }}: </span>
                  <span>{{ scope.row[item.field] }}</span>
                </p>
              </template>
            </el-table-column> -->
            <!--序号-->
            <!-- <el-table-column label="序号" min-width="50" align="center">
              <template slot-scope="scope">
                {{
                  queryParams.pageSize * (queryParams.currentPage - 1) +
                    scope.$index +
                    1
                }}
              </template>
            </el-table-column> -->
            <!-- <TableColumn type="index" header-align="center" align="center" min-width="50" label="序号" width="80"></TableColumn> -->

            <!--操作栏-->
            <el-table-column
              align="center"
              fixed="right"
              label="操作"
              :width="option.buttons.rowButtonsWidth || 100"
              v-if="option.rowButtons.length>0"
            >
              <template slot-scope="scope">
                <div >
                  <template v-for="(item, index) in option.rowButtons">
                    <el-button
                      v-if="isHide(item, scope.row)"
                      :key="index"
                      :disabled="isDisabledButton(item, scope.row)"
                      :type="item.type || 'text'"
                      size="small"
                      @click="item.click(scope.row,item)"
                    >{{ handlegetLable(scope.row, item.label) }}</el-button
                    >
                  </template>
                </div>
              </template>
            </el-table-column>
          </Table>
          <!-- <el-col :span="24" style="margin-left: 0px;"> -->
            <!-- 分页标签 -->
          <!-- <div class="page_bottom">
            <div class="pagination"> -->
              <!-- <div>
                <slot name="tableSelectionBtn" :selection="checkRecords" />
              </div> -->
              <el-pagination
                v-show="pageQueryDataFlag"
                :current-page.sync="params.pageQueryData.currentPage"
                :page-sizes="[10, 15, 20]"
                :page-size="params.pageQueryData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="params.pageQueryData.total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              >
             </el-pagination>
            <!-- </div>
          </div> -->
        <!-- </el-col> -->
        </div>
      </div>
      <!-- 表格结束 -->

      <EditDialog
        ref="edit"
        :submit-detail-data="option.submitDetailData"
        :handle-detail-data="option.handleDetailData"
        :option="option"
        :model-type="editDialogModelType"
        :visible="editDialogOpen"
        :row-data="editDialogRowData"
        :itemId="itemId"
        @closeEvent="editDialogClosedEvent"
      >
        <template v-slot:customCard>
          <slot name="cardInEditPage" />
        </template>
        <template slot="editBtn" slot-scope="scope">
          <slot name="editBtnPage" :rowData="scope" />
        </template>
      </EditDialog>
    </div>
    <slot name="pageSection" />
    <!-- 右键菜单 -->
    <anji-contextMenu
      :visible.sync="isShowRowContextMenu"
      :style-obj="contextMenuConfigStyle"
    >
      <div
        v-for="(item, index) in option.contextMenu"
        :key="index"
        class="contextMenu"
      >
        <el-button
          type="text"
          :disabled="item.disabled"
          class="contextMenuItem"
          @click="handleContextMenuItem(item)"
          >{{ item.label }}</el-button
        >
      </div>
    </anji-contextMenu>
  </div>

</template>
<script>
// import AnjiTree from "@/components/anji/anji-tree.vue";
import EditDialog from "./edit";
import Draggable from 'vuedraggable'
import i18n from "@/utils/i18n"
import FieldComponents from '@/components/form-designer/form-widget/field-widget/index'
import refMixinDesign from "@/components/form-designer/refMixinDesign"
import anjiContextMenu from "../anji-contextMenu";
import AnjiSelect from "../anji-select.vue";
import { Form, Row, Col, Input,Button, Table, TableColumn, Pagination, Dialog, Radio, RadioGroup, Option, Select, Cascader,CheckboxGroup, Checkbox  } from 'element-ui'
import common from './mixins/common'
import queryform from './mixins/queryform'
import Vue from 'vue'

export default {
  inject: ['listVformPages','addRedirect','editRedirect','setFunction','dataHandling','request','router'],
  mixins: [
    common,
    queryform,
    i18n, refMixinDesign
  ],
  components: {
    Select,
    Option,
    EditDialog,
    // AnjiTree,
    anjiContextMenu,
    AnjiSelect,
    Draggable,
    Pagination,
    TableColumn,
    Table,
    ...FieldComponents,
  },
  props: {
    formId:{

    },
    option: {
      require: true,
      type: Object,
      default: () => {
        return {
          formHeight: this.$refs.formSearch.$el.offsetHeight,
          // 详情页中输入框左边文字宽度
          labelWidth: "120px",
          // 查询区隐藏
          queryFormHide: false,
          // 查询表单条件
          queryFormFields: [],
          // 按钮
          buttons: {
            query: {},
            edit: {},
            delete: {},
            add: {}
          },
          itemId:'',
          // 表格列
          columns: [],
          queryFormChange: (fileName, val) => {}
        };
      }
    }
  },
  data() {
    return {
      // 查询表单提交的值
      showMoreSearch:false,
      queryParams: {
        // showMoreSearch: false, // 是否展开更多搜索条件
        // order: "",
        // sort: ""
      },
      params: {
            pageQueryData: {
              total: 0,
              pageSize: 10,
              currentPage: 1
            }
          },
      checkRecords: [], // 表格中当前选中的记录
      records: [], // 接口返回的记录列表
      // total: 0, // 接口返回的总条数

      // 编辑详情弹框
      itemId:'',
      editDialogOpen: false, // 新建时主动打开编辑弹框
      editDialogRowData: {}, // 编辑时的主键
      editDialogModelType: "view", // 编辑 查看

      hasCustomButtonInRowMore: false, // 除了编辑删除外，还有自定义的行按钮

      isShowRowContextMenu: false,
      contextMenuConfigStyle: {},
      contextMenuRow: {},
      pageQueryDataFlag:true,
    };
  },
  watch: {
    option: {
      handler(val) {
        // console.log(111111)
      },
      deep: true
    },
    'option.columns': {
      handler(newVal) {
        console.log('[OptionChanged]',newVal)
        newVal.forEach(item => {
          if(item.inputType == 'custom'){
            this.register(item.field, item.customCode?.template ? item.customCode.template : '<div>{{data}}</div>', item.customCode?.methods ? item.customCode.methods : '')
          }
        })
      },
      deep: true
    },
    formId:{
      handler(val) {
        this.handleResetForm()
      },
    },
    'option.pageQueryDataFlag':{
      handler(val) {
        this.pageQueryDataFlag=this.option.pageQueryDataFlag
        this.handleResetForm()
      },
    },
    'option.queryFormHide':{
      handler(val) {
        this.handleResetForm()
      },
    }
  },
  computed: {
    //多选列控制
    selectionChange(){
      console.log('dads',this.option.tableButtons);
      
      for (let index = 0; index < this.option.tableButtons.length; index++) {
        if(this.option.tableButtons[index].id=='delete'){
          return true
          break;
        }        
      }
      return false
    },
    // 查询区隐藏
    queryFormTreeHide() {
      const flag =this.option.queryFormHide != null && this.option.queryFormHide == true;
      return flag;
    },
    // 左侧树形查询条件
    queryFormTreeField() {
      const treeField = this.option.queryFormFields.find(
        item => item["inputType"] == "anji-tree"
      );
      return treeField;
    },
    // 查询条件里是否有树形控件
    hasTreeFieldInQueryForm() {
      return this.isNotBlank(this.queryFormTreeField);
    },
    // 不包含树形控件的查询条件
    queryFormFieldExcludeTree() {
      //查询条件控制
      this.queryParams={}
      this.option.queryFormFields.forEach(item => {
        // 动态添加属性
          this.$set(this.queryParams, item.field, item.defaultValue || null);             
      });
      // console.log('this.option.queryFormFields',this.option.queryFormFields);
      
      let treeFields =this.option.queryFormFieldsFlag?(this.option.queryFormFields.filter(
        item => item["inputType"] != "anji-tree"
      )):[]
      return treeFields;
    },
    // 主键的列名
    primaryKeyFieldName() {
      let primaryKey = this.option.columns.find(
        item => item["primaryKey"] == true
      );
      if (primaryKey != null) {
        return primaryKey["field"];
      } else {
        return null;
      }
    },

    // 表格中可展开的列
    tableExpandColumns() {
      let expandColumns = this.option.columns.filter(
        item => item["columnType"] == "expand"
      );
      return expandColumns;
    },

    // 是否可以批量删除
    disableBatchDelete() {
      return this.checkRecords.length <= 0;
    },
    //获取列表数据样式
    getDataStyle(){
      return(row,item)=>{
        let mountFunc = new Function('row','item',this.option.columnsCss)
        let newData= mountFunc(row,item)
        return newData||{}
        // if(row.pageType=='form'&&item.field=='pageType'){
        //   return {
        //     color:'blue !important',
        //     'background-color':'green',
        //     padding:'5px 10px',
        //   }
        // }
      }
    }
  },
  created() {
    this.pageQueryDataFlag=this.option.pageQueryDataFlag
    this.itemId=this.option.itemId
    // 为查询框中所有input加上默认值   
    this.option.queryFormFields.forEach(item => {
      // 动态添加属性   
      this.$set(this.queryParams, item.field, item.defaultValue || null);
      
     
    });
    // 查询列表
    if (this.option.skipQuery || this.option.skipQuery == undefined) {
      this.handleQueryForm("query");
    }
    this.queryFormChange();
    console.log('[init-register]',this.option.columns)
    this.option.columns.forEach(item => {
      if(item.inputType == 'custom'){
        this.register(item.field, item.customCode?.template ? item.customCode.template : '<div>{{data}}</div>', item.customCode?.methods ? item.customCode.methods : {})
      }
    })
  },
  mounted() {
    if (this.$scopedSlots["rowButtonInMore"] != null) {
      this.hasCustomButtonInRowMore = true;
    } else {
      this.hasCustomButtonInRowMore = false;
    }
  },
  methods: {
    queryFormFieldSpan(item) {
      if (item.span != null) {
        return item.span;
      } else {
        return 6;
      }
    },
    // 切换更多搜索条件
    handleToggleMoreSearch() {
      this.showMoreSearch = !this.showMoreSearch;
    },
    // 列上排序切换
    handleSortChange(column) {
      // {column: {…}, prop: "orgCode", order: "ascending"}
      if (column == null || column.prop == null) {
        console.warn("排序字段名prop为空，无法排序");
        return;
      }
      // console.log(column,'123321321321');
      
      // let sort = column.prop; // 列表查询默认排序列
      // let order = column.order == "ascending" ? "ASC" : "DESC";
      // this.queryParams["sort"] = sort;
      // this.queryParams["order"] = order;
      // this.handleQueryForm("query");
    },
    // 查询按钮
    handleQueryForm(from) {
      // 如果是点查询按钮，把树的查询属性去掉
      if (from == "query") {
        if (this.hasTreeFieldInQueryForm) {
          delete this.queryParams[this.queryFormTreeField.field];
        }
      }
      // 如果是点树查询，把查询区里的属性去掉
      if (from == "tree") {
        if (this.hasTreeFieldInQueryForm) {
          let treeVal = this.queryParams[this.queryFormTreeField.field];
          this.queryParams = {
            showMoreSearch: false,
            currentPage: 1,
            pageSize: 10
          };
          this.queryParams[this.queryFormTreeField.field] = treeVal;
        }
      }
      // 默认的排序
      // if (
      //   this.isBlank(this.queryParams["order"]) &&
      //   this.isNotBlank(this.option.buttons.query.order)
      // ) {
      //   this.queryParams["sort"] = this.option.buttons.query.sort;
      //   this.queryParams["order"] = this.option.buttons.query.order;
      // }
      this.params.pageQueryData.currentPage = 1;

      // 添加一些其他的查询参数
      if (this.option.buttons.query.params) {
        const params = this.option.buttons.query.params;
        for (const key in params) {
          this.queryParams[key] = params[key];
        }
      }

      this.handleQueryPageList();
    },
    // 外部追加参数进来
    handleAddQueryParams(k, v) {
      this.queryParams[k] = v;
    },
    // 列表查询
    async handleQueryPageList() {
      // 将特殊参数值urlcode处理
      // let params = this.urlEncodeObject(this.queryParams, "order,sort");
      let object=this.deepClone(this.queryParams)
      //对多条件查询date|time类型数据进行处理
      let params= this.getNewParams(object)
      console.log(params);
      //绑定formid后默认查询||vform查询   
      if(!!this.formId&&(this.option.cuatomQuery.setting==='0'||!this.option.cuatomQuery.setting)){
        // this.setFunction.queryListCond(this.formId,{pageQueryData:this.params.pageQueryData,queryParams:params}).then(response => {
        //   if (response.data.code != "200") return;
        //   this.records = response.data.rows;
        //   this.params.pageQueryData.total = response.data.total;
        // }); 
        let api={} 
        api['method']= 'post'
        if(this.pageQueryDataFlag){
          api['url']='/dyn/vf/queryListCond/'+ this.formId,
          api['data']={queryParams:params,pageQueryData:this.params.pageQueryData}
        }else{
          api['url']='/dyn/vf/queryListAll/'+ this.formId,
          api['data']={queryParams:params}
        }     
         this.request(api).then(response => {
          // if (response.data.code != "200") return;
          this.records = response.data.rows;
          this.params.pageQueryData.total = response.data.total;
        });
      }else{
        //自定义查询
        let query={}
        let url={}
        let apiData=this.option.cuatomQuery.apiData
        let urlData={}

        //转为对象
        if(!!this.option.cuatomQuery.apiData){
          apiData= eval("("+apiData+")")  
          console.log('apiData',apiData);   
          // this.router.push(apiData)   
        }
        if(!!this.option.cuatomQuery.urlData){
          urlData= eval("("+this.option.cuatomQuery.urlData+")")      
          console.log('urlData',urlData);          
        }  
        let routeQuery=this.deepClone(this.$route.query)
        let{routeData,routeParams}=this.replaceParamsObject(apiData,routeQuery,'query')
        params={...params,...routeData}
        //对参数进行处理
        query=  this.getNewData(apiData,params,'query')
       
        // console.log(query);
        let api ={}
        //如果是代码生成查询，url不需要传参并且为get方式
        // if(this.option.cuatomQuery.setting==='1'){        
        //   api['url']= (this.option.cuatomQuery.apiUrl||'/demo/genTestBasicDemo/list'),
        //   api['method']='get',
        //   api['params']=query,         
        //   this.request(api).then(response => {
        //     if (response.data.code != "200") return;
        //     this.records = response.data.rows;
        //     this.params.pageQueryData.total = response.data.total;  
        //   });
        // }else{      
          api['method']=this.option.cuatomQuery.apiType
          if(!!this.option.cuatomQuery.apiUrl){
            // this.formId='vformGenTableTestForm'
            //路径参数进行处理
            let{newData,routeParams}=this.replaceParamsObject(urlData,routeQuery,'url')
            console.log('newData',newData);
            
            let urlParam={...this,...newData}
            url= this.getNewData(urlData,this,'url')
            // console.log('url',url);
            let allUrl=this.option.cuatomQuery.apiUrl
            for (const key in url) {              
              if (url.hasOwnProperty(key)) {  
                allUrl=allUrl+'/'+url[key]
              }
            }
            api['url']=allUrl 
            // console.log('api[url]',allUrl);
          }else{
            api['url']=''
          }
          console.log(api);
          
          if(this.option.cuatomQuery.apiType=='get'){
            api['params']=query 
          }else{
            // this.formId='vformGenTableTestForm'
            if(this.option.cuatomQuery.parameterType=='params'){
              api['params']=query 
              api['data']=query 
            }else{
              api['params']=query 
              api['data']=query 
            }
            
          }   
          console.log('api最终的值',api);               
          this.request(api).then(response => {
            // if (response.data.code != "200") return;
            console.log(this.option.cuatomQuery.dataConversion);
            if(!!this.option.cuatomQuery.dataConversion){
              let mountFunc = new Function('response',this.option.cuatomQuery.dataConversion)
              this.records= mountFunc(response)
              console.log(this.records);
              
            }else{
              this.records = response.data.rows;
            }                        
            this.params.pageQueryData.total = response.data.total;  
          });
        // }
      }
      // const { data } = await this.option.buttons.query.api({ pageQueryData: JSON.stringify(this.params.pageQueryData),condition: JSON.stringify(this.queryParams),});
      // if (code != "200") return;
      // this.records = data.list;
      // this.params.pageQueryData.total = data.total;
    },
    getNewParams(object){
      let params ={}
      let types=['date','time','date-range','time-range']
      if(this.option.queryFormHide){
        if(this.option.cuatomQuery.setting==='0'||!this.option.cuatomQuery.setting){
          for (const key in object) {
            if (object.hasOwnProperty(key)&&!!key) {
              let type=''
              let query=''
              for (let index = 0; index < this.option.columns.length; index++) {
                if(this.option.columns[index].field==key&&!!object[key]){
                  type=this.option.columns[index].inputType
                  if(types.includes(type)){         
                    query= this.dataHandling.addDateRange({},object[key],key)
                  }
                  break
                }            
              }
              params[key]={
                name:key,
                type:type,
                query:query||object[key],
              }         
            }
          }
        }else{
          // params=object
          for (const key in object) {
            if (object.hasOwnProperty(key)&&!!key) {
              let type=''
              let query=''
              for (let index = 0; index < this.option.columns.length; index++) {
                if(this.option.columns[index].field==key&&!!object[key]){
                  type=this.option.columns[index].inputType
                  if(types.includes(type)){      
                    query= this.dataHandling.addDateRange({},object[key],key)
                    if(!!query){
                      for (const key in query.params) {
                        params[key]=query.params[key]
                      }
                    }
                  }else if(object[key]!=='null'){
                    params[key]=object[key]
                  }  
                  break
                }            
              }        
            }  
          }
        }           
      }
      return params
    },
    getNewData(data,param,status){
      //递归替换数据
      if(status=='query'){
        //查询条件
        // if(this.option.queryFormHide){
          let{apiData,params}=this.replaceParamsObject(data,param,status)
          console.log(apiData,params);
          
          //分页条件
          if(this.pageQueryDataFlag){
              return{...params,pageQueryData:this.params.pageQueryData,...apiData}
            }
            return{...params,...apiData}
        // }else{
        //   if(this.pageQueryDataFlag){
        //       return{pageQueryData:this.params.pageQueryData}
        //     }
        //     return{}
        // }
        
      }else if(status=='url'){
        let{apiData,params}= this.replaceParamsObject(data,param,status)     
          return{...apiData}         
      }        
    },
    replaceParamsObject(data,data1,status){
      let apiData=data
      let params=data1
        for (const key in apiData) {
          if (apiData.hasOwnProperty(key)) { 
            if(Object.prototype.toString.call(apiData[key])=='[object Object]'){
              // console.log('replaceParamsObject',this.replaceParamsObject(apiData[key],params,status)); 
              let objectData=this.replaceParamsObject(apiData[key],params,status)
              apiData[key]=objectData['apiData'] 
              }else{     
                let data=this.replaceParams(apiData[key], params) 
                let newDataKey=''
                let newData=''
                // console.log(Object.prototype.toString.call(data)=='[object Object]');
                // console.log('7878',data);
                if(Object.prototype.toString.call(data)=='[object Object]'){
                  newData=data['name']
                  newDataKey=data['key']
                }else{
                  newData=data
                }       
                if(!!newData&&newData!=='undefined'){
                  apiData[key]=newData
                  if(status=='query'){
                    !!newDataKey&&Reflect.deleteProperty(params,newDataKey)
                  }           
                }else{
                  Reflect.deleteProperty(apiData,key)
                }                  
              }
        }
      }
       console.log(apiData,params);      
       return {apiData,params} 
    },
    replaceParams (str, replacements) {
      const regex = /\$\{([^}]+)\}/g       
        // console.log('[replaceParams]', str, replacements, str.replace(regex, (_, match) => match))  
        if(str==str.replace(regex, (_, match) => match) ){
          return str 
        }else{
          return {name: str.replace(regex, (_, match) => replacements[match]),
                  key:str.replace(regex, (_, match) => match) }
        }    
    },
    replaceParams1 (str, replacements) {
      const regex = /\$\{([^}]+)\}/g       
        //  console.log('[replaceParams]', str, replacements, str.replace(regex, (_, match) => match))  
          return str.replace(regex, (_, match) => replacements[match])   
    },
    // 重置
    handleResetForm() {
      // const showMoreSearch = this.queryParams.showMoreSearch;
      // this.queryParams = {
      //   order: "",
      //   sort: "",
      //   showMoreSearch
      // };

      // 查询条件表单只读模式下不重置默认值
      const queryFormFieldsOption = this.option.queryFormFields;
      queryFormFieldsOption.forEach(el => {
        if (!el.disabled) {
          this.queryParams[el.field] = !!el.defaultValue?el.defaultValue:''
        }
      });
      this.handleQueryForm('query')
    },
    // 树形查询条件点击回调
    handleTreeNodeCheck() {
      this.handleQueryForm("tree");
      // 为新建页面的对应属性值，绑定上对应的默认值
      let treeFieldName = this.queryFormTreeField["field"];
      for (let i = 0; i < this.option.columns.length; i++) {
        let item = this.option.columns[i];
        if (
          item["editField"] == treeFieldName ||
          item["field"] == treeFieldName
        ) {
          this.$set(
            this.option.columns[i],
            "defaultValue",
            this.queryParams[treeFieldName]
          );
          break;
        }
      }
    },
    // 编辑和查看操作
    handleOpenEditView(modelType,row,item) {
      if (modelType == "view" || modelType == "edit") {
        //是否打开内部弹框
          if(this.option.dialogFlag){
            console.log(row);
            
            this.editDialogRowData = row;
            this.editDialogOpen = true;
          }else{
            console.log(row);
            console.log(item);
            if(item.setting){
              let settingData=''
              if(!!item.settingData){
                // settingData= eval("("+item.settingData+")") 
                console.log(item.settingData);                
                let newFunction =  new Function('row','item','_this',item.settingData)
                console.log(newFunction);               
                let data= newFunction(row,item,this)
                console.log(data);               
                this.router.push(data)
              }
            }else{
              this.editRedirect(this.formId, row[this.primaryKeyFieldName], this.primaryKeyFieldName, row)
            }
          }       
      }
      this.editDialogModelType = modelType;
      if (modelType == "add") {
        // 新增模式，不需要查询数据详情，直接打开
        // console.log('row',this.option.itemId);       
        // this.itemId=this.option.itemId
        console.log("add");   
        console.log(this.formId); 
        if(this.option.dialogFlag){
            this.editDialogOpen = true;
          }else{
            if(item.setting){
            if(!!item.settingData){
                // settingData= eval("("+item.settingData+")") 
                console.log(item.settingData);                
                let newFunction =  new Function('item','_this',item.settingData)
                console.log(newFunction);               
                let data= newFunction(item,this)
                console.log(data);               
                this.router.push(data)
              }
            }else{
                this.addRedirect(this.formId)
            }       
          }  
      }
      const obj = {
        type: modelType,
        value: row
      };
      this.$emit("handleCustomValue", obj);
    },
    handlegetLable(item, label) {
      if (typeof label == "function") {
        return label(item);
      } else {
        return label;
      }
    },
    // 是否disabled
    isDisabledButton(item, row) {
      if (typeof item.isDisable === "function") {
        return item.isDisable(row);
      } else {
        return !!item.disabled;
      }
    },
    // 是否显示
    isHide(item, row) {
      if (typeof item.isHide === "function") {
        return item.isHide(row);
      } else {
        if(!!item.isHide){
            if(eval(item.isHide)){
              return true
            }else{
              return false
          } 
        }else{
          return true
        }
        
      }
    },
    // 弹框被关闭时的回调事件
    editDialogClosedEvent(value) {
      // 把列表页中弹框打开标记改成已关闭
      this.editDialogOpen = false;
      // 关闭弹出框时，如果有树，刷新下
      // if (
      //   this.hasTreeFieldInQueryForm &&
      //   this.$refs.queryFormTree != null &&
      //   !value
      // ) {
      //   this.$refs.queryFormTree.queryData();
      // }
      this.$emit("handleCustomClose");
      this.handleQueryPageList();
      // 关闭时 清空表单的验证规则
      this.$refs.edit.$refs.mainForm.$refs.editForm.resetFields();
    },
    // 批量删除
    handleDeleteBatch(row,item) {
      let ids = [];
      if (!!row) {
        ids.push(row[this.primaryKeyFieldName]); // 删除指定的行
      } else {
        // 批量删除选中的行
        ids = this.checkRecords.map(item => item[this.primaryKeyFieldName]);
      }
      // console.log(ids);
      // console.log(this.setFunction)
      // console.log(this.listVformPages)
      // console.log(this.setFunction.delRecordByIds);
      
      if(ids.length>0){
          this.$confirm("删除确认", "确认要删除吗?", {
          type: "warning",
          confirmButtonClass: "delete_sure",
          cancelButtonClass: "el-button--danger is-plain"
        })
          .then(() => {
            let jsonIds=''
            ids.forEach((item)=>{
              jsonIds+=item+','
            })
            // console.log(jsonIds);
            jsonIds=jsonIds.substr(0,jsonIds.length-1) 
            console.log(jsonIds);
            // jsonIds=JSON.parse(jsonIds)
            // console.log(jsonIds);
            if(item.setting){
              let settingData=''
              if(!!item.settingData){
                // settingData= eval("("+item.settingData+")") 
                console.log(item.settingData);                
                let newFunction =  new Function('row','item','ids','_this',item.settingData)
                console.log(newFunction);               
                let api= newFunction(row,item,jsonIds,this)
                console.log(api);  
                this.request(api).then(response => {
                  this.handleQueryPageList();
                });             
              }
            }else{
              let delRecordByIds=this.setFunction.delRecordByIds
              delRecordByIds(this.formId,{ids:jsonIds}).then(response => {

                this.handleQueryPageList();
              })
            }
            // this.option.buttons.delete.api({ids:ids}).then(res => {
            //   // {code: "200", message: "操作成功", data: true}
            //   this.checkRecords = [];
            //   // 关闭弹出框时，如果有树，刷新下
            //   // if (
            //   //   this.hasTreeFieldInQueryForm &&
            //   //   this.$refs.queryFormTree != null
            //   // ) {
            //   //   this.$refs.queryFormTree.queryData();
            //   // }
            //   this.handleQueryPageList();
            // });
          })
          .catch(e => {
            e;
          });
      }else{
        this.$message.warning("请选择删除数据")
      }
      
    },

    // 选择项改变时
    handleSelectionChange(val) {
      if (val.length > 0) {
        val.forEach(el => {
          this.records.forEach(ev => {
            if (el.id == ev.id) {
              ev.dblClickFlag = true;
              ev.bgColor = true;
            }
          });
        });
      } else {
        this.records.forEach(ev => {
          ev.dblClickFlag = false;
          ev.bgColor = false;
        });
      }
      this.isShowRowContextMenu = false;
      this.checkRecords = val;
    },
    // 双击
    handleSelectionDblclick(row) {
      row.dblClickFlag = !row.dblClickFlag;
      row.bgColor = row.dblClickFlag;
      this.$refs.tables.toggleRowSelection(row, row.dblClickFlag);
    },
    // 右键
    rowContextMenu(row, column, event) {
      event.preventDefault();
      this.option.contextMenu.forEach(el => {
        if (el.flag == "all") {
          el.disabled = !(this.checkRecords.length > 1);
        } else {
          el.disabled = this.checkRecords.length > 1;
        }
      });

      // 设置右键位置
      this.contextMenuConfigStyle = {
        left: event.clientX + "px",
        top: event.clientY + "px",
        display: "block"
      };
      // 获取当前右键行数据
      this.contextMenuRow = row;
      // 获取我们自定义的右键菜单
      this.isShowRowContextMenu = true;
    },
    handleContextMenuItem(item) {
      if (item.flag == "all") {
        item.click({ selection: this.checkRecords });
      } else {
        item.click({ msg: this.contextMenuRow });
      }
    },
    // 页码改变
    handleCurrentChange(currentPage) {
      this.params.pageQueryData.currentPage = currentPage;
      this.handleQueryPageList();
    },
    // 每页size改变时
    handleSizeChange(val) {
      this.params.pageQueryData.currentPage = 1;
      this.params.pageQueryData.pageSize = val;
      this.handleQueryPageList();
    },
    // 带单位的列，需要转换
    fieldLabel(columnConfig) {
      // let objUnitText = "";
      // const localStorageUnit = this.getSettingByName("unit_conversion");
      // const objUnit = {};
      // for (const key in localStorageUnit) {
      //   columnConfig.anjiInput &&
      //     key
      //       .toLowerCase()
      //       .indexOf(columnConfig.anjiInput.unit.toLowerCase()) != -1 &&
      //     (objUnit[key] = localStorageUnit[key]);
      // }
      // for (const key in objUnit) {
      //   key.toLowerCase().indexOf("text") != -1 && (objUnitText = objUnit[key]);
      // }
      // if (columnConfig == null) {
      //   return "";
      // }
      // if (
      //   columnConfig.inputType == "anji-input" &&
      //   columnConfig.anjiInput != null
      // ) {
      //   return columnConfig.anjiInput["defaultUnit"] == undefined
      //     ? `${columnConfig.label}(${objUnitText})`
      //     : `${columnConfig.label}(${columnConfig.anjiInput["defaultUnit"]})`;
      // } else {
        return columnConfig.label;
      // }
    },
    // 带单位的输入框
    fieldValueByAnjiInput(value, columnConfig) {
      const localStorageUnit = this.getSettingByName("unit_conversion");
      let objUnitConversion = "";
      let objUnitKeepPoint = "";
      let objUnitConversionRadioGroup = [];
      const objUnit = {};
      for (const key in localStorageUnit) {
        columnConfig.anjiInput &&
          key
            .toLowerCase()
            .indexOf(columnConfig.anjiInput.unit.toLowerCase()) != -1 &&
          (objUnit[key] = localStorageUnit[key]);
      }
      for (const key in objUnit) {
        key.toLowerCase().indexOf("conversion") != -1 &&
          key.toLowerCase().indexOf("conversiontext") == -1 &&
          key.toLowerCase().indexOf("conversionradiogroup") == -1 &&
          (objUnitConversion = objUnit[key]);
        key.toLowerCase().indexOf("keeppoint") != -1 &&
          (objUnitKeepPoint = objUnit[key]);
        Array.isArray(objUnit[key]) &&
          (objUnitConversionRadioGroup = objUnit[key]);
      }

      if (columnConfig == null) {
        return value;
      }
      if (
        columnConfig.inputType == "anji-input" &&
        columnConfig.anjiInput != null
      ) {
        if (columnConfig.anjiInput["defaultUnit"] == undefined) {
          // 不存在
          return (value / objUnitConversion).toFixed(objUnitKeepPoint || 2);
        } else {
          const coversion = objUnitConversionRadioGroup.find(
            item => item.label == columnConfig.anjiInput["defaultUnit"]
          )["value"];
          return (value / coversion).toFixed(objUnitKeepPoint || 2);
        }
      } else {
        return value;
      }
    },
    // 带表格列格式化的值
    fieldValueByRowRenderer(row, columnConfig) {
      if (
        columnConfig == null ||
        typeof columnConfig.fieldTableRowRenderer != "function"
      ) {
        return row[columnConfig.field];
      } else {
         return columnConfig.fieldTableRowRenderer(row);
      }
    },
    // 暴露给外部crud页面，回传saveForm的值
    getMainEntity() {
      return this.$refs.edit.getSaveForm();
    },
    setMainEntity(object) {
      this.$refs.edit.setSaveForm(object);
    },
    async switchChange(val, api) {
      // request({
      //   url: api.url,
      //   method: "put",
      //   headers: { noPrompt: false },
      //   data: [val.id]
      // }).then(response => {
      //   this.handleQueryPageList();
      // });
    },
    queryFormChange(fileName, fieldVal) {
      if (typeof this.option.queryFormChange == "function") {
        this.option.queryFormChange(this.queryParams, fileName, fieldVal);
      }
    },
    // 给表格某行改变颜色
    tableRowClassName({ row, rowIndex }) {
      if ((row.urgentFlag || row.tableRow) && !row.bgColor) {
        return "warning-row";
      } else if ((row.urgentFlag || row.tableRow) && row.bgColor) {
        return "warning-row bgColor";
      } else if ((!row.urgentFlag || !row.tableRow) && row.bgColor) {
        return "bgColor";
      }
      if ((rowIndex + 1) % 2 === 0) {
        return "success-row";
      }
    },
    checkContainerMove(evt) {
        return this.designer.checkWidgetMove(evt)
      },

      onTableDragEnd(obj, subList) {
        //
      },
      onTableDragUpdate() {
        this.designer.emitHistoryChange()
      },
          // 表格参数名称转换
    getDataName(row,item) {
      try {
        if (item.inputType == 'radio' || (item.inputType == 'select'&&!item.option.multiple)) {
          if (row[item.field]!= null) {
            let tempStr = row[item.field]
            for (let index = 0; index < item.option.optionItems.length; index++) {
              if (tempStr == item.option.optionItems[index].value) {
                  tempStr = item.option.optionItems[index].label
                  break;
                }                         
            }
            return tempStr
          }else{
            return row[item.field]
          }
        }else if(item.inputType == 'switch' ){
          if (row[item.field]=='true') {
            return item.option.activeText
          } else {
            return item.option.inactiveText
          }
        }else if(item.inputType == 'checkbox'||(item.inputType == 'select'&&item.option.multiple)){
          if (row[item.field]!= null) {
            let tempStrList = row[item.field]
            let tempStr=''
            tempStrList.forEach((data)=>{
              for (let index = 0; index < item.option.optionItems.length; index++) {
                if (data == item.option.optionItems[index].value) {
                    tempStr = tempStr?tempStr+','+item.option.optionItems[index].label:item.option.optionItems[index].label
                    break;
                  }                         
              }
            })        
            return tempStr
          }else{
            return row[item.field]
          }
        }else if (item.inputType == 'user-choose'|| item.inputType == 'group-choose') {
          if(row[item.field]!= null) {
            return row[item.field].split('|')[0]
          }
        }else if (item.inputType == 'time-range'||item.inputType == 'date-range' ) {
          if(!!row[item.field]) {          
            return  `${row[item.field][0]} - ${row[item.field][1]}`        
          }
        }else if (item.inputType == 'slider'||item.inputType =='rate' ) {
          if(!!row[item.field]) {          
            return  `${row[item.field]}/${item.option.max}`        
          }
        }         
          return row[item.field]   
      } catch (error) {
        return row[item.field]   
      }
        
    },
    register (field, dataTemplate, dataMethods) {
      // console.log('[register]', field, dataTemplate, dataMethods)
      let dataProps = {
        item: {
          type: Object,
          default: () => {}
        },
        scope: {
          type: Object,
          default: () => {}
        },
        data: {
          type: String,
          default: () => {}
        },
      }
      Vue.component('custom-slot-' + field, {
        props: dataProps,
        methods: new Function('{ return ' + dataMethods + '}').call(this),
        template: dataTemplate
      })
    },
  }
};
</script>
<style scoped>
 /deep/.el-tooltip>div{
    text-overflow: ellipsis;
    overflow: hidden;
 }
 .top_part /deep/.el-form-item__label{
   text-align: right;
 }
</style>
<!-- <style scoped lang="scss">
.right-container {
  display: flex;
  flex: 1;
  flex-direction: column;
  .main_part {
    display: flex;
    flex-direction: column;
    flex: 1;
    background: #fff;
    border-radius: 4px;
    margin-top:-10px;
    /* padding: 12px 20px 12px;
    margin-top: 4px; */
    height: 100%;
    position: relative;
    font-size:16px;
  }
}
/deep/ .button {
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.08);
  border-radius: 6px;
}
/deep/.el-table th > .cell {
  text-align: center;
}
/deep/.el-table .cell {
  text-align: center;
}
/* /deep/.elTable {
  margin: 10px 0 50px;
} */
.el-table {
  // 看这里！！！
  // 深度选择器，去除默认的padding
  /deep/ th {
    padding: 0;
    height: 36px;
  }
  /deep/ td {
    padding: 0;
    height: 36px;
  }
}
/deep/.el-table--striped .el-table__body tr.el-table__row--striped td {
  background: #f9fbfd;
}

.style-btn {
  pointer-events: none;
}
.page-container {
  height: 100%;
  position: relative;
  .left-container {
    width: 20%;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    border-radius: 4px 0px 0px 4px;
    padding: 20px 20px 0;
    overflow: hidden;
    overflow-y: auto;
    height: 100%;
  }
  .right-container {
    width: calc(80% - 5px);
    position: absolute;
    top: 0;
    right: 0;
    background: #fff;
    border-radius: 0px 4px 4px 0px;
    padding: 20px 20px 0;
    height: 100%;
  }
}
.el-table .cell,
.el-table td div {
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-dropdown {
  font-size: 12px;
  display: inline;
  color: #5887fb;
  cursor: pointer;
}
.el-dropdown-menu--mini .el-dropdown-menu__item {
  min-width: 80px;
  max-width: 110px;
  float: right;
  .el-button--text {
    float: right;
  }
  &:hover {
    background: none !important;
  }
  /deep/.el-button--text:hover,
  .el-button--text:focus {
    color: #799ffc !important;
    background-color: #ecf5ff !important;
    border-color: transparent;
  }
  .el-button--mini {
    float: right;
  }
  .el-button--text:hover,
  .el-button--text:focus {
    color: #799ffc;
    border-color: transparent;
  }
  .el-button + .el-button {
    margin-left: 0 !important;
    float: right;
  }
}
/* /deep/.el-pagination.is-background .btn-prev,
.el-pagination.is-background .btn-next,
.el-pagination.is-background .el-pager li {
  margin: 0 5px;
  border-radius: 2px;
  background-color: #f4f4f5;
  color: #606266;
  min-width: 30px;
  border-radius: 2px;
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #5887fb;
  color: #ffffff;
  border-radius: 4px;
} */
/* .page_bottom {
  width: 100%;
  position: absolute;
  bottom: 0;
} */
/* .pagination {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 14px;
  margin-right: 20px;
} */
/deep/.el-card__body{
  padding-bottom: 0;
}
.el-table /deep/ .warning-row {
  color: red !important;
}
.el-table /deep/ .bgColor {
  background: #d9ecff;
}
/deep/.edit_button {
  width: 22px;
  height: 22px;
  padding: 0;
  margin: 0;
  margin-right: 5px;
  /deep/ i {
    font-size: 30px;
  }
}
.el-form-item--mini.el-form-item {
  margin-bottom: 12px;
}
.el-table /deep/ .success-row {
  background: #f9fbfd !important;
}

.contextMenu {
  width: 100px;
  .contextMenuItem {
    width: 100%;
    font-size: 12px;
    line-height: 20px;
    padding: 5px;
  }
  &:hover {
    background: #f9fbfd;
  }
}
</style> -->
