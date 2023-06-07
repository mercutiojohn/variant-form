<template>
  <el-collapse class="sub-collapse" v-model="activeNames">
    <el-collapse-item title="字体" name="1">
      <div
        @click.stop
        slot="title"
        style="
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-right: 10px;
        "
      >
        <span>
          <svg-icon icon-class="text" class-name="color-svg-icon" /> 字体
        </span>
        <el-switch v-model="optionModel.font.use" @click.stop></el-switch>
      </div>
      <el-form-item label="字体风格">
        <el-select v-model="optionModel.font.family" placeholder="请选择">
          <el-option v-for="(item, index) in fonts" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字体大小">
        <div style="display:flex;gap:5px">
          <!-- <el-input-number controls-position="right" v-model="optionModel.font.size">
          </el-input-number> -->
          <el-input v-model="optionModel.font.size">
            <el-select
              v-model="optionModel.font.sizeMeasure"
              slot="append"
              placeholder=""
            >
              <el-option label="px" value="px"></el-option>
              <el-option label="em" value="em"></el-option>
              <el-option label="rem" value="rem"></el-option>
              <el-option label="%" value="%"></el-option>
              <el-option label="无" value=""></el-option>
            </el-select>
          </el-input>
          <!-- <el-select
            v-model="optionModel.font.sizeMeasure"
            placeholder=""
          >
            <el-option label="px" value="px"></el-option>
            <el-option label="em" value="em"></el-option>
            <el-option label="rem" value="rem"></el-option>
            <el-option label="%" value="%"></el-option>
            <el-option label="无" value=""></el-option>
          </el-select> -->
        </div>
      </el-form-item>
      <el-form-item label="字重">
        <div style="display:flex;gap:5px">
          <!-- <el-input-number controls-position="right" v-model="optionModel.font.size">
          </el-input-number> -->
          <!-- <el-autocomplete
              v-model="optionModel.font.weight"
              :fetch-suggestions="querySearch"
              placeholder=""
              size="mini"
            >
              <template slot-scope="{ item }">
                <div class="name">{{ item.labelAlign }}</div>
              </template>
            </el-autocomplete> -->
          <el-select
            v-model="optionModel.font.weight"
            placeholder=""
          >
            <el-option v-for="(item, index) in weights" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item
        label="字体颜色"
      >
        <div
          style="
            display: flex;
            gap: 5px;
            align-items: center;
            justify-content: flex-start;
          "
        >
          <el-color-picker
            v-model="optionModel.font.color"
            show-alpha
          >
          </el-color-picker>
          <!-- {{ optionModel.font.color }} -->
        </div>
      </el-form-item>
    </el-collapse-item>
  </el-collapse>
</template>

<script>
import i18n from "@/utils/i18n";
import propertyMixin from "@/components/form-designer/setting-panel/property-editor/propertyMixin";
import SvgIcon from "@/components/svg-icon";
import GradientBackgroundEditor from "@/components/form-designer/setting-panel/components/gradient-editor";

export default {
  name: "font-editor",
  mixins: [i18n, propertyMixin],
  components: {
    SvgIcon,
    GradientBackgroundEditor,
  },
  props: {
    designer: Object,
    selectedWidget: Object,
    optionModel: Object,
  },
  data() {
    return {
      activeNames: ["1"],
      fonts: [
        {label:'默认',value:'unset'},
        {label:'宋体',value:'SimSun, sans-serif'},
        {label:'黑体',value:'SimHei, Heiti, sans'},
        {label:'仿宋',value:'仿宋, sans-serif'},
      ],
      weights: [
        // {label:'100',value:'100'},
        // {label:'200',value:'200'},
        // {label:'300',value:'300'},
        // {label:'400',value:'400'},
        // {label:'500',value:'500'},
        // {label:'600',value:'600'},
        // {label:'700',value:'700'},
        // {label:'800',value:'800'},
        // {label:'900',value:'900'},
        {label:'极细',value:'lighter'},
        {label:'细体',value:'light'},
        {label:'正常',value:'normal'},
        {label:'粗体',value:'bold'},
        {label:'加粗',value:'bolder'},
      ]
    };
  },
  methods: {
    updateColors(newColors) {
      this.optionModel.font.gradient = newColors;
    },
    querySearch(queryString, cb) {
      var weights = this.weights;
      var results = queryString ? weights.filter(this.createFilter(queryString)) : weights;
      cb(results);
    },
    createFilter(queryString) {
      return (weight) => {
        return (weight.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
  }
};
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
    &:first-of-type {
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }
    &:last-of-type {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      border-bottom: 1px solid #00000023;
    }
  }
  .el-collapse-item__header {
    background-color: unset!important;
    border-bottom: none;
    height: 40px!important;
  }
  .el-input-group__append {
    width: 50%;
  }
  .axis .el-radio-button--mini .el-radio-button__inner {
    padding: 7px 6px;
  }
}
</style>