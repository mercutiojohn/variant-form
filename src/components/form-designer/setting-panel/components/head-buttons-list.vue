<template>
  <div>
    <Table :data="listData" ref="multipleTable" size="mini">
      <TableColumn align="center" width="30">
        <template slot-scope="scope">
          <svg-icon
            class="drag"
            style="cursor: grab"
            icon-class="drag-handle-dots-2"
            class-name="color-svg-icon"
          />
        </template>
      </TableColumn>
      <TableColumn
        prop="label"
        header-align="center"
        align="left"
        min-width="90"
        label="文本"
      >
        <template slot-scope="scope">
          <el-input v-model="scope.row.label" size="mini">
            <!-- <el-select v-model="scope.row.icon" slot="prepend" placeholder="请选择">
              <el-option value="el-icon-plus">
                <i class="el-icon-plus"></i>
              </el-option>
              <el-option value="el-icon-edit">
                <i class="el-icon-edit"></i>
              </el-option>
              <el-option value="el-icon-delete">
                <i class="el-icon-delete"></i>
              </el-option>
            </el-select> -->
          </el-input>
        </template>
      </TableColumn>
      <TableColumn
        prop="icon"
        header-align="center"
        align="left"
        min-width="150"
        label="图标"
      >
        <template slot-scope="scope">
          <!-- <el-input v-model="scope.row.icon" :prefix-icon="scope.row.icon" size="mini">
          </el-input> -->
          <el-autocomplete
            popper-class="icon-list"
            v-model="scope.row.icon"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            size="mini"
          >
            <i
              :class="`${scope.row.icon} el-input__icon`"
              slot="suffix">
            </i>
            <template slot-scope="{ item }">
              <i :class="item.value"></i>
              <!-- <div class="name">{{ item.value }}</div> -->
            </template>
          </el-autocomplete>
        </template>
      </TableColumn>
      <TableColumn
        prop="type"
        header-align="center"
        align="left"
        min-width="150"
        label="类型"
      >
        <template slot-scope="scope">
          <div style="display:flex; gap: 10px; align-items: center">
            <el-select
              v-model="scope.row.type"
              placeholder="请选择"
              size="mini"
            >
              <el-option label="主要" value="primary"></el-option>
              <el-option label="成功" value="success"></el-option>
              <el-option label="信息" value="info"></el-option>
              <el-option label="警告" value="warning"></el-option>
              <el-option label="危险" value="danger"></el-option>
              <el-option label="默认" value="normal"></el-option>
              <el-option label="无" value=""></el-option>
            </el-select>
            <!-- <el-button
              type="info"
              icon="el-icon-edit"
              v-if="scope.row.action == 'custom'"
              plain
              @click="editData(scope.row.customFunc, scope.$index)"
              size="mini"
            ></el-button> -->
          </div>
        </template>
      </TableColumn>
      <TableColumn
        prop="action"
        header-align="center"
        align="left"
        min-width="200"
        label="操作"
      >
        <template slot-scope="scope">
          <div style="display:flex; gap: 10px; align-items: center">
            <el-select
              v-model="scope.row.action"
              placeholder="请选择"
              size="mini"
            >
              <el-option-group
                key="列表"
                label="列表">
                <el-option label="跳转新增页面" value="add"></el-option>
                <el-option label="多选删除" value="delete"></el-option>
              </el-option-group>
              <el-option-group
                key="表单"
                label="表单">
                <el-option label="提交表单" value="save"></el-option>
                <el-option label="跳转页面" value="redirect"></el-option>
              </el-option-group>
              <el-option-group
                key="流程"
                label="流程">
                <el-option label="提交流程" value="submit"></el-option>
                <el-option label="驳回" value="reject"></el-option>
                <el-option label="同意" value="agree"></el-option>
              </el-option-group>
              <el-option-group
                key="自定义"
                label="">
                <el-option label="自定义" value="custom"></el-option>
              </el-option-group>
            </el-select>
            <el-button
              type="info"
              icon="el-icon-edit"
              v-if="scope.row.action == 'custom'"
              plain
              @click="editData(scope.row.customFunc, scope.$index)"
              size="mini"
            ></el-button>
          </div>
        </template>
      </TableColumn>
      <TableColumn
        prop="tableHide"
        header-align="center"
        align="center"
        min-width="100"
        label="隐藏"
      >
        <template slot-scope="scope">
          <div style="display:flex; gap: 10px; align-items: center;justify-content:center">
            <el-switch v-model="scope.row.tableHide" v-if="!scope.row.tableHideCustom"></el-switch>
            <el-tooltip
              class="item"
              effect="dark"
              content="例：row.status=='01'"
              placement="top-end"
              v-else
            >
              <el-input
                size="mini"
                v-model="scope.row.isHide"
                placeholder=""
              ></el-input>
            </el-tooltip>
            <!-- <el-checkbox
                v-model="scope.row.tableHideCustom"
              >{{scope.row.tableHideCustom ? '': '表达式'}}</el-checkbox> -->
          </div>
        </template>
      </TableColumn>

      <TableColumn label="" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button
            type="text"
            plain
            icon="el-icon-plus"
            @click="addDict(scope.$index, listData)"
          />

          <el-button
            type="text"
            plain
            icon="el-icon-delete"
            @click="delDict(scope.$index, listData)"
          />
        </template>
      </TableColumn>
    </Table>
    <div class="add-block" v-if="!listData.length">
      <Button type="text" icon="el-icon-plus" size="mini" @click="addDict(0, listData)">添加行</Button>
    </div>
    <div class="actions">
      <Button size="small" type="primary" @click="toSave"> 保存 </Button>
    </div>
    <Dialog
      title="自定义按钮操作"
      :visible.sync="showDataFlag"
      v-if="showDataFlag"
      :show-close="true"
      class="small-padding-dialog"
      append-to-body
      v-dialog-drag
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
    >
      <el-alert class="code-wrapper top" type="info" :closable="false" title="(this, item) => {"></el-alert>
      <code-editor
        :mode="'javascript'"
        :readonly="false"
        v-model="setData"
        ref="ecEditor"
      ></code-editor>
      <el-alert class="code-wrapper bottom" type="info" :closable="false" title="}"></el-alert>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDataFlag = false"> 取消</el-button>
        <el-button type="primary" @click="saveDataConversion"> 确定</el-button>
      </div>
    </Dialog>
  </div>
