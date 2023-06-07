<template>
    <el-collapse class="sub-collapse" v-model="activeName">
    <el-collapse-item title="边框设置" name="1">
      <div @click.stop slot="title" style="width: 100%;display: flex; align-items: center; justify-content: space-between;padding-right:10px;">
        <span>
          <svg-icon icon-class="border-all" class-name="color-svg-icon" /> 边框
        </span>
        <el-switch v-model="optionModel.boxBorder.use" @click.stop></el-switch>
      </div>
      <el-form-item label="边框颜色" label-width="70px">
        <div style="display: flex; gap:5px; align-items: center; justify-content: flex-start">
          <el-color-picker v-model="optionModel.boxBorder.color" show-alpha>
          </el-color-picker>
          {{optionModel.boxBorder.color}}
        </div>
      </el-form-item>
      <el-form-item label="边框类型" label-width="70px">
        <el-select v-model="optionModel.boxBorder.style">
          <el-option label="实边框" value="solid" style="display:flex; align-items:center">
            <div :style="`width:100%; height:0; border-top: 2px solid #000`"></div>
          </el-option>
          <el-option label="虚边框" value="dashed" style="display:flex; align-items:center">
            <div :style="`width:100%; height:0; border-top: 2px dashed #000`"></div>
          </el-option>
          <el-option label="点状边框" value="dotted" style="display:flex; align-items:center">
            <div :style="`width:100%; height:0; border-top: 2px dotted #000`"></div>
          </el-option>
        </el-select>
        <!-- <el-radio-group v-model="optionModel.boxBorder.style">
          <el-radio-button label="solid">
            <el-tooltip content="实边框" placement="top">
              <svg-icon icon-class="border-solid" class-name="color-svg-icon" />
            </el-tooltip>
          </el-radio-button>
          <el-radio-button label="dashed">
            <el-tooltip content="虚边框" placement="top">
              <svg-icon icon-class="border-dashed" class-name="color-svg-icon" />
            </el-tooltip>
          </el-radio-button>
          <el-radio-button label="dotted">            
            <el-tooltip content="点状边框" placement="top">
              <svg-icon icon-class="border-dotted" class-name="color-svg-icon" />
            </el-tooltip>
          </el-radio-button>
        </el-radio-group> -->
      </el-form-item>
      <el-form-item label="边框宽度" label-width="70px">
        <el-input-number v-model="optionModel.boxBorder.width"></el-input-number>
      </el-form-item>
      <el-form-item label="边框可见性" label-width="70px">
          <el-checkbox-button v-model="optionModel.boxBorder.visible.top">
            <el-tooltip content="上边框" placement="top">
              <svg-icon icon-class="border-top" class-name="color-svg-icon" />
            </el-tooltip>
          </el-checkbox-button>
          <el-checkbox-button v-model="optionModel.boxBorder.visible.right">
            <el-tooltip content="右边框" placement="top">
              <svg-icon icon-class="border-right" class-name="color-svg-icon" />
            </el-tooltip>
          </el-checkbox-button>
          <el-checkbox-button v-model="optionModel.boxBorder.visible.bottom">
            <el-tooltip content="下边框" placement="top">
              <svg-icon icon-class="border-bottom" class-name="color-svg-icon" />
            </el-tooltip>
          </el-checkbox-button>
          <el-checkbox-button v-model="optionModel.boxBorder.visible.left">
            <el-tooltip content="左边框" placement="top">
              <svg-icon icon-class="border-left" class-name="color-svg-icon" />
            </el-tooltip>
          </el-checkbox-button>
          <!-- <el-checkbox-button v-model="optionModel.boxBorder.visible.left" @click="checkAllVisible">
            <el-tooltip content="全边框" placement="top">
              <svg-icon icon-class="border-all" class-name="color-svg-icon" />
            </el-tooltip>
          </el-checkbox-button> -->
      </el-form-item>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import i18n from "@/utils/i18n"
  import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"
  import SvgIcon from '@/components/svg-icon'

  export default {
    name: "boxBorder-editor",
    mixins: [i18n, propertyMixin],
    components:{
      SvgIcon
    },
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    data() {
      return {
        activeName: '1'
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
  .el-checkbox-button--mini .el-checkbox-button__inner {
    padding: 7px 9px;
  }
}
</style>