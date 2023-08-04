<template>
  <div id="app">
    <VFormDesigner ref="vfDesignerRef" :designer-config="designerConfig" :global-dsv="globalDsv" :template-data="getTemplateData()">
      <template #customToolButtons>
        <el-button type="normal" @click="listVformPages">获取表单列表</el-button>
        <el-button type="normal" @click="login">获取登录态</el-button>
        <!-- <el-button type="normal" @click="insertFormJson">外部导入</el-button> -->
        <!-- <el-button type="normal" @click="getFieldList">获取字段列表</el-button> -->
        <!-- <el-button type="primary" @click="printFormJson">外部导出</el-button> -->
      </template>
    </VFormDesigner>
  </div>
</template>

<script>
import VFormDesigner from './components/form-designer/index.vue'
import request from '@/plugin/axios'
// 人员选择API
import { getGroupUserTree, getPersonData, getParentId,getNodeData, getCommonUseData, addContacts } from '@/api/sys/transferunit'
import { treeData, PersonTreeData,lowTreeData } from '@/api/sys/tree'
// 登录态获取
import { AccountLogin } from '@/api/sys/login'
const sm2 = require('sm-crypto').sm2
// VForm页面管理
import { getVformPages, addVformPages, updateVformPages, createTable, genTable, listVformPages, getVformPagesByPageId } from '@/api/vform/vformPages'
// VForm通用增删改查
import { addRecord, delRecordById,delRecordByIds, updateRecord, getRecordById, queryListCond } from '@/api/vform/dynGenerals'

