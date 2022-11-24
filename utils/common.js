/*
 * @Date: 2022-08-25 11:40:02
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-30 22:34:31
 * @FilePath: 任我行\utils\common.js
 */
import { getToken } from './auth';
/**
* 显示消息提示框
* @param content 提示的标题
*/
export function toast(content) {
  uni.showToast({
    icon: 'none',
    title: content
  })
}

/**
* 用户是否登录
* @param show 是否显示提示框
*/
export function isLogin(show) {
  const token = getToken();
  if (token) {
    return true;
  }
  if (show) {
    showConfirm('您还未登录，请前往登录，体验更多功能！').then(res => {
      if (res.confirm) {
        uni.navigateTo({
          url: "/pages/login",
        });
      }
    })
  }
  return false;
}

/**
* 显示模态弹窗
* @param content 提示的标题
*/
export function showConfirm(content) {
  return new Promise((resolve, reject) => {
    uni.showModal({
      title: '提示',
      content: content,
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        resolve(res)
      }
    })
  })
}

/**
* 参数处理
* @param params 参数
*/
export function tansParams(params) {
  let result = ''
  for (const propName of Object.keys(params)) {
    const value = params[propName]
    var part = encodeURIComponent(propName) + "="
    if (value !== null && value !== "" && typeof (value) !== "undefined") {
      if (typeof value === 'object') {
        for (const key of Object.keys(value)) {
          if (value[key] !== null && value[key] !== "" && typeof (value[key]) !== 'undefined') {
            let params = propName + '[' + key + ']'
            var subPart = encodeURIComponent(params) + "="
            result += subPart + encodeURIComponent(value[key]) + "&"
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&"
      }
    }
  }
  return result
}