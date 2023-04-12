<template>
  <Container direction="vertical" style="height:80%">
    <Row :gutter="20">
      <Row>
        <el-input placeholder="输入名称" v-model="filterText"></el-input>
      </Row>
      <Row style="margin-top:20px">
        <el-tabs v-model="activeName" type="border-card">
          <!-- <el-tab-pane label="本部门用户" name="third">
            <stepGroupTree ref="third" :selectMode='selectMode' :filterText.sync='filterText' :newOperator="newOperator"></stepGroupTree>
          </el-tab-pane> -->
          <el-tab-pane label="全部用户" name="third">
            <stepAllTree ref="third" :selectMode='selectMode' :filterText.sync='filterText' :newOperator="newOperator"></stepAllTree>
          </el-tab-pane>
          <el-tab-pane label="常用用户" name="second">
            <commonUse ref="second" :selectMode='selectMode' :filterText.sync='filterText'  :newOperator="newOperator"></commonUse>
          </el-tab-pane>
          <!-- <el-tab-pane label="用户树" name="first">
            <stepAllTree ref="first" :selectMode='selectMode' :filterText.sync='filterText'></stepAllTree>
          </el-tab-pane> -->
        </el-tabs>
      </Row>
    </Row>
    <Row style="text-align: center;margin-top: 20px">
      <!-- <Button
        size="medium"
        type="primary"
        @click="getCheckedNodes"
        style="font-family: 黑体;background-color: #095fff;color: white;border-radius:15px;border: 1px solid #095fff;"
      >确认</Button> -->
      <Button type="primary" size="medium"  @click="getCheckedNodes"
            style="margin-top: 0px;margin-bottom: 10px;font-size:16px;">确认</Button>
    </Row>
  </Container>
</template>

<script>
import { Container, Main, Form, Input, Button, Row, Col } from 'element-ui'
import stepAllTree from './stepAllTree'
import stepGroupTree from './stepGroupTree'
import commonUse from './commonUse'
export default {
  name: 'nextStep',
  components: {
    Container,
    Main,
    Form,
    ElInput: Input,
    Row,
    ELCol: Col,
    Button,
    stepAllTree,
    stepGroupTree,
    commonUse
  },
  props: {
    selectMode: {
      type: Boolean,
      default: false
    },
    newOperator: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      filterText:'',
      data: [],
      groupdata:[],
      activeName:'third',
      defaultProps: {
        label: 'name',
        children: 'children'
      }
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    getCheckedNodes() {
      this.$emit('sendTranUnit', this.$refs[this.activeName].selectData) // 将已选信息传送到父级页面
    }
  },
  mounted: function() {
  },
  watch: {
    activeName(newVal,oldVal){
      this.$refs[this.activeName].clearData()
    }
  }
}
</script>

<style>
</style>
