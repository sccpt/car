<!--
 * @Date: 2022-09-08 10:01:17
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-19 15:50:44
 * @FilePath: 任我行\pages\mine\driver\form.vue
-->
<template>
  <view class="df_box">
    <view class="tips">请确保姓名与证件一致</view>
    <view class="form">
      <u-form
        labelPosition="left"
        :model="form"
        :rules="rules"
        ref="form1"
        labelWidth="180rpx"
      >
        <u-form-item label="姓名" prop="name" borderBottom>
          <u--input
            v-model="form.name"
            border="none"
            placeholder="请输入姓名"
          ></u--input>
        </u-form-item>
        <u-form-item label="证件类型" prop="form.cardType" borderBottom>
          <u-radio-group v-model="form.cardType">
            <u-radio
              :customStyle="{ marginRight: '16rpx' }"
              activeColor="rgba(64, 200, 131, 1)"
              label="身份证"
              :name="1"
            >
            </u-radio>
          </u-radio-group>
        </u-form-item>
        <u-form-item label="证件号码" prop="cardNo" borderBottom>
          <u--input
            v-model="form.cardNo"
            border="none"
            type="number"
            maxlength="18"
            placeholder="请输入证件号码"
          ></u--input>
        </u-form-item>
        <u-form-item label="手机号码" prop="phone" borderBottom>
          <u--input
            v-model="form.phone"
            border="none"
            type="number"
            maxlength="11"
            placeholder="请输入手机号码"
          ></u--input>
        </u-form-item>
      </u-form>
      <view class="submit">
        <u-button
          color="rgba(64, 200, 131, 1)"
          @click="handleSave"
          type="primary"
          text="保存"
        ></u-button>
      </view>
    </view>
    <view class="read">
      <u-checkbox-group placement="row" v-model="form.read">
        <u-checkbox
          activeColor="rgba(64, 200, 131, 1)"
          label="已阅读并同意以下内容："
          :name="1"
        >
        </u-checkbox>
      </u-checkbox-group>
      <view class="text"
        >您已知晓您录入的驾驶员身份证件信息，将用于您预订的租车产品，并在使用时根据有关法律规定进行查验或留存，请确保录入信息真实有效。平台将通过加密等方式保护此信息，并在预订过程中提供给为您实际提供服务的租车公司。<br />
        如您未开通实名认证，但选择免押服务，您的驾驶员身份证件将被用于实名认证。</view
      >
    </view>
  </view>
</template>

<script>
import { editDriver, addDriver } from "@/api/driver";
import uButton from "../../../uni_modules/uview-ui/components/u-button/u-button.vue";

export default {
  components: { uButton },
  data() {
    return {
      title: "新增驾驶员",
      form: {
        name: "",
        cardType: 1,
        cardNo: "",
        phone: "",
        read: [0],
      },
      rules: {
        name: {
          type: "string",
          required: true,
          message: "请填写姓名",
          trigger: ["blur", "change"],
        },
        cardNo: {
          type: "string",
          required: true,
          max: 18,
          validator: (rule, value, callback) => {
            return this.$u.test.idCard(value);
          },
          message: "请输入真实身份证号",
          trigger: ["change", "blur"],
        },
        phone: [
          {
            type: "string",
            max: 11,
            required: true,
            message: "请输入手机号码",
            trigger: ["blur", "change"],
          },
          {
            validator: (rule, value, callback) => {
              return uni.$u.test.mobile(value);
            },
            message: "手机号码不正确",
            trigger: ["change", "blur"],
          },
        ],
      },
    };
  },
  onLoad(options) {
    if (options.empGuid) {
      this.form.empGuid = options.empGuid;
      this.form.name = options.name;
      this.form.cardNo = options.cardNo;
      this.form.phone = options.phone;
      this.form.cardType = Number(options.cardType);
      this.form.userId = options.userId;
      uni.setNavigationBarTitle({
        title: "修改驾驶员",
      });
    }
  },
  methods: {
    handleSave() {
      const { form } = this;
      if (form.read[0]) {
        this.$refs.form1.validate().then((res) => {
          uni.showLoading({
            title: "保存中",
          });
          if (form.empGuid) {
            editDriver({ ...form }).then((res) => {
              uni.hideLoading();
              if (res.code === 200) {
                this.$modal.msg(res.msg || "成功");
                uni.navigateBack({
                  delta: 1,
                });
              } else {
                this.$modal.msg(res.msg || "失败");
              }
            });
          } else {
            addDriver({ ...form }).then((res) => {
              uni.hideLoading();
              if (res.code === 200) {
                this.$modal.msg(res.msg || "成功");
                uni.navigateBack({
                  delta: 1,
                });
              } else {
                this.$modal.msg(res.msg || "失败");
              }
            });
          }
        });
      } else {
        uni.showToast({
          title: "请先勾选同意后再保存",
          icon: "none",
        });
      }
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f6f6f6;
}
.df_box {
  .tips {
    padding: 32rpx;
    font-size: 28rpx;
  }
  .form {
    padding: 32rpx;
    background: #fff;
  }
  .read {
    padding: 32rpx;
    display: flex;
    flex-direction: column;
    .text {
      padding-top: 20rpx;
      line-height: 56rpx;
      color: #999;
      font-size: 28rpx;
    }
  }
  .submit {
    padding-top: 40rpx;
  }
}
</style>
