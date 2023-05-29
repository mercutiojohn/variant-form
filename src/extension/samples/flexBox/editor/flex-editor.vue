<template>
  <el-collapse class="sub-collapse" v-model="activeName">
    <el-collapse-item title="布局设置" name="1">
      <el-form-item label="布局轴向">
        <el-select v-model="optionModel.flex.flexDirection">
          <el-option label="横向" value="row"></el-option>
          <el-option label="纵向" value="column"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="溢出换行">
        <el-select v-model="optionModel.flex.flexWrap">
          <el-option label="不换行" value="nowrap"></el-option>
          <el-option label="换行" value="wrap"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="轴向分布">
        <el-select v-model="optionModel.flex.justifyContent">
          <el-option label="中心" value="center"></el-option>
          <el-option label="头部对齐" value="flex-start"></el-option>
          <el-option label="尾部对齐" value="flex-end"></el-option>
          <el-option label="贴边分布" value="space-between"></el-option>
          <el-option label="Around分布" value="space-around"></el-option>
          <el-option label="Evenly分布" value="space-evenly"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="轴向对齐">
        <el-select v-model="optionModel.flex.alignItems">
          <el-option label="中心" value="center"></el-option>
          <el-option label="文本基线" value="baseline"></el-option>
          <el-option label="头部对齐" value="flex-start"></el-option>
          <el-option label="尾部对齐" value="flex-end"></el-option>
          <el-option label="拉伸" value="stretch"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="间距">
        <el-input-number v-model="optionModel.flex.gap"></el-input-number>
      </el-form-item>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
  import i18n from "@/utils/i18n"
  import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin"

  export default {
    name: "flex-editor",
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