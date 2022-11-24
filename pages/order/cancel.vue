<!--
 * @Date: 2022-09-11 10:06:32
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-19 10:10:35
 * @FilePath: 任我行\pages\order\cancel.vue
-->
<template>
  <view class="order_cancle_box">
    <view class="title">
      <view class="text">取消原因</view>
      <view class="des">请告知我们取消原因，我们在努力改进中</view>
    </view>
    <u-radio-group v-model="value" iconPlacement="right" placement="column">
      <u-radio
        activeColor="rgba(64, 200, 131, 1)"
        :customStyle="{ marginBottom: '30rpx' }"
        v-for="(item, index) in radiolist"
        :key="index"
        :label="item.name"
        :name="item.name"
      ></u-radio>
    </u-radio-group>
    <u--textarea
      v-model="reason"
      placeholder="请您输入其他原因"
      class="textarea"
    ></u--textarea>
    <view class="footer">
      <view class="cancel" @click="handleBack">暂不取消</view>
      <view class="ok" @click="handleCancel">确定取消</view>
    </view>
  </view>
</template>

<script>
import { cancelOrder } from "@/api/order";

export default {
  data() {
    return {
      value: "",
      reason: "",
      orderGuid: "",
      radiolist: [
        {
          name: "行程改变/不想租了",
        },
        {
          name: "订单信息错误",
        },
        {
          name: "更换车型",
        },
        {
          name: "免押失败",
        },
        {
          name: "门店原因无法用车",
        },
        {
          name: "取车证件不符合要求",
        },
        {
          name: "没用/错用/少用优惠",
        },
        {
          name: "其他",
        },
      ],
    };
  },
  onLoad(options) {
    this.orderGuid = options.orderGuid;
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
    handleCancel() {
      const { orderGuid, value, reason } = this;
      if (!value && !reason) {
        uni.showToast({
          title: "请选择或输入取消原因",
          icon: "none",
        });
        return;
      }
      uni.showLoading({
        title: "提交中",
      });
      cancelOrder({ orderGuid, reason: value || reason }).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          uni.showToast({
            title: res.msg || "成功",
            icon: "none",
          });
          setTimeout(() => {
            uni.navigateBack();
          }, 1000);
        } else {
          uni.showToast({
            title: res.msg || "失败",
            icon: "none",
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
page {
  background: #ffffff;
}
.order_cancle_box {
  padding: 32rpx 32rpx 100rpx 32rpx;
  .title {
    padding-top: 20rpx;
    padding-bottom: 40rpx;
    .text {
      color: rgba(46, 46, 46, 1);
      font-size: 36rpx;
      padding-bottom: 24rpx;
    }
    .des {
      color: rgba(135, 139, 138, 1);
      font-size: 24rpx;
    }
  }
  .textarea {
    border-radius: 16rpx;
    background: #f1f1f1;
  }
  .footer {
    width: 100%;
    height: 140rpx;
    background: rgba(255, 255, 255, 1);
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: #f1f1f1 1px solid;
    .ok,
    .cancel {
      width: 332rpx;
      height: 88rpx;
      border-radius: 12rpx;
      background: rgba(64, 200, 131, 1);
      border: 1px solid rgba(64, 200, 131, 1);
      line-height: 88rpx;
      text-align: center;
      color: #fff;
      font-size: 32rpx;
      margin-left: 12rpx;
      margin-right: 12rpx;
    }
    .cancel {
      background: #fff;
      color: rgba(64, 200, 131, 1);
    }
  }
}
</style>
