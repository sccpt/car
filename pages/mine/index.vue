<!--
 * @Date: 2022-08-25 11:40:00
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-30 22:27:30
 * @FilePath: 任我行\pages\mine\index.vue
-->
<template>
  <view class="m_box">
    <view class="header">
      <view class="pic">
        <u-image
          src="/static/images/my/header.png"
          width="750rpx"
          height="218rpx"
        ></u-image>
      </view>
      <view class="cont">
        <view class="icons">
          <u-image
            src="/static/images/my/set.png"
            width="52rpx"
            height="52rpx"
            @click="handleSetting"
          ></u-image>
          <view class="msg">
            <u-image
              src="/static/images/my/msg.png"
              width="52rpx"
              height="52rpx"
              @click="handleMsg"
            ></u-image>
            <view class="num" v-if="msgNumber">{{ msgNumber }}</view>
          </view>
        </view>
        <view class="avatar">
          <u-avatar :src="userInfo.avatar" size="96rpx"></u-avatar>
          <view class="name">{{ userInfo.name || "未知用户" }}</view>
          <u-image
            src="/static/images/my/edit.png"
            width="36rpx"
            height="36rpx"
            @click="handleEditInfo"
          ></u-image>
        </view>
      </view>
    </view>
    <view class="profile">
      <view class="bg">
        <u-image
          src="/static/images/my/top.png"
          width="750rpx"
          height="64rpx"
        ></u-image>
      </view>
      <view class="ziliao">
        <view class="text">个人资料</view>
        <view class="action" @click="handleEditInfo">
          <view class="t">去完善</view>
          <u-icon
            name="arrow-right"
            color="rgba(133, 133, 133, 1)"
            size="24rpx"
          ></u-icon>
        </view>
      </view>
    </view>
    <view class="service">
      <view class="title">常用服务</view>
      <view class="list">
        <view class="item" @click="handleVio">
          <u-image
            src="/static/images/my/search.png"
            width="80rpx"
            height="80rpx"
          ></u-image>
          <view class="text">违章查询</view>
        </view>
        <view class="item" @click="handleDri">
          <u-image
            src="/static/images/my/man.png"
            width="80rpx"
            height="80rpx"
          ></u-image>
          <view class="text">驾驶员管理</view>
        </view>
        <view class="item" @click="handleOrder">
          <u-image
            src="/static/images/my/buy.png"
            width="80rpx"
            height="80rpx"
          ></u-image>
          <view class="text">我的订单</view>
        </view>
      </view>
    </view>
    <view class="zhinan" @click="handleZhiNan">
      <view class="text">租车指南</view>
      <view class="car">
        <u-image
          src="/static/images/my/car.png"
          width="212rpx"
          height="89rpx"
        ></u-image>
      </view>
    </view>
  </view>
</template>

<script>
import { getCountMsg } from "@/api/message";
import { isLogin } from "@/utils/common";

export default {
  data() {
    return {
      userInfo: {},
      msgCount: {
        order: 0,
        msg: 0,
      },
    };
  },
  onShow() {
    if (isLogin()) {
      this.userInfo = this.$store.getters;
      this.getMsgNum(3);
      this.getMsgNum(4);
    }
  },
  methods: {
    getMsgNum(type) {
      getCountMsg({ type }).then((res) => {
        if (res.code === 200) {
          if (type === 3) {
            this.msgCount.order = res.data;
          } else {
            this.msgCount.msg = res.data;
          }
        }
      });
    },
    handleSetting() {
      if (isLogin(true)) {
        this.$tab.navigateTo(`/pages/mine/setting/index`);
      }
    },
    handleEditInfo() {
      if (isLogin(true)) {
        this.$tab.navigateTo(`/pages/mine/info/edit`);
      }
    },
    handleMsg() {
      if (isLogin(true)) {
        this.$tab.navigateTo(`/pages/message/index`);
      }
    },
    handleVio() {
      if (isLogin(true)) {
        this.$tab.navigateTo(`/pages/mine/violation/index`);
      }
    },
    handleDri() {
      if (isLogin(true)) {
        this.$tab.navigateTo(`/pages/mine/driver/index`);
      }
    },
    handleZhiNan() {
      this.$tab.navigateTo(`/pages/other/zhinan`);
    },
    handleOrder() {
      if (isLogin(true)) {
        this.$tab.reLaunch(`/pages/order/index`);
      }
    },
  },
  computed: {
    msgNumber() {
      const { msgCount } = this;
      return msgCount.order + msgCount.msg;
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f6f6f6;
}
.m_box {
  width: 100%;
  overflow: hidden;
  background: #f6f6f6;
  .header {
    width: 100%;
    height: 218rpx;
    position: relative;
    .cont {
      width: 100%;
      overflow: hidden;
      position: absolute;
      z-index: 99;
      left: 0;
      top: 0;
    }
    .icons {
      padding: 40rpx 30rpx 0 30rpx;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      .msg {
        position: relative;
        margin-right: 40rpx;
        .num {
          height: 24rpx;
          border-radius: 18rpx;
          background: rgba(255, 87, 51, 1);
          padding-left: 8rpx;
          padding-right: 8rpx;
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          right: -20rpx;
          top: -10rpx;
          z-index: 99;
          font-size: 18rpx;
          color: #fff;
        }
      }
    }
  }
  .pic {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
  }
  .avatar {
    padding-left: 32rpx;
    display: flex;
    align-items: center;
    .name {
      margin-left: 26rpx;
      font-size: 40rpx;
      color: #fff;
      margin-right: 20rpx;
    }
  }
  .profile {
    width: 100%;
    height: 64rpx;
    position: relative;
    .bg {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }
    .ziliao {
      width: 100%;
      height: 64rpx;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 20;
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        flex: 1;
        padding-left: 32rpx;
        color: rgba(56, 56, 56, 1);
        font-size: 24rpx;
      }
      .action {
        margin-right: 40rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        .t {
          font-size: 24rpx;
          color: rgba(133, 133, 133, 1);
          margin-right: 10rpx;
        }
      }
    }
  }
  .service {
    padding: 32rpx;
    background: #fff;
    margin-top: 24rpx;
    .title {
      padding-bottom: 28rpx;
      border-bottom: rgba(237, 237, 237, 1) 1px solid;
      color: rgba(56, 56, 56, 1);
      font-size: 28rpx;
    }
    .list {
      width: 100%;
      padding-top: 32rpx;
      display: flex;
      align-items: center;
      .item {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .text {
          padding-top: 8rpx;
          color: rgba(56, 56, 56, 1);
          font-size: 24rpx;
        }
      }
    }
  }
  .zhinan {
    width: 100%;
    height: 104rpx;
    background: rgba(255, 255, 232, 1);
    margin-top: 24rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      flex: 1;
      padding-left: 32rpx;
      color: rgba(46, 46, 46, 1);
      font-size: 36rpx;
    }
    .car {
      margin-right: 32rpx;
    }
  }
}
</style>
