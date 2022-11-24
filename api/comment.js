/*
 * @Date: 2022-10-05 21:32:48
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-31 16:36:32
 * @FilePath: 任我行\api\comment.js
 */
import request from '@/utils/request';

// 发表评价
export function addComment(data) {
  return request({
    url: '/app/store/comment',
    method: 'post',
    header: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

// 评价分页列表
export function getCommentPage(params) {
  return request({
    url: '/app/store/comment/list',
    method: 'get',
    params,
  })
}

