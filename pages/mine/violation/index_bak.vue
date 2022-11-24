<!--
 * @Date: 2022-09-07 15:24:44
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-09-21 22:41:02
 * @FilePath: 任我行\pages\mine\violation\index_bak.vue
-->
<template>
  <view class="minb_box">
    <view class="list">
      <view class="item">
        <view class="title">
          <view class="text">鹏捷租车 373708322865414274</view>
          <u-icon
            name="arrow-right"
            color="rgba(186, 186, 186, 1)"
            size="28rpx"
          ></u-icon>
        </view>
        <view class="car">
          <u--image
            src="..//static/images/profile.jpg"
            width="188rpx"
            height="98rpx"
          ></u--image>
          <view class="info">
            <view class="text">
              <view class="name">雪弗兰 科沃兹</view>
              <view class="year">2019款</view>
            </view>
            <view class="des">经济型 | 5座 | 4门 | 自动挡 | 1.0T</view>
          </view>
        </view>
        <view class="backText">
          <view class="text">取车</view>
          <text>还车</text>
        </view>
        <view class="backTime">
          <view class="time">02月18日 10:00</view>
          <view class="day">
            <view class="text">2天</view>
            <u--image
              src="..//static/images/home/time.png"
              width="94rpx"
              height="8rpx"
            ></u--image>
          </view>
          <view class="time">02月18日 10:00</view>
        </view>
        <view class="money">
          <view class="text">¥275</view>
          <view class="total">总额：</view>
        </view>
        <view class="more">
          <view class="btn" @click="handleLink">违章查询</view>
        </view>
      </view>
      <view class="item">
        <view class="title">
          <view class="text">鹏捷租车 373708322865414274</view>
          <u-icon
            name="arrow-right"
            color="rgba(186, 186, 186, 1)"
            size="28rpx"
          ></u-icon>
        </view>
        <view class="car">
          <u--image
            src="..//static/images/profile.jpg"
            width="188rpx"
            height="98rpx"
          ></u--image>
          <view class="info">
            <view class="text">
              <view class="name">雪弗兰 科沃兹</view>
              <view class="year">2019款</view>
            </view>
            <view class="des">经济型 | 5座 | 4门 | 自动挡 | 1.0T</view>
          </view>
        </view>
        <view class="backText">
          <view class="text">取车</view>
          <text>还车</text>
        </view>
        <view class="backTime">
          <view class="time">02月18日 10:00</view>
          <view class="day">
            <view class="text">2天</view>
            <u--image
              src="..//static/images/home/time.png"
              width="94rpx"
              height="8rpx"
            ></u--image>
          </view>
          <view class="time">02月18日 10:00</view>
        </view>
        <view class="money">
          <view class="text">¥275</view>
          <view class="total">总额：</view>
        </view>
        <view class="more">
          <view class="btn" @click="handleLink">违章查询</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleLink() {
      this.$tab.navigateTo(`/pages/mine/violation/details`);
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f6f6f6;
}
.minb_box {
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
        .btn {
          width: 176rpx;
          height: 64rpx;
          border-radius: 8rpx;
          border: 1px solid rgba(64, 200, 131, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(64, 200, 131, 1);
          font-size: 28rpx;
        }
      }
    }
  }
}
</style>
