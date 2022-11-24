/*
 * @Date: 2022-08-25 11:40:00
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-09-16 15:37:08
 * @FilePath: 任我行\store\modules\user.js
 */
import config from '@/config'
import storage from '@/utils/storage'
import constant from '@/utils/constant'
import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const baseUrl = config.baseUrl

const user = {
  state: {
    token: getToken(),
    name: storage.get(constant.name),
    avatar: storage.get(constant.avatar),
    roles: storage.get(constant.roles),
    permissions: storage.get(constant.permissions)
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
      storage.set(constant.name, name)
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
      storage.set(constant.avatar, avatar)
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
      storage.set(constant.roles, roles)
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
      storage.set(constant.permissions, permissions)
    }
  },

  actions: {
    // 登录
    Login({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(res => {
          if (res.code === 200) {
            setToken(res.token)
            commit('SET_TOKEN', res.token)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          // if (res.roles && res.roles.length > 0) {
          //   commit('SET_ROLES', res.roles)
          //   commit('SET_PERMISSIONS', res.permissions)
          // } else {
          //   commit('SET_ROLES', ['ROLE_DEFAULT'])
          // }
          if (res.code === 200) {
            commit('SET_NAME', res.data.nickName)
            commit('SET_AVATAR', res.data.avatar)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_PERMISSIONS', [])
          removeToken()
          storage.clean()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
