<template>
  <el-collapse class="sub-collapse" v-model="activeName">
    <el-collapse-item title="阴影设置" name="1">
      <div @click.stop slot="title" style="width: 100%;display: flex; align-items: center; justify-content: space-between;padding-right:10px;">
        <span>
          <svg-icon icon-class="shadow" class-name="color-svg-icon" /> 阴影
        </span>
        <div class="right">
          <el-button type="text" :data-clipboard-text="optionModel.shadow" @click="copyJsonToClipboard">
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
          <el-switch v-model="optionModel.shadow.use" @click.stop></el-switch>
        </div>
      </div>
      <el-form-item label="颜色" label-width="70px">
        <div style="display: flex; gap:5px; align-items: center; justify-content: flex-start">
          <el-color-picker v-model="optionModel.shadow.color" show-alpha>
          </el-color-picker>
          {{optionModel.shadow.color}}
        </div>
      </el-form-item>
      <el-form-item label="阴影类型" label-width="70px">
        <el-radio-group v-model="optionModel.shadow.isInset">
          <el-radio-button :label="false">
            <svg-icon icon-class="outer-shadow" class-name="color-svg-icon" />
            外阴影
          </el-radio-button>
          <el-radio-button :label="true">
            <svg-icon icon-class="inner-shadow" class-name="color-svg-icon" />
            内阴影
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="偏移量" label-width="70px">
        <div style="display: flex; gap:5px; align-items: center;justify-content:space-around">
          <span>X</span>
          <span>Y</span>
        </div>
        <div style="display: flex; gap:5px; align-items: center;">
          <el-input-number controls-position="right" v-model="optionModel.shadow.offsetX"></el-input-number>
          <el-input-number controls-position="right" v-model="optionModel.shadow.offsetY"></el-input-number>
        </div>
      </el-form-item>
      <el-form-item label="模糊半径" label-width="70px">
        <div style="display: flex; gap:5px; align-items: center;">
            <el-input-number style="width:90px;flex-shrink:0" controls-position="right" v-model="optionModel.shadow.blur"></el-input-number>
            <el-slider style="width:100%" v-model="optionModel.shadow.blur" :max="20" :min="-20"></el-slider>
        </div>
      </el-form-item>
      <el-form-item label="扩展半径" label-width="70px">
        <div style="display: flex; gap:5px; align-items: center;">
          <el-input-number style="width:90px;flex-shrink:0" controls-position="right" v-model="optionModel.shadow.expand"></el-input-number>
          <el-slider style="width:100%" v-model="optionModel.shadow.expand" :max="20" :min="-20"></el-slider>
        </div>
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
    name: "shadow-editor",
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
        console.log('【copyToClipboard】',JSON.stringify(this.optionModel.shadow))
        copyToClipboardTest(
          JSON.stringify(this.optionModel.shadow), 
          e,
          this.$message,
          this.i18nt('designer.hint.copyJsonSuccess'),
          this.i18nt('designer.hint.copyJsonFail')
        )
      },
      pasteFromClipboard() {
        this.optionModel.shadow = JSON.parse(this.editPaste)
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
}
.right {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
