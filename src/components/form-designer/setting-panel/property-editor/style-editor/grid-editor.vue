<template>
  <el-collapse class="sub-collapse" v-model="activeName">
    <el-collapse-item title="布局设置" name="1">
      <div @click.stop slot="title" style="width: 100%;display: flex; align-items: center; justify-content: space-between;padding-right:10px;">
        <span>
          <svg-icon icon-class="layout" class-name="color-svg-icon" /> 布局
        </span>
        <div class="right">
          <el-button type="text" :data-clipboard-text="optionModel.flex" @click="copyJsonToClipboard">
            <svg-icon icon-class="copy" class-name="color-svg-icon" />
          </el-button>
          <el-popover
            placement="bottom"
            width="300"
            v-model="editDialogShow">
            <code-editor v-if="editDialogShow" :mode="'css'" :readonly="false" v-model="editPaste" ref="pasteEditor"></code-editor>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="editDialogShow = false">取消</el-button>
              <el-button type="primary" size="mini" @click="pasteFromClipboard">确定</el-button>
            </div>
            <el-button slot="reference" type="text" icon="el-icon-edit">
              <!-- <svg-icon icon-class="clipboard" class-name="color-svg-icon" /> -->
            </el-button>
          </el-popover>
          <!-- <el-switch v-model="optionModel.boxBorder.use" @click.stop></el-switch> -->
        </div>
      </div>
      <!-- <el-form-item label="容器宽度 (%)">
        <el-input-number
          v-model="optionModel.grid.containerWidth"
          :min="0"
          :max="100"
          :step="1"
        ></el-input-number>
      </el-form-item> -->
      <el-form-item label="列数">
        <el-input-number
          v-model="optionModel.grid.columns"
          :min="1"
          :max="24"
          :step="1"
        ></el-input-number>
      </el-form-item>
      <!-- <el-form-item label="行高 (px)">
        <el-input-number
          v-model="optionModel.grid.rowHeight"
          :min="10"
          :max="200"
          :step="1"
        ></el-input-number>
      </el-form-item> -->
      <el-form-item label="列间距 (px)">
        <el-input-number
          v-model="optionModel.grid.columnGap"
          :min="0"
          :max="50"
          :step="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="行间距 (px)">
        <el-input-number
          v-model="optionModel.grid.rowGap"
          :min="0"
          :max="50"
          :step="1"
        ></el-input-number>
      </el-form-item>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import {
    copyToClipboardTest
  } from "@/utils/util"
  import CodeEditor from '@/components/code-editor/index'
  import i18n from "@/utils/i18n"
  import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"
  import SvgIcon from '@/components/svg-icon'

  export default {
    name: "grid-editor",
    mixins: [i18n, propertyMixin],
    components:{
      SvgIcon,
      CodeEditor
    },
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    data() {
      return {
        activeName: '1',
        editPaste: '',
        editDialogShow: false
      }
    },
    methods:{
      copyJsonToClipboard(e) {
        console.log('【copyToClipboard】',JSON.stringify(this.optionModel.flex))
        copyToClipboardTest(
          JSON.stringify(this.optionModel.flex), 
          e,
          this.$message,
          this.i18nt('designer.hint.copyJsonSuccess'),
          this.i18nt('designer.hint.copyJsonFail')
        )
      },
      pasteFromClipboard() {
        this.optionModel.flex = JSON.parse(this.editPaste)
        this.editPaste = ''
        this.editDialogShow = false
      }
    }
  }
</script>

<style lang="scss" scoped>
::v-deep.sub-collapse {
  border: none;
  padding: 5px 0;
  .el-collapse-item__wrap {
    border-bottom: none;
    background: none;
  }
  .el-collapse-item {
    border: 1px solid #00000023;
    border-radius: 8px;
  }
  .el-collapse-item__header {
    background-color: unset!important;
    border-bottom: none;
    height: 40px!important;
  }
  .el-radio-button--mini .el-radio-button__inner {
    padding: 7px 3px;
  }
  .axis .el-radio-button--mini .el-radio-button__inner {
    padding: 7px 15px;
  }
}
.right {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>