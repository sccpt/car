<!--
 * @Date: 2022-08-26 21:56:34
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-06 13:08:56
 * @FilePath: 任我行\pages\message\index.vue
-->
<template>
  <view class="msg_box">
    <u-sticky bgColor="#fff">
      <u-tabs
        :list="tabs"
        lineColor="rgba(64, 200, 131, 1)"
        :current="current"
        :activeStyle="{
          color: 'rgba(46, 46, 46, 1)',
          fontWeight: 'bold',
        }"
        @click="handleTabs"
        :itemStyle="{ width: '375rpx', paddingBottom: '20rpx' }"
      ></u-tabs>
    </u-sticky>
    <view class="list">
      <view class="item" v-for="(item, index) in dataList" :key="index">
        <view class="title">
          <u--image
            src="/static/images/msg/order.png"
            width="40rpx"
            height="40rpx"
          ></u--image>
          <view class="text">{{ item.title }}</view>
          <view class="time">10:53</view>
        </view>
        <view class="info">{{ item.content }}</view>
        <view class="moreOrder">
          <view class="text">
            <text
              v-if="current == 0"
              @click="handleOrder(item.orderGuid, item.msgGuid)"
              >查看订单</text
            >
            <text v-else @click="handleMsg(item.msgGuid)">我已阅读</text>
            <u-icon
              name="arrow-right"
              color="rgba(186, 186, 186, 1)"
              size="28rpx"
            ></u-icon>
          </view>
        </view>
      </view>
      <view class="more" v-if="dataList.length !== 0">
        <u-loadmore :status="loadStatus" />
      </view>
    </view>
    <view class="noData" v-if="dataList.length === 0">
      <u--image
        src="/static/icon_no_data.png"
        width="390rpx"
        height="390rpx"
      ></u--image>
      <view class="text">暂无数据</view>
    </view>
  </view>
</template>

<script>
import { getMessagePage, readOverMsg, getCountMsg } from "@/api/message";

export default {
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      dataList: [],
      loadStatus: "loadmore",
      isLoadMore: false,
      current: 0,
      tabs: [
        {
          name: "订单通知",
          badge: {
            value: 0,
          },
        },
        {
          name: "消息通知",
          badge: {
            value: 0,
          },
        },
      ],
    };
  },
  onLoad(options) {
    this.getData();
  },
  onShow() {
    this.getMsgNum(3);
    this.getMsgNum(4);
  },
  onReachBottom() {
    if (!this.isLoadMore) {
      this.isLoadMore = true;
      this.pageNum += 1;
      this.getData();
      this.loadStatus = "loading";
    }
  },
  methods: {
    getMsgNum(type) {
      getCountMsg({ type }).then((res) => {
        if (res.code === 200) {
          if (type === 3) {
            this.tabs[0].badge.value = res.data;
          } else {
            this.tabs[1].badge.value = res.data;
          }
        }
      });
    },
    handleOrder(orderGuid, id) {
      this.handleMsg(id);
      setTimeout(() => {
        uni.navigateTo({
          url: `/pages/order/details?orderGuid=${orderGuid}`,
        });
      }, 500);
    },
    handleMsg(id) {
      uni.showLoading({
        title: "加载中",
      });
      readOverMsg(id).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          this.getData();
          uni.showToast({ title: res.msg || "成功", icon: "none" });
        }
      });
    },
    getData() {
      const { pageNum, pageSize, current } = this;
      let type = 3;
      if (current) {
        type = 4;
      }
      getMessagePage({ pageNum, pageSize, type }).then((res) => {
        if (res.code === 200) {
          if (res.data && res.data.records) {
            this.dataList = this.dataList.concat(res.data.records);
            if (res.data.records.length < pageSize) {
              this.isLoadMore = true;
              this.loadStatus = "nomore";
            } else {
              this.isLoadMore = false;
              this.loadStatus = "loadmore";
            }
          } else {
            this.isLoadMore = true;
            this.loadStatus = "nomore";
          }
        } else {
          uni.showToast({ title: res.msg, icon: "none" });
          this.isLoadMore = false;
          this.loadStatus = "loadmore";
          if (this.pageNum > 1) {
            this.pageNum -= 1;
          }
        }
      });
    },
    handleTabs(e) {
      this.current = e.index;
      this.pageNum = 1;
      this.dataList = [];
      this.loadStatus = "loadmore";
      this.isLoadMore = false;
      this.getData();
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f6f6f6;
}
.msg_box {
  .list {
    .item {
      background: #fff;
      padding: 32rpx;
      margin-top: 6rpx;
      margin-bottom: 20rpx;
      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        .text {
          color: rgba(46, 46, 46, 1);
          font-size: 32rpx;
          flex: 1;
          padding-left: 10rpx;
        }
        .time {
          color: rgba(112, 112, 112, 1);
          font-size: 24rpx;
        }
      }
      .info {
        padding-top: 28rpx;
        line-height: 40rpx;
        color: rgba(112, 112, 112, 1);
        font-size: 28rpx;
      }
      .moreOrder {
        padding-top: 24rpx;
        display: flex;
        flex-direction: row-reverse;
        .text {
          color: rgba(85, 160, 243, 1);
          font-size: 28rpx;
          display: flex;
        }
      }
    }
  }
  .more {
    padding: 30rpx;
  }
  .noData {
    height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .text {
      font-size: 28rpx;
      padding-top: 50rpx;
      color: #808080;
    }
  }
}
</style>
