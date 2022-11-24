<!--
 * @Date: 2022-09-08 15:31:43
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-30 22:25:47
 * @FilePath: 任我行\pages\order\index.vue
-->
<template>
  <view class="order_i_box">
    <u-sticky bgColor="#fff">
      <u-tabs
        :list="tabsMenu"
        :scrollable="true"
        @click="handleTabs"
        :current="current"
        :activeStyle="{
          color: 'rgba(46, 46, 46, 1)',
          fontWeight: 'bold',
        }"
        lineColor="rgba(64, 200, 131, 1)"
        :itemStyle="{ paddingBottom: '20rpx', width: '150rpx' }"
      ></u-tabs>
    </u-sticky>
    <view class="list" v-if="dataList.length !== 0">
      <view
        class="item"
        v-for="(item, index) in dataList"
        :key="index"
        @click.stop="handleLink(item.orderGuid)"
      >
        <view class="title">
          <view class="text">{{ item.orderGuid }}</view>
          <view class="status">{{ backStatus(item.userOrderState) }}</view>
          <u-icon
            name="arrow-right"
            color="rgba(186, 186, 186, 1)"
            size="28rpx"
          ></u-icon>
        </view>
        <view class="car">
          <u--image
            :src="item.carImg || ''"
            width="188rpx"
            height="98rpx"
          ></u--image>
          <view class="info">
            <view class="text">
              <view class="name"
                >{{ item.brandName }} {{ item.seriesName }}</view
              >
              <view class="year">{{ item.yearType }}款</view>
            </view>
            <view class="des"
              >{{ item.categoryDesc || "" }} | {{ item.seatingNum || "" }}座 |
              {{ item.doorNum || "" }}门 | {{ item.gearTypeDesc || "" }} |
              {{ item.displacement || "" }}</view
            >
          </view>
        </view>
        <view class="backText">
          <view class="text">取车</view>
          <text>还车</text>
        </view>
        <view class="backTime">
          <view class="time">{{ formatDateTime(item.takeTime) }}</view>
          <view class="day">
            <view class="text"
              >{{ diffDay(item.takeTime, item.stillTime) }}天</view
            >
            <u--image
              src="/static/images/home/time.png"
              width="94rpx"
              height="8rpx"
            ></u--image>
          </view>
          <view class="time">{{ formatDateTime(item.stillTime) }}</view>
        </view>
        <view class="money">
          <view class="text">¥ {{ item.realTotalMoney || 0 }}</view>
          <view class="total">总额：</view>
        </view>
        <view class="more">
          <view
            class="green_btn"
            v-if="item.userOrderState == 1"
            @click.stop="handleLink(item.orderGuid)"
            >立即支付</view
          >
          <view
            class="gray_btn"
            v-if="item.userOrderState == 1"
            @click.stop="handleCancel(item.orderGuid)"
            >关闭订单</view
          >
          <view
            class="gray_btn"
            v-if="item.userOrderState == 2"
            @click.stop="handleCancel(item.orderGuid)"
            >取消订单</view
          >
          <view
            class="green_btn"
            v-if="item.userOrderState == 4"
            @click.stop="handleComment(item)"
            >发表评价</view
          >
        </view>
      </view>
      <view class="no_more">
        <u-loadmore :status="loadStatus" />
      </view>
    </view>
    <view class="noData" v-else>
      <u--image
        src="/static/icon_no_data.png"
        width="390rpx"
        height="390rpx"
      ></u--image>
      <view class="text">暂无数据</view>
    </view>
    <view class="o_popup">
      <pay-popup
        :show="showPay"
        @close="showPay = false"
        :orderInfo="{}"
      ></pay-popup>
    </view>
  </view>
</template>

<script>
import PayPopup from "../common/pay-popup";
import { getOrderList } from "@/api/order";
import moment from "moment";
moment.locale("zh-cn");
import { isLogin } from "@/utils/common";

