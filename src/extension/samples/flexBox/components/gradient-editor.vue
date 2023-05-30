<template>
  <div class="gradient-editor">
    <el-form size="mini" label-width="70">
      <el-form-item label="渐变类型">
        <el-radio-group v-model="type">
          <el-radio-button label="linear">线性</el-radio-button>
          <el-radio-button label="radial">径向</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="角度" v-if="type === 'linear'">
        <div style="display: flex; gap:5px; align-items: center;">
          <el-input-number 
            style="width:90px;flex-shrink:0" 
            controls-position="right" 
            v-model.number="angle"
            :min="-360"
            :max="360"
          ></el-input-number>
          <el-slider 
            style="width:100%" 
            v-model="angle" 
            :min="-180" 
            :max="180"
          ></el-slider>
        </div>
      </el-form-item>

      <color-table v-model="colors"></color-table>

      <!-- <el-form-item>
        <el-button type="primary" @click="addColor">Add Color</el-button>
      </el-form-item> -->

      <!-- <el-form-item label="Preview">
        <div class="preview" :style="{ background: gradient }"></div>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import ColorTable from "./color-table";

export default {
  components: { ColorTable },
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      type: "linear",
      angle: 0,
      colors: [
        { color: "#ffffff", stop: 0 },
        { color: "#000000", stop: 100 },
      ],
    };
  },
  computed: {
    gradient() {
      if (this.type === "linear") {
        return `linear-gradient(${this.angle}deg, ${this.colorStops})`;
      } else {
        return `radial-gradient(${this.colorStops})`;
      }
    },
    colorStops() {
      return this.colors
        .map((item) => `${item.color} ${item.stop}%`)
        .join(", ");
    },
  },
  watch: {
    gradient(newValue) {
      this.$emit("input", newValue);
    },
  },
  created() {
    if (this.value) {
      const matches = this.value.match(
        /linear-gradient\((\d+)deg, (.+), (.+)\)/
      );
      if (matches) {
        this.angle = parseInt(matches[1]);
        this.startColor = matches[2];
        this.endColor = matches[3];
      }
    }
  },
  methods: {
    addColor() {
      this.colors.push({ color: "#dddddd", stop: this.colors.length * 10 });
    },
  },
};
</script>

<style scoped>
.gradient-editor {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.preview {
  width: 200px;
  height: 100px;
  margin-top: 10px;
  border: 1px solid #ccc;
}
::v-deep .gradient-editor .el-form-item--mini.el-form-item {
    margin-bottom: 6px;
}
</style>
