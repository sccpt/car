/*
 * @Date: 2022-08-25 11:40:00
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-09-16 15:28:21
 * @FilePath: 任我行\api\system\user.js
 */
import upload from '@/utils/upload'
import request from '@/utils/request'

// 用户密码重置
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

// 查询用户个人信息
export function getUserProfile() {
  return request({
    url: '/app/user/getUserInfo',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/app/user',
    method: 'put',
    header: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: data
  })
}

// 用户头像上传
export function uploadAvatar(data) {
  return upload({
    url: '/common/oss/upload',
    name: data.name || '',
    filePath: data.filePath
  })
}
