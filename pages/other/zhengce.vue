<!--
 * @Date: 2022-09-15 11:06:17
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-21 10:15:51
 * @FilePath: 任我行\pages\other\zhengce.vue
-->
<template>
  <view class="content">
    <rich-text :nodes="richCont"></rich-text>
  </view>
</template>

<script>
import parseHtml from "@/utils/parseHtml";
import { getNoticeData } from "@/api/notice";

export default {
  data() {
    return {
      content: "",
    };
  },
  onShow() {
    this.getData();
  },
  methods: {
    getData() {
      uni.showLoading({
        title: "加载中",
      });
      getNoticeData(3).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          this.content = res.data.noticeContent;
        }
      });
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

<style lang="scss">
page {
  background: #ffffff;
}
.content {
  padding: 32rpx;
  line-height: 60rpx;
}
</style>
