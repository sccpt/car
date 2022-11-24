<!--
 * @Date: 2022-10-03 19:13:07
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-22 21:47:46
 * @FilePath: 任我行\pages\common\edit-place-popup\index.vue
-->
<template>
  <view>
    <u-popup :show="show" @close="close" mode="top" closeable>
      <view class="edit-place-popup-box">
        <view class="edit-place-popup_title">修改取还车信息</view>
        <view class="edit-place-popup-buy">
          <view class="row" style="padding-top: 0">
            <view class="city">
              <view class="name">取车城市</view>
              <view
                class="info"
                @click="handleLink('/pages/choice/city?type=go&back=car')"
              >
                <view class="text">{{
                  checkAddress.cityName || "点击选择"
                }}</view>
                <u-icon
                  name="arrow-down"
                  color="rgba(152, 152, 154, 1)"
                  size="20rpx"
                ></u-icon>
              </view>
            </view>
            <view class="address">
              <view class="name">取车地点</view>
              <view
                class="info"
                @click="
                  handleLink(
                    `/pages/choice/town?areaName=${checkAddress.cityName}&areaCode=${checkAddress.cityCode}&type=go&back=car`
                  )
                "
              >
                <view class="text">{{
                  checkAddress.address || "点击选择"
                }}</view>
                <u-icon
                  name="arrow-down"
                  color="rgba(152, 152, 154, 1)"
                  size="20rpx"
                ></u-icon>
              </view>
            </view>
            <view class="back">
              <view class="name">异地还车</view>
              <u-switch v-model="myBackCar" size="18"></u-switch>
            </view>
          </view>
          <view class="row" v-if="myBackCar">
            <view class="city">
              <view class="name">还车城市</view>
              <view
                class="info"
                @click="handleLink('/pages/choice/city?type=back&back=car')"
              >
                <view class="text">{{
                  checkAddress.backCityName || "点击选择"
                }}</view>
                <u-icon
                  name="arrow-down"
                  color="rgba(152, 152, 154, 1)"
                  size="20rpx"
                ></u-icon>
              </view>
            </view>
            <view class="address">
              <view class="name">还车地点</view>
              <view
                class="info"
                @click="
                  handleLink(
                    `/pages/choice/town?areaName=${checkAddress.backCityName}&areaCode=${checkAddress.backCityCode}&type=back&back=car`
                  )
                "
              >
                <view class="text">{{
                  checkAddress.backAddress || "点击选择"
                }}</view>
                <u-icon
                  name="arrow-down"
                  color="rgba(152, 152, 154, 1)"
                  size="20rpx"
                ></u-icon>
              </view>
            </view>
          </view>
          <view class="row">
            <view class="startTime" @click="showTime = true">
              <view class="name">{{ innerStartWeek }}</view>
              <view class="info">
                <view class="text">{{ innerStartTime }}</view>
              </view>
            </view>
            <view class="jt">
              <view class="text">{{ diffDay }}天</view>
              <u--image
                src="/static/images/home/time.png"
                width="94rpx"
                height="8rpx"
              ></u--image>
            </view>
            <view class="endTime" @click="showTime = true">
              <view class="name">{{ innerEndWeek }}</view>
              <view class="info">
                <view class="text">{{ innerEndTime }}</view>
              </view>
            </view>
          </view>
          <view class="row" v-if="showYear">
            <view class="startTime">
              <view class="name">{{ innerStartYear }}</view>
            </view>
            <view class="jt"></view>
            <view class="endTime">
              <view class="name">{{ innerEndYear }}</view>
            </view>
          </view>
          <u-button
            color="rgba(64, 200, 131, 1)"
            text="查询"
            @click="handleBuy"
            :customStyle="{ borderRadius: '12rpx' }"
          ></u-button>
        </view>
      </view>
    </u-popup>
    <view v-if="showTime">
      <u-calendar-picker
        :show="showTime"
        mode="range"
        color="rgb(64, 200, 131)"
        @close="showTime = false"
        startText="取车"
        endText="还车"
        :showMark="false"
        :maxDate="maxDate"
        allowSameDay
        title="选择取还车日期"
        :checkTime="checkTime"
        round="20rpx"
        :monthNum="7"
        closeOnClickOverlay
        @confirm="handleCheckTime"
      ></u-calendar-picker>
    </view>
  </view>
