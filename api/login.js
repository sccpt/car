/*
 * @Date: 2022-08-25 11:40:00
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-05 13:26:12
 * @FilePath: 任我行\api\login.js
 */
import request from '@/utils/request'

// 登录方法
export function login(data) {
  return request({
    'url': '/login',
    headers: {
      isToken: false
    },
    'method': 'post',
    data,
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    'url': '/app/user/getUserInfo',
    'method': 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    'url': '/logout',
    'method': 'post'
  })
}

// 获取验证码
export function sendSmsCaptcha(params) {
  return request({
    'url': '/captcha/sendSmsCaptcha',
    method: 'get',
    timeout: 20000,
    params
  })
}

// 抖音获取手机号
// #ifdef  MP-TOUTIAO
export function getDouYinPhone(data) {
  return request({
    url: '/other/login',
    method: 'post',
    data
  })
}
// #endif

// 支付宝获取手机号
// #ifdef  MP-ALIPAY
export function getAliPayPhone(data) {
  return request({
    url: '/other/login',
    method: 'post',
    data
  })
}
// #endif