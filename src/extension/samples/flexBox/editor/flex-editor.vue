<template>
  <el-collapse class="sub-collapse" v-model="activeName">
    <el-collapse-item title="布局设置" name="1">
      <template slot="title">
        <svg-icon icon-class="layout" class-name="color-svg-icon" /> 布局
      </template>
      <el-form-item class="axis" label="布局轴向" label-width="70px">
        <!-- <el-select v-model="optionModel.flex.flexDirection">
          <el-option label="横向" value="row"></el-option>
          <el-option label="纵向" value="column"></el-option>
        </el-select> -->
        <el-radio-group v-model="optionModel.flex.flexDirection">
          <el-radio-button label="row">
            <svg-icon icon-class="dots-horizontal" class-name="color-svg-icon" />
            横向
          </el-radio-button>
          <el-radio-button label="column">
            <svg-icon icon-class="dots-vertical" class-name="color-svg-icon" />
            纵向
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="溢出换行" label-width="70px">
        <!-- <el-select v-model="optionModel.flex.flexWrap">
          <el-option label="不换行" value="nowrap"></el-option>
          <el-option label="换行" value="wrap"></el-option>
        </el-select> -->
        <el-switch
          v-model="optionModel.flex.flexWrap"
          active-value="wrap"
          inactive-value="nowrap">
        </el-switch>
      </el-form-item>
      <el-form-item label="轴向分布" label-width="70px">
        <el-radio-group v-model="optionModel.flex.justifyContent">
          <el-radio-button label="center">
            <el-tooltip content="中心" placement="top">
              <svg-icon :icon-class="`align-center-${optionModel.flex.flexDirection=='row'?'horizontally':'vertically'}`" class-name="color-svg-icon" />
            </el-tooltip>
          </el-radio-button>
          <el-radio-button label="flex-start">
            <el-tooltip :content="`${optionModel.flex.flexDirection=='row'?'左':'顶部'}对齐`" placement="top">
              <svg-icon :icon-class="`align-${optionModel.flex.flexDirection=='row'?'left':'top'}`" class-name="color-svg-icon" />
            </el-tooltip>
          </el-radio-button>
          <el-radio-button label="flex-end">
            <el-tooltip :content="`${optionModel.flex.flexDirection=='row'?'右':'底部'}对齐`" placement="top">
              <svg-icon :icon-class="`align-${optionModel.flex.flexDirection=='row'?'right':'bottom'}`" class-name="color-svg-icon" />
            </el-tooltip>
          </el-radio-button>
          <el-radio-button label="space-between">
            <el-tooltip content="贴边分布" placement="top">
              <svg-icon :icon-class="`space-between-${optionModel.flex.flexDirection=='row'?'horizontally':'vertically'}`" class-name="color-svg-icon" />
            </el-tooltip>
          </el-radio-button>
          <el-radio-button label="space-around">
            <el-tooltip content="均匀分布" placement="top">
              <svg-icon :icon-class="`space-evenly-${optionModel.flex.flexDirection=='row'?'horizontally':'vertically'}`" class-name="color-svg-icon" />
            </el-tooltip>
          </el-radio-button>
          <el-radio-button label="space-evenly">
            <el-tooltip content="紧凑均匀分布" placement="top">
              <svg-icon :icon-class="`space-evenly-${optionModel.flex.flexDirection=='row'?'horizontally':'vertically'}`" class-name="color-svg-icon" />
            </el-tooltip>
          </el-radio-button>
          <el-radio-button label="stretch">
            <el-tooltip content="拉伸" placement="top">
              <svg-icon :icon-class="`stretch-${optionModel.flex.flexDirection=='row'?'horizontally':'vertically'}`" class-name="color-svg-icon" />
            </el-tooltip>
          </el-radio-button>
        </el-radio-group>
        <!-- <el-select v-model="optionModel.flex.justifyContent">
          <el-option label="中心" value="center"></el-option>
          <el-option label="头部对齐" value="flex-start">
            <svg-icon :icon-class="`align-${optionModel.flex.flexDirection=='row'?'left':'top'}`" class-name="color-svg-icon" />
            {{optionModel.flex.flexDirection=='row'?'左':'顶部'}}对齐
          </el-option>
          <el-option label="尾部对齐" value="flex-end">
            <svg-icon :icon-class="`align-${optionModel.flex.flexDirection=='row'?'right':'bottom'}`" class-name="color-svg-icon" />
            {{optionModel.flex.flexDirection=='row'?'右':'底部'}}对齐
          </el-option>
          <el-option label="贴边分布" value="space-between"></el-option>
          <el-option label="Around分布" value="space-around"></el-option>
          <el-option label="Evenly分布" value="space-evenly"></el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="轴向对齐" label-width="70px">
        <el-radio-group v-model="optionModel.flex.alignItems">
          <el-radio-button label="center">
            <el-tooltip content="中心" placement="top">
              <svg-icon :icon-class="`align-center-${optionModel.flex.flexDirection=='row'?'vertically':'horizontally'}`" class-name="color-svg-icon" />
            </el-tooltip>
          </el-radio-button>
          <el-radio-button label="flex-start">
            <el-tooltip :content="`${optionModel.flex.flexDirection=='row'?'顶部':'左'}对齐`" placement="top">
              <svg-icon :icon-class="`align-${optionModel.flex.flexDirection=='row'?'top':'left'}`" class-name="color-svg-icon" />
            </el-tooltip>
          </el-radio-button>
          <el-radio-button label="flex-end">
            <el-tooltip :content="`${optionModel.flex.flexDirection=='row'?'底部':'右'}对齐`" placement="top">
              <svg-icon :icon-class="`align-${optionModel.flex.flexDirection=='row'?'bottom':'right'}`" class-name="color-svg-icon" />
            </el-tooltip>
          </el-radio-button>
          <el-radio-button label="stretch">
            <el-tooltip content="拉伸" placement="top">
              <svg-icon :icon-class="`stretch-${optionModel.flex.flexDirection=='row'?'vertically':'horizontally'}`" class-name="color-svg-icon" />
            </el-tooltip>
          </el-radio-button>
          <el-radio-button label="baseline">
            <el-tooltip content="文本基线" placement="top">
              <svg-icon icon-class="align-baseline" class-name="color-svg-icon" />
            </el-tooltip>
          </el-radio-button>
        </el-radio-group>
        <!-- <el-select v-model="optionModel.flex.alignItems">
          <el-option label="中心" value="center">
            <svg-icon :icon-class="`align-center-${optionModel.flex.flexDirection=='row'?'vertically':'horizontally'}`" class-name="color-svg-icon" />
            中心
          </el-option>
          <el-option label="头部对齐" value="flex-start">
            <svg-icon :icon-class="`align-${optionModel.flex.flexDirection=='row'?'top':'left'}`" class-name="color-svg-icon" />
            {{optionModel.flex.flexDirection=='row'?'顶部':'左'}}对齐
          </el-option>
          <el-option label="尾部对齐" value="flex-end">
            <svg-icon :icon-class="`align-${optionModel.flex.flexDirection=='row'?'bottom':'right'}`" class-name="color-svg-icon" />
            {{optionModel.flex.flexDirection=='row'?'底部':'右'}}对齐
          </el-option>
          <el-option label="拉伸" value="stretch">
            <svg-icon :icon-class="`${optionModel.flex.flexDirection=='row'?'align':'justify'}-stretch`" class-name="color-svg-icon" />
            拉伸
          </el-option>
          <el-option label="文本基线" value="baseline">
            <svg-icon icon-class="align-baseline" class-name="color-svg-icon" />
            文本基线
          </el-option>
        </el-select> -->
      </el-form-item>
      <el-form-item label="间距" label-width="70px">
        <el-input-number v-model="optionModel.flex.gap"></el-input-number>
      </el-form-item>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import i18n from "@/utils/i18n"
  import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"
  import SvgIcon from '@/components/svg-icon'

  export default {
    name: "flex-editor",
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
    background-color: unset;
    border-bottom: none;
    height: 40px;
  }
  .el-radio-button--mini .el-radio-button__inner {
    padding: 7px 3px;
  }
  .axis .el-radio-button--mini .el-radio-button__inner {
    padding: 7px 15px;
  }
}
</style>