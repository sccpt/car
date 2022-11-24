/*
 * @Date: 2022-09-29 09:41:28
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-03 14:56:27
 * @FilePath: 任我行\api\violation.js
 */
import request from '@/utils/request';

// 查询违章记录列表
export function getVioList(params) {
  return request({
    url: '/app/car/breakRuleRecord/listPage',
    method: 'get',
    params
  })
}

// 查询违章记录详情
export function getRecordDetail(id) {
  return request({
    url: `/app/car/breakRuleRecord/getRecordDetail/${id}`,
    method: 'get',
  })
}

// 查询违章记录列表
export function getDamList(params) {
  return request({
    url: '/app/car/lossRecord/listPage',
    method: 'get',
    params
  })
}

// 查询违章记录详情
export function getDamDetail(id) {
  return request({
    url: `/app/car/lossRecord/getRecordDetail/${id}`,
    method: 'get',
  })
}
