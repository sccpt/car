/*
 * @Date: 2022-09-16 11:29:05
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-09-16 11:31:45
 * @FilePath: 任我行\utils\city.js
 */
const key = 'App-City'

export function getLogCity() {
  return uni.getStorageSync(key)
}

export function setLogCity(token) {
  return uni.setStorageSync(key, token)
}

export function removeLogCity() {
  return uni.removeStorageSync(key)
}
