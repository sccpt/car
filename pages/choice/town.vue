<!--
 * @Date: 2022-09-12 12:18:14
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-18 11:23:38
 * @FilePath: \小程序\pages\choice\town.vue
-->
<template>
  <view class="town_box" :style="{ height: boxHeight }">
    <view :class="searchFocus ? 'searchNav' : 'navRight'">
      <u-search
        placeholder="机场、车站、景点"
        v-model="keyword"
        :showAction="false"
        :label="city.areaName"
        @change="handleSearch"
        @search="handleSearch"
        @focus="searchFocus = true"
        @blur="searchBlur"
      ></u-search>
      <view v-if="searchFocus" style="padding-left: 30rpx">
        <u-icon
          name="close"
          color="#999"
          size="38rpx"
          @click="
            showPopup = false;
            searchFocus = false;
          "
        ></u-icon>
      </view>
    </view>
    <view class="header">
      <view class="loc" v-if="showLoc" @click="handleCheckLoc">
        <view class="title">
          <u-icon name="map-fill" color="#0087f5" size="28rpx"></u-icon>
          <view class="text">{{ loc.name }}</view>
          <!-- <u-image
            src="/static/images/order/refresh.png"
            width="38rpx"
            height="38rpx"
            class="refresh"
            @click.stop="getLoc"
          ></u-image> -->
          <view class="check" v-if="showCheckLoc">
            <u-icon
              name="checkbox-mark"
              color="rgba(64, 200, 131, 1)"
              size="34rpx"
            ></u-icon>
          </view>
        </view>
        <view class="address">{{ loc.address }}</view>
      </view>
      <view class="history" v-if="logCity && logCity.length !== 0">
        <view class="title">
          <view class="text">历史选择</view>
          <u-icon name="trash" color="#868686" size="24rpx"></u-icon>
          <view class="del" @click="handleClearLog">清除历史</view>
        </view>
        <view
          class="item"
          v-for="(item, index) in logCity"
          :key="index"
          @click="handleHistory(item)"
          >{{ item.cityName }},{{ item.address }}</view
        >
      </view>
    </view>
    <view class="list">
      <view class="title">
        <u-image
          src="/static/images/map/air.png"
          width="28rpx"
          height="28rpx"
        ></u-image>
        <view class="text">机场</view>
        <u-icon
          name="arrow-down"
          color="#323232"
          size="24rpx"
          v-if="dataList.air.length > 4 && !moreData.air"
          @click="moreData.air = true"
        ></u-icon>
        <u-icon
          name="arrow-up"
          color="#323232"
          size="24rpx"
          v-if="dataList.air.length > 4 && moreData.air"
          @click="moreData.air = false"
        ></u-icon>
      </view>
      <view
        :class="{
          cont: true,
          cHeightAuto: moreData.air,
          cHeight181: !moreData.air,
        }"
      >
        <view
          class="item"
          v-for="(item, index) in dataList.air"
          :key="index"
          @click="handleRow(item)"
        >
          {{ item.name }}
        </view>
      </view>
    </view>
    <view class="list">
      <view class="title">
        <u-image
          src="/static/images/map/train.png"
          width="30rpx"
          height="30rpx"
        ></u-image>
        <view class="text">火车站</view>
        <u-icon
          name="arrow-down"
          color="#323232"
          size="24rpx"
          v-if="dataList.train.length > 4 && !moreData.train"
          @click="moreData.train = true"
        ></u-icon>
        <u-icon
          name="arrow-up"
          color="#323232"
          size="24rpx"
          v-if="dataList.train.length > 4 && moreData.train"
          @click="moreData.train = false"
        ></u-icon>
      </view>
      <view
        :class="{
          cont: true,
          cHeightAuto: moreData.train,
          cHeight181: !moreData.train,
        }"
      >
        <view
          class="item"
          v-for="(item, index) in dataList.train"
          :key="index"
          @click="handleRow(item)"
        >
          {{ item.name }}
        </view>
      </view>
    </view>
    <view class="list">
      <view class="title">
        <u-image
          src="/static/images/map/car.png"
          width="28rpx"
          height="28rpx"
        ></u-image>
        <view class="text">汽车站</view>
        <u-icon
          name="arrow-down"
          color="#323232"
          size="24rpx"
          v-if="dataList.car.length > 4 && !moreData.car"
          @click="moreData.car = true"
        ></u-icon>
        <u-icon
          name="arrow-up"
          color="#323232"
          size="24rpx"
          v-if="dataList.car.length > 4 && moreData.car"
          @click="moreData.car = false"
        ></u-icon>
      </view>
      <view
        :class="{
          cont: true,
          cHeightAuto: moreData.car,
          cHeight181: !moreData.car,
        }"
      >
        <view
          class="item"
          v-for="(item, index) in dataList.car"
          :key="index"
          @click="handleRow(item)"
        >
          {{ item.name }}
        </view>
      </view>
    </view>
    <u-popup
      :show="showPopup"
      mode="top"
      :overlay="false"
      :zIndex="120"
      @close="
        showPopup = false;
        searchFocus = false;
      "
    >
      <scroll-view scroll-y="true" class="popBox" v-if="placeData.length !== 0">
        <u-cell-group>
          <u-cell
            v-for="(item, index) in placeData"
            :key="index"
            :title="item.name"
            isLink
            :label="placeInfo(item)"
            @click="handleRow(item)"
          ></u-cell>
        </u-cell-group>
        <view class="no_more">没有更多了</view>
      </scroll-view>
      <view class="popBoxNoData" v-else>
        <u-empty mode="data" text="未搜索到相关地址"> </u-empty>
      </view>
    </u-popup>
    <u-overlay
      :show="searchFocus"
      @click="
        searchFocus = false;
        showPopup = false;
      "
      :zIndex="99"
    ></u-overlay>
  </view>
</template>

<script>
import { getAmapPlace, selectPoiPlace, seachPlace } from "@/api/city";
import { getLogCity, removeLogCity, setLogCity } from "@/utils/city";
import config from "@/config";

export default {
  data() {
    return {
      keyword: "",
      showCheckLoc: false,
      searchFocus: false,
      loc: {
        name: "",
        address: "",
        cityName: "",
        areaCode: "",
        location: {
          longitude: "",
          latitude: "",
        },
      },
      dataList: {
        air: [],
        train: [],
        car: [],
      },
      moreData: {
        air: false,
        train: false,
        car: false,
      },
      city: {},
      logCity: getLogCity() || [],
      placeData: [],
      showPopup: false,
      checkType: "",
      checkBack: "",
    };
  },
  onLoad(options) {
    this.city = { ...options };
    this.getData(options.areaName);
    this.getLoc();
    this.checkType = options.type;
    this.checkBack = options.back;
  },
  methods: {
    searchBlur() {
      const { showPopup } = this;
      if (showPopup) {
        this.searchFocus = true;
      }
    },
    handleCheckLoc() {
      const { checkType, loc, checkBack } = this;
      this.showCheckLoc = true;
      setTimeout(() => {
        uni.$emit("updateTown", {
          cityName: loc.cityName,
          location: `${loc.location.longitude},${loc.location.latitude}`,
          address: loc.address,
          type: checkType,
          areaCode: loc.areaCode,
        });
      }, 500);
      if (checkBack == "index") {
        uni.switchTab({
          url: `/pages/index`,
        });
      }
      if (checkBack == "car") {
        const pages = getCurrentPages();
        let i = 0;
        pages.map((item, index) => {
          if (item.route === "pages/car/index") {
            i = index;
          }
        });
        const delta = pages.length - i - 1;
        uni.navigateBack({
          delta,
        });
      }
    },
    handleRow(row) {
      const { city, checkType, checkBack } = this;
      const logCitys = [...this.logCity];
      let oIndex = null;
      logCitys.map((item, index) => {
        if (item.address === row.name) {
          oIndex = index;
        }
      });
      if (oIndex !== null) {
        logCitys.splice(oIndex, 1);
      }
      logCitys.unshift({
        cityName: city.areaName,
        location: row.location,
        address: row.name,
        type: checkType,
        areaCode: row.adcode || row.adCode || "",
      });
      if (logCitys.length === 5) {
        logCitys.pop();
      }
      setLogCity(logCitys);
      setTimeout(() => {
        uni.$emit("updateTown", {
          cityName: city.areaName,
          location: row.location,
          address: row.name,
          type: checkType,
          areaCode: row.adcode || row.adCode || "",
        });
      }, 500);
      if (checkBack == "index") {
        uni.switchTab({
          url: `/pages/index`,
        });
      }
      if (checkBack == "car") {
        const pages = getCurrentPages();
        let i = 0;
        pages.map((item, index) => {
          if (item.route === "pages/car/index") {
            i = index;
          }
        });
        const delta = pages.length - i - 1;
        uni.navigateBack({
          delta,
        });
      }
    },
    handleHistory(data) {
      const { checkType, checkBack } = this;
      setTimeout(() => {
        uni.$emit("updateTown", {
          cityName: data.cityName,
          location: data.location,
          address: data.address,
          type: checkType,
          areaCode: data.areaCode,
        });
      }, 500);
      if (checkBack == "index") {
        uni.switchTab({
          url: `/pages/index`,
        });
      }
      if (checkBack == "car") {
        const pages = getCurrentPages();
        let i = 0;
        pages.map((item, index) => {
          if (item.route === "pages/car/index") {
            i = index;
          }
        });
        const delta = pages.length - i - 1;
        uni.navigateBack({
          delta,
        });
      }
    },
    handleSearch() {
      setTimeout(() => {
        const { city, keyword } = this;
        if (keyword) {
          seachPlace({
            key: config.aMap.key,
            keywords: keyword,
            city: city.areaName,
            citylimit: true,
            extensions: "all",
            page: 1,
            offset: 100,
          }).then((res) => {
            if (res.status === "1") {
              this.placeData = res.pois;
              this.showPopup = true;
            }
          });
        }
      }, 500);
    },
    getData(cityName) {
      selectPoiPlace({ cityName }).then((res) => {
        if (res.code === 200 && res.data.air) {
          this.dataList.air = res.data.air;
        }
        if (res.code === 200 && res.data.train) {
          this.dataList.train = res.data.train;
        }
        if (res.code === 200 && res.data.car) {
          this.dataList.car = res.data.car;
        }
      });
    },
    handleClearLog() {
      uni.showModal({
        title: "系统提示",
        content: "请确认要清除历史选择？",
        cancelText: "取消",
        confirmText: "确定",
        success: (res) => {
          if (res.confirm) {
            removeLogCity();
            this.logCity = getLogCity();
          }
        },
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
              const addressComponent = res2.regeocode.addressComponent;
              const cityName =
                typeof addressComponent.city == "object"
                  ? addressComponent.province
                  : addressComponent.city;
              this.loc.cityName = cityName;
              this.loc.areaCode = addressComponent.adcode;
              this.loc.address = res2.regeocode.formatted_address;
              this.loc.location.longitude = res.longitude;
              this.loc.location.latitude = res.latitude;
              if (res2.regeocode.aois && res2.regeocode.aois.length > 0) {
                this.loc.name = res2.regeocode.aois[0].name;
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
    placeInfo(row) {
      return `${row.cityname}, ${row.adname}, ${row.address}`;
    },
  },
  computed: {
    showLoc() {
      const { city, loc } = this;
      if (city.areaCode && loc.areaCode && loc.address && loc.name) {
        const locCode = `${loc.areaCode}`.slice(0, 4);
        const areaCode = `${city.areaCode}`.slice(0, 4);
        if (locCode === areaCode) {
          return true;
        }
      }
      return false;
    },
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
  background: #f4f4f4;
}
.town_box {
  .searchNav {
    width: 100%;
    padding: 32rpx;
    background: #fff;
    position: fixed;
    display: flex;
    align-items: center;
    left: 0;
    top: 0;
    z-index: 9999;
  }
  .popBox {
    margin-top: 140rpx;
    height: calc(100vh - 140rpx);
  }
  .popBoxNoData {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .navRight {
    padding: 32rpx;
    background: #fff;
  }
  .header {
    background: #fff;
  }
  .loc {
    padding: 10rpx 60rpx 40rpx 32rpx;
    border-bottom: #f1f1f1 1px solid;
    .title {
      display: flex;
      align-items: center;
      .text {
        margin-left: 18rpx;
        font-size: 28rpx;
      }
      .refresh {
        margin-left: 14rpx;
      }
      .check {
        flex: 1;
        display: flex;
        flex-direction: row-reverse;
      }
    }
    .address {
      padding-left: 38rpx;
      padding-top: 12rpx;
      font-size: 24rpx;
      color: #909090;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .cHeightAuto {
    max-height: none;
  }
  .cHeight181 {
    max-height: 181rpx;
  }
  .list {
    padding: 32rpx;
    background: #fff;
    margin-top: 16rpx;
    .title {
      padding-bottom: 12rpx;
      display: flex;
      align-items: center;
      .text {
        font-size: 24rpx;
        font-weight: bold;
        margin-left: 14rpx;
        flex: 1;
        padding-top: 4rpx;
      }
    }
    .cont {
      width: 100%;
      overflow: hidden;
      display: flex;
      flex-wrap: wrap;
      .item {
        padding-top: 32rpx;
        padding-bottom: 32rpx;
        border-bottom: #f1f1f1 1px solid;
        font-size: 26rpx;
        width: 50%;
      }
    }
  }
  .history {
    padding: 30rpx 60rpx 0 32rpx;
    .title {
      display: flex;
      align-items: center;
      padding-bottom: 20rpx;
      .text {
        flex: 1;
        font-size: 28rpx;
      }
      .del {
        font-size: 24rpx;
        color: #868686;
        margin-left: 10rpx;
      }
    }
    .item {
      padding-top: 24rpx;
      padding-bottom: 24rpx;
      border-bottom: #f1f1f1 1px solid;
      font-size: 24rpx;
    }
  }
  .no_more {
    padding: 32rpx;
    text-align: center;
    font-size: 24rpx;
    color: #999;
  }
}
</style>
