/*
 * @Date: 2022-09-11 17:26:06
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-08 09:56:07
 * @FilePath: 任我行\api\city.js
 */
import request from '@/utils/request';
import { tansParams } from '@/utils/common';

// 经纬度转地理位置
export function getAmapPlace(params) {
  return request({
    baseUrl: `https://restapi.amap.com/v3/geocode/regeo?${tansParams(params)}`,
    method: 'get',
  })
}

// 获取热门城市
export function getHotCityList(params) {
  return request({
    url: '/app/area/hotCityList',
    method: 'get',
    params
  })
}

// 根据城市名查城市
export function getSelectCity(cityName) {
  return request({
    url: `/app/area/selectCity/${cityName}`,
    method: 'get',
  })
}

// 查询城市列表
export function getAreaList(params) {
  return request({
    url: '/app/area/list',
    method: 'get',
    params
  })
}

// 查询城市地点
export function selectPlace(params) {
  return request({
    url: '/app/area/selectPlace',
    method: 'get',
    params
  })
}

// 查询火车站汽车站飞机场
export function selectPoiPlace(params) {
  return request({
    url: `/app/area/selectPoiPlace/${params.cityName}`,
    method: 'get',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })
}

// 搜索POI
export function seachPlace(params) {
  return request({
    baseUrl: `https://restapi.amap.com/v3/place/text?${tansParams(params)}`,
    method: 'get',
  })
}