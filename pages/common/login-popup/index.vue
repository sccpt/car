<!--
 * @Date: 2022-09-09 17:55:15
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-18 11:25:36
 * @FilePath: \小程序\pages\common\login-popup\index.vue
-->
<template>
  <u-popup :show="show" @close="close" round="32rpx" mode="bottom">
    <view class="login_pop_box">
      <view class="login_pop_title">短信验证码登录</view>
      <view class="login_pop_close" @click="close">
        <u-icon name="close" color="rgba(78, 89, 105, 1)" size="32rpx"></u-icon>
      </view>
      <view class="login_pop_cont">
        <view class="login_pop_item">
          <u--input
            placeholder="请输入手机号"
            border="none"
            @input="
              (e) => {
                form.phone = e;
              }
            "
            maxlength="11"
            type="number"
            class="login_pop_input"
          ></u--input>
        </view>
        <view class="login_pop_item">
          <view class="login_pop_input">
            <input
              @input="
                (e) => {
                  form.code = e.detail.value;
                }
              "
              class="login_pop_input_text"
              placeholder="请输入验证码"
              placeholder-style="color:rgb(192, 196, 204); font-size:30rpx"
            />
          </view>
          <view class="login_pop_code">
            <u-code
              ref="uCode"
              @change="codeChange"
              seconds="60"
              changeText="X秒重新获取"
            ></u-code>
            <u-button
              @click="getCode"
              :text="tips"
              color="rgba(51, 51, 51, 1)"
              size="mini"
            ></u-button>
          </view>
        </view>
      </view>
      <view class="login_pop_footer">
        <view class="login_pop_submit" @click="handleSubmit">登录</view>
      </view>
    </view>
  </u-popup>
</template>

<script>
import props from "./props.js";
import { sendSmsCaptcha, login } from "@/api/login";

export default {
  mixins: [props],
  data() {
    return {
      tips: "",
      form: {
        phone: "",
        code: "",
        uuid: "",
      },
    };
  },
  methods: {
    onKeyInput(e) {
      console.log(e);
    },
    codeChange(text) {
      this.tips = text;
    },
    close() {
      this.$emit("close");
      this.form = {
        phone: "",
        code: "",
        uuid: "",
      };
    },
    handleSubmit() {
      const { form } = this;
      console.log(form);
      if (!form.phone) {
        uni.$u.toast("请输入手机号");
        return;
      }
      if (!form.code) {
        uni.$u.toast("请输入验证码");
        return;
      }
      if (!form.uuid) {
        uni.$u.toast("验证码失效，请重新获取");
        return;
      }
      uni.showLoading({
        title: "登录中",
      });
      this.$store
        .dispatch("Login", { ...form, type: 1, username: form.phone })
        .then((res) => {
          uni.hideLoading();
          if (res.code === 200) {
            this.loginSuccess();
          } else {
            this.$modal.msg(res.msg || "失败");
          }
        })
        .catch(() => {
          uni.hideLoading();
        });
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
    getCode() {
      const { form } = this;
      const regex = /^1[3456789]\d{9}$/;
      if (!regex.test(form.phone)) {
        this.$modal.msg("请输入正确手机号码");
        return;
      }
      if (this.$refs.uCode.canGetCode) {
        uni.showLoading({
          title: "正在获取验证码",
        });
        sendSmsCaptcha({ "/telephone": form.phone }).then((res) => {
          uni.hideLoading();
          this.form.uuid = res.data;
          if (res.code === 200) {
            uni.$u.toast("验证码已发送");
            this.$refs.uCode.start();
          } else {
            this.$modal.msg(res.msg || "发送失败");
          }
        });
      } else {
        uni.$u.toast("倒计时结束后再发送");
      }
    },
  },
};
</script>

<style lang="scss">
.login_pop_box {
  position: relative;
  .login_pop_title {
    width: 100%;
    line-height: 110rpx;
    text-align: center;
    color: rgba(46, 46, 46, 1);
    font-size: 36rpx;
  }
  .login_pop_close {
    position: absolute;
    top: 44rpx;
    right: 40rpx;
    z-index: 20;
  }
  .login_pop_cont {
    padding: 96rpx 32rpx 64rpx 32rpx;
    .login_pop_item {
      padding-bottom: 32rpx;
      position: relative;
      /deep/ .u-input {
        height: 96rpx;
        border-radius: 12rpx;
        background: rgba(246, 246, 246, 1);
        padding-left: 32rpx !important;
      }
      /deep/ .u-input__content__subfix-icon {
        margin-right: 30rpx;
      }
      /deep/ input {
        background: none;
      }
    }
    .login_pop_code {
      position: absolute;
      right: 20rpx;
      top: 26rpx;
      z-index: 20;
    }
  }
  .login_pop_footer {
    border-top: #f1f1f1 1px solid;
  }
  .login_pop_submit {
    margin: 24rpx 32rpx 24rpx 32rpx;
    height: 96rpx;
    border-radius: 12rpx;
    background: rgba(64, 200, 131, 1);
    line-height: 96rpx;
    text-align: center;
    color: #fff;
    font-size: 36rpx;
  }
  .login_pop_input {
    height: 96rpx;
    border-radius: 12rpx;
    background: rgba(246, 246, 246, 1);
    padding-left: 32rpx !important;
    display: flex;
    align-items: center;
    /deep/ input {
      background: none;
    }
  }
  .login_pop_input_text {
    font-size: 30rpx;
  }
}
</style>
