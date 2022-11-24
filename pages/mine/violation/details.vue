<!--
 * @Date: 2022-09-07 16:06:26
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-06 20:33:13
 * @FilePath: 任我行\pages\mine\violation\details.vue
-->
<template>
  <view class="viod_box">
    <view class="list">
      <view class="item">
        <view class="text">违章订单号</view>
        <view class="info">{{ datas.orderNo || "" }}</view>
      </view>
      <view class="item">
        <view class="text">车牌号</view>
        <view class="info">{{ datas.carNo || "" }}</view>
      </view>
      <view class="item">
        <view class="text">违章时间</view>
        <view class="info">{{ datas.tiTime || "" }}</view>
      </view>
      <view class="item">
        <view class="text">违章地点</view>
        <view class="info">{{ datas.address || "" }}</view>
      </view>
    </view>
    <view class="list">
      <view class="item">
        <view class="text">违章行为</view>
        <view class="info">{{ datas.tiContent || "" }}</view>
      </view>
      <view class="item">
        <view class="text">罚分</view>
        <view class="info">{{ datas.punishFen || "" }}</view>
      </view>
      <view class="item">
        <view class="text">罚款</view>
        <view class="info">{{ datas.punishMoney || "" }}</view>
      </view>
    </view>
    <view class="list">
      <view class="item" style="border: 0">
        <view class="text">其他费用</view>
        <view class="info">{{ datas.otherMoney || "" }}</view>
      </view>
    </view>
    <view class="list">
      <view class="item" style="border: 0">
        <view class="text">合计</view>
        <view class="info">{{ datas.totalMoney || "" }}</view>
      </view>
    </view>
    <view class="list">
      <view class="pzText">违章凭证</view>
      <view class="pzPic">
        <view
          class="col"
          v-for="(item, index) in datas.pics"
          :key="index"
          @click="handlePreview(index)"
        >
          <u--image
            :src="item"
            width="180rpx"
            height="120rpx"
            radius="8rpx"
          ></u--image>
        </view>
      </view>
    </view>
    <view class="success">
      <text v-if="datas.state == 2">
        <text style="color: rgba(64, 200, 131, 1)">已处理</text>本次违章
      </text>
      <text v-else>
        <text style="color: rgba(255, 87, 51, 1)">未处理</text>本次违章
      </text>
      <u-icon
        name="checkbox-mark"
        color="rgba(64, 200, 131, 1)"
        size="32rpx"
        style="margin-right: 14rpx"
        v-if="datas.state == 2"
      ></u-icon>
      <u-icon
        name="error-circle"
        color="rgba(255, 87, 51, 1)"
        size="32rpx"
        style="margin-right: 14rpx"
        v-else
      ></u-icon>
    </view>
    <view class="contact" @click="handlePhone(datas.contactPhone)"
      >联系商家</view
    >
  </view>
</template>

<script>
import { getRecordDetail } from "@/api/violation";

export default {
  data() {
    return {
      datas: {},
    };
  },
  onLoad(options) {
    this.getData(options.id);
  },
  methods: {
    getData(id) {
      uni.showLoading({
        title: "加载中",
      });
      getRecordDetail(id).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          this.datas = res.data;
          const arr = res.data.imageUrl ? res.data.imageUrl.split(",") : [];
          this.datas.pics = arr;
        }
      });
    },
    handlePreview(current) {
      const { datas } = this;
      uni.previewImage({
        current,
        urls: datas.pics,
      });
    },
    handlePhone(phoneNumber) {
      uni.makePhoneCall({
        phoneNumber,
      });
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f6f6f6;
}
.viod_box {
  padding-bottom: 80rpx;
  .list {
    margin-top: 24rpx;
    background: #fff;
    padding-left: 32rpx;
    padding-right: 32rpx;
    .item {
      padding-bottom: 28rpx;
      padding-top: 28rpx;
      display: flex;
      border-bottom: rgba(237, 237, 237, 1) 1px solid;
      font-size: 28rpx;
      .text {
        width: 230rpx;
        color: rgba(112, 112, 112, 1);
      }
      .info {
        color: rgba(46, 46, 46, 1);
        flex: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .pzText {
      width: 100%;
      padding-top: 32rpx;
      font-size: 28rpx;
      color: rgba(112, 112, 112, 1);
    }
    .pzPic {
      padding-bottom: 32rpx;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .col {
        margin: 28rpx 28rpx 0 0;
      }
    }
  }
  .success {
    padding: 28rpx 32rpx 0 32rpx;
    font-size: 28rpx;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
  }
  .contact {
    width: 686rpx;
    height: 88rpx;
    border-radius: 12rpx;
    background: rgba(64, 200, 131, 1);
    border: 1px solid rgba(64, 200, 131, 1);
    line-height: 88rpx;
    text-align: center;
    font-size: 32rpx;
    color: #fff;
    margin-top: 80rpx;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