export default {
  components: {
    PayPopup,
  },
  data() {
    return {
      tabsMenu: [
        {
          name: "全部",
        },
        {
          name: "待支付",
        },
        {
          name: "待取车",
        },
        {
          name: "已取车",
        },
        {
          name: "已完成",
        },
        {
          name: "已取消",
        },
      ],
      current: 0,
      showPay: false,
      pageNum: 1,
      pageSize: 10,
      dataList: [],
      loadStatus: "loadmore",
      isLoadMore: false,
    };
  },
  onShow() {
    if (isLogin(true)) {
      this.current = 0;
      this.pageNum = 1;
      this.dataList = [];
      this.loadStatus = "loadmore";
      this.isLoadMore = false;
      this.getData();
    }
  },
  methods: {
    handleCancel(orderGuid) {
      uni.showModal({
        title: "提示",
        content: "是否取消订单？",
        cancelText: "再等等",
        confirmText: "确定",
        success: (res) => {
          if (res.confirm) {
            uni.navigateTo({
              url: `/pages/order/cancel?orderGuid=${orderGuid}`,
            });
          }
        },
      });
    },
    formatDateTime(time) {
      return moment(time).format("MM月DD日 HH:mm");
    },
    diffDay(start, end) {
      const d1 = moment(start);
      const d2 = moment(end);
      return d2.diff(d1, "day");
    },
    backStatus(state) {
      switch (state) {
        case 1:
          return "待支付";
        case 2:
          return "待取车";
        case 3:
          return "已取车";
        case 4:
          return "已完成";
        case 5:
          return "已取消";
      }
    },
    handleLink(orderGuid) {
      this.$tab.navigateTo(`/pages/order/details?orderGuid=${orderGuid}`);
    },
    handleComment(row) {
      uni.navigateTo({
        url: `/pages/buy/comment?businessGuid=${row.businessGuid}&carGuid=${row.carGuid}&storeGuid=${row.storeGuid}`,
      });
    },
    getData() {
      let userOrderState = 0;
      const { current, pageNum, pageSize } = this;
      switch (current) {
        case 1:
          userOrderState = 1;
          break;
        case 2:
          userOrderState = 2;
          break;
        case 3:
          userOrderState = 3;
          break;
        case 4:
          userOrderState = 4;
          break;
        case 5:
          userOrderState = 5;
          break;

        default:
          userOrderState = 0;
          break;
      }
      uni.showLoading({
        title: "加载中",
      });
      const params = { pageNum, pageSize };
      if (userOrderState != 0) {
        params.userOrderState = userOrderState;
      }
      getOrderList(params).then((res) => {
        uni.hideLoading();
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
.order_i_box {
  .o_popup {
    position: absolute;
  }
  .list {
    padding-left: 24rpx;
    padding-right: 24rpx;
    padding-bottom: 24rpx;
    .item {
      padding: 32rpx;
      background: #fff;
      margin-top: 24rpx;
      border-radius: 20rpx;
      box-shadow: 0 0 10rpx 0 rgba(240, 240, 240, 0.5);
      .title {
        padding-bottom: 28rpx;
        padding-top: 4rpx;
        border-bottom: rgba(237, 237, 237, 1) 1px solid;
        display: flex;
        align-items: center;
        justify-content: center;
        .text {
          color: rgba(135, 139, 138, 1);
          font-size: 28rpx;
          flex: 1;
        }
        .status {
          margin-right: 18rpx;
          color: rgba(46, 46, 46, 1);
          font-size: 28rpx;
        }
      }
      .car {
        padding-top: 20rpx;
        padding-bottom: 20rpx;
        border-bottom: rgba(237, 237, 237, 1) 1px solid;
        display: flex;
        align-items: center;
        justify-content: center;
        .info {
          flex: 1;
          padding-left: 24rpx;
          display: flex;
          flex-direction: column;
          .text {
            display: flex;
            align-items: center;
            .name {
              color: rgba(46, 46, 46, 1);
              font-size: 28rpx;
            }
            .year {
              background: rgba(64, 200, 131, 1);
              border-radius: 6rpx;
              padding: 2rpx 6rpx 2rpx 6rpx;
              margin-left: 12rpx;
              font-size: 20rpx;
              color: #fff;
            }
          }
          .des {
            padding-top: 20rpx;
            color: rgba(135, 139, 138, 1);
            font-size: 24rpx;
          }
        }
      }
      .backText {
        padding-top: 28rpx;
        display: flex;
        color: rgba(135, 139, 138, 1);
        font-size: 20rpx;
        .text {
          flex: 1;
        }
      }
      .backTime {
        padding-top: 10rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        .time {
          color: rgba(46, 46, 46, 1);
          font-size: 32rpx;
        }
        .day {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .text {
            color: rgba(135, 139, 138, 1);
            font-size: 20rpx;
            padding-bottom: 4rpx;
          }
        }
      }
      .money {
        padding-top: 36rpx;
        display: flex;
        flex-direction: row-reverse;
        .total {
          color: rgba(46, 46, 46, 1);
          font-size: 28rpx;
        }
        .text {
          color: rgba(250, 67, 67, 1);
          font-size: 36rpx;
        }
      }
      .more {
        padding-top: 40rpx;
        display: flex;
        flex-direction: row-reverse;
        .green_btn,
        .gray_btn {
          width: 176rpx;
          height: 64rpx;
          border-radius: 8rpx;
          border: 1px solid rgba(64, 200, 131, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(64, 200, 131, 1);
          font-size: 28rpx;
          margin-left: 20rpx;
        }
        .gray_btn {
          border: 1px solid rgba(135, 139, 138, 0.5);
          color: rgba(135, 139, 138, 1);
          margin-left: 20rpx;
        }
      }
    }
  }
  .no_more {
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
