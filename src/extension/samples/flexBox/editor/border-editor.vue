<template>
    <el-collapse class="sub-collapse" v-model="activeName">
    <el-collapse-item title="边框设置" name="1">
      <el-form-item label="边框类型">
        <el-select v-model="optionModel.boxBorder.style">
          <el-option label="实边框" value="solid" style="display:flex; align-items:center">
            <div :style="`width:100%; height:0; border-top: ${optionModel.boxBorder.width}px solid ${optionModel.boxBorder.color}`"></div>
          </el-option>
          <el-option label="虚边框" value="dashed" style="display:flex; align-items:center">
            <div :style="`width:100%; height:0; border-top: ${optionModel.boxBorder.width}px dashed ${optionModel.boxBorder.color}`"></div>
          </el-option>
          <el-option label="点状边框" value="dotted" style="display:flex; align-items:center">
            <div :style="`width:100%; height:0; border-top: ${optionModel.boxBorder.width}px dotted ${optionModel.boxBorder.color}`"></div>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="边框颜色">
        <el-color-picker v-model="optionModel.boxBorder.color" show-alpha>
        </el-color-picker>
      </el-form-item>
      <el-form-item label="边框宽度">
        <el-input-number v-model="optionModel.boxBorder.width"></el-input-number>
      </el-form-item>
      <!-- <el-form-item label="边框宽度">
        <el-input-number v-model="optionModel.boxBorder.width"></el-input-number>
      </el-form-item> -->
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import i18n from "@/utils/i18n"
  import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "boxBorder-editor",
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