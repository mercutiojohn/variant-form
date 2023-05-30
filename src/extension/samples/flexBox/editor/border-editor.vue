<template>
    <el-collapse class="sub-collapse" v-model="activeName">
    <el-collapse-item title="边框设置" name="1">
      <el-form-item label="边框颜色" label-width="70px">
        <div style="display: flex; gap:5px; align-items: center; justify-content: flex-start">
          <el-color-picker v-model="optionModel.shadow.color" show-alpha>
          </el-color-picker>
          {{optionModel.shadow.color}}
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
      </el-form-item>
      <el-form-item label="边框宽度" label-width="70px">
        <el-input-number v-model="optionModel.boxBorder.width"></el-input-number>
      </el-form-item>
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
}
</style>