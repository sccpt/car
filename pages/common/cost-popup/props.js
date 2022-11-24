/*
 * @Date: 2022-09-11 09:35:23
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-21 20:07:17
 * @FilePath: 任我行\pages\common\cost-popup\props.js
 */
export default {
  props: {
    // 是否打开
    show: {
      type: Boolean,
      default: false
    },
    // 是否显示总计数
    showTotal: {
      type: Boolean,
      default: false
    },
    // 明细
    costPrice: {
      type: Object,
      default: {}
    }
  }
}