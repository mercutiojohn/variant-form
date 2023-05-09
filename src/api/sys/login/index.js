import request from '@/plugin/axios'
// import Qs from 'qs'
/**
 * @description 登录
 * @param {Object} data username {String} 用户账号
 * @param {Object} data password {String} 密码
 * @param {Object} data route {Object} 登录成功后定向的路由对象
 */
export function AccountLogin(data) {
    return request({
        url: '/rbac/login/signIn',
        method: 'post',
        data
        // headers: {
        //   username: data['username']
        // }
    })
}