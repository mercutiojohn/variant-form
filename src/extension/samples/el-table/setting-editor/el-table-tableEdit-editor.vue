<template>
  <el-form-item label="编辑" label-width="150px">
    <el-button type="info" icon="el-icon-edit" plain round @click="editEventHandler('onCreated', eventParams)">
      编辑字段</el-button>
  </el-form-item>
</template>

<script>
  import i18n from "@/utils/i18n"
  import eventMixin from "@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin"

  export default {
    name: "el-table-tableEdit-editor",
    mixins: [i18n, eventMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,
    },
    data() {
      return {
        eventParams: [],
      }
    }

  }
</script>

<style scoped>

</style>
