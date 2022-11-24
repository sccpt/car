<!--
 * @Date: 2022-08-25 11:40:00
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-23 09:45:00
 * @FilePath: \开源代码\pages\login.vue
-->
<template>
  <view class="login_box" :style="{ height: scrollH }">
    <view class="title">任我行</view>
    <view class="cont">
      <view class="button" @click="handlePhone">手机号登录/注册</view>
      <!-- #ifdef MP-ALIPAY -->
      <view class="auth">
        <view class="text">支付宝授权登录</view>
        <button
          open-type="getPhoneNumber"
          @getphonenumber="onGetAuthorize"
          type="default"
          scope="phoneNumber"
          class="btn"
        >
          <u-image
            src="/static/images/order/zhifubao.png"
            width="122rpx"
            height="122rpx"
            mode="aspectFit"
            class="pic"
          ></u-image>
        </button>
      </view>
      <!-- #endif -->
      <!-- #ifdef MP-TOUTIAO -->
      <view class="auth">
        <view class="text">抖音授权登录</view>
        <button
          open-type="getPhoneNumber"
          @getphonenumber="getPhoneNumberHandler"
          type="default"
          class="btn"
        >
          <u-image
            src="/static/douyin.png"
            width="122rpx"
            height="122rpx"
          ></u-image>
        </button>
      </view>
      <!-- #endif -->
    </view>
    <view class="treaty">
      <u-checkbox-group v-model="treaty" placement="row" shape="circle">
        <u-checkbox :name="1" activeColor="rgba(64, 200, 131, 1)"></u-checkbox>
      </u-checkbox-group>
      <view class="text">
        已阅读并同意
        <text class="a" @click="handleLink('/pages/other/xieyi')"
          >《用户协议》</text
        >
        与
        <text class="a" @click="handleLink('/pages/other/zhengce')"
          >《隐私政策》</text
        >
      </view>
    </view>
    <view class="popup">
      <login-popup :show="showLogin" @close="showLogin = false"></login-popup>
    </view>
  </view>
</template>

<script>
import LoginPopup from "./common/login-popup";
import { getAliPayPhone } from "@/api/login";
import { getToken, setToken } from "@/utils/auth";

export default {
  components: {
    LoginPopup,
  },
  data() {
    return {
      treaty: [],
      showLogin: false,
    };
  },
  onShow() {
    // #ifdef  MP-TOUTIAO
    tt.login({
      force: true,
      success(res) {
        console.log(`login 调用成功${res.code} ${res.anonymousCode}`);
      },
      fail(res) {
        console.log(`login 调用失败`);
      },
    });
    // #endif
    // this.checkLogin();
  },
  methods: {
    checkLogin() {
      if (getToken()) {
        this.$tab.reLaunch("/pages/index");
      }
    },
    handlePhone() {
      const { treaty } = this;
      if (treaty.length !== 0) {
        this.showLogin = true;
      } else {
        this.$modal.msg("请先阅读《用户协议》和《隐私政策》并勾选同意");
      }
    },
    handleLink(url) {
      uni.navigateTo({ url });
    },
    loginSuccess(result) {
      this.$store.dispatch("GetInfo").then((res) => {
        if (res.code === 200) {
          const pages = getCurrentPages();
          if (pages.length === 1) {
            uni.switchTab({
              url: "/pages/index",
            });
          } else {
            uni.navigateBack();
          }
        } else {
          this.$modal.msg(res.msg || "失败");
        }
      });
    },
    // #ifdef  MP-ALIPAY
    onGetAuthorize(res) {
      const { treaty } = this;
      if (treaty.length === 0) {
        this.$modal.msg("请先阅读《用户协议》和《隐私政策》并勾选同意");
        return;
      }
      my.getPhoneNumber({
        success: (res) => {
          uni.showLoading({
            title: "授权中",
          });
          const encryptedData = res.response;
          getAliPayPhone({ response: encryptedData, type: 2 }).then((res) => {
            uni.hideLoading();
            if (res.code === 200) {
              setToken(res.msg);
              this.$store.commit("SET_TOKEN", res.msg);
              this.loginSuccess();
            }
          });
        },
        fail: (res) => {
          console.log(res);
        },
      });
    },
    // #endif
    // #ifdef  MP-TOUTIAO
    getPhoneNumberHandler(e) {
      const { treaty } = this;
      if (treaty.length === 0) {
        this.$modal.msg("请先阅读《用户协议》和《隐私政策》并勾选同意");
        return;
      }
      uni.showLoading({
        title: "授权中",
      });
      const encryptedData = e.detail.encryptedData;
      const iv = e.detail.iv;
      getAliPayPhone({ response: encryptedData, iv, type: 3 }).then((res) => {
        uni.hideLoading();
        console.log(res);
      });
    },
    // #endif
  },
  computed: {
    scrollH: function () {
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
  background: #fff;
}
.login_box {
  display: flex;
  flex-direction: column;
  .popup {
    position: absolute;
  }
  .title {
    padding: 88rpx 0 0 72rpx;
    color: rgba(56, 56, 56, 1);
    font-size: 56rpx;
    font-weight: bold;
  }
  .cont {
    flex: 1;
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .button {
    width: 490rpx;
    height: 88rpx;
    border-radius: 12rpx;
    background: rgba(64, 200, 131, 1);
    border: 1px solid rgba(64, 200, 131, 1);
    line-height: 88rpx;
    text-align: center;
    font-size: 32rpx;
    color: #fff;
  }
  .auth {
    padding-top: 124rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    .text {
      color: rgba(130, 130, 130, 1);
      font-size: 28rpx;
      padding-bottom: 40rpx;
    }
    .pic {
      margin-top: 40rpx;
    }
    .btn {
      border: 0 !important;
      background: none;
      padding: 0;
      margin: 0;
      height: 122rpx;
      &::after {
        border: 0 !important;
      }
    }
  }
  .treaty {
    padding: 0 0 88rpx 72rpx;
    display: flex;
    align-items: center;
    .text {
      color: rgba(56, 56, 56, 1);
      font-size: 28rpx;
      margin-left: 12rpx;
      .a {
        color: rgba(85, 160, 243, 1);
        display: inline;
      }
    }
  }
}
</style>
