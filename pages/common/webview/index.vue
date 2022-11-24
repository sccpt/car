<!--
 * @Date: 2022-08-25 11:40:00
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-09-22 15:05:37
 * @FilePath: 任我行\pages\common\webview\index.vue
-->
<template>
  <view v-if="params.url">
    <web-view :webview-styles="webviewStyles" :src="`${params.url}`"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      params: {},
      webviewStyles: {
        progress: {
          color: "#FF3333",
        },
      },
    };
  },
  props: {
    src: {
      type: [String],
      default: null,
    },
  },
  onLoad(event) {
    this.params = event;
    if (event.title) {
      uni.setNavigationBarTitle({
        title: event.title,
      });
    }
  },
};
</script>

<style lang="scss">
page {
  background: #ffffff;
}
</style>