</template>

<script>
import TimePicker from "../time-picker";
import props from "./props.js";
import moment from "moment";
moment.locale("zh-cn");

export default {
  mixins: [props],
  components: {
    TimePicker,
  },
  data() {
    return {
      showTime: false,
      maxDate: moment().add(180, "d").format("YYYY-MM-DD"),
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    handleBuy() {
      this.$emit("handleSearchEditPlace");
    },
    handleCheckTime(time) {
      this.showTime = false;
      this.$emit("handleCheckTime", time);
    },
    handleLink(url) {
      uni.navigateTo({
        url,
      });
    },
  },
  computed: {
    checkTime() {
      const { checkAddress } = this;
      return {
        startTime: checkAddress.takeTime,
        endTime: checkAddress.stillTime,
      };
    },
    showYear() {
      const nowYear = moment().format("YYYY");
      const { checkAddress } = this;
      const startYear = moment(checkAddress.takeTime).format("YYYY");
      const endYear = moment(checkAddress.stillTime).format("YYYY");
      if (startYear !== nowYear || endYear !== nowYear) {
        return true;
      }
      return false;
    },
    innerStartYear() {
      return moment(this.checkAddress.takeTime).format("YYYY年");
    },
    innerEndYear() {
      return moment(this.checkAddress.stillTime).format("YYYY年");
    },
    myBackCar: {
      get() {
        return this.backCar;
      },
      set(val) {
        this.$emit("setEditPlaceBack", val);
      },
    },
    innerStartWeek() {
      return moment(this.checkAddress.takeTime).format("dddd");
    },
    innerEndWeek() {
      return moment(this.checkAddress.stillTime).format("dddd");
    },
    innerStartTime() {
      return moment(this.checkAddress.takeTime).format("MM月DD日 HH:mm");
    },
    innerEndTime() {
      return moment(this.checkAddress.stillTime).format("MM月DD日 HH:mm");
    },
    diffDay() {
      const { checkAddress } = this;
      const d1 = moment(checkAddress.takeTime);
      const d2 = moment(checkAddress.stillTime);
      return d2.diff(d1, "day");
    },
  },
};
</script>

<style lang="scss">
page {
  background: #fff;
}
.edit-place-popup_title {
  width: 100%;
  line-height: 110rpx;
  text-align: center;
  color: rgba(46, 46, 46, 1);
  font-size: 36rpx;
}
.edit-place-popup-buy {
  padding: 40rpx;
  background: #fff;
  z-index: 999;
  position: relative;
  .row {
    padding-top: 32rpx;
    padding-bottom: 32rpx;
    display: flex;
    border-bottom: rgba(237, 237, 237, 1) 1px solid;
    .city {
      padding-right: 30rpx;
    }
    .address {
      flex: 1;
      padding-right: 30rpx;
      overflow: hidden;
    }
    .name {
      font-size: 24rpx;
      color: rgba(152, 152, 154, 1);
      padding-bottom: 8rpx;
    }
    .info {
      display: flex;
      align-items: center;
      .text {
        color: rgba(46, 46, 46, 1);
        font-size: 32rpx;
        margin-right: 10rpx;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .jt {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .text {
        color: rgba(152, 152, 154, 1);
        font-size: 20rpx;
        padding-bottom: 6rpx;
      }
    }
    .endTime {
      text-align: right;
    }
  }
  .des {
    padding-top: 30rpx;
    padding-bottom: 36rpx;
    display: flex;
    align-items: center;
    .text {
      margin-right: 32rpx;
      font-size: 24rpx;
      color: rgba(152, 152, 154, 1);
    }
  }
}
</style>
