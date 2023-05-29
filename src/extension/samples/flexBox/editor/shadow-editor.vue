<template>
  <el-collapse class="sub-collapse" v-model="activeName">
    <el-collapse-item title="阴影设置" name="1">
      <el-form-item label="颜色" label-width="70px">
        <div style="display: flex; gap:5px; align-items: center; justify-content: flex-start">
          <el-color-picker v-model="optionModel.shadow.color" show-alpha>
          </el-color-picker>
          {{optionModel.shadow.color}}
        </div>
      </el-form-item>
      <el-form-item label="阴影类型" label-width="70px">
        <el-radio-group v-model="optionModel.shadow.isInset">
          <el-radio-button :label="false">外阴影</el-radio-button>
          <el-radio-button :label="true">内阴影</el-radio-button>
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
  import i18n from "@/utils/i18n"
  import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "shadow-editor",
    mixins: [i18n, propertyMixin],
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
}
::v-deep.sub-collapse .el-collapse-item {
  border: 1px solid #00000023;
  border-radius: 8px;
}
::v-deep.sub-collapse .el-collapse-item__header {
  background-color: unset;
  height: 40px;
}
</style>
