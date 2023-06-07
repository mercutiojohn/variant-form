<template>
  <div style="border-radius:5px;border:1px solid #00000023;overflow:hidden">
    <el-table size="mini" :data="colors" style="width: 100%">
      <el-table-column width="30">
        <template slot-scope="scope">
          <div class="handle"><i class="el-icon-s-grid"></i></div>
        </template>
      </el-table-column>
      <el-table-column prop="color" label="颜色" align="center">
        <template slot-scope="scope">
          <div>
              <el-color-picker
                v-model="scope.row.color"
                size="mini"
              ></el-color-picker>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="stop" label="位置" width="100" align="center">
        <template slot-scope="scope">
          <el-input-number
            v-model.number="scope.row.stop"
            style="width:90px;flex-shrink:0" 
            controls-position="right" 
            :min="0"
            :max="100"
            :step="1"
          ></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="" width="40">
        <template slot-scope="scope">
          <el-button type="text" @click="deleteRow(scope.$index)" icon="el-icon-delete"
            ></el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-button type="text" @click="addRow" style="width:100%" icon="el-icon-plus">新增颜色</el-button>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: { draggable },
  props: {
    value: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      colors: this.value,
    };
  },
  watch: {
    value(newValue) {
      this.colors = newValue;
    },
  },
  methods: {
    addRow() {
      this.colors.push({ color: "#dddddd", stop: this.colors.length * 10 });
      this.colors.sort((a, b) => a.stop - b.stop); // 按stop属性升序排列
      this.$emit("input", this.colors);
    },
    deleteRow(index) {
      this.colors.splice(index, 1);
      this.$emit("input", this.colors);
    },
    onSort(event) {
      // 获取拖动前后的颜色对象和索引位置
      const { moved, related } = event;
      const movedColor = this.colors[moved.newIndex];
      const relatedColor = this.colors[related.newIndex];

      // 更改颜色列表中的顺序
      this.colors.splice(moved.newIndex, 1, relatedColor);
      this.colors.splice(related.newIndex, 1, movedColor);

      // 更新所有颜色停止点的值，以便它们反映新的顺序
      this.colors.forEach((color, i) => {
        color.stop = (i * 100) / (this.colors.length - 1);
      });
    },
  },
};
</script>

<style scoped>
.handle {
  cursor: move;
}
</style>