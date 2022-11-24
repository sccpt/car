<!--
 * @Date: 2022-09-11 15:38:17
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-18 11:23:00
 * @FilePath: \小程序\pages\choice\city.vue
-->
<template>
  <view class="city_box">
    <view :class="searchFocus ? 'searchNav' : 'navRight'">
      <u-search
        placeholder="城市名称"
        v-model="keyword"
        :showAction="false"
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
    <u-index-list :indexList="indexList">
      <view slot="header" class="header">
        <view class="loc" v-if="loc.address" @tap="handleCheckLoc">
          <view class="title">
            <u-icon name="map-fill" color="#0087f5" size="28rpx"></u-icon>
            <view class="text">{{ loc.name }}</view>
            <!-- <u-image
              src="/static/images/order/refresh.png"
              width="38rpx"
              height="38rpx"
              class="refresh"
              @tap.stop="getLoc"
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
        <view class="hot">
          <view class="title">热门</view>
          <view
            class="item"
            v-for="(item, index) in hotCity"
            :key="index"
            @click="handleItem(item)"
          >
            <view class="btn">{{ item.areaName }}</view>
          </view>
        </view>
      </view>
      <template v-for="(item, index) in itemArr">
        <!-- #ifdef APP-NVUE -->
        <u-index-anchor
          :text="indexList[index]"
          :key="index"
          bgColor="#f4f4f4"
        ></u-index-anchor>
        <!-- #endif -->
        <u-index-item :key="index">
          <!-- #ifndef APP-NVUE -->
          <u-index-anchor
            :text="indexList[index]"
            bgColor="#f4f4f4"
          ></u-index-anchor>
          <!-- #endif -->
          <view class="list" v-for="(item1, index1) in item" :key="index1">
            <view class="list__item" @click="handleItem(item1)">
              <text class="list__item__user-name">{{
                item1.areaFullName
              }}</text>
            </view>
            <u-line></u-line>
          </view>
        </u-index-item>
      </template>
    </u-index-list>
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
            :title="`${item.cityname} (${item.name})`"
            :label="placeInfo(item)"
            isLink
            @click="handleItem(item)"
          ></u-cell>
        </u-cell-group>
        <view class="no_more">没有更多了</view>
      </scroll-view>
      <view v-else class="popBoxNoData">
        <u-empty mode="data" text="未搜索到相关城市"> </u-empty>
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
import {
  getAmapPlace,
  getHotCityList,
  getAreaList,
  getSelectCity,
  seachPlace,
} from "@/api/city";
import { getLogCity, removeLogCity } from "@/utils/city";
import config from "@/config";

const indexList = () => {
  const indexList = [];
  const charCodeOfA = "A".charCodeAt(0);
  for (let i = 0; i < 26; i++) {
    indexList.push(String.fromCharCode(charCodeOfA + i));
  }
  return indexList;
};
export default {
  data() {
    return {
      indexList: [],
      keyword: "",
      showPopup: false,
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
      hotCity: [],
      cityData: [],
      logCity: getLogCity() || [],
      checkType: "",
      placeData: [],
      checkBack: "",
    };
  },
  onLoad(options) {
    this.getLoc();
    this.getHotCity();
    this.getCityData();
    this.checkType = options.type;
    this.checkBack = options.back;
  },
  computed: {
    itemArr() {
      const { cityData, indexList } = this;
      return indexList.map((item) => {
        const arr = [];
        for (let i = 0; i < cityData.length; i++) {
          if (item === cityData[i].pinyinInitial) {
            arr.push(cityData[i]);
          }
        }
        return arr;
      });
    },
  },
  methods: {
    placeInfo(row) {
      if (row.pname) {
        return `${row.pname}`;
      }
      return `${row.cityname}`;
    },
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
        uni.navigateBack();
      }
    },
    handleSearch() {
      setTimeout(() => {
        const { keyword } = this;
        if (keyword) {
          seachPlace({
            key: config.aMap.key,
            keywords: keyword,
            extensions: "all",
          }).then((res) => {
            if (res.status === "1") {
              this.placeData = res.pois;
              this.showPopup = true;
            }
          });
          // getSelectCity(keyword).then((res) => {
          //   uni.hideLoading();
          //   if (res.code === 200) {
          //     this.placeData = res.data;
          //     this.showPopup = true;
          //   }
          // });
        }
      }, 500);
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
        uni.navigateBack();
      }
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
    handleItem(e) {
      const { checkType, checkBack } = this;
      uni.navigateTo({
        url: `/pages/choice/town?areaCode=${e.adcode || e.areaCode}&areaName=${
          e.cityname || e.areaName
        }&type=${checkType}&back=${checkBack}`,
      });
    },
    getHotCity() {
      getHotCityList({}).then((res) => {
        if (res.code === 200) {
          this.hotCity = res.data;
        }
      });
    },
    getCityData() {
      uni.showLoading({
        title: "加载中",
      });
      getAreaList({}).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          this.cityData = res.data;
          this.indexList = indexList();
        }
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
  },
};
</script>

<style lang="scss">
.city_box {
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
  .navRight {
    padding: 32rpx;
    max-height: 600rpx;
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
  .hot {
    padding: 30rpx 40rpx 0 32rpx;
    display: flex;
    flex-wrap: wrap;
    .title {
      width: 100%;
      display: flex;
      align-items: center;
      padding-bottom: 40rpx;
      font-size: 28rpx;
    }
    .item {
      width: 33.3%;
      .btn {
        width: calc(100% - 20rpx);
        height: 58rpx;
        background: #f6f6f6;
        line-height: 58rpx;
        text-align: center;
        border-radius: 8rpx;
        margin-bottom: 20rpx;
      }
    }
  }
  .list {
    &__item {
      @include flex;
      padding: 6px 12px;
      align-items: center;

      &__avatar {
        height: 35px;
        width: 35px;
        border-radius: 3px;
      }

      &__user-name {
        font-size: 28rpx;
        margin-left: 10px;
        color: $u-main-color;
        padding-top: 2rpx;
        padding-bottom: 2rpx;
      }
    }

    &__footer {
      color: $u-tips-color;
      font-size: 14px;
      text-align: center;
      margin: 15px 0;
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
