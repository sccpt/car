/*
 * @Date: 2022-11-17 11:01:50
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-17 11:03:40
 * @FilePath: \小程序\api\pay.js
 */
import request from '@/utils/request';

// 支付宝
export function postAlipay(data) {
  return request({
    'url': '/api/pay/ali/crateTrade',
    'method': 'post',
    data,
  })
}