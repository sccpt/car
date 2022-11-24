/*
 * @Date: 2022-10-04 10:23:56
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-05 16:44:45
 * @FilePath: 任我行\api\message.js
 */
import request from '@/utils/request';

// 查询消息列表
export function getMessagePage(params) {
  return request({
    url: '/app/advertisement/getAdvertisementByType',
    method: 'get',
    params
  })
}

// 阅读消息状态修改
export function readOverMsg(id) {
  return request({
    url: `/app/msg/readOver/${id}`,
    method: 'get',
  })
}

// 查询统计数
export function getCountMsg(params) {
  return request({
    url: `/app/msg/countMsg`,
    method: 'get',
    params,
  })
}