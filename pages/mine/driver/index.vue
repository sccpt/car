<!--
 * @Date: 2022-09-08 09:36:38
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-22 12:59:14
 * @FilePath: 任我行\pages\mine\driver\index.vue
-->
<template>
  <view class="d_box">
    <view class="add" @click="handleAdd">
      <u-icon
        name="plus-circle"
        color="rgba(186, 186, 186, 1)"
        size="44rpx"
      ></u-icon>
      <view class="text">新增驾驶员</view>
    </view>
    <view class="d_list" v-if="dataList.length !== 0">
      <view class="title">驾驶员信息</view>
      <u-radio-group placement="column" v-model="radiovalue">
        <view class="item" v-for="(item, index) in dataList" :key="index">
          <view class="info">
            <u-radio
              shape="circle"
              :name="item.empGuid"
              v-if="showCheck"
            ></u-radio>
            <view class="text">
              <text>{{ item.name }}</text>
              <view class="default" v-if="item.isDefalut">默认</view>
            </view>
            <view>
              <u-icon
                name="setting"
                color="rgba(186, 186, 186, 1)"
                size="32rpx"
                @click="handleSet(item.empGuid)"
              ></u-icon>
            </view>
            <view style="margin-left: 20rpx">
              <u-icon
                name="edit-pen"
                color="rgba(186, 186, 186, 1)"
                size="32rpx"
                @click="handleEdit(item)"
              ></u-icon>
            </view>
            <view style="margin-left: 20rpx">
              <u-icon
                name="trash"
                color="rgba(186, 186, 186, 1)"
                size="32rpx"
                @click="handleDel(item.empGuid)"
              ></u-icon>
            </view>
          </view>
          <view class="des">
            <view class="row">
              <text>身份证</text>
              <text class="t">{{ item.cardNo }}</text>
            </view>
            <view class="row">
              <text>手机号</text>
              <text class="t">{{ item.phone }}</text>
            </view>
          </view>
        </view>
      </u-radio-group>
    </view>
    <view class="d_check" v-if="showCheck">
      <u-button
        color="rgba(64, 200, 131, 1)"
        text="选择"
        :customStyle="{ borderRadius: '12rpx' }"
        @click="handleCheckBack"
        :disabled="btnDisabled"
      ></u-button>
    </view>
  </view>
</template>

<script>
import { getDriver, delDriver, setDefaultDriver } from "@/api/driver";

export default {
  data() {
    return {
      dataList: [],
      radiovalue: "",
      showCheck: false,
      btnDisabled: false,
    };
  },
  onShow() {
    this.getData();
  },
  onLoad(options) {
    if (options.check) {
      this.showCheck = true;
      uni.setNavigationBarTitle({
        title: "选择驾驶员",
      });
    }
  },
  methods: {
    handleCheckBack() {
      const { radiovalue, dataList } = this;
      dataList.map((item) => {
        if (item.empGuid === radiovalue) {
          uni.$emit("checkDriver", item);
          uni.navigateBack();
        }
      });
    },
    handleSet(id) {
      uni.showModal({
        title: "提示",
        content: "确认要设置为默认驾驶员？",
        cancelText: "取消",
        confirmText: "确定",
        success: (res) => {
          if (res.confirm) {
            uni.showLoading({
              title: "设置中",
            });
            setDefaultDriver(id).then((res) => {
              uni.hideLoading();
              if (res.code === 200) {
                this.$modal.msg(res.msg || "成功");
                this.getData();
              } else {
                this.$modal.msg(res.msg || "失败");
              }
            });
          }
        },
      });
    },
    handleAdd() {
      this.$tab.navigateTo(`/pages/mine/driver/form`);
    },
    handleEdit(row) {
      this.$tab.navigateTo(
        `/pages/mine/driver/form?empGuid=${row.empGuid}&cardNo=${row.cardNo}&name=${row.name}&cardType=${row.cardType}&phone=${row.phone}`
      );
    },
    getData() {
      uni.showLoading({
        title: "加载中",
      });
      getDriver({}).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          if (res.data.length === 0) {
            this.btnDisabled = true;
          }
          res.data.map((item) => {
            if (item.isDefalut) {
              this.radiovalue = item.empGuid;
            }
          });
          this.dataList = res.data;
        }
      });
    },
    handleDel(id) {
      uni.showModal({
        title: "提示",
        content: "请确认要删除该驾驶员？",
        success: (e) => {
          if (e.confirm) {
            uni.showLoading({
              title: "删除中",
            });
            delDriver(id).then((res) => {
              uni.hideLoading();
              if (res.code === 200) {
                this.getData();
              } else {
                this.$modal.msg(res.msg || "失败");
              }
            });
          }
        },
      });
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f6f6f6;
}
.d_box {
  overflow: hidden;
  background: #f6f6f6;
  .add {
    margin: 60rpx 104rpx 60rpx 104rpx;
    height: 100rpx;
    border-radius: 16rpx;
    background: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      color: rgba(46, 46, 46, 1);
      font-size: 32rpx;
      margin-left: 16rpx;
    }
  }
}
.d_list {
  padding: 32rpx;
  background: #fff;
  display: flex;
  flex-direction: column;
  .title {
    padding-bottom: 30rpx;
    border-bottom: 1px solid rgba(237, 237, 237, 1);
    color: rgba(46, 46, 46, 1);
    font-size: 32rpx;
  }
  .item {
    padding-top: 36rpx;
    padding-bottom: 36rpx;
    border-bottom: 1px solid rgba(237, 237, 237, 1);
    .info {
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        padding-left: 12rpx;
        color: rgba(46, 46, 46, 1);
        font-size: 32rpx;
        flex: 1;
        font-weight: bold;
        display: flex;
        align-items: center;
      }
      .default {
        padding: 6rpx 12rpx 6rpx 12rpx;
        background: #f1f1f1;
        font-size: 24rpx;
        font-weight: normal;
        margin-left: 20rpx;
        border-radius: 10rpx;
        color: #999;
      }
    }
    .des {
      padding-top: 12rpx;
      padding-left: 48rpx;
      .row {
        padding-top: 20rpx;
        color: rgba(135, 139, 138, 1);
        font-size: 28rpx;
        display: flex;
        .t {
          margin-left: 40rpx;
        }
      }
    }
  }
}
.d_check {
  padding: 100rpx 32rpx 100rpx 32rpx;
}
</style>
