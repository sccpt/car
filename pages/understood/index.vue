<!--
 * @Date: 2022-09-11 10:30:37
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-19 22:12:42
 * @FilePath: \小程序\pages\understood\index.vue
-->
<template>
  <view class="under_box">
    <view v-for="(item, index) in dataList" :key="index">
      <view class="title">{{ item.title }}</view>
      <u-collapse :border="false" accordion>
        <u-collapse-item
          v-for="(vitem, vIndex) in item.content"
          :key="vIndex"
          :border="false"
        >
          <text slot="title">{{ vitem.title }}</text>
          <u-icon name="arrow-right" size="24rpx" slot="right-icon"></u-icon>
          <rich-text :nodes="strToArrHtml(vitem.content)"></rich-text>
        </u-collapse-item>
      </u-collapse>
    </view>
  </view>
</template>

<script>
import parseHtml from "@/utils/parseHtml";
import { getStoreInfo } from "@/api/order";

export default {
  data() {
    return {
      dataList: [
        {
          title: "预订须知",
          content: [
            {
              title: "里程限制",
              content: "",
            },
            {
              title: "用车区域",
              content: "",
            },
          ],
        },
      ],
    };
  },
  onLoad(options) {
    uni.$on("buyParamsUnderstood", (data) => {
      const datas = [...this.dataList];
      datas[0].content[0].content = data.milesLimit || "";
      datas[0].content[1].content = data.regionLimit || "";
      this.dataList = datas;
    });
  },
  onUnload() {
    uni.$off("buyParamsUnderstood");
  },
  methods: {
    getStoreData(params) {
      uni.showLoading({
        title: "加载中",
      });
      const loc = params.location.split(",");
      if (params.isOtherAddress) {
        const backLoc = params.backLoc.split(",");
        params.isOtherAddress = 1;
        params.backLat = backLoc[1];
        params.backLng = backLoc[0];
      } else {
        params.isOtherAddress = 0;
      }
      getStoreInfo({
        lat: loc[1],
        lng: loc[0],
        ...params,
        deliveryType: 1,
      }).then((res) => {
        uni.hideLoading();
        if (res.code === 200 && res.data && res.data.storePolicys) {
          const datas = [...this.dataList];
          datas[0].content[0].content = res.data.storePolicys.milesLimit || "";
          datas[0].content[1].content = res.data.storePolicys.regionLimit || "";
          console.log(datas);
          this.dataList = datas;
        }
      });
    },
    strToArrHtml(str) {
      return parseHtml(str);
    },
  },
};
</script>

<style lang="scss">
page {
  background: #fff;
}
.under_box {
  padding: 32rpx;
  .title {
    padding-top: 40rpx;
    padding-bottom: 20rpx;
    font-size: 36rpx;
    font-weight: bold;
  }
}
</style>
