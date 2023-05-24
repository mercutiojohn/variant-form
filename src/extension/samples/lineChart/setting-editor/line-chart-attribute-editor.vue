<template>
  <div>
    <el-form-item label="背景颜色" label-width="110px">
      <el-color-picker
        v-model="selectedWidget.options.setup.background"
        show-alpha
        size="mini"
      />
    </el-form-item>
    <el-form-item label="折线图高度" label-width="110px">
      <el-input-number
            size="mini"
            style="width:100%"
            v-model.trim="selectedWidget.options.position.height"
            controls-position="right"
            :max="9999"
            :min="200"
          />
    </el-form-item>
    <el-collapse>
      <el-collapse-item title="折线设置">
        <el-form-item label="标记点" label-width="110px">
          <el-switch
            v-model="selectedWidget.options.setup.markPoint"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="点大小" label-width="110px">
          <el-slider
            v-model="selectedWidget.options.setup.pointSize"
            :min="1"
            :max="100"
          />
        </el-form-item>
        <el-form-item label="点样式" label-width="110px">
          <el-select
            size="mini"
            v-model="selectedWidget.options.setup.symbol"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="itemChild in symbolOptions"
              :key="itemChild.code"
              :label="itemChild.name"
              :value="itemChild.code"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="平滑曲线" label-width="110px">
          <el-switch
            v-model="selectedWidget.options.setup.smoothCurve"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="面积堆积" label-width="110px">
          <el-switch
            v-model="selectedWidget.options.setup.area"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="面积厚度" label-width="110px">
          <el-slider
            v-model="selectedWidget.options.setup.areaThickness"
            :min="0"
            :max="50"
          />
        </el-form-item>
        <el-form-item label="线条宽度" label-width="110px">
          <el-slider
            v-model="selectedWidget.options.setup.lineWidth"
            :min="0"
            :max="50"
          />
        </el-form-item>
      </el-collapse-item>
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
      <el-collapse-item title="X轴设置">
        <el-form-item label="显示" label-width="110px">
          <el-switch
            v-model="selectedWidget.options.setup.hideX"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="坐标名" label-width="110px">
          <el-input
            v-model.trim="selectedWidget.options.setup.nameX"
            type="text"
            size="mini"
            placeholder="请输入内容"
            clearable
          />
        </el-form-item>
        <el-form-item label="坐标名颜色" label-width="110px">
          <el-color-picker
            v-model="selectedWidget.options.setup.nameColorX"
            show-alpha
            size="mini"
          />
        </el-form-item>
        <el-form-item label="坐标名字号" label-width="110px">
          <el-input-number
            size="mini"
            style="width:100%"
            v-model.trim="selectedWidget.options.setup.nameFontSizeX"
            controls-position="right"
            :max="9999"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="数值颜色" label-width="110px">
          <el-color-picker
            v-model="selectedWidget.options.setup.colorX"
            show-alpha
            size="mini"
          />
        </el-form-item>
        <el-form-item label="数值字号" label-width="110px">
          <el-input-number
            size="mini"
            style="width:100%"
            v-model.trim="selectedWidget.options.setup.fontSizeX"
            controls-position="right"
            :max="9999"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="数值间隔" label-width="110px">
          <el-input-number
            size="mini"
            style="width:100%"
            v-model.trim="selectedWidget.options.setup.textInterval"
            controls-position="right"
            :max="9999"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="数值角度" label-width="110px">
          <el-slider
            v-model="selectedWidget.options.setup.textAngleX"
            :min="0"
            :max="100"
          />
        </el-form-item>
        <el-form-item label="坐标轴反转" label-width="110px">
          <el-switch
            v-model="selectedWidget.options.setup.reversalX"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="坐标轴颜色" label-width="110px">
          <el-color-picker
            v-model="selectedWidget.options.setup.lineColorX"
            show-alpha
            size="mini"
          />
        </el-form-item>
        <el-form-item label="坐标轴宽度" label-width="110px">
          <el-input-number
            size="mini"
            style="width:100%"
            v-model.trim="selectedWidget.options.setup.lineWidthX"
            controls-position="right"
            :max="9999"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="分割线显示" label-width="110px">
          <el-switch
            v-model="selectedWidget.options.setup.isShowSplitLineX"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="分割线颜色" label-width="110px">
          <el-color-picker
            v-model="selectedWidget.options.setup.splitLineColorX"
            show-alpha
            size="mini"
          />
        </el-form-item>
        <el-form-item label="分割线宽度" label-width="110px">
          <el-input-number
            size="mini"
            style="width:100%"
            v-model.trim="selectedWidget.options.setup.splitLineWidthX"
            controls-position="right"
            :max="9999"
            :min="0"
          />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="Y轴设置">
        <el-form-item label="显示" label-width="110px">
          <el-switch
            v-model="selectedWidget.options.setup.hideY"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="坐标名" label-width="110px">
          <el-input
            v-model.trim="selectedWidget.options.setup.nameY"
            type="text"
            size="mini"
            placeholder="请输入内容"
            clearable
          />
        </el-form-item>
        <el-form-item label="坐标名颜色" label-width="110px">
          <el-color-picker
            v-model="selectedWidget.options.setup.nameColorY"
            show-alpha
            size="mini"
          />
        </el-form-item>
        <el-form-item label="坐标名字号" label-width="110px">
          <el-input-number
            size="mini"
            style="width:100%"
            v-model.trim="selectedWidget.options.setup.nameFontSizeY"
            controls-position="right"
            :max="9999"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="数值颜色" label-width="110px">
          <el-color-picker
            v-model="selectedWidget.options.setup.colorY"
            show-alpha
            size="mini"
          />
        </el-form-item>
        <el-form-item label="数值字号" label-width="110px">
          <el-input-number
            size="mini"
            style="width:100%"
            v-model.trim="selectedWidget.options.setup.fontSizeY"
            controls-position="right"
            :max="9999"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="缩放" label-width="110px">
          <el-switch
            v-model="selectedWidget.options.setup.scale"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="均分" label-width="110px">
          <el-input-number
            size="mini"
            style="width:100%"
            v-model.trim="selectedWidget.options.setup.splitNumberY"
            controls-position="right"
            :max="9999"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="数值角度" label-width="110px">
          <el-slider
            v-model="selectedWidget.options.setup.textAngleY"
            :min="0"
            :max="100"
          />
        </el-form-item>
        <el-form-item label="坐标轴反转" label-width="110px">
          <el-switch
            v-model="selectedWidget.options.setup.reversalY"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="坐标轴颜色" label-width="110px">
          <el-color-picker
            v-model="selectedWidget.options.setup.lineColorY"
            show-alpha
            size="mini"
          />
        </el-form-item>
        <el-form-item label="坐标轴宽度" label-width="110px">
          <el-input-number
            size="mini"
            style="width:100%"
            v-model.trim="selectedWidget.options.setup.lineWidthY"
            controls-position="right"
            :max="9999"
            :min="0"
          />
        </el-form-item>
        <el-form-item label="分割线显示" label-width="110px">
          <el-switch
            v-model="selectedWidget.options.setup.isShowSplitLineY"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="分割线颜色" label-width="110px">
          <el-color-picker
            v-model="selectedWidget.options.setup.splitLineColorY"
            show-alpha
            size="mini"
          />
        </el-form-item>
        <el-form-item label="分割线宽度" label-width="110px">
          <el-input-number
            size="mini"
            style="width:100%"
            v-model.trim="selectedWidget.options.setup.splitLineWidthY"
            controls-position="right"
            :max="9999"
            :min="0"
          />
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="数值设置">
        <el-form-item label="显示" label-width="110px">
          <el-switch
            v-model="selectedWidget.options.setup.isShow"
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
      <el-collapse-item title="坐标轴边距设置">
        <el-form-item label="左边距(像素)" label-width="110px">
          <el-slider
            v-model="selectedWidget.options.setup.marginLeft"
            :min="1"
            :max="100"
          />
        </el-form-item>
        <el-form-item label="顶边距(像素)" label-width="110px">
          <el-slider
            v-model="selectedWidget.options.setup.marginTop"
            :min="0"
            :max="50"
          />
        </el-form-item>
        <el-form-item label="右边距(像素)" label-width="110px">
          <el-slider
            v-model="selectedWidget.options.setup.marginRight"
            :min="1"
            :max="100"
          />
        </el-form-item>
        <el-form-item label="底边距(像素)" label-width="110px">
          <el-slider
            v-model="selectedWidget.options.setup.marginBottom"
            :min="0"
            :max="50"
          />
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
    name: "line-chart-attribute-editor",
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
        alignOptions: [
          {code: 'center', name: '居中'},
          {code: 'left', name: '左对齐'},
          {code: 'right', name: '右对齐'},
        ],
        symbolOptions: [
          {code: 'circle', name: '实心点'},
          {code: 'emptyCircle', name: '空心点'},
        ],
        dataOptions: [
          {code: 'staticData', name: '静态数据'},
          {code: 'dynamicData', name: '动态数据'},
        ],
        showStaticDialogFlag: false,
        showDynamicDialogFlag: false,
        formData: {
          dataType: "dynamicData",
          refreshTime: 5000
        },
        staticData: '',
        chartType: 'widget-barchart',
        dictKey: 'BAR_PROPERTIES'
      }
    },
    methods:{
      changeColor(val, key) {
        this.selectedWidget.options.setup.customColor = val
      },
      changeData(val, key) {
        this.$set(this.formData, key, val);
        this.formData.staticData = this.selectedWidget.options.data.staticData
        this.selectedWidget.options.data = this.formData
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
      }
    },
    created(){
      this.staticData = JSON.stringify(this.selectedWidget.options.data.staticData)
      if(this.selectedWidget.options.data.dynamicData){
        this.formData = this.selectedWidget.options.data.dynamicData
      }
      
    }

  }
</script>

<style scoped>

</style>
