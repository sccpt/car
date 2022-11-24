/*
 * @Date: 2022-09-12 16:59:27
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-19 21:57:10
 * @FilePath: \小程序\pages\common\offer-popup\props.js
 */
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    offer: {
      type: Object,
      default: {}
    },
    carinfoGuid: {
      type: String,
      default: '',
    },
    params: {
      type: Object,
      default: {}
    },
    isOtherAddress: {
      type: Boolean,
      default: false
    }
  }
}