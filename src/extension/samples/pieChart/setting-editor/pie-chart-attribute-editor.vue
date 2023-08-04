<template>
  <div>
    <el-form-item label="背景颜色" label-width="110px">
      <el-color-picker
        v-model="selectedWidget.options.setup.background"
        show-alpha
        size="mini"
      />
    </el-form-item>
    <el-form-item label="点击事件" label-width="110px">
      <el-button type="info" icon="el-icon-edit" plain round @click="editData">
        编辑内容</el-button>
    </el-form-item>
    <el-dialog title="自定义配置" :visible.sync="showDataFlag"
      v-if="showDataFlag" :show-close="true" class="small-padding-dialog" append-to-body v-dialog-drag
        :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
        <el-alert type="info" :closable="false" title="(item) => { // 选中区域属性"></el-alert>
        <code-editor :mode="'javascript'" :readonly="false" v-model="setData" ref="ecEditor"></code-editor>
        <el-alert type="info" :closable="false" title="}"></el-alert>
        <div slot="footer" class="dialog-footer">
        <el-button @click="showDataFlag = false">
        取消</el-button>
        <el-button type="primary" @click="saveDataConversion">
        确定</el-button>
        </div>
    </el-dialog>
    <el-form-item label="饼图高度" label-width="110px">
      <el-input-number
            size="mini"
            style="width:100%"
            v-model.trim="selectedWidget.options.position.height"
            controls-position="right"
            :max="9999"
            :min="200"
          />
    </el-form-item>
    <el-form-item label="饼图样式" label-width="110px">
      <el-select
        size="mini"
        v-model="selectedWidget.options.setup.piechartStyle"
        clearable
        placeholder="请选择"
      >
        <el-option
          v-for="itemChild in piechartStyleOptions"
          :key="itemChild.code"
          :label="itemChild.name"
          :value="itemChild.code"
        />
      </el-select>
    </el-form-item>
    <el-collapse>
      <el-collapse-item title="标题设置">
        <el-form-item label="标题显示" label-width="110px">
          <el-switch
            v-model="selectedWidget.options.setup.isNoTitle"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="标题名" label-width="110px">
          <el-input
            v-model.trim="selectedWidget.options.setup.titleText"
            type="text"
            size="mini"
            placeholder="请输入内容"
            clearable
          />
        </el-form-item>
        <el-form-item label="字体颜色" label-width="110px">
          <el-color-picker
            v-model="selectedWidget.options.setup.textColor"
            show-alpha
            size="mini"
          />
        </el-form-item>
        <el-form-item label="字体字号" label-width="110px">
          <el-input-number
            size="mini"
            style="width:100%"
            v-model.trim="selectedWidget.options.setup.textFontSize"
            controls-position="right"
            :max="9999"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="字体粗细" label-width="110px">
          <el-select
            size="mini"
            v-model="selectedWidget.options.setup.textFontWeight"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="itemChild in weightOptions"
              :key="itemChild.code"
              :label="itemChild.name"
              :value="itemChild.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="字体风格" label-width="110px">
          <el-select
            size="mini"
            v-model="selectedWidget.options.setup.textFontStyle"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="itemChild in styleOptions"
              :key="itemChild.code"
              :label="itemChild.name"
              :value="itemChild.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="字体位置" label-width="110px">
          <el-select
            size="mini"
            v-model="selectedWidget.options.setup.textAlign"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="itemChild in alignOptions"
              :key="itemChild.code"
              :label="itemChild.name"
              :value="itemChild.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="副标题名" label-width="110px">
          <el-input
            v-model.trim="selectedWidget.options.setup.subText"
            type="text"
            size="mini"
            placeholder="请输入内容"
            clearable
          />
        </el-form-item>
        <el-form-item label="字体颜色" label-width="110px">
          <el-color-picker
            v-model="selectedWidget.options.setup.subTextColor"
            show-alpha
            size="mini"
          />
        </el-form-item>
        <el-form-item label="字体字号" label-width="110px">
          <el-input-number
            size="mini"
            style="width:100%"
            v-model.trim="selectedWidget.options.setup.subTextFontSize"
            controls-position="right"
            :max="9999"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="字体粗细" label-width="110px">
          <el-select
            size="mini"
            v-model="selectedWidget.options.setup.subTextFontWeight"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="itemChild in weightOptions"
              :key="itemChild.code"
              :label="itemChild.name"
              :value="itemChild.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="字体风格" label-width="110px">
          <el-select
            size="mini"
            v-model="selectedWidget.options.setup.subTextFontStyle"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="itemChild in styleOptions"
              :key="itemChild.code"
              :label="itemChild.name"
              :value="itemChild.code"
            />
          </el-select>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="数值设置">
        <el-form-item label="显示" label-width="110px">
          <el-switch
            v-model="selectedWidget.options.setup.isShow"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="数值" label-width="110px">
            <el-switch
              v-model="selectedWidget.options.setup.numberValue"
              size="mini"
            />
        </el-form-item>
        <el-form-item label="百分比" label-width="110px">
            <el-switch
              v-model="selectedWidget.options.setup.percentage"
              size="mini"
            />
        </el-form-item>
        <el-form-item label="字体字号" label-width="110px">
          <el-input-number
            size="mini"
            style="width:100%"
            v-model.trim="selectedWidget.options.setup.fontSize"
            controls-position="right"
            :max="9999"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="字体颜色" label-width="110px">
          <el-color-picker
            v-model="selectedWidget.options.setup.fontColor"
            show-alpha
            size="mini"
          />
        </el-form-item>
        <el-form-item label="字体粗细" label-width="110px">
          <el-select
            size="mini"
            v-model="selectedWidget.options.setup.fontWeight"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="itemChild in weightOptions"
              :key="itemChild.code"
              :label="itemChild.name"
              :value="itemChild.code"
            />
          </el-select>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="提示语设置">
        <el-form-item label="字体字号" label-width="110px">
          <el-input-number
            size="mini"
            style="width:100%"
            v-model.trim="selectedWidget.options.setup.tipsFontSize"
            controls-position="right"
            :max="9999"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="字体颜色" label-width="110px">
          <el-color-picker
            v-model="selectedWidget.options.setup.tipsColor"
            show-alpha
            size="mini"
          />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="图例操作">
        <el-form-item label="图例" label-width="110px">
            <el-switch
              v-model="selectedWidget.options.setup.isShowLegend"
              size="mini"
            />
        </el-form-item>
        <el-form-item label="字体字号" label-width="110px">
            <el-input-number
              size="mini"
              style="width:100%"
              v-model.trim="selectedWidget.options.setup.legendFontSize"
              controls-position="right"
              :max="9999"
              :min="0"
            />
        </el-form-item>
        <el-form-item label="字体颜色" label-width="110px">
          <el-color-picker
            v-model="selectedWidget.options.setup.legendColor"
            show-alpha
            size="mini"
          />
        </el-form-item>
        <el-form-item label="图例宽度" label-width="110px">
            <el-input-number
              size="mini"
              style="width:100%"
              v-model.trim="selectedWidget.options.setup.legendWidth"
              controls-position="right"
              :max="9999"
              :min="0"
            />
        </el-form-item>
        <el-form-item label="横向位置" label-width="110px">
            <el-select
              size="mini"
              v-model="selectedWidget.options.setup.lateralPosition"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="itemChild in alignOptions"
                :key="itemChild.code"
                :label="itemChild.name"
                :value="itemChild.code"
              />
            </el-select>
        </el-form-item>
        <el-form-item label="纵向位置" label-width="110px">
            <el-select
              size="mini"
              v-model="selectedWidget.options.setup.longitudinalPosition"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="itemChild in longitudinalPositionOptions"
                :key="itemChild.code"
                :label="itemChild.name"
                :value="itemChild.code"
              />
            </el-select>
        </el-form-item>
        <el-form-item label="布局前置" label-width="110px">
            <el-select
              size="mini"
              v-model="selectedWidget.options.setup.layoutFront"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="itemChild in layoutFrontOptions"
                :key="itemChild.code"
                :label="itemChild.name"
                :value="itemChild.code"
              />
            </el-select>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="自定义配色">
        <customColorComponents
          v-model="selectedWidget.options.setup.customColor"
          @change="changeColor($event, 'customColor')"
        />
      </el-collapse-item>
    </el-collapse>
    <el-collapse-item title="数据管理">
      <el-form-item label="数据类型" label-width="110px">
        <el-radio-group
          v-model="selectedWidget.options.data.dataType">
          <el-radio
            v-for="it in dataOptions"
            :key="it.code"
            :label="it.code"
            >{{ it.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="静态数据" label-width="110px" v-if="selectedWidget.options.data.dataType=='staticData'">
        <el-button type="info" icon="el-icon-edit" plain round @click="editStaticData">
          数据编辑</el-button>
      </el-form-item>
      <el-form-item label="动态数据" label-width="110px" v-else>
        <el-button type="info" icon="el-icon-edit" plain round @click="dynamicData">
          数据编辑</el-button>
      </el-form-item>
    </el-collapse-item>
    <el-dialog title="静态数据编辑" :visible.sync="showStaticDialogFlag"
               v-if="showStaticDialogFlag" :show-close="true" class="small-padding-dialog" append-to-body v-dialog-drag
               :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
      <el-alert type="info" :closable="false" title="{"></el-alert>
      <code-editor :mode="'javascript'" :readonly="false" v-model="staticData" ref="staticEditor"></code-editor>
      <el-alert type="info" :closable="false" title="}"></el-alert>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showStaticDialogFlag = false">
          {{i18nt('designer.hint.cancel')}}</el-button>
        <el-button type="primary" @click="saveStaticData">
          {{i18nt('designer.hint.confirm')}}</el-button>
      </div>
    </el-dialog>
    <el-dialog title="动态数据编辑" :visible.sync="showDynamicDialogFlag"
               v-if="showDynamicDialogFlag" :show-close="true" class="small-padding-dialog" append-to-body v-dialog-drag
               :close-on-click-modal="false" :close-on-press-escape="false" :destroy-on-close="true">
      <dynamicComponents
        v-model="formData"
        :chart-type="chartType"
        :dict-key="dictKey"
        @change="changeData($event, 'dynamicData')"
      />
    </el-dialog>
  </div>
</template>

<script>
  import Vue from 'vue'
  import i18n from "@/utils/i18n"
  import customColorComponents from "./customColorComponents";
  import dynamicComponents from "./dynamicComponents.vue";
  import CodeEditor from '@/components/code-editor/index'
  import eventMixin from "@/components/form-designer/setting-panel/property-editor/event-handler/eventMixin"

  export default {
    name: "pie-chart-attribute-editor",
    mixins: [i18n, eventMixin],
    props: {
      designer: Object,
      selectedWidget: Object,
      optionModel: Object,

    },
    components: {
      customColorComponents,
      CodeEditor,
      dynamicComponents
    },
    watch: {

  },
    computed:{
      formData() {
        if(this.selectedWidget.options.data.dynamicData){
          return this.selectedWidget.options.data.dynamicData
      }else{
        return{
          dataType: "dynamicData",
          refreshTime: 5000
        }
      }
        
      },
    },     
    data() {
      return {
        weightOptions: [
          {code: 'normal', name: '正常'},
          {code: 'bold', name: '粗体'},
        ],      
        styleOptions: [
          {code: 'normal', name: '正常'},
          {code: 'italic', name: '斜体'},
        ],
        longitudinalPositionOptions:[
          { code: 'top', name: '顶部' },
          { code: 'bottom', name: '底部' },
        ],
        layoutFrontOptions: [
          { code: 'vertical', name: '竖排' },
          { code: 'horizontal', name: '横排' },
        ],
        alignOptions: [
          {code: 'center', name: '居中'},
          {code: 'left', name: '左对齐'},
          {code: 'right', name: '右对齐'},
        ],
        piechartStyleOptions: [
          { code: 'shixin', name: '实心饼图' },
          { code: 'kongxin', name: '空心饼图' },
        ],
        dataOptions: [
          {code: 'staticData', name: '静态数据'},
          {code: 'dynamicData', name: '动态数据'},
        ],
        showStaticDialogFlag: false,
        showDynamicDialogFlag: false,
        // formData: {
        //   dataType: "dynamicData",
        //   refreshTime: 5000
        // },
        staticData: '',
        chartType: 'widget-piechart',
        dictKey: 'PIE_PROPERTIES',
        showDataFlag:false,
        setData:''
      }
    },
    methods:{
      changeColor(val, key) {
        this.selectedWidget.options.setup.customColor = val
      },
      changeData(val, key) {
        // console.log(val);
        // this.formData=val
        this.$set(this.formData, 'setCode', val.setCode);
        this.$set(this.formData, key, val);
        this.formData.staticData = this.selectedWidget.options.data.staticData
        this.selectedWidget.options.data = this.formData
        this.selectedWidget.options.data.dataType = 'dynamicData'
        console.log(this.formData);
        
      },
      editStaticData(){
        this.showStaticDialogFlag = true
      },
      dynamicData() {
        this.showDynamicDialogFlag = true
      },
      saveStaticData() {
        const codeHints = this.$refs.staticEditor.getEditorAnnotations()
        let syntaxErrorFlag = false
        if (!!codeHints && (codeHints.length > 0)) {
          codeHints.forEach((chItem) => {
            if (chItem.type === 'error') {
              syntaxErrorFlag = true
            }
          })

          if (syntaxErrorFlag) {
            this.$message.error(this.i18nt('designer.setting.syntaxCheckWarning'))
            return
          }
        }
        console.log(this.selectedWidget.options.data,"selectedWidget.options.data");
        this.selectedWidget.options.data.dataType = 'staticData'
        this.selectedWidget.options.data.staticData = JSON.parse(this.staticData)
        this.showStaticDialogFlag=false
      },
      //自定义配置
      editData(){
        this.setData = this.selectedWidget.options.setup.clickEvent
        this.showDataFlag=true
      },
      saveDataConversion(){
        const codeHints = this.$refs.ecEditor.getEditorAnnotations()       
        let syntaxErrorFlag = false
        if (!!codeHints && (codeHints.length > 0)) {
          codeHints.forEach((chItem) => {
            if (chItem.type === 'error') {
              syntaxErrorFlag = true
            }
          })

          if (syntaxErrorFlag) {
            this.$message.error(this.i18nt('designer.setting.syntaxCheckWarning'))
            this.setData = ''
            return
          }
        }  
        this.selectedWidget.options.setup.clickEvent =this.setData
        this.showDataFlag = false
      },
    },
    created(){
      this.staticData = JSON.stringify(this.selectedWidget.options.data.staticData)
      if(this.selectedWidget.options.data.dynamicData){
        this.formData = this.selectedWidget.options.data.dynamicData
      }else{
        this.formData = {
          dataType: "dynamicData",
          refreshTime: 5000
        }
      }
    }

  }
</script>

<style scoped>

</style>
