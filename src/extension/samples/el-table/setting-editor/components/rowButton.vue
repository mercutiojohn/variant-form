<template>
  <div>
    <Table :data="listData" ref="multipleTable" size="mini" max-height="600px">
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
          <el-input v-model="scope.row.label" size="mini" />
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
            <i :class="`${scope.row.icon} el-input__icon`" slot="suffix"> </i>
            <template slot-scope="{ item }">
              <i :class="item.value"></i>
              <!-- <div class="name">{{ item.value }}</div> -->
            </template>
          </el-autocomplete>
        </template>
      </TableColumn>
      <TableColumn
        prop="id"
        header-align="center"
        align="left"
        min-width="170"
        label="操作"
      >
        <template slot-scope="scope">
          <div style="display: flex; gap: 10px; align-items: center">
            <el-select
              v-model="scope.row.id"
              placeholder="请选择"
              size="mini"
            >
              <el-option label="表单跳转" value="edit"></el-option>
              <el-option label="删除" value="delete"></el-option>
              <el-option label="自定义" value="custom"></el-option>
            </el-select>
            <el-button
              type="info"
              icon="el-icon-s-tools"
              v-if="scope.row.id == 'edit'"
              plain
              @click="editData(scope.row.settingData, scope.$index, 'showDataFlag')"
              size="mini"
            ></el-button>
            <el-button
              type="info"
              icon="el-icon-edit"
              v-else-if="scope.row.id == 'custom'"
              plain
              @click="editData(scope.row.customFunc, scope.$index, 'showCustomFlag')"
              size="mini"
            ></el-button>
          </div>
        </template>
      </TableColumn>
      <!-- <TableColumn
        prop="id"
        header-align="center"
        align="left"
        min-width="100"
        label="按钮类型"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.id" placeholder="请选择">
            <el-option label="edit" value="edit"></el-option>
            <el-option label="delete" value="delete"></el-option>
          </el-select>
        </template>
      </TableColumn> -->
      <TableColumn
        prop="tableHide"
        header-align="center"
        align="center"
        min-width="170"
        label="隐藏"
      >
        <template slot-scope="scope">
          <div
            style="
              display: flex;
              gap: 10px;
              align-items: center;
              justify-content: center;
            "
          >
            <!-- <el-select
              v-model="scope.row.tableHide"
              placeholder="请选择"
              v-if="!scope.row.tableHideCustom"
              size="mini"
            >
              <el-option label="隐藏" :value="true"></el-option>
              <el-option label="显示" :value="false"></el-option>
            </el-select> -->
            <el-switch
              v-model="scope.row.tableHide"
              v-if="!scope.row.tableHideCustom"
            ></el-switch>
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
            <el-checkbox v-model="scope.row.tableHideCustom">{{
              scope.row.tableHideCustom ? "" : "表达式"
            }}</el-checkbox>
          </div>
        </template>
      </TableColumn>
      <!-- <TableColumn
        prop="tableHide"
        header-align="center"
        align="left"
        min-width="100"
        label="是否隐藏"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.tableHide" placeholder="请选择">
            <el-option label="隐藏" :value="true"></el-option>
            <el-option label="显示" :value="false"></el-option>
          </el-select>
        </template>
      </TableColumn>
      <TableColumn
        prop="isHide"
        header-align="center"
        align="left"
        min-width="180"
        label="字段控制"
      >
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.isHide"
            placeholder="示例：row.task_id=='SWT00000000000000272'"
          ></el-input>
        </template>
      </TableColumn>
      <TableColumn
        prop="setting"
        header-align="center"
        align="left"
        min-width="100"
        label="是否自定义配置"
      >
        <template slot-scope="scope">
          <el-select v-model="scope.row.setting" placeholder="请选择">
            <el-option label="是" :value="true"></el-option>
            <el-option label="否" :value="false"></el-option>
          </el-select>
        </template>
      </TableColumn>
      <TableColumn
        prop="settingData"
        min-width="120"
        header-align="center"
        align="left"
        label="自定义配置"
      >
        <template slot-scope="scope">
          <el-button
            type="info"
            icon="el-icon-edit"
            :disabled="!scope.row.setting"
            plain
            round
            @click="editData(scope.row.settingData, scope.$index)"
          >
            自定义配置</el-button
          >
        </template>
      </TableColumn> -->
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
      <Button
        type="text"
        icon="el-icon-plus"
        size="mini"
        @click="addDict(0, listData)"
        >添加行</Button
      >
    </div>
    <div class="actions">
      <Button size="small" type="primary" @click="toSave"> 保存 </Button>
    </div>
    <el-dialog
      title="表单页跳转选项"
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
      <el-switch 
        v-model="listData[index].setting"
        active-text="自定义跳转参数"
        style="margin: 10px"
      ></el-switch>
      <template v-if="listData[index].setting">
        <el-alert
          class="code-wrapper top"
          type="info"
          :closable="false"
          title="this.$router.push( function () {"
        ></el-alert>
        <code-editor
          :mode="'javascript'"
          :readonly="false"
          v-model="setData"
          ref="ecEditor"
        ></code-editor>
        <el-alert
          class="code-wrapper bottom"
          type="info"
          :closable="false"
          title="})"
        ></el-alert>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showDataFlag = false"> 取消</el-button>
        <el-button type="primary" @click="saveDataConversion('settingData','showDataFlag')"> 确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="自定义按钮操作"
      :visible.sync="showCustomFlag"
      v-if="showCustomFlag"
      :show-close="true"
      class="small-padding-dialog"
      append-to-body
      v-dialog-drag
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
    >
      <el-alert
        class="code-wrapper top"
        type="info"
        :closable="false"
        title="(this, row, item, index) => { // DOM节点、行、按钮属性、行号"
      ></el-alert>
      <code-editor
        :mode="'javascript'"
        :readonly="false"
        v-model="setData"
        ref="ecEditor"
      ></code-editor>
      <el-alert
        class="code-wrapper bottom"
        type="info"
        :closable="false"
        title="}"
      ></el-alert>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showCustomFlag = false"> 取消</el-button>
        <el-button type="primary" @click="saveDataConversion('customFunc','showCustomFlag')"> 确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
  <script>
