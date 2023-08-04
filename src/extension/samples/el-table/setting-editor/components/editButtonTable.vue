<template>
    <div>
      <Table :data="listData" ref="multipleTable" size="mini" max-height="600px">
        <!-- <TableColumn prop="name" header-align="center" align="left" label="机构" >
        </TableColumn>
        <TableColumn prop="sendamount" header-align="center" align="center" label="打印份数" >
            <template slot-scope="scope">
                <el-input :maxlength="2" @change="checkNum(scope.$index)" v-model="scope.row.sendamount" ></el-input>
            </template>
        </TableColumn> -->
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
        <TableColumn  prop="label" header-align="center" align="left"  min-width="100" label="按钮名称" >
            <template slot-scope="scope" >
                <el-input  v-model="scope.row.label" ></el-input>
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
        <TableColumn  prop="id" header-align="center" align="left"   min-width="180" label="动作" >
          <div slot-scope="scope" style="display: flex; gap: 10px; align-items: center">
              <el-select v-model="scope.row.id" placeholder="请选择">
                  <el-option label="表单跳转" value='add'></el-option>
                  <el-option label="删除" value='delete'></el-option>
                  <!-- <el-option label="自定义" value='custom'></el-option> -->
              </el-select>
              <el-button
                type="info"
                icon="el-icon-s-tools"
                v-if="scope.row.id == 'add'"
                plain
                @click="editData(scope.row.settingData,scope.$index)"
                size="mini"
              ></el-button>
          </div>
        </TableColumn>
        <TableColumn  prop="type" align="center" min-width="100" label="按钮风格" >
            <template slot-scope="scope"  >
              <el-select v-model="scope.row.type" placeholder="请选择">
                <el-option label="默认" value='default'>
                  <el-button size="mini" :plain="scope.row.plain">默认按钮</el-button>
                </el-option>
                <el-option label="主要" value='primary'>
                  <el-button type="primary" size="mini" :plain="scope.row.plain">主要按钮</el-button>
                </el-option>
                <el-option label="成功" value='success'>
                  <el-button type="success" size="mini" :plain="scope.row.plain">成功按钮</el-button>
                </el-option>
                <el-option label="信息" value='info'>
                  <el-button type="info" size="mini" :plain="scope.row.plain">信息按钮</el-button>
                </el-option>
                <el-option label="警告" value='warning'>
                  <el-button type="warning" size="mini" :plain="scope.row.plain">警告按钮</el-button>
                </el-option>
                <el-option label="危险" value='danger'>
                  <el-button type="danger" size="mini" :plain="scope.row.plain">危险按钮</el-button>
                </el-option>
                <el-option label="文字" value='text'>
                  <el-button type="text">文字按钮</el-button>
                </el-option>
              </el-select>
            </template>
        </TableColumn>
        <TableColumn  prop="plain" align="center" label="线框按钮">
            <template slot-scope="scope">
              <!-- <el-select v-model="scope.row.plain" placeholder="请选择">
                <el-option label="是" :value='true'></el-option>
                <el-option label="否" :value='false'></el-option>
              </el-select> -->
              <el-switch
                v-model="scope.row.plain"
              ></el-switch>
            </template>
        </TableColumn>
        <TableColumn  prop="size" align="center" min-width="100" label="按钮大小" >
          <template slot-scope="scope">
              <el-select v-model="scope.row.size" placeholder="请选择">
                <el-option label="默认" value='default'></el-option>
                <el-option label="大" value='large'></el-option>
                <el-option label="中" value='medium'></el-option>
                <el-option label="小" value='small'></el-option>
                <el-option label="迷你" value='mini'></el-option>
            </el-select>
          </template>
        </TableColumn>
        <!-- <TableColumn  prop="icon" header-align="center" align="left" min-width="120"  label="按钮图标" >
          <template slot-scope="scope"  >
              <el-select v-model="scope.row.icon" placeholder="请选择">
                <el-option label="el-icon-edit" value='el-icon-edit'></el-option>
                <el-option label="el-icon-delete" value='el-icon-delete'></el-option>
                <el-option label="el-icon-plus" value='el-icon-plus'></el-option>
                <el-option label="el-icon-share" value='el-icon-share'></el-option>
              </el-select>
          </template>
        </TableColumn> -->
        <TableColumn  prop="tableHide" align="center" label="隐藏" >
          <template slot-scope="scope"  >
              <!-- <el-select v-model="scope.row.tableHide" placeholder="请选择">
                  <el-option label="隐藏" :value='true'></el-option>
                  <el-option label="显示" :value='false'></el-option>
              </el-select> -->
              <el-switch
                v-model="scope.row.tableHide"
              ></el-switch>
          </template>
        </TableColumn>
        <!-- <TableColumn  prop="setting" header-align="center" align="left"    min-width="100" label="是否自定义配置" >
          <template slot-scope="scope"  >
              <el-select v-model="scope.row.setting" placeholder="请选择">
                  <el-option label="是" :value='true'></el-option>
                  <el-option label="否" :value='false'></el-option>
              </el-select>
          </template>
        </TableColumn> -->
        <!-- <TableColumn  prop="settingData" min-width="120"  header-align="center" align="left"  label="自定义配置" >
            <template slot-scope="scope"  >
                <el-button type="info" icon="el-icon-edit"  :disabled="!scope.row.setting" plain round @click="editData(scope.row.settingData,scope.$index)">
                    自定义配置</el-button>
            </template>
        </TableColumn> -->
        <TableColumn
          label="" align="center" fixed="right"
        >
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
        <!-- <TableColumn  prop="itemId" header-align="center" align="left" label="绑定id" >
            <template slot-scope="scope"  >
                <el-input  v-model="scope.row.itemId" ></el-input>
            </template>
        </TableColumn> -->
      </Table>
      <div style="text-align: center;margin-top: 20px">
        <Button  size="medium" type="primary" @click="toSave">
          保存
        </Button>
      </div>
      <el-dialog title="表单页跳转选项" :visible.sync="showDataFlag"
      v-if="showDataFlag" :show-close="true" class="small-padding-dialog" append-to-body v-dialog-drag
        :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <el-switch 
          v-model="listData[index].setting"
          active-text="自定义跳转参数"
          style="margin: 10px"
        ></el-switch>
        <template v-if="listData[index].setting">
          <el-alert type="info" :closable="false" title="this.$router.push( function () {"></el-alert>
          <code-editor :mode="'javascript'" :readonly="false" v-model="setData" ref="ecEditor"></code-editor>
          <el-alert type="info" :closable="false" title="})"></el-alert>
        </template>
        <div slot="footer" class="dialog-footer">
        <el-button @click="showDataFlag = false">
        取消</el-button>
        <el-button type="primary" @click="saveDataConversion">
        确定</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  <script>
  import SvgIcon from "@/components/svg-icon";
  import { Button, Table, TableColumn,Input } from 'element-ui'
  import CodeEditor from '@/components/code-editor/index'
  import sortable from '@/utils/Sortable.js'
  import Vue from 'vue'
  export default {
    name: 'edit-button-table',
    components: {
      Table,
      TableColumn,
      Button,
      ELInput: Input,
      CodeEditor,
      SvgIcon
    },
    props: {
      list: {
        type: [Array]
      }
    },
    data () {
      return {
        listData: [],
        num: 1,
        showDataFlag:false,
        setData:'',
        index:'',
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
      }
    },
    methods: {
      //自定义配置
      editData(data,index){
          this.setData=data
          this.index=index
          this.showDataFlag=true
        
      },
      saveDataConversion(){
        const codeHints = this.$refs.ecEditor.getEditorAnnotations()       
        let syntaxErrorFlag = false
        if (!!codeHints && (codeHints.length > 0)) {
          codeHints.forEach((chItem) => {
            if (chItem.type === 'error') {
              syntaxErrorFlag = true
            }
          })

          if (syntaxErrorFlag) {
            this.$message.error(this.i18nt('designer.setting.syntaxCheckWarning'))
            this.listData[this.index].settingData=''
            return
          }
        }  
        this.listData[this.index].settingData=this.setData
        this.showDataFlag = false
      },
      //增加和删除列
      addDict(index,item) {
        console.log(index,item);
        item.push({ 
            id:'add',
            label: "",
            type: "primary",
            permission: "resultsetManage:add",
            icon: "el-icon-plus",
            plain: false,
            tableHide:false,
            size:'mini',
            setting:false,
            settingData:'',
        });
      },
      delDict(index,rows) {
        if (rows.length<=1) {
          this.$message.error("至少保留一条");
          return;
        }
        if(rows[index].primaryKey){
              this.$confirm("删除确认", "确认要删除吗,可能会影响部分功能?", {
              type: "warning",
              confirmButtonClass: "delete_sure",
              cancelButtonClass: "el-button--danger is-plain"
            }).then(() => {
              rows.splice(index, 1);
              })
        }else{
          rows.splice(index, 1);
        }
        console.log(index,rows);
        

      },
      // 保存份号编辑
      toSave () {
          this.$emit('close', this.listData)
      },
      setSort(){
            const el = this.$refs.multipleTable.$el.querySelector('.el-table__body-wrapper tbody')
            const _this=this
            sortable.create(el,{
              draggable:".el-table__row",
              handle:'.drag', 
            // ghostClass:'sortable-ghost',
                // setData:function(dataTransfer){
                //     dataTransfer.setData('Text', '')
                // },
                onEnd({newIndex,oldIndex}){
                  if(newIndex==oldIndex)return
                  _this.listData.splice(newIndex,0,_this.listData.splice(oldIndex,1)[0])
                  var newArray=_this.listData.slice(0)
                  _this.listData=[]
                  _this.$nextTick(function() {
                    _this.listData=newArray
                  })          
                }
            })
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
      this.listData = JSON.parse(JSON.stringify(this.list))
      console.log(this.listData);
      document.body.ondrag=function(event){
        event.preventDefault()
        event.stopPropagation()
      }
      this.setSort()
      
    },
    watch: {
    }
  }
  
  </script>
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