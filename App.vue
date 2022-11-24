<!--
 * @Date: 2022-08-24 17:13:03
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-23 09:41:58
 * @FilePath: \开源代码\App.vue
-->
<script>
import config from "./config";
import store from "@/store";
import { getToken } from "@/utils/auth";

export default {
  onLaunch: function () {
    this.initApp();
  },
  methods: {
    // 初始化应用
    initApp() {
      // 初始化应用配置
      this.initConfig();
      // 检查用户登录状态
      // this.checkLogin();
    },
    initConfig() {
      this.globalData.config = config;
    },
    checkLogin() {
      if (!getToken()) {
        this.$tab.reLaunch("/pages/login");
      } else {
        this.$tab.reLaunch("/pages/index");
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/uni_modules/uview-ui/index.scss";
@import "@/static/scss/index.scss";
</style>
