
import axios from 'axios'
import { Message } from 'element-ui'

axios.defaults.withCredentials = true
// 创建一个错误
function errorCreat(msg) {
  const err = new Error(msg)
  errorLog(err)
  throw err
}
// 记录和显示错误
function errorLog(err) {

  // 打印到控制台
  console.error('>>>>>> Error >>>>>>')
  console.log(err)
  Message({
    message: err.message,
    type: 'error',
    showClose: true,
    duration: 2 * 1000
  })
}

// 创建一个成功信息
function successCreat(msg) {
  const err = new Error(msg)
  successLog(err)
  // throw err
}

// 记录和显示成功信息
function successLog(err) {
  // 显示提示
  Message({
    message: err.message,
    type: 'success',
    showClose: true,
    duration: 3 * 1000
  })
}
// 创建一个成功信息
function infoCreat(msg) {
  const err = new Error(msg)
  infoLog(err)
  // throw err
}

// 记录和显示成功信息
function infoLog(err) {
  // 显示提示
  Message({
    message: err.message,
    type: 'info',
    showClose: true,
    duration: 3 * 1000
  })
}

// 创建一个成功信息
function warningCreat(msg) {
  const err = new Error(msg)
  warningLog(err)
  // throw err
}
// 记录和显示成功信息
function warningLog(err) {
  // 显示提示
  Message({
    message: err.message,
    showClose: true,
    type: 'warning',
    duration: 3 * 1000
  })
}

// 创建一个 axios 实例
const axiosInstance = axios.create({
  baseURL: '/api',
  timeout: 600000, // 请求超时时间
  withCredentials: true
})

function doHandle(config) {

  config.params = {
    _time: Date.parse(new Date()) / 1000,
    ...config.params
  }
  if (!/^https:\/\/|http:\/\//.test(config.url)) {
    let token = ''
    if(localStorage.getItem('userInfo')){
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      token = userInfo.token
    } else {
      // token = util.cookies.get('X-Token')
    }

    // 在token刷新时，会自己放一个名为X-Token的header，此处判断一下，不能覆盖
    if (token && !config.headers['X-Token']) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers['X-Token'] = token
    }
  }
  return config
}

createRequestInterceptor()
// 请求拦截器
function createRequestInterceptor() {
  const requestInterceptor = axiosInstance.interceptors.request.use(
    config => {
      return doHandle(config)
    },
    error => {
      // 发送失败
      console.log(error)
      Promise.reject(error)
    }
  )
}
// 响应拦截器
axiosInstance.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    // 这个状态码是和后端约定的
    const { code } = dataAxios
    const { msg } = dataAxios
    var data = {}
    if (dataAxios.data != null) {
      data = dataAxios.data
    }
    const result = {
      "status": code,
      "msg": dataAxios.message,
      "data": data
    }
    // 根据 code 进行判断
    if (code === undefined) {
      // 如果没有 code 代表这不是项目后端开发的接口 比如可能是 D2Admin 请求最新版本
      // successCreat(`${dataAxios.msg}`)

      return dataAxios
    } else {
      // 有 code 代表这是一个后端接口 可以进行进一步的判断
      switch (code) {
        case 'amis-success':
          if (msg !== null && msg !== '') {
            // successCreat(`${dataAxios.msg}`)
          }
          return {
            ...result,
            status: 0
          }
        case 'amis-error':
          if (msg !== null && msg !== '') {
            errorCreat(`${dataAxios.msg}`)
          }
          return {
            ...result,
            status: 1
          }
        case 0:
          if (msg !== null && msg !== '') {
            successCreat(`${dataAxios.msg}`)
          }
          return dataAxios.data
        case 'success':
          if (msg !== null && msg !== '') {
            successCreat(`${dataAxios.msg}`)
          }
          return dataAxios
        case null:
          // [ 示例 ] code === 0 代表没有错误
          // successCreat(`${dataAxios.msg}`)
          return dataAxios
        case '':
          return dataAxios
        case 'error':
          errorCreat(`错误： ${dataAxios.msg}`)
          break
        // [ 示例 ] code === 0 代表没有错误
        //  return dataAxios
        case 'warning':
          // [ 示例 ] code === 0 代表没有错误
          warningCreat(`警告： ${dataAxios.msg}`)
          return dataAxios
        case 'info':
          // [ 示例 ] code === 0 代表没有错误
          // eslint-disable-next-line no-tabs
          infoCreat(`提示： ${dataAxios.msg}`)
          return dataAxios
        case 'NOAUTH':
          // errorCreat(`${dataAxios.code} ${dataAxios.msg}`) 去掉NOAUTH 提示
          // [ 示例 ] code === 0 代表没有错误
          errorCreat(`登录超时，请重新登录`)
        // eslint-disable-next-line no-fallthrough
        case 'NOPERMISSION':
          return dataAxios
        case 'xxx':
          // [ 示例 ] 其它和后台约定的 code
          errorCreat(`[ code: xxx ] ${dataAxios.msg}`)
          break
        default:
          // 不是正确的 code
          errorCreat(`${dataAxios.code} ${dataAxios.msg}`)
          break
      }
    }
  },
  error => {
    errorLog(error)
    return Promise.reject(error)
  }
)

export default axiosInstance
