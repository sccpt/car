<!--
 * @Date: 2022-09-11 10:45:21
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-09-22 15:04:04
 * @FilePath: 任我行\pages\buy\business_bak.vue
-->
<template>
  <view class="car_busin_box" :style="{ height: boxHeight }">
    <view class="info">
      <view class="company">
        <u--image
          src="/static/images/profile.jpg"
          width="88rpx"
          height="88rpx"
          shape="circle"
        ></u--image>
        <view class="des">
          <view class="name">鹏捷租车</view>
          <view class="time">营业时间：周一至周五(09:00-20.00)</view>
        </view>
      </view>
      <view class="row">
        <u-icon
          name="phone"
          color="rgba(64, 200, 131, 1)"
          size="28rpx"
        ></u-icon>
        <view class="text green">联系电话</view>
        <view class="cont">173**** 7328</view>
      </view>
      <view class="row">
        <u-icon name="map" color="rgba(85, 160, 243, 1)" size="28rpx"></u-icon>
        <view class="text green">门店地址</view>
        <view class="cont">武侯区科华南路1366号附1165号</view>
      </view>
    </view>
    <scroll-view scroll-y="true" class="warp">
      <view class="title">
        <view class="text">用户评价</view>
        <view class="zh">综合</view>
        <view class="defen">4.6</view>
        <view class="fen">分</view>
        <view class="pl">50+条评论</view>
      </view>
      <view class="list">
        <view class="user">
          <u-avatar
            src="/static/images/profile.jpg"
            shape="circle"
            size="64rpx"
          ></u-avatar>
          <view class="info">
            <view class="phone">151**** 3290</view>
            <view class="time">2022-02-10 13:29</view>
          </view>
          <view class="num">5</view>
          <view class="fen">分</view>
        </view>
        <view class="cont">
          <view class="row">
            <view class="text">整体服务</view>
            <view class="rate">
              <u-rate
                :value="5"
                readonly
                size="34rpx"
                activeColor="rgba(255, 206, 28, 1)"
              ></u-rate>
            </view>
            <view class="num">5分</view>
          </view>
          <view class="row">
            <view class="text">车辆清洁</view>
            <view class="rate">
              <u-rate
                :value="5"
                readonly
                size="34rpx"
                activeColor="rgba(255, 206, 28, 1)"
              ></u-rate>
            </view>
            <view class="num">5分</view>
          </view>
          <view class="row">
            <view class="text">车辆硬件</view>
            <view class="rate">
              <u-rate
                :value="5"
                readonly
                size="34rpx"
                activeColor="rgba(255, 206, 28, 1)"
              ></u-rate>
            </view>
            <view class="num">5分</view>
          </view>
          <view class="row">
            <view class="text">取车便捷</view>
            <view class="rate">
              <u-rate
                :value="5"
                readonly
                size="34rpx"
                activeColor="rgba(255, 206, 28, 1)"
              ></u-rate>
            </view>
            <view class="num">5分</view>
          </view>
        </view>
      </view>
      <view class="list">
        <view class="user">
          <u-avatar
            src="/static/images/profile.jpg"
            shape="circle"
            size="64rpx"
          ></u-avatar>
          <view class="info">
            <view class="phone">151**** 3290</view>
            <view class="time">2022-02-10 13:29</view>
          </view>
          <view class="num">5</view>
          <view class="fen">分</view>
        </view>
        <view class="cont">
          <view class="row">
            <view class="text">整体服务</view>
            <view class="rate">
              <u-rate
                :value="5"
                readonly
                size="34rpx"
                activeColor="rgba(255, 206, 28, 1)"
              ></u-rate>
            </view>
            <view class="num">5分</view>
          </view>
          <view class="row">
            <view class="text">车辆清洁</view>
            <view class="rate">
              <u-rate
                :value="5"
                readonly
                size="34rpx"
                activeColor="rgba(255, 206, 28, 1)"
              ></u-rate>
            </view>
            <view class="num">5分</view>
          </view>
          <view class="row">
            <view class="text">车辆硬件</view>
            <view class="rate">
              <u-rate
                :value="5"
                readonly
                size="34rpx"
                activeColor="rgba(255, 206, 28, 1)"
              ></u-rate>
            </view>
            <view class="num">5分</view>
          </view>
          <view class="row">
            <view class="text">取车便捷</view>
            <view class="rate">
              <u-rate
                :value="5"
                readonly
                size="34rpx"
                activeColor="rgba(255, 206, 28, 1)"
              ></u-rate>
            </view>
            <view class="num">5分</view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    boxHeight() {
      let sys = uni.getSystemInfoSync();
      let winWidth = sys.windowWidth;
      let winrate = 750 / winWidth;
      let winHeight = parseInt(sys.windowHeight * winrate);
      return winHeight + "rpx";
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f6f6f6;
}
.car_busin_box {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .info {
    width: 100%;
    padding: 32rpx;
    background: #fff;
    .company {
      padding: 6rpx 0 36rpx 0;
      border-bottom: rgba(237, 237, 237, 1) 1px solid;
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
    }
    .des {
      padding-left: 24rpx;
      .name {
        color: rgba(46, 46, 46, 1);
        font-size: 36rpx;
        font-weight: bold;
      }
      .time {
        padding-top: 12rpx;
        color: rgba(135, 139, 138, 1);
        font-size: 24rpx;
      }
    }
    .row {
      width: 100%;
      display: flex;
      align-items: center;
      padding-top: 16rpx;
      padding-bottom: 16rpx;
      .text {
        margin-left: 14rpx;
        padding-left: 10rpx;
        padding-right: 10rpx;
        border-radius: 6rpx;
      }
      .green {
        background: rgba(225, 255, 244, 1);
        color: rgba(0, 173, 90, 1);
        font-size: 24rpx;
      }
      .blue {
        background: rgba(235, 246, 255, 1);
        color: rgba(85, 160, 243, 1);
      }
      .cont {
        margin-left: 12rpx;
        color: rgba(46, 46, 46, 1);
        font-size: 28rpx;
      }
    }
  }
  .warp {
    flex: 1;
    background: #fff;
    margin-top: 24rpx;
    padding: 32rpx;
    display: flex;
    flex-direction: column;
    .title {
      padding-top: 8rpx;
      display: flex;
      align-items: center;
      .text {
        color: rgba(46, 46, 46, 1);
        font-size: 32rpx;
        font-weight: bold;
      }
      .zh {
        padding-left: 32rpx;
        font-size: 28rpx;
      }
      .defen {
        padding-left: 6rpx;
        padding-right: 6rpx;
        color: rgba(46, 46, 46, 1);
        font-size: 36rpx;
        font-weight: bold;
      }
      .fen {
        font-size: 28rpx;
        flex: 1;
      }
      .pl {
        color: rgba(85, 160, 243, 1);
        font-size: 28rpx;
      }
    }
    .list {
      padding-top: 40rpx;
      padding-bottom: 48rpx;
      border-bottom: rgba(237, 237, 237, 1) 1px solid;
      .user {
        width: 100%;
        display: flex;
        align-items: center;
        .info {
          flex: 1;
          padding-left: 16rpx;
          .phone {
            color: rgba(46, 46, 46, 1);
            font-size: 28rpx;
          }
          .time {
            color: rgba(135, 139, 138, 1);
            font-size: 12rpx;
            padding-top: 6rpx;
          }
        }
        .num {
          color: rgba(46, 46, 46, 1);
          font-size: 36rpx;
          font-weight: bold;
        }
        .fen {
          color: rgba(46, 46, 46, 1);
          font-size: 28rpx;
        }
      }
      .cont {
        padding-left: 80rpx;
        .row {
          display: flex;
          align-items: center;
          padding-top: 16rpx;
          padding-bottom: 16rpx;
          .text {
            color: rgba(135, 139, 138, 1);
            font-size: 28rpx;
          }
          .rate {
            margin-left: 20rpx;
            flex: 1;
          }
          .num {
            color: rgba(135, 139, 138, 1);
            font-size: 28rpx;
          }
        }
      }
    }
  }
}
</style>
