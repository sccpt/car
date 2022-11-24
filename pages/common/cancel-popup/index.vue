<!--
 * @Date: 2022-09-11 09:20:07
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-09-22 20:07:00
 * @FilePath: 任我行\pages\common\cancel-popup\index.vue
-->
<template>
  <u-popup :show="show" @close="close" round="32rpx" mode="bottom">
    <view class="cancle_pop_box">
      <view class="title">温馨提示</view>
      <view class="info">
        <view class="text">取消扣款</view>
        <view class="money">-10.00</view>
      </view>
      <view class="tips"
        >根据日常订单取消规则，距取车时间4小时（含）内，扣除订单金额30%作为违约金</view
      >
      <view class="footer">
        <view class="item">确定取消</view>
        <view class="item green" style="border: 0">暂不取消</view>
      </view>
    </view>
  </u-popup>
</template>

<script>
import props from "./props.js";
export default {
  mixins: [props],
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.cancle_pop_box {
  .title {
    color: rgba(51, 51, 51, 1);
    padding-top: 36rpx;
    padding-bottom: 40rpx;
    text-align: center;
    font-size: 36rpx;
  }
  .info {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      color: rgba(51, 51, 51, 1);
      font-size: 28rpx;
    }
    .money {
      font-size: 36rpx;
      font-weight: bold;
      margin-left: 16rpx;
    }
  }
  .tips {
    padding: 34rpx 36rpx 36rpx 36rpx;
    color: rgba(128, 128, 128, 1);
    font-size: 24rpx;
  }
  .footer {
    width: 100%;
    border-top: rgba(237, 237, 237, 1) 1px solid;
    display: flex;
    .item {
      height: 106rpx;
      line-height: 106rpx;
      text-align: center;
      flex: 1;
      font-size: 36rpx;
      border-right: rgba(237, 237, 237, 1) 1px solid;
    }
    .green {
      color: rgba(64, 200, 131, 1);
    }
  }
}
</style>
