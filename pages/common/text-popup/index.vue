<!--
 * @Date: 2022-09-11 09:56:58
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-09-22 20:09:18
 * @FilePath: 任我行\pages\common\text-popup\index.vue
-->
<template>
  <u-popup :show="show" @close="close" round="32rpx" mode="bottom">
    <view class="text_pop_box">
      <view class="title">费用明细</view>
      <view class="close" @click="close">
        <u-icon name="close" color="rgba(78, 89, 105, 1)" size="32rpx"></u-icon>
      </view>
      <scroll-view scroll-y="true" class="content">
        <rich-text :nodes="richCont"></rich-text>
      </scroll-view>
    </view>
  </u-popup>
</template>

<script>
import parseHtml from "@/utils/parseHtml";
import props from "./props.js";

export default {
  mixins: [props],
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
  computed: {
    richCont() {
      const { content } = this;
      return parseHtml(content);
    },
  },
};
</script>

<style lang="scss" scoped>
.text_pop_box {
  position: relative;
  .title {
    width: 100%;
    line-height: 110rpx;
    text-align: center;
    color: rgba(46, 46, 46, 1);
    font-size: 36rpx;
  }
  .close {
    position: absolute;
    top: 44rpx;
    right: 40rpx;
    z-index: 20;
  }
  .content {
    padding: 32rpx;
    max-height: 900rpx;
    font-size: 24rpx;
    line-height: 48rpx;
  }
}
</style>