import CodeEditor from "@/components/code-editor/index";
import { Button, Table, TableColumn, Input } from "element-ui";
import sortable from "@/utils/Sortable.js";
import SvgIcon from "@/components/svg-icon";

export default {
  name: "row-button-table",
  components: {
    Table,
    TableColumn,
    Button,
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
      showCustomFlag: false,
      setData: "",
      index: "",
      iconClasses: [
        {
          value: "el-icon-plus",
        },
        {
          value: "el-icon-edit",
        },
        {
          value: "el-icon-delete",
        },
        {
          value: "el-icon-view",
        },
      ],
    };
  },
  methods: {
    //自定义配置
    editData(data, index, flag) {
      this.setData = data;
      this.index = index;
      this[flag] = true;
    },
    saveDataConversion(field, flag) {
      // const codeHints = this.$refs.ecEditor.getEditorAnnotations();
      // let syntaxErrorFlag = false;
      // if (!!codeHints && codeHints.length > 0) {
      //   codeHints.forEach((chItem) => {
      //     if (chItem.type === "error") {
      //       syntaxErrorFlag = true;
      //     }
      //   });

      //   if (syntaxErrorFlag) {
      //     this.$message.error(
      //       this.i18nt("designer.setting.syntaxCheckWarning")
      //     );
      //     this.listData[this.index][field] = "";
      //     return;
      //   }
      // }
      this.listData[this.index][field] = this.setData;
      this[flag] = false;
    },
    //增加和删除列
    addDict(index, item) {
      console.log(index, item);
      item.push({
        label: "自定义",
        icon: "el-icon-edit",
        id: "edit",
        tableHide: false,
        isHide: "",
        tableHideCustom: false,
        setting: false,
        settingData: "",
        customFunc: ""
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
      var results = queryString
        ? iconClasses.filter(this.createFilter(queryString))
        : iconClasses;
      cb(results);
    },
    createFilter(queryString) {
      return (iconClass) => {
        return (
          iconClass.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
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
.add-block {
  padding: 5px;
  border: 1px solid #ebeef5;
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
  