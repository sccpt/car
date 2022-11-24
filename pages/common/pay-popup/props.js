/*
 * @Date: 2022-09-08 21:34:27
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-23 08:38:27
 * @FilePath: 任我行\pages\common\pay-popup\props.js
 */
export default {
  props: {
    // 是否打开
    show: {
      type: Boolean,
      default: false
    },
    // 订单数据
    orderInfo: {
      type: Object,
      default: {},
    }
  }
}