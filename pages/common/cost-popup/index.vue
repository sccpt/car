<!--
 * @Date: 2022-09-11 09:35:17
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-14 15:17:58
 * @FilePath: \小程序\pages\common\cost-popup\index.vue
-->
<template>
  <u-popup :show="show" @close="close" round="32rpx" mode="bottom">
    <view class="cost_pop_box">
      <view class="title">费用明细</view>
      <view class="close" @click="close">
        <u-icon name="close" color="rgba(78, 89, 105, 1)" size="32rpx"></u-icon>
      </view>
      <view class="cont">
        <view class="item">
          <view class="text">车辆租金</view>
          <view class="day"
            >¥{{ costPrice.carPriceForDay || 0 }}×{{
              costPrice.days || 0
            }}天</view
          >
          <view class="money">¥{{ costPrice.carPriceSum || 0 }}</view>
        </view>
        <u-line color="rgba(237, 237, 237, 1)"></u-line>
        <view class="item">
          <view class="text">服务费/手续费</view>
        </view>
        <view class="item">
          <view class="text gray">手续费</view>
          <view class="money">¥{{ costPrice.carPrepareFee || 0 }}</view>
        </view>
        <view class="item" v-if="costPrice.otherStoreFreeMoney">
          <view class="text gray">异店取还车服务费</view>
          <view class="money">¥{{ costPrice.otherStoreFreeMoney || 0 }}</view>
        </view>
        <view class="item" v-if="costPrice.stillCarMoney">
          <view class="text gray">还车上门费用</view>
          <view class="money">¥{{ costPrice.stillCarMoney || 0 }}</view>
        </view>
        <view class="item" v-if="costPrice.takeCarMoney">
          <view class="text gray">取车上门费用</view>
          <view class="money">¥{{ costPrice.takeCarMoney || 0 }}</view>
        </view>
        <view class="item" v-if="costPrice.isChangeChildren == 1">
          <view class="text gray">儿童座椅费</view>
          <view class="day"
            >¥{{ costPrice.childrenFeeForDay || 0 }}/个×{{
              costPrice.days || 0
            }}天×{{ costPrice.childrenMakeNum || 0 }}个</view
          >
          <view class="money">¥{{ costPrice.childrenFeeSum || 0 }}</view>
        </view>
        <u-line color="rgba(237, 237, 237, 1)"></u-line>
        <view class="item">
          <view class="text">租车保障</view>
        </view>
        <view class="item">
          <view class="text">基础服务费</view>
          <view class="day"
            >¥{{ costPrice.basicFeeForDay || 0 }}×{{
              costPrice.days || 0
            }}天</view
          >
          <view class="money">¥{{ costPrice.basicFeeSum || 0 }}</view>
        </view>
        <view class="item" v-if="costPrice.isChangeEnjoy">
          <view class="text">尊享服务费</view>
          <view class="day"
            >¥{{ costPrice.enjoyFeeForDay || 0 }}×{{
              costPrice.days || 0
            }}天</view
          >
          <view class="money">¥{{ costPrice.enjoyFeeSum || 0 }}</view>
        </view>
        <u-line color="rgba(237, 237, 237, 1)"></u-line>
        <view class="item">
          <view class="total">合计</view>
          <view class="money" style="font-size: 36rpx"
            >¥{{ costPrice.realTotalMoney || 0 }}</view
          >
        </view>
        <!-- <view class="item">
          <view class="total">优惠</view>
          <view class="money">-¥63</view>
        </view> -->
        <template v-if="showTotal">
          <u-line color="rgba(237, 237, 237, 1)"></u-line>
          <view class="item">
            <view class="text">合计</view>
            <view class="day red">优惠后</view>
            <view class="money">¥{{ costPrice.realTotalMoney || 0 }}</view>
          </view>
        </template>
        <view v-else style="height: 140rpx"></view>
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
.cost_pop_box {
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
  .cont {
    padding: 32rpx;
    .item {
      height: 88rpx;
      line-height: 88rpx;
      display: flex;
      align-items: center;
      font-size: 28rpx;
      .text {
        flex: 1;
      }
      .day {
        color: rgba(128, 128, 128, 1);
        margin-right: 20rpx;
      }
      .money {
        color: rgba(250, 67, 67, 1);
      }
      .gray {
        color: rgba(128, 128, 128, 1);
      }
      .red {
        color: rgba(250, 67, 67, 1) !important;
      }
      .total {
        flex: 1;
        text-align: right;
        padding-right: 24rpx;
      }
    }
  }
}
</style>
