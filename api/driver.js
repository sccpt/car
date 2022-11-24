/*
 * @Date: 2022-09-20 19:41:20
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-04 11:04:42
 * @FilePath: 任我行\api\driver.js
 */
import request from '@/utils/request';

// 查询驾驶员
export function getDriver(params) {
  return request({
    url: '/app/driver/list',
    method: 'get',
    params
  })
}

// 新增驾驶员
export function addDriver(data) {
  return request({
    url: '/app/driver',
    method: 'post',
    header: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

// 修改驾驶员
export function editDriver(data) {
  return request({
    url: '/app/driver',
    method: 'put',
    header: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

// 删除驾驶员
export function delDriver(id) {
  return request({
    url: `/app/driver/${id}`,
    method: 'DELETE',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

// 设置默认驾驶员
export function setDefaultDriver(id) {
  return request({
    url: `/app/driver/setDefaultEmployeeDriverVO/${id}`,
    method: 'PUT',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

// 获取默认驾驶员
export function getDefaultDriver() {
  return request({
    url: `/app/driver/getDefaultEmployeeDriverVO`,
    method: 'get',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}