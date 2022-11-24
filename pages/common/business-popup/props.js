/*
 * @Date: 2022-09-17 15:10:58
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-31 16:58:18
 * @FilePath: 任我行\pages\common\business-popup\props.js
 */
export default {
  props: {
    // 是否打开
    show: {
      type: Boolean,
      default: false
    },
    businessGuid: {
      type: String,
      default: '',
    },
    carinfoGuid: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    storeGuid: {
      type: String,
      default: '',
    },
    commentData: {
      type: Object,
      default: {},
    }
  }
}