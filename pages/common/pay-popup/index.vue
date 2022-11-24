<!--
 * @Date: 2022-09-08 21:33:36
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-19 22:48:16
 * @FilePath: \小程序\pages\common\pay-popup\index.vue
-->
<template>
  <u-popup
    :show="show"
    @close="close"
    round="32rpx"
    mode="bottom"
    :zIndex="99"
    :overlayStyle="{ 'z-index': 90 }"
  >
    <view class="pay_pop_box">
      <view class="title">支付</view>
      <view class="close" @click="close">
        <u-icon name="close" color="rgba(78, 89, 105, 1)" size="32rpx"></u-icon>
      </view>
      <view class="money">
        <view class="unit">¥</view>
        <view class="number">{{ orderInfo.realTotalMoney || 0 }}</view>
      </view>
      <view class="service">预付租金（含保障服务）</view>
      <view class="time">请于 {{ orderInfo.payTime || "" }} 前完成支付</view>
      <!-- #ifdef MP-ALIPAY -->
      <view class="pay_pop_list">
        <u-icon
          name="zhifubao-circle-fill"
          color="rgba(0, 160, 233, 1)"
          size="48rpx"
        ></u-icon>
        <view class="text">支付宝支付</view>
      </view>
      <!-- #endif -->
      <!-- #ifndef MP-ALIPAY -->
      <view class="pay_pop_list" @click.stop="switchChange('zhifubao')">
        <u-icon
          name="zhifubao-circle-fill"
          color="rgba(0, 160, 233, 1)"
          size="48rpx"
        ></u-icon>
        <view class="text">支付宝支付</view>
        <u-switch
          v-model="pay.zhifubao"
          @change="switchChange('zhifubao')"
        ></u-switch>
      </view>
      <view class="pay_pop_list" @click.stop="switchChange('weixin')">
        <u-icon
          name="weixin-circle-fill"
          color="rgba(64, 200, 131, 1)"
          size="48rpx"
        ></u-icon>
        <view class="text">微信支付</view>
        <u-switch
          v-model="pay.weixin"
          @change="switchChange('weixin')"
        ></u-switch>
      </view>
      <!-- #endif -->
      <view class="pay_pop_footer">
        <view class="submit" @click="handlePay">确定支付</view>
      </view>
    </view>
  </u-popup>
</template>

<script>
import props from "./props.js";
import { postAlipay } from "@/api/pay";

export default {
  mixins: [props],
  data() {
    return {
      pay: {
        zhifubao: true,
        weixin: false,
      },
    };
  },
  methods: {
    close() {
      uni.showModal({
        title: "系统提示",
        content: "您还未完成支付，请确认要取消支付？",
        cancelText: "取消支付",
        confirmText: "继续支付",
        success: (res) => {
          if (res.cancel) {
            const { orderInfo } = this;
            uni.redirectTo({
              url: `/pages/order/details?orderGuid=${orderInfo.orderGuid}`,
            });
          }
        },
      });
      // this.$emit("close");
    },
    handlePay() {
      const { pay, orderInfo } = this;
      const that = this;
      // #ifdef MP-ALIPAY
      const buyerId = uni.getStorageSync("authCode");
      uni.showLoading({
        title: "加载中",
      });
      postAlipay({
        buyerId,
        outTradeNo: orderInfo.orderGuid,
        subject: "租车费用",
        totalAmount: orderInfo.realTotalMoney,
      }).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          uni.requestPayment({
            provider: "alipay",
            orderInfo: res.data,
            success(res) {
              that.$modal.msgSuccess("支付成功");
              setTimeout(() => {
                const { orderInfo } = that;
                uni.redirectTo({
                  url: `/pages/order/details?orderGuid=${orderInfo.orderGuid}`,
                });
              }, 1000);
            },
            fail(e) {
              that.$modal.msgError("支付失败");
              setTimeout(() => {
                const { orderInfo } = that;
                uni.redirectTo({
                  url: `/pages/order/details?orderGuid=${orderInfo.orderGuid}`,
                });
              }, 1000);
            },
          });
        }
      });
      // #endif
      // #ifdef MP-TOUTIAO
      let service = 4;
      if (pay.zhifubao) {
        service = 4;
      } else {
        service = 3;
      }
      uni.showLoading({
        title: "加载中",
      });
      postAlipay({
        buyerId,
        outTradeNo: orderInfo.orderGuid,
        subject: "租车费用",
        totalAmount: orderInfo.realTotalMoney,
      }).then((res) => {
        if (res.code === 200) {
          uni.hideLoading();
          uni.requestPayment({
            provider: "toutiao",
            orderInfo: res.data,
            service,
            success(res) {
              that.$modal.msgSuccess("支付成功");
              setTimeout(() => {
                const { orderInfo } = that;
                uni.redirectTo({
                  url: `/pages/order/details?orderGuid=${orderInfo.orderGuid}`,
                });
              }, 1000);
            },
            fail(e) {
              that.$modal.msgError("支付失败");
              setTimeout(() => {
                const { orderInfo } = that;
                uni.redirectTo({
                  url: `/pages/order/details?orderGuid=${orderInfo.orderGuid}`,
                });
              }, 1000);
            },
          });
        }
      });
      // #endif
      // #ifndef MP-TOUTIAO || MP-ALIPAY
      that.$modal.msg("当前平台不支持支付功能！");
      // #endif
    },
    switchChange(index) {
      const { pay } = this;
      for (const key in pay) {
        if (key == index) {
          this.pay[key] = true;
        } else {
          this.pay[key] = false;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.pay_pop_box {
  position: relative;
  .title {
    width: 100%;
    line-height: 110rpx;
    text-align: center;
    color: rgba(46, 46, 46, 1);
    font-size: 36rpx;
  }
  .close {
    position: absolute;
    top: 44rpx;
    right: 40rpx;
    z-index: 20;
  }
  .money {
    padding-top: 84rpx;
    padding-bottom: 84rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .unit {
      color: rgba(112, 112, 112, 1);
      font-size: 32rpx;
    }
    .number {
      color: rgba(46, 46, 46, 1);
      font-size: 88rpx;
    }
  }
  .service {
    color: rgba(128, 128, 128, 1);
    font-size: 28rpx;
    padding-bottom: 28rpx;
    text-align: center;
  }
  .time {
    color: rgba(64, 200, 131, 1);
    font-size: 24rpx;
    padding-bottom: 70rpx;
    text-align: center;
  }
  .pay_pop_list {
    padding: 0 32rpx 40rpx 32rpx;
    display: flex;
    align-items: center;
    .text {
      color: rgba(51, 51, 51, 1);
      font-size: 28rpx;
      margin-left: 16rpx;
      flex: 1;
    }
  }
  .pay_pop_footer {
    border-top: #f1f1f1 1px solid;
    overflow: hidden;
    padding: 24rpx 32rpx 24rpx 32rpx;
    .submit {
      width: 100%;
      height: 96rpx;
      border-radius: 12rpx;
      background: rgba(64, 200, 131, 1);
      line-height: 96rpx;
      text-align: center;
      color: #fff;
      font-size: 36rpx;
    }
  }
}
</style>
