<!--
 * @Date: 2022-09-07 15:24:44
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-18 11:27:58
 * @FilePath: \小程序\pages\mine\violation\index.vue
-->
<template>
  <view class="violation_box">
    <u-sticky bgColor="#fff">
      <u-tabs
        :list="tabsMenu"
        :scrollable="false"
        @click="handleTabs"
        :activeStyle="{
          color: 'rgba(46, 46, 46, 1)',
          fontWeight: 'bold',
        }"
        lineColor="rgba(64, 200, 131, 1)"
        :itemStyle="{ paddingBottom: '20rpx', width: '375rpx' }"
      ></u-tabs>
    </u-sticky>
    <view class="list" v-if="current == 0 && dataList.length !== 0">
      <view class="item" v-for="(item, index) in dataList" :key="index">
        <view class="row">
          <view class="t1">车牌号</view>
          <view class="t2">{{ item.carNo }}</view>
          <u-icon
            name="arrow-right"
            color="rgba(186, 186, 186, 1)"
            size="26rpx"
          ></u-icon>
        </view>
        <view class="row">
          <view class="t1">违章时间</view>
          <view class="t2">{{ item.tiTime }}</view>
        </view>
        <view class="row">
          <view class="t1">违章行为</view>
          <view class="t2">{{ item.tiContent }}</view>
        </view>
        <view class="row">
          <view class="t1">罚分</view>
          <view class="t2">{{ item.punishFen }}分</view>
        </view>
        <view class="row">
          <view class="t1">罚款</view>
          <view class="t2">{{ item.punishMoney }}</view>
        </view>
        <view class="row2">
          <view class="left">
            <u-icon
              name="checkbox-mark"
              color="rgba(64, 200, 131, 1)"
              size="32rpx"
              v-if="item.state == 1"
            ></u-icon>
            <u-icon
              name="error-circle"
              color="rgba(255, 87, 51, 1)"
              size="32rpx"
              style="margin-right: 14rpx"
              v-else
            ></u-icon>
            <view class="text" v-if="item.state == 1"
              >本次违章<text style="color: rgba(64, 200, 131, 1)"
                >已处理</text
              ></view
            >
            <view class="text" v-else
              >本次违章<text style="color: rgba(255, 87, 51, 1)"
                >未处理</text
              ></view
            >
          </view>
          <view class="more" @click="handleLink(item.tiGuid)">查询详情</view>
        </view>
      </view>
    </view>
    <view class="list" v-if="current == 1 && dataList.length !== 0">
      <view class="item" v-for="(item, index) in dataList" :key="index">
        <view class="row">
          <view class="t1">车牌号</view>
          <view class="t2">{{ item.carNo }}</view>
          <u-icon
            name="arrow-right"
            color="rgba(186, 186, 186, 1)"
            size="26rpx"
          ></u-icon>
        </view>
        <view class="row">
          <view class="t1">车损描述</view>
          <view class="t2">{{ item.remark }}</view>
        </view>
        <view class="row">
          <view class="t1">维修费用</view>
          <view class="t2">{{ item.upKeepMoney }}</view>
        </view>
        <view class="row">
          <view class="t1">误工费用</view>
          <view class="t2"
            >{{ item.lossChargeMoneyTotal }}({{ item.lossChargeMoney }}*{{
              item.lossChargeDay
            }}天)</view
          >
        </view>
        <view class="row2">
          <view class="left">
            <u-icon
              name="checkbox-mark"
              color="rgba(64, 200, 131, 1)"
              size="32rpx"
              v-if="item.state == 1"
            ></u-icon>
            <u-icon
              name="error-circle"
              color="rgba(255, 87, 51, 1)"
              size="32rpx"
              style="margin-right: 14rpx"
              v-else
            ></u-icon>
            <view class="text" v-if="item.state == 1"
              >本次车损<text style="color: rgba(64, 200, 131, 1)"
                >已处理</text
              ></view
            >
            <view class="text" v-else
              >本次车损<text style="color: rgba(255, 87, 51, 1)"
                >未处理</text
              ></view
            >
          </view>
          <view class="more" @click="handleDamage(item.ramGuid)">查询详情</view>
        </view>
      </view>
    </view>
    <view class="moreData" v-if="dataList.length !== 0">
      <u-loadmore :status="loadStatus" />
    </view>
    <view
      class="noData"
      v-if="dataList.length === 0"
      :style="{ height: scrollH }"
    >
      <u--image
        src="/static/images/nodata/violation.png"
        width="173rpx"
        height="167rpx"
      ></u--image>
      <view class="tit">车行暂未录入违章信息</view>
      <view class="content"
        >如有违章,车行将在还车后的15个工作日左右收到未处理的违章信息(具体时间以各地方交管部门通知为准)，并以电话、短信等方式通知您，请持续关注。如有疑问可<text
          style="color: rgba(85, 160, 243, 1)"
          >咨询车行</text
        ></view
      >
    </view>
  </view>
</template>

<script>
import { getVioList, getDamList } from "@/api/violation";

export default {
  data() {
    return {
      tabsMenu: [
        {
          name: "违章(0)",
        },
        {
          name: "车损(0)",
        },
      ],
      violation: [{ name: 1 }],
      damage: [{ name: 1 }],
      current: 0,
      dataList: [],
      pageNum: 1,
      pageSize: 10,
      loadStatus: "loadmore",
      isLoadMore: false,
    };
  },
  onShow() {
    this.pageNum = 1;
    this.dataList = [];
    this.isLoadMore = false;
    this.loadStatus = "loadmore";
    if (this.current == 0) {
      this.getVioData();
    } else {
      this.getDamData();
    }
    this.getVioDataTotal();
    this.getDamDataTotal();
  },
  onReachBottom() {
    if (!this.isLoadMore) {
      this.isLoadMore = true;
      this.pageNum += 1;
      if (this.current == 0) {
        this.getVioData();
      } else {
        this.getDamDataTotal();
      }
      this.loadStatus = "loading";
    }
  },
  methods: {
    getVioData() {
      uni.showLoading({
        title: "加载中",
      });
      const { pageNum, pageSize } = this;
      getVioList({ pageNum, pageSize }).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          if (res.data && res.data.records) {
            this.dataList = this.dataList.concat(res.data.records);
            if (res.data.records.length < pageSize) {
              this.isLoadMore = true;
              this.loadStatus = "nomore";
            } else {
              this.isLoadMore = false;
              this.loadStatus = "loadmore";
            }
          } else {
            this.isLoadMore = true;
            this.loadStatus = "nomore";
          }
        } else {
          uni.showToast({ title: res.msg, icon: "none" });
          this.isLoadMore = false;
          this.loadStatus = "loadmore";
          if (this.pageNum > 1) {
            this.pageNum -= 1;
          }
        }
      });
    },
    getVioDataTotal() {
      getVioList({ pageNum: 1, pageSize: 999 }).then((res) => {
        if (res.code === 200) {
          this.tabsMenu[0].name = `违章(${res.data.total || 0})`;
        }
      });
    },
    getDamDataTotal() {
      getDamList({ pageNum: 1, pageSize: 999 }).then((res) => {
        if (res.code === 200) {
          this.tabsMenu[1].name = `车损(${res.data.total || 0})`;
        }
      });
    },
    getDamData() {
      uni.showLoading({
        title: "加载中",
      });
      const { pageNum, pageSize } = this;
      getDamList({ pageNum, pageSize }).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          if (res.data && res.data.records) {
            this.dataList = this.dataList.concat(res.data.records);
            if (res.data.records.length < pageSize) {
              this.isLoadMore = true;
              this.loadStatus = "nomore";
            } else {
              this.isLoadMore = false;
              this.loadStatus = "loadmore";
            }
          } else {
            this.isLoadMore = true;
            this.loadStatus = "nomore";
          }
        } else {
          uni.showToast({ title: res.msg, icon: "none" });
          this.isLoadMore = false;
          this.loadStatus = "loadmore";
          if (this.pageNum > 1) {
            this.pageNum -= 1;
          }
        }
      });
    },
    handleLink(id) {
      this.$tab.navigateTo(`/pages/mine/violation/details?id=${id}`);
    },
    handleDamage(id) {
      this.$tab.navigateTo(`/pages/mine/violation/damage?id=${id}`);
    },
    handleTabs(e) {
      this.current = e.index;
      this.pageNum = 1;
      this.dataList = [];
      this.isLoadMore = false;
      this.loadStatus = "loadmore";
      if (e.index == 0) {
        this.getVioData();
      } else {
        this.getDamData();
      }
    },
  },
  computed: {
    scrollH() {
      let sys = uni.getSystemInfoSync();
      let winWidth = sys.windowWidth;
      let winrate = 750 / winWidth;
      let winHeight = parseInt(sys.windowHeight * winrate);
      return winHeight - 66 + "rpx";
    },
    showNoData() {
      const { violation, current, damage } = this;
      if (current == 0 && violation.length === 0) {
        return true;
      }
      if (current == 1 && damage.length === 0) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f6f6f6;
}
.violation_box {
  .header {
    background: #fff;
  }
  .list {
    padding: 16rpx 24rpx 24rpx 24rpx;
    .item {
      border-radius: 20rpx;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 10rpx 0px rgba(240, 240, 240, 0.5);
      padding: 32rpx;
      margin-top: 24rpx;
      .row {
        padding-bottom: 28rpx;
        padding-top: 28rpx;
        border-bottom: 1px solid rgba(237, 237, 237, 1);
        display: flex;
        align-items: center;
        .t1 {
          width: 230rpx;
          font-size: 28rpx;
          color: rgba(112, 112, 112, 1);
        }
        .t2 {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .row2 {
        padding-top: 24rpx;
        display: flex;
        align-items: center;
        .left {
          flex: 1;
          display: flex;
          align-items: center;
          .text {
            margin-left: 14rpx;
            font-size: 28rpx;
          }
        }
        .more {
          width: 176rpx;
          height: 64rpx;
          border-radius: 8rpx;
          border: 1px solid rgba(64, 200, 131, 1);
          line-height: 64rpx;
          text-align: center;
          font-size: 28rpx;
          color: rgba(64, 200, 131, 1);
        }
      }
    }
  }
  .noData {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .tit {
      padding: 60rpx 70rpx 0 70rpx;
      color: rgba(142, 143, 145, 1);
      font-size: 36rpx;
    }
    .content {
      padding: 28rpx 70rpx 0 70rpx;
      color: rgba(142, 143, 145, 1);
      font-size: 28rpx;
      line-height: 36rpx;
    }
  }
  .moreData {
    padding: 30rpx;
  }
}
</style>
