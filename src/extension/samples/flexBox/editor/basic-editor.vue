<template>
    <el-collapse class="sub-collapse" v-model="activeName">
    <el-collapse-item title="基本样式" name="1">
      <el-form-item label="宽度">
        <el-input v-model="optionModel.basic.width">
          <el-select v-model="optionModel.basic.widthMeasure" slot="append" placeholder="请选择">
            <el-option label="px" value="px"></el-option>
            <el-option label="vw" value="vw"></el-option>
            <el-option label="vh" value="vh"></el-option>
            <el-option label="%" value="%"></el-option>
            <el-option label="无" value=""></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="高度">
        <el-input v-model="optionModel.basic.height">
          <el-select v-model="optionModel.basic.heightMeasure" slot="append" placeholder="请选择">
            <el-option label="px" value="px"></el-option>
            <el-option label="vw" value="vw"></el-option>
            <el-option label="vh" value="vh"></el-option>
            <el-option label="%" value="%"></el-option>
            <el-option label="无" value=""></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="内边距">
        <el-input v-model="optionModel.basic.padding">
          <el-select v-model="optionModel.basic.paddingMeasure" slot="append" placeholder="请选择">
            <el-option label="px" value="px"></el-option>
            <el-option label="vw" value="vw"></el-option>
            <el-option label="vh" value="vh"></el-option>
            <el-option label="%" value="%"></el-option>
            <el-option label="无" value=""></el-option>
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label="外边距">
        <el-input v-model="optionModel.basic.margin">
          <el-select v-model="optionModel.basic.marginMeasure" slot="append" placeholder="请选择">
            <el-option label="px" value="px"></el-option>
            <el-option label="vw" value="vw"></el-option>
            <el-option label="vh" value="vh"></el-option>
            <el-option label="%" value="%"></el-option>
            <el-option label="无" value=""></el-option>
          </el-select>
        </el-input>
      </el-form-item>
    </el-collapse-item>
    <el-collapse-item>
      <template slot="title">
        <svg-icon icon-class="corners" class-name="color-svg-icon" /> 圆角
      </template>
      <el-row :gutter="10">
        <el-col :span="12" style="display: flex;align-items:center;padding:5px 0;">
          <svg-icon icon-class="corner-top-left" class-name="color-svg-icon" />
          <el-input-number controls-position="right" v-model="optionModel.basic.radius.topLeft"></el-input-number>
        </el-col>
        <el-col :span="12" style="display: flex;align-items:center;padding:5px 0;">
          <svg-icon icon-class="corner-top-right" class-name="color-svg-icon" />
          <el-input-number controls-position="right" v-model="optionModel.basic.radius.topRight"></el-input-number>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12" style="display: flex;align-items:center;padding:5px 0;">
          <svg-icon icon-class="corner-bottom-left" class-name="color-svg-icon" />
          <el-input-number controls-position="right" v-model="optionModel.basic.radius.bottomLeft"></el-input-number>
        </el-col>
        <el-col :span="12" style="display: flex;align-items:center;padding:5px 0;">
          <svg-icon icon-class="corner-bottom-right" class-name="color-svg-icon" />
          <el-input-number controls-position="right" v-model="optionModel.basic.radius.bottomRight"></el-input-number>
        </el-col>
      </el-row>
    </el-collapse-item>
    <el-collapse-item>
      <template slot="title">
        <svg-icon icon-class="blending-mode" class-name="color-svg-icon" /> 背景
      </template>
      <el-form-item label="背景类型" label-width="70">
        <el-radio-group class="axis" v-model="optionModel.basic.backgroundType">
          <el-radio-button label="none">
            <svg-icon icon-class="value-none" class-name="color-svg-icon" />
            无
          </el-radio-button>
          <el-radio-button label="color">
            <svg-icon icon-class="opacity" class-name="color-svg-icon" />
            单色
          </el-radio-button>
          <el-radio-button label="gradient">
            <svg-icon icon-class="blending-mode" class-name="color-svg-icon" />
            渐变
          </el-radio-button>
          <!-- <el-radio-button :label="image">
            <svg-icon icon-class="image" class-name="color-svg-icon" />
            图片
          </el-radio-button> -->
        </el-radio-group>
      </el-form-item>
      <gradient-background-editor
        v-model="optionModel.basic.gradient"
        @input="updateColors"
        v-if="optionModel.basic.backgroundType === 'gradient'"
      ></gradient-background-editor>
      <!-- <div :style="{ background: optionModel.basic.gradient }" v-if="optionModel.basic.backgroundType === 'gradient'">
        This is some text with a gradient background.
      </div> -->
      <el-form-item label="背景颜色"  label-width="70" v-else-if="optionModel.basic.backgroundType === 'color'">
        <div style="display: flex; gap:5px; align-items: center; justify-content: flex-start">
          <el-color-picker v-model="optionModel.basic.backgroundColor" show-alpha>
          </el-color-picker>
          {{optionModel.shadow.color}}
        </div>
      </el-form-item>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import i18n from "@/utils/i18n"
  import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"
  import SvgIcon from '@/components/svg-icon'
  import GradientBackgroundEditor from "../components/gradient-editor";

  export default {
    name: "basic-editor",
    mixins: [i18n, propertyMixin],
    components:{
      SvgIcon,
      GradientBackgroundEditor
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
    },
    methods: {
      updateColors(newColors) {
        this.optionModel.basic.gradient = newColors;
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
    border-bottom: none;
    &:first-of-type{
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    &:last-of-type{
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      border-bottom: 1px solid #00000023;
    }
  }
  .el-collapse-item__header {
    background-color: unset;
    border-bottom: none;
    height: 40px;
  }
  .el-input-group__append {
    width: 50%;
  }
  .axis .el-radio-button--mini .el-radio-button__inner {
    padding: 7px 6px;
  }
}
</style>