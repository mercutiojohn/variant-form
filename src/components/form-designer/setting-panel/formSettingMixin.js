export default {
  inject:['request'],
  data() {
    return {
      swaggerApiList: []
    }
  },
  methods: {
    getSwaggerApi() {
      let _this = this;
      _this.interfaceList = [];
      _this.contentData = [];
      this.reqApi().then((response) => {
        // console.log('[getApi] Original', response)
        // console.log('[getApi] Parsed', this.parseResult(response.paths))
        this.swaggerApiList = this.parseResult(response.paths)
      }).catch((error) => {
        console.error(error)
      })
    },
    reqApi() {
      return this.request({
        url: "/v2/api-docs",
        method: "get"
      })
    },
    parseResult(jsonObj) {
      const resultArr = [];
    
      for (const url in jsonObj) {
        const urlObj = jsonObj[url];
    
        for (const method in urlObj) {
          const methodObj = urlObj[method];

          resultArr.push({
            url: this.replaceBraces(url),
            value: this.replaceBraces(url),
            method,
            summary: methodObj.summary,
            tags: methodObj.tags
          });
        }
      }
      return resultArr;
    },
    querySearch (queryString, cb) {
      // let results = this.swaggerApiList;
      // console.log("[querySearch]", results)
      let list = this.swaggerApiList;
      let results = queryString ? list.filter(this.createFilter(queryString)) : list;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (item) => {
        return (item.url.toLowerCase().indexOf(queryString.toLowerCase()) !== -1) || (item.summary.toLowerCase().indexOf(queryString.toLowerCase()) !== -1);
      };
    },
    replaceBraces (str) {
      const regex = /\{([^}]+)\}/g
      return str ? str.replace(regex, "${$1}") : ''
      // return str ? str.replace(regex, (_, match) => replacements[match]) : ''
    }
  }
}