</template>
  <script>
import CodeEditor from "@/components/code-editor/index";
import { Button, Table, TableColumn, Input, Dialog } from "element-ui";
import sortable from '@/utils/Sortable.js'
import SvgIcon from "@/components/svg-icon";

export default {
  name: "head-buttons",
  components: {
    Table,
    TableColumn,
    Button,
    Dialog,
    ELInput: Input,
    SvgIcon,
    CodeEditor,
  },
  props: {
    list: {
      type: [Array],
    },
    // getTableData: {
    //   type: [Array],
    // },
  },
  data() {
    return {
      listData: [],
      num: 1,
      showDataFlag: false,
      setData: "",
      index: "",
      iconClasses: [
        {
          value:"el-icon-plus"
        },
        {
          value:"el-icon-edit"
        },
        {
          value:"el-icon-delete"
        },
        {
          value:"el-icon-view"
        },
      ]
    };
  },
  methods: {
    //自定义配置
    editData(data, index) {
      this.setData = data;
      this.index = index;
      this.showDataFlag = true;
    },
    saveDataConversion() {
      const codeHints = this.$refs.ecEditor.getEditorAnnotations();
      let syntaxErrorFlag = false;
      if (!!codeHints && codeHints.length > 0) {
        codeHints.forEach((chItem) => {
          if (chItem.type === "error") {
            syntaxErrorFlag = true;
          }
        });

        if (syntaxErrorFlag) {
          this.$message.error(
            this.i18nt("designer.setting.syntaxCheckWarning")
          );
          this.listData[this.index].customFunc = "";
          return;
        }
      }
      this.listData[this.index].customFunc = this.setData;
      this.showDataFlag = false;
    },
    //增加和删除列
    addDict(index, item) {
      console.log(index, item);
      item.push({
        label: '按钮',
        icon: 'el-icon-paperclip',
        type: 'normal',
        action: 'custom',
        customFunc: '',
        tableHide: false,
        tableHideCustom: false,
        isHide: ''
      });
    },
    delDict(index, rows) {
      // if (rows.length <= 1) {
      //   this.$message.error("至少保留一条");
      //   return;
      // }
      if (rows[index].primaryKey) {
        this.$confirm("删除确认", "确认要删除吗,可能会影响部分功能?", {
          type: "warning",
          confirmButtonClass: "delete_sure",
          cancelButtonClass: "el-button--danger is-plain",
        }).then(() => {
          rows.splice(index, 1);
        });
      } else {
        rows.splice(index, 1);
      }
      console.log(index, rows);
    },
    // 保存份号编辑
    toSave() {
      this.$emit("close", this.listData);
    },
    setSort() {
      const el = this.$refs.multipleTable.$el.querySelector(
        ".el-table__body-wrapper tbody"
      );
      const _this = this;
      sortable.create(el, {
        draggable: ".el-table__row",
        handle: ".drag",
        // ghostClass:'sortable-ghost',
        // setData:function(dataTransfer){
        //     dataTransfer.setData('Text', '')
        // },
        onEnd({ newIndex, oldIndex }) {
          if (newIndex == oldIndex) return;
          _this.listData.splice(
            newIndex,
            0,
            _this.listData.splice(oldIndex, 1)[0]
          );
          var newArray = _this.listData.slice(0);
          _this.listData = [];
          _this.$nextTick(function () {
            _this.listData = newArray;
          });
        },
      });
    },
    querySearch(queryString, cb) {
      var iconClasses = this.iconClasses;
      var results = queryString ? iconClasses.filter(this.createFilter(queryString)) : iconClasses;
      cb(results);
    },
    createFilter(queryString) {
      return (iconClass) => {
        return (iconClass.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
  },
  // 页面初始化调用方法
  mounted: function () {
    this.listData = JSON.parse(JSON.stringify(this.list));
    console.log(this.listData);
    document.body.ondrag = function (event) {
      event.preventDefault();
      event.stopPropagation();
    };
    this.setSort();
  },
  watch: {},
};
</script>
<style scoped>
.add-block{
  padding: 5px;
  border: 1px solid #EBEEF5;
  border-top: none;
  display: flex;
  justify-content: center;
}
.actions {
  padding: 5px;
  text-align: center;
}
</style>
<style lang="scss" scoped>
.icon-list {
  .el-autocomplete-suggestion__list {
    display: flex;
    justify-content: center;
    gap: 5px;
    flex-wrap: wrap;
    padding: 0 5px;
    li {
      padding: 0 10px;
      border-radius: 4px;
    }
  }
}
</style>
  