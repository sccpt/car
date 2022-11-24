/*
 * @Date: 2022-10-21 10:09:31
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-21 10:10:38
 * @FilePath: 任我行\api\notice.js
 */
import request from '@/utils/request';

// 根据类型查询公告，3隐私政策 4用户租车协议
export function getNoticeData(type) {
  return request({
    url: `/app/notice/getInfo/${type}`,
    method: 'get',
  })
}