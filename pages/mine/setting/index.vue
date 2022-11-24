<!--
 * @Date: 2022-08-25 11:40:00
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-22 13:18:35
 * @FilePath: 任我行\pages\mine\setting\index.vue
-->
<template>
  <u-cell-group>
    <u-cell
      title="个人信息"
      :isLink="true"
      url="/pages/mine/info/edit"
    ></u-cell>
    <!-- <u-cell title="意见反馈" :isLink="true"></u-cell> -->
    <u-cell title="退出登录" @click="handleLogOut" :isLink="true"></u-cell>
  </u-cell-group>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {};
  },
  methods: {
    handleLogOut() {
      uni.showModal({
        title: "系统提示",
        content: "确认是否退出登录？",
        cancelText: "取消",
        confirmText: "确定",
        success: (r) => {
          if (r.confirm) {
            store.dispatch("LogOut").then((res) => {
              uni.reLaunch({ url: "/pages/login" });
            });
          }
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