export default {
  name: 'App',
  components: {
    VFormDesigner,
  },
  provide () {
    return {
      testApi: this.testApi,
      // 通用请求
      request,
      // 通用路由
      router: this.$router,
      currentRoute: this.testRoute,
      // d2调用
      mapState: this.testApi,
      mapActions: this.testApi,
      mapMutations: this.testApi,
      // 通用增删改查
      addRecord,
      delRecordById,
      updateRecord,
      queryListCond,
      getRecordById,
      // 人员选择与机构选择
      PersonTreeData,
      lowTreeData,
      treeData,
      getParentId,
      getPersonData,
      getNodeData,
      getGroupUserTree,
      addContacts,
      getCommonUseData,
      // 增删改查组件
      textAlert: this.textAlert, //功能测试
      listVformPages: queryListCond, //增删改查查询
      addRedirect: this.addRedirect,//增删改查新增跳转
      editRedirect: this.editRedirect,//增删改查编辑跳转
      back:this.back,
      down:this.down,
      setFunction: {
        delRecordByIds, //增删改查多选删除
        delRecordById, //增删改查单删
        queryListCond, //增删改查列表查询
        listVformPages: this.formList, //表单列表查询
        getVformPagesByPageId, //vform通过pageid查询详情
      },
      //数据处理
      dataHandling: {
        parseTime: this.parseTime,//日期格式化
        addDateRange: this.addDateRange,//添加日期范围
      }
    }
  },
  data() {
    return {
      designerConfig: {
        resetFormJson: false,
        toolbarMaxWidth: 490,
        headerShow: true,  //是否显示顶栏
        devices: true,  //是否显示设备切换
        // languageMenu: true,  //是否显示语言切换菜单
        externalLink: false,  //是否显示GitHub、文档等外部链接
        // formTemplates: true,  //是否显示表单模板
        // eventCollapse: true,  //是否显示组件事件属性折叠面板
        // widgetNameReadonly: true,  //禁止修改组件名称
        // clearDesignerButton: true,  //是否显示清空设计器按钮
        // previewFormButton: true,  //是否显示预览表单按钮
        importJsonButton: false,  //是否显示导入JSON按钮
        exportJsonButton: false,  //是否显示导出JSON按钮
        // editJsonButton: true,  //是否显示编辑JSON按钮
        // exportCodeButton: true,  //是否显示导出代码按钮
        // generateSFCButton: true,  //是否显示生成SFC按钮
        // toolbarMaxWidth: 420,  //设计器工具按钮栏最大宽度（单位像素）
        // toolbarMinWidth: 300,  //设计器工具按钮栏最小宽度（单位像素）
        // presetCssCode: '',  //设计器预设CSS样式代码
        // resetFormJson: false,  //是否在设计器初始化时将表单内容重置为空
      },

      //全局数据源变量
      globalDsv: {
        testApiHost: 'http://www.test.com/api',
        testPort: 8080,
      },

      // 获取登录态
      publicQkey: '04d4d8ffdea4279d16d813c6899e4dce0695b0c8da3d0d47f111341cab4dba031a93c7fc5fece2f8deef06a5f4fdb242632a9da49b5a8e9dd5aea422da18be2049',
      formLogin: {
        username: 'admin',
        password: '1'
      },
      userInfo: {
        uuid: '',
        token: '',
        refreshToken: '',
        user: ''
      },
      formList:[],
      testRoute: {
        query: {
          // id: 4,
        },
        params: {
          idTest: '1234'
        }
      }
    }
  },
  created () {
    // this.login()
    // this.listVformPages()
  },
  methods: {
    printFormJson() {
      console.log( this.$refs.vfDesignerRef.getFormJson() )
    },
    insertFormJson() {
      let jsonObj = require('./assets/testForm.json')
      this.$refs.vfDesignerRef.setFormJson(jsonObj)
    },
    getFieldList() {
      console.log(this.$refs.vfDesignerRef.getFieldWidgets())
    },
    getTemplateData() {
      let jsonObj = require('./assets/templates.json')
      return jsonObj
    },
    testApi () {
      this.$message.success('外部API方法测试')
    },
    // 获取登录态
    login () {
      this.unlogined = true
      AccountLogin({
          username: this.formLogin.username,
          password: sm2.doEncrypt(this.formLogin.password, this.publicQkey),
      })
      .then(async res => {
          this.userInfo.uuid = res.user.uuid
          this.userInfo.token = res.user.token
          this.userInfo.refreshToken = res.user.refreshToken
          this.userInfo.user = res.user
          localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
          console.log(JSON.parse(localStorage.getItem('userInfo')))
          this.$message.success(`已获取${JSON.parse(localStorage.getItem('userInfo')).user.name}登录态`)
      })
      .catch(err => {
          console.log('err: ', err)
      })
    },
    // 增删改查组件-获取表单列表
    listVformPages () {
      let queryParams = {
        pageId: null,
        title: null,
        status: null,
        pageType: "form",
        genTableName: null,
        genTableStatus: null,
        bindPageId: null,
        asTemplate: null,
        createTime: null,
        updateTime: null,
      }
      let pageQueryData = {
          currentPage: 1,
          pageSize: 1000,
          total: 0,
      }
      listVformPages({
        ...queryParams,
        pageQueryData
      }).then(response => {
          response.data.rows.forEach((item)=>{
            let data = {
              id: item.id,
              label: item.title,
              value: item.pageId
            }
            this.formList.push(data)
          })
        })
    },
    //文件下载
    down(fileName, fileUrl, fileUid) {
      this.request({
        method:"GET",
        url:fileUrl,
        responseType: 'blob'
      }).then(res => {
        this.download(res, fileName)
      }).catch(error => {
        this.$message.error('下载失败:' + err)
      })
    },
    download(data, fileName) {
      if (!data) {
        return this.$message.warning('文件为空')
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      // 获取文件名
      // download 属性定义了下载链接的地址而不是跳转路径
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      link.remove()
    },
    // 增删改查组件
    addRedirect (route) {
      console.log('[addRedirect]', route)
      this.$router.push({
        path: '/dyn/vform/' + route
      })
    },
    editRedirect (route, id, idFieldName, row) {
      console.log('[editRedirect]', route, id, idFieldName, row)
      let params = {
        // [idFieldName]: id,
        ...row,
        type: 'edit'
      }
      this.$router.push({
        path: '/dyn/vform/' + route,
        query: params
      })
    },
    back(){
      console.log("移动端导航栏返回方法")
    }
  }
}
</script>

<style lang="scss">
  #app {
    height: 100%;
  }
</style>
