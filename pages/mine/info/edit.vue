<!--
 * @Date: 2022-08-25 11:40:00
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-04 09:51:38
 * @FilePath: 任我行\pages\mine\info\edit.vue
-->
<template>
  <view class="my_edit_box">
    <view class="box">
      <u--form labelPosition="left" :model="form" :rules="rules" ref="form1">
        <u-form-item
          label="头像"
          prop="avatar"
          borderBottom
          @click="handleAvatar"
        >
          <view class="item" slot="right">
            <u-icon name="arrow-right"></u-icon>
            <u-avatar
              :src="form.avatar"
              size="56rpx"
              style="margin-right: 20rpx"
            ></u-avatar>
          </view>
        </u-form-item>
        <u-form-item label="昵称" prop="nickName" borderBottom>
          <view class="item" slot="right">
            <u--input
              v-model="form.nickName"
              border="none"
              placeholder="输入昵称"
              inputAlign="right"
            ></u--input>
          </view>
        </u-form-item>
        <u-form-item label="手机" prop="phonenumber" borderBottom>
          <view class="item" slot="right">
            <u--input
              v-model="form.phonenumber"
              type="number"
              border="none"
              inputAlign="right"
              placeholder="输入手机号码"
              disabled
            ></u--input>
          </view>
        </u-form-item>
        <u-form-item
          label="性别"
          prop="sex"
          borderBottom
          @click="showSex = true"
        >
          <u--input
            v-model="form.sex"
            disabled
            disabledColor="#ffffff"
            placeholder="请选择性别"
            inputAlign="right"
            border="none"
          ></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label="生日" prop="birthday" borderBottom>
          <uni-datetime-picker
            type="date"
            :clear-icon="false"
            v-model="form.birthday"
            :border="false"
            class="datePicker"
            placeholder="请选择生日"
          />
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
      </u--form>
      <u-action-sheet
        :show="showSex"
        :actions="actions"
        title="请选择性别"
        @close="showSex = false"
        @select="sexSelect"
      >
      </u-action-sheet>
      <u-datetime-picker
        :show="showBirthday"
        mode="date"
        :minDate="100"
        @cancel="showBirthday = false"
        @confirm="handleBirthday"
      ></u-datetime-picker>
    </view>
    <view class="submit">
      <u-button
        color="rgba(64, 200, 131, 1)"
        text="提交"
        @click="handleSubmit"
        :customStyle="{ borderRadius: '12rpx' }"
      ></u-button>
    </view>
  </view>
</template>

<script>
import moment from "moment";
import {
  getUserProfile,
  uploadAvatar,
  updateUserProfile,
} from "@/api/system/user";

export default {
  data() {
    return {
      showSex: false,
      showBirthday: false,
      form: {
        avatar: "",
        nickName: "",
        phonenumber: "",
        sex: "",
        birthday: "",
        userId: "",
      },
      actions: [
        {
          name: "男",
        },
        {
          name: "女",
        },
      ],
      rules: {
        avatar: {
          type: "string",
          required: true,
          message: "请上传头像",
          trigger: ["blur", "change"],
        },
        nickName: {
          type: "string",
          required: true,
          message: "请输入昵称",
          trigger: ["blur", "change"],
        },
        phonenumber: {
          type: "string",
          required: true,
          message: "请输入手机",
          trigger: ["blur", "change"],
        },
        sex: {
          type: "string",
          required: true,
          message: "请选择性别",
          trigger: ["blur", "change"],
        },
        birthday: {
          type: "string",
          required: true,
          message: "请选择生日",
          trigger: ["blur", "change"],
        },
      },
    };
  },
  onShow() {
    this.getUser();
  },
  methods: {
    uploadFile(data) {
      uni.showLoading({
        title: "上传中",
      });
      try {
        uploadAvatar(data).then((res) => {
          uni.hideLoading();
          if (res.code === 200) {
            this.form.avatar = res.msg;
            this.$refs.form1.validateField("avatar");
          } else {
            this.$modal.msg(res.msg || "失败");
          }
        });
      } catch (error) {
        uni.hideLoading();
        console.log(error);
      }
    },
    sexSelect(e) {
      this.form.sex = e.name;
      this.$refs.form1.validateField("sex");
    },
    handleBirthday(e) {
      this.form.birthday = moment(e.value).format("YYYY-MM-DD");
      this.showBirthday = false;
      this.$refs.form1.validateField("birthday");
    },
    getUser() {
      uni.showLoading({
        title: "加载中",
      });
      getUserProfile().then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          this.form.avatar = res.data.avatar;
          this.form.nickName = res.data.nickName;
          this.form.phonenumber = res.data.phonenumber;
          this.form.sex = res.data.sex == "0" ? "男" : "女";
          this.form.birthday = res.data.birthday;
          this.form.userId = res.data.userId;
        } else {
          this.$modal.msg(res.msg || "失败");
        }
      });
    },
    handleAvatar() {
      uni.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        success: (res) => {
          this.uploadFile({
            filePath: res.tempFilePaths[0],
          });
        },
      });
    },
    handleSubmit() {
      const { form } = this;
      this.$refs.form1.validate().then(() => {
        uni.showLoading({
          title: "保存中",
        });
        const datas = { ...form };
        delete datas.phonenumber;
        datas.sex = form.sex === "男" ? "0" : "1";
        updateUserProfile(datas).then((res) => {
          uni.hideLoading();
          if (res.code === 200) {
            this.$store.commit("SET_NAME", datas.nickName);
            this.$store.commit("SET_AVATAR", datas.avatar);
            uni.$u.toast("操作成功");
            uni.navigateBack({
              delta: 1,
            });
          } else {
            this.$modal.msg(res.msg || "失败");
          }
        });
      });
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f6f6f6;
}
.my_edit_box {
  .box {
    padding: 30rpx;
    background: #fff;
  }
  .item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row-reverse;
    /deep/ .u-input {
      background: none !important;
    }
  }
  .submit {
    margin: 200rpx 32rpx 100rpx 32rpx;
  }
  .datePicker {
    /deep/ .uni-icons {
      display: none;
    }
    /deep/ .uni-input-wrapper {
      text-align: right;
      font-size: 30rpx;
    }
    /deep/ .uni-date-x {
      padding-right: 0;
    }
    /deep/ .uni-date__x-input {
      padding-right: 0;
    }
  }
}
</style>
