/*
 * @Date: 2022-10-03 19:18:31
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-03 20:28:02
 * @FilePath: 任我行\pages\common\edit-place-popup\props.js
 */
export default {
  props: {
    // 是否打开
    show: {
      type: Boolean,
      default: false
    },
    // 取还车地点
    checkAddress: {
      ype: Object,
      default: {},
    },
    // 是否异地还车
    backCar: {
      type: Boolean,
      default: false
    }
  }
}