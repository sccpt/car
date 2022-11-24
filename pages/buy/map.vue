<!--
 * @Date: 2022-09-22 17:00:32
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-01 10:11:20
 * @FilePath: 任我行\pages\buy\map.vue
-->
<template>
  <view class="busin_map_box">
    <view class="map">
      <map
        id="map"
        ref="map"
        :scale="scale"
        :style="{ height: windowHeight, width: windowWidth }"
        :latitude="latitude"
        :longitude="longitude"
        :markers="markers"
        enable-rotate
        enable-overlooking
        enable-po
      ></map>
      <view class="locBtn" @click="getLocation">
        <u-icon name="map" color="#474747" size="38rpx"></u-icon>
        <view class="text">定位</view>
      </view>
    </view>
    <view class="main">
      <view class="row">
        <view class="text">门店名称</view>
        <view class="content">{{ datas.storeName }}</view>
      </view>
      <view class="row">
        <view class="text">门店地址</view>
        <view class="content">{{ datas.address }}</view>
      </view>
      <view class="row">
        <view class="text">营业时间</view>
        <view class="content"
          >{{ datas.sellStartTime }}-{{ datas.sellEndTime }}</view
        >
      </view>
    </view>
  </view>
</template>

<script>
import { getStoreInfo } from "@/api/order";

export default {
  data() {
    return {
      latitude: 39.909,
      longitude: 116.39742,
      scale: 10,
      markers: [
        {
          id: "myId",
          latitude: 39.909,
          longitude: 116.39742,
          iconPath: "/static/images/red.d8fd80d1.png",
        },
      ],
      location: {
        latitude: null,
        longitude: null,
      },
      datas: {},
      params: {},
    };
  },
  onShow() {
    uni.$on("updateStore", (data) => {
      this.getLocation(data);
      this.datas = data;
    });
  },
  onUnload() {
    uni.$off("updateStore");
  },
  methods: {
    getData() {
      const { params } = this;
      uni.showLoading({
        title: "加载中",
      });
      const loc = params.location.split(",");
      getStoreInfo({
        lat: loc[1],
        lng: loc[0],
        carinfoGuid: params.carinfoGuid,
        storeGuid: params.storeGuid,
      }).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          this.datas = res.data;
          this.markers.push({
            id: `shangjia`,
            latitude: res.data.lat,
            longitude: res.data.lng,
            iconPath: "/static/images/icon_postion_marker.png",
          });
        }
      });
    },
    getLocation(storeInfo) {
      uni.showLoading({
        title: "定位中",
      });
      uni.getLocation({
        type: "gcj02",
        success: (res) => {
          uni.hideLoading();
          this.longitude = res.longitude;
          this.latitude = res.latitude;
          this.markers = [
            {
              id: "myId",
              latitude: res.latitude,
              longitude: res.longitude,
              iconPath: "/static/images/icon_postion_marker.png",
            },
            {
              id: `shangjia`,
              latitude: storeInfo.lat,
              longitude: storeInfo.lng,
              iconPath: "/static/images/red.d8fd80d1.png",
            },
          ];
          this.markeMove();
        },
        fail: (error) => {
          uni.hideLoading();
          uni.showToast({
            title: error,
            icon: "none",
          });
        },
      });
    },
    markeMove() {
      this.$nextTick(() => {
        this.scale = 10;
        uni.createMapContext("map", this).translateMarker({
          markerId: "myId",
          destination: {
            latitude: this.latitude,
            longitude: this.longitude,
          },
        });
      });
    },
  },
  computed: {
    windowHeight() {
      let sys = uni.getSystemInfoSync();
      let winWidth = sys.windowWidth;
      let winrate = 750 / winWidth;
      let winHeight = parseInt(sys.windowHeight * winrate);
      return winHeight - 312 + "rpx";
    },
    windowWidth() {
      let sys = uni.getSystemInfoSync();
      let winWidth = sys.windowWidth;
      let winrate = 750 / winWidth;
      return parseInt(winWidth * winrate) + "rpx";
    },
  },
};
</script>

<style lang="scss">
.busin_map_box {
  width: 100%;
  display: flex;
  flex-direction: column;
  .map {
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  .locBtn {
    width: 82rpx;
    height: 94rpx;
    background: #fff;
    border-radius: 10rpx;
    left: 22rpx;
    bottom: 64rpx;
    z-index: 30;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .text {
      padding-top: 8rpx;
      font-size: 24rpx;
    }
  }
  .main {
    padding: 32rpx;
    background: #fff;
    border-top: #f1f1f1 1px solid;
    .row {
      padding-top: 12rpx;
      padding-bottom: 12rpx;
      display: flex;
      line-height: 30rpx;
      .text {
        width: 152rpx;
        font-size: 24rpx;
        color: #535353;
      }
      .content {
        flex: 1;
        font-size: 28rpx;
      }
    }
  }
}
</style>
