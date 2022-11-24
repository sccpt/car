/*
 * @Date: 2022-08-25 11:39:33
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-30 22:09:09
 * @FilePath: 任我行\permission.js
 */
import { getToken } from '@/utils/auth'

// 登录页面
const loginPage = "/pages/login"

// 页面白名单
const whiteList = [
  '/pages/index', '/pages/login', '/pages/common/webview/index'
]

// 检查地址白名单
function checkWhite(url) {
  const path = url.split('?')[0]
  return whiteList.indexOf(path) !== -1
}

// 页面跳转验证拦截器
let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"]
// list.forEach(item => {
//   uni.addInterceptor(item, {
//     invoke(to) {
//       if (getToken()) {
//         if (to.path === loginPage) {
//           uni.reLaunch({ url: "/" })
//         }
//         return true
//       } else {
//         if (checkWhite(to.url)) {
//           return true
//         }
//         uni.reLaunch({ url: loginPage })
//         return false
//       }
//     },
//     fail(err) {
//       console.log(err)
//     }
//   })
// })
