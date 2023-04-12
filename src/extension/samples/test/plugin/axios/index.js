import axios from 'axios'

// 创建一个 axios 实例
const axiosInstance = axios.create({
  baseURL: process.env.VUE_APP_CONTEXT_PATH + process.env.VUE_APP_API_PATH,
  timeout: 600000, // 请求超时时间
  withCredentials: true
})
export default axiosInstance
