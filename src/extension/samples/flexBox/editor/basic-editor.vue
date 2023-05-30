<template>
    <el-collapse class="sub-collapse" v-model="activeName">
    <el-collapse-item title="基本样式设置" name="1">
      <el-form-item label="宽度">
        <el-input v-model="optionModel.basic.width">
          <el-select v-model="optionModel.basic.widthMeasure" slot="append" placeholder="请选择">
            <el-option label="px" value="px"></el-option>
            <el-option label="vw" value="vw"></el-option>
            <el-option label="vh" value="vh"></el-option>
            <el-option label="%" value="%"></el-option>
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
          </el-select>
        </el-input>
      </el-form-item>
      <el-form-item label-width="0">
        <svg-icon icon-class="corners" class-name="color-svg-icon" />
        <el-row :gutter="10">
          <el-col :span="12">
            <svg-icon icon-class="corner-top-left" class-name="color-svg-icon" />
            <el-input-number controls-position="right" v-model="optionModel.basic.radius.topLeft"></el-input-number>
          </el-col>
          <el-col :span="12">
            <svg-icon icon-class="corner-top-right" class-name="color-svg-icon" />
            <el-input-number controls-position="right" v-model="optionModel.basic.radius.topRight"></el-input-number>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <svg-icon icon-class="corner-bottom-left" class-name="color-svg-icon" />
            <el-input-number controls-position="right" v-model="optionModel.basic.radius.bottomLeft"></el-input-number>
          </el-col>
          <el-col :span="12">
            <svg-icon icon-class="corner-bottom-right" class-name="color-svg-icon" />
            <el-input-number controls-position="right" v-model="optionModel.basic.radius.bottomRight"></el-input-number>
          </el-col>
        </el-row>
      </el-form-item>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import i18n from "@/utils/i18n"
  import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"
  import SvgIcon from '@/components/svg-icon'

  export default {
    name: "basic-editor",
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
  .el-input-group__append {
    width: 50%;
  }
}
</style>