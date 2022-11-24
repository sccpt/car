/*
 * @Date: 2022-09-16 09:50:37
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-30 20:55:51
 * @FilePath: 任我行\api\home.js
 */
import request from '@/utils/request';

// 获取广告列表
export function getAdvertisementByType(params) {
  return request({
    url: '/app/advertisement/getAdvertisementByType',
    method: 'get',
    params
  })
}

// 查询用户授权免押，无记录则没有授权
export function isGantZhiMa(params) {
  return request({
    url: '/app/alipay/isGantZhiMa',
    method: 'get',
    params
  })
}

// 押金冻结
export function depositFreeze(data) {
  return request({
    url: '/app/alipay/depositFreeze',
    method: 'post',
    data
  })
}

// 押金解冻
export function unFreeze(data) {
  return request({
    url: '/app/alipay/unFreeze',
    method: 'post',
    data
  })
}