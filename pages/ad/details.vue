<!--
 * @Date: 2022-09-16 10:06:06
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-01 11:15:06
 * @FilePath: 任我行\pages\ad\details.vue
-->
<template>
  <view class="box">
    <rich-text :nodes="richCont"></rich-text>
  </view>
</template>

<script>
import parseHtml from "@/utils/parseHtml";

export default {
  data() {
    return {
      content: "",
    };
  },
  onShow() {
    uni.$on("updateAd", (data) => {
      this.content = data.detail;
      uni.setNavigationBarTitle({
        title: data.name,
      });
    });
  },
  onUnload() {
    uni.$off("updateAd");
  },
  computed: {
    richCont() {
      const { content } = this;
      return parseHtml(content);
    },
  },
};
</script>

<style lang="scss">
page {
  background: #ffffff;
}
</style>
