/*
 * @Date: 2022-10-05 13:30:52
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-19 22:14:52
 * @FilePath: \小程序\api\order.js
 */
import request from '@/utils/request';

// 查询订单列表
export function getOrderList(params) {
  return request({
    url: '/app/order/listPage',
    method: 'get',
    params
  })
}

// 添加订单
export function addOrder(params) {
  return request({
    url: '/app/order/add',
    method: 'get',
    params
  })
}

// 取消订单
export function cancelOrder(params) {
  return request({
    url: '/app/order/cancel',
    method: 'get',
    params
  })
}

// 查询订单车型信息
export function getCarInfo(id) {
  return request({
    url: `/app/order/getCarInfo/${id}`,
    method: 'get',
  })
}

// 查询订单详情
export function getOrderDetail(params) {
  return request({
    url: '/app/order/getOrderDetail',
    method: 'get',
    params
  })
}

// 查询订单服务费信息
export function getPriceInfo(id) {
  return request({
    url: `/app/order/getPriceInfo/${id}`,
    method: 'get',
  })
}

// 查询订单门店信息
export function getStoreInfo(params) {
  return request({
    url: `/app/order/getStoreInfo`,
    method: 'get',
    params,
  })
}

// 费用计算
export function costCarPrice(params) {
  return request({
    url: `/app/order/costPrice`,
    method: 'get',
    params,
  })
}

// 查询门店政策
export function getStorePolicy(params) {
  return request({
    url: `/app/order/getStorePolicy`,
    method: 'get',
    params,
  })
}