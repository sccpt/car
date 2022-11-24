/*
 * @Date: 2022-10-02 15:20:54
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-03 12:01:04
 * @FilePath: 任我行\api\car.js
 */
import request from '@/utils/request';

// 获取车型列表
export function getCarList(params) {
  return request({
    'url': '/app/car/carInfo/listPage',
    method: 'get',
    params
  });
}

// 获取车辆分类
export function getCarListMenu(params) {
  return request({
    'url': '/app/car/carInfo/getAllCarInfo',
    method: 'get',
    params
  });
}

// 查询车辆品牌
export function getCarBrand(params) {
  return request({
    'url': '/app/car/carInfo/getBrandList',
    method: 'get',
    params
  });
}

// 查询数据字典
export function getDictType(dictType) {
  return request({
    'url': `/app/dict/getInfo/${dictType}`,
    method: 'get',
  });
}

// 查询租车公司
export function getCarDept(params) {
  return request({
    'url': `/app/car/carInfo/getDept`,
    method: 'get',
    params,
  });
}

// 查询竞价列表
export function getCarPriceList(params) {
  return request({
    'url': `/app/car/carInfo/lisBusinessPage`,
    method: 'get',
    params,
  });
}
