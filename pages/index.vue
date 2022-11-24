<!--
 * @Date: 2022-08-25 11:40:00
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-23 09:45:49
 * @FilePath: \开源代码\pages\index.vue
-->
<template>
  <view class="index_box">
    <view class="swiper">
      <u-swiper
        :list="adList"
        @change="(e) => (current = e.current)"
        :autoplay="true"
        height="336rpx"
        keyName="iconUrl"
        :radius="0"
        @click="handleSwiper"
        :indicatorStyle="{ bottom: '100rpx' }"
      >
        <view slot="indicator" class="indicator">
          <view
            class="indicator__dot"
            v-for="(item, index) in adList"
            :key="index"
            :class="[index === current && 'indicator__dot--active']"
          >
          </view>
        </view>
      </u-swiper>
      <view class="blank"></view>
    </view>
    <view class="buy">
      <view class="row" style="padding-top: 0">
        <view class="city">
          <view class="name">取车城市</view>
          <view
            class="info"
            @click="handleLink('/pages/choice/city?type=go&back=index')"
          >
            <view class="text">{{
              checkAddress.go.cityName || "点击选择"
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
                `/pages/choice/town?areaName=${loc.areaName}&areaCode=${loc.areaCode}&type=go&back=index`
              )
            "
          >
            <view class="text">{{
              checkAddress.go.address || "点击选择"
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
          <u-switch v-model="backCar" size="18"></u-switch>
        </view>
      </view>
      <view class="row" v-if="backCar">
        <view class="city">
          <view class="name">还车城市</view>
          <view
            class="info"
            @click="handleLink('/pages/choice/city?type=back&back=index')"
          >
            <view class="text">{{
              checkAddress.back.cityName || "点击选择"
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
                `/pages/choice/town?areaName=${loc.areaName}&areaCode=${loc.areaCode}&type=back&back=index`
              )
            "
          >
            <view class="text">{{
              checkAddress.back.address || "点击选择"
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
      <view class="des">
        <view class="text">只看</view>
        <u-checkbox-group v-model="checked" placement="row">
          <u-checkbox
            label="上门送取车"
            name="1"
            shape="circle"
            :customStyle="{
              marginRight: '30rpx',
            }"
            labelSize="24rpx"
            labelColor="rgba(152, 152, 154, 1)"
            activeColor="#999"
          ></u-checkbox>
          <u-checkbox
            label="信用免押"
            name="2"
            shape="circle"
            activeColor="#999"
            labelSize="24rpx"
            labelColor="rgba(152, 152, 154, 1)"
            :customStyle="{
              marginRight: '30rpx',
            }"
          ></u-checkbox>
        </u-checkbox-group>
      </view>
      <u-button
        color="rgba(64, 200, 131, 1)"
        text="立即租车"
        @click="handleBuy"
        :customStyle="{ borderRadius: '12rpx' }"
      ></u-button>
      <view class="free">
        <u--image
          src="/static/images/home/sd.png"
          width="28rpx"
          height="32rpx"
        ></u--image>
        <view class="text">
          <text style="color: rgba(99, 188, 255, 1)">芝麻信用分</text>
          ｜550分以上有机会享受免押租车
        </view>
        <view class="more" v-if="isLogin && !isMianYa" @click="handleZhiMa(1)"
          >立即验证</view
        >
        <view class="more" v-if="isLogin && isMianYa" @click="handleZhiMa(0)"
          >解除授权</view
        >
      </view>
    </view>
    <view class="baozhang">
      <u--image
        src="/static/images/home/bz.png"
        width="177rpx"
        height="30rpx"
      ></u--image>
      <view class="text">严选新车 押金双免 送车上门</view>
    </view>
    <view class="ads">
      <view @click="handleLink('/pages/other/zhima')">
        <u-image
          src="/static/images/home/ad2.png"
          width="334rpx"
          height="246rpx"
        ></u-image>
      </view>
      <view class="list">
        <view
          style="margin-bottom: 18rpx"
          @click="handleLink('/pages/other/sxz')"
        >
          <u-image
            src="/static/images/home/ad1.png"
            width="334rpx"
            height="114rpx"
          ></u-image>
        </view>
        <view @click="handleLink('/pages/other/zhinan')">
          <u-image
            src="/static/images/home/ad3.png"
            width="334rpx"
            height="114rpx"
          ></u-image>
        </view>
      </view>
    </view>
    <!-- <time-picker
      :show="showTime"
      @confirm="
        (time) => {
          checkTime = time;
          showTime = false;
        }
      "
      @close="showTime = false"
    ></time-picker> -->
    <view class="c_popup" v-if="showTime">
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
        @confirm="
          (time) => {
            checkTime = time;
            showTime = false;
          }
        "
      ></u-calendar-picker>
    </view>
  </view>
</template>

<script>
import TimePicker from "./common/time-picker";
import {
  getAdvertisementByType,
  isGantZhiMa,
  depositFreeze,
  unFreeze,
} from "@/api/home";
import moment from "moment";
moment.locale("zh-cn");
import { getAmapPlace } from "@/api/city";
import config from "@/config";
import { isLogin } from "@/utils/common";

export default {
  components: {
    TimePicker,
  },
  data() {
    return {
      adList: [],
      current: 0,
      backCar: false,
      checked: ["1"],
      maxDate: moment().add(180, "d").format("YYYY-MM-DD"),
      showTime: false,
      checkTime: {
        startTime: "",
        endTime: "",
      },
      loc: {
        name: "",
        areaCode: "",
        areaName: "",
        address: "",
        location: {
          longitude: "",
          latitude: "",
        },
      },
      checkAddress: {
        go: {
          cityName: "",
          location: "",
          address: "",
          cityCode: "",
        },
        back: {
          cityName: "",
          location: "",
          address: "",
          cityCode: "",
        },
      },
      isLogin: false,
      isMianYa: false,
    };
  },
  onShow() {
    let that = this;
    uni.$on("updateTown", function (data) {
      that.checkAddress[data.type].cityName = data.cityName;
      that.checkAddress[data.type].location = data.location;
      that.checkAddress[data.type].address = data.address;
      that.checkAddress[data.type].cityCode = data.areaCode;
      that.loc.areaName = data.cityName;
      that.loc.areaCode = data.areaCode;
    });
    this.isLogin = isLogin();
    if (this.isLogin) {
      this.getMianYa();
    }
    // #ifdef MP-ALIPAY
    my.getAuthCode({
      scopes: "auth_base",
      success: ({ authCode }) => {
        console.log(authCode);
        uni.setStorageSync("authCode", authCode);
      },
    });
    // #endif
  },
  // onUnload() {
  //   uni.$off("updateTown");
  // },
  mounted() {
    this.getAdData();
    setTimeout(() => {
      if (!this.loc.areaName) {
        this.getLoc();
      }
    }, 500);
    this.initTime();
  },
  methods: {
    handleZhiMa(type) {
      // #ifdef  MP-ALIPAY
      if (type === 1) {
        depositFreeze({}).then((res) => {
          if (res.code === 200) {
            my.tradePay({
              orderStr: res.data,
              success: (reselt) => {
                this.$modal.msgSuccess("授权成功");
                this.getMianYa();
              },
              fail: (reselt) => {
                this.$modal.msgError("授权失败");
              },
            });
          }
        });
      }
      if (type === 0) {
        unFreeze({}).then((res) => {
          if (res.code === 200) {
            this.$modal.msgSuccess("解除授权成功");
            this.getMianYa();
          } else {
            this.$modal.msgError("解除授权失败");
          }
        });
      }
      // #endif
      //#ifndef MP-ALIPAY
      this.$modal.msg("请前往支付宝“任我行”小程序进行操作");
      // #endif
    },
    getMianYa() {
      isGantZhiMa({}).then((res) => {
        if (res.code === 200 && res.data && res.data.isGrant == 0) {
          this.isMianYa = true;
        } else {
          this.isMianYa = false;
        }
      });
    },
    initTime() {
      let hour = moment().format("HH");
      let minute = moment().format("mm");
      if (minute > 30) {
        hour = Number(hour) + 3;
        minute = "00";
      } else {
        hour = Number(hour) + 2;
        minute = "30";
      }
      let count = 0;
      if (hour >= 24) {
        hour = hour - 24;
        count++;
      }
      if (count) {
        this.checkTime.startTime = `${moment()
          .subtract(-1, "days")
          .format("YYYY-MM-DD")} ${hour}:${minute}:00`;
        this.checkTime.endTime = `${moment()
          .subtract(-3, "days")
          .format("YYYY-MM-DD")} ${hour}:${minute}:00`;
      } else {
        this.checkTime.startTime = `${moment().format(
          "YYYY-MM-DD"
        )} ${hour}:${minute}:00`;
        this.checkTime.endTime = `${moment()
          .subtract(-2, "days")
          .format("YYYY-MM-DD")} ${hour}:${minute}:00`;
      }
    },
    handleCalendar(e) {
      console.log(e);
    },
    handleBuy() {
      const { checkAddress, checked, backCar, checkTime } = this;
      const params = {
        isTakeStillFree: 0,
        isDoubleFree: 0,
        cityName: checkAddress.go.cityName,
        cityCode: checkAddress.go.cityCode,
        location: checkAddress.go.location,
        stillTime: moment(checkTime.endTime).format("YYYY-MM-DD HH:mm:ss"),
        takeTime: moment(checkTime.startTime).format("YYYY-MM-DD HH:mm:ss"),
        address: checkAddress.go.address,
      };
      if (backCar) {
        params.backCityCode = checkAddress.back.cityCode;
        params.backLoc = checkAddress.back.location;
        params.backCityName = checkAddress.back.cityName;
        params.backAddress = checkAddress.back.address;
        params.backCar = true;
      }
      for (let i = 0; i < checked.length; i++) {
        if (checked[i] === "1") {
          params.isTakeStillFree = 1;
        }
        if (checked[i] === "2") {
          params.isDoubleFree = 1;
        }
      }
      setTimeout(() => {
        uni.$emit("carListParams", { ...params });
      }, 500);
      uni.navigateTo({
        url: `/pages/car/index`,
      });
    },
    getLoc() {
      uni.showLoading({
        title: "定位中",
      });
      uni.getLocation({
        type: "wgs84",
        success: (res) => {
          uni.hideLoading();
          const location = `${res.longitude},${res.latitude}`;
          getAmapPlace({
            key: config.aMap.key,
            location,
            poitype: "商务住宅",
            radius: 1000,
            extensions: "all",
            batch: false,
            roadlevel: 0,
          }).then((res2) => {
            if (
              res2.info === "OK" &&
              res2.regeocode &&
              res2.regeocode.formatted_address
            ) {
              this.loc.address = res2.regeocode.formatted_address;
              this.loc.location.longitude = res.longitude;
              this.loc.location.latitude = res.latitude;
              const aoisArr = res2.regeocode.pois;
              if (aoisArr && aoisArr.length > 0) {
                const addressComponent = res2.regeocode.addressComponent;
                const cityName =
                  typeof addressComponent.city == "object"
                    ? addressComponent.province
                    : addressComponent.city;
                this.loc.name = aoisArr[0].name;
                this.loc.areaCode = addressComponent.adcode;
                this.loc.areaName = cityName;
                // 默认选择定位数据填充
                this.checkAddress.go.cityName = cityName;
                this.checkAddress.go.location = aoisArr[0].location;
                this.checkAddress.go.address = aoisArr[0].name;
                this.checkAddress.go.cityCode = addressComponent.adcode;
                // 还车
                this.checkAddress.back.cityName = cityName;
                this.checkAddress.back.location = aoisArr[0].location;
                this.checkAddress.back.address = aoisArr[0].name;
                this.checkAddress.back.cityCode = addressComponent.adcode;
              }
            }
          });
        },
        fail: () => {
          uni.hideLoading();
          this.$modal.showToast("位置获取失败");
        },
      });
    },
    getAdData() {
      uni.showLoading({
        title: "加载中",
      });
      getAdvertisementByType({ state: 1, type: 0 }).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          this.adList = res.data;
        }
      });
    },
    handleSwiper(index) {
      const { adList } = this;
      const item = adList[index];
      setTimeout(() => {
        uni.$emit("updateAd", item);
      }, 300);
      uni.navigateTo({
        url: `/pages/ad/details`,
      });
    },
    handleLink(url) {
      uni.navigateTo({
        url,
      });
    },
  },
  computed: {
    showYear() {
      const nowYear = moment().format("YYYY");
      const { checkTime } = this;
      const startYear = moment(checkTime.startTime).format("YYYY");
      const endYear = moment(checkTime.endTime).format("YYYY");
      if (startYear !== nowYear || endYear !== nowYear) {
        return true;
      }
      return false;
    },
    innerStartYear() {
      return moment(this.checkTime.startTime).format("YYYY年");
    },
    innerEndYear() {
      return moment(this.checkTime.endTime).format("YYYY年");
    },
    innerStartWeek() {
      return moment(this.checkTime.startTime).format("dddd");
    },
    innerEndWeek() {
      return moment(this.checkTime.endTime).format("dddd");
    },
    innerStartTime() {
      return moment(this.checkTime.startTime).format("MM月DD日 HH:mm");
    },
    innerEndTime() {
      return moment(this.checkTime.endTime).format("MM月DD日 HH:mm");
    },
    diffDay() {
      const { checkTime } = this;
      const d1 = moment(checkTime.startTime);
      const d2 = moment(checkTime.endTime);
      return d2.diff(d1, "day");
    },
  },
};
</script>

<style lang="scss">
page {
  background: #ffffff;
}
.index_box {
  width: 100%;
  overflow: hidden;
  .free {
    padding-top: 34rpx;
    padding-bottom: 14rpx;
    display: flex;
    align-items: center;
    margin-left: -10rpx;
    margin-right: -20rpx;
    .text {
      flex: 1;
      padding-left: 8rpx;
      font-size: 24rpx;
      color: rgba(99, 99, 99, 1);
    }
    .more {
      font-size: 24rpx;
      color: rgba(64, 200, 131, 1);
    }
  }
  .swiper {
    position: relative;
    .blank {
      width: 100%;
      height: 100rpx;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 20;
      background-image: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 1)
      );
    }
  }
  .indicator {
    @include flex(row);
    justify-content: center;

    &__dot {
      height: 6px;
      width: 6px;
      border-radius: 100px;
      background-color: rgba(255, 255, 255, 0.35);
      margin: 0 5px;
      transition: background-color 0.3s;

      &--active {
        background-color: #ffffff;
      }
    }
  }
  .indicator-num {
    padding: 2px 0;
    background-color: rgba(0, 0, 0, 0.35);
    border-radius: 100px;
    width: 35px;
    @include flex;
    justify-content: center;

    &__text {
      color: #ffffff;
      font-size: 12px;
    }
  }
  .buy {
    width: 686rpx;
    padding: 40rpx;
    background: #fff;
    border-radius: 20rpx;
    box-shadow: 0px 4rpx 20rpx 0px rgba(0, 0, 0, 0.1);
    z-index: 999;
    margin-top: -80rpx;
    margin-left: 32rpx;
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
  .baozhang {
    padding-top: 52rpx;
    padding-bottom: 50rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    .text {
      margin-left: 22rpx;
      color: rgba(166, 166, 166, 1);
      font-size: 24rpx;
    }
  }
  .ads {
    padding: 0 32rpx 32rpx 32rpx;
    display: flex;
    .list {
      flex: 1;
      margin-left: 18rpx;
    }
  }
  .c_popup {
    position: absolute;
  }
}
</style>
