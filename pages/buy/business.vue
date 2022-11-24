<!--
 * @Date: 2022-09-11 10:45:21
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-11 11:36:18
 * @FilePath: 任我行\pages\buy\business.vue
-->
<template>
  <view class="bus_box">
    <u-sticky bgColor="#fff">
      <view class="header">
        <view class="zh">综合</view>
        <view class="num">{{ countData.averageGrade || 0 }}</view>
        <view class="fen">分</view>
        <view class="total">{{ countData.totalNum || 0 }}条评论</view>
        <view class="sort">
          <view class="item active">推荐排序</view>
        </view>
      </view>
      <u-tabs
        :list="tabsMenu"
        :scrollable="false"
        style="padding-bottom: 20rpx"
        :current="current"
        @click="handleTabs"
        :inactiveStyle="{
          fontSize: '24rpx',
        }"
        :activeStyle="{
          color: 'rgba(46, 46, 46, 1)',
          fontWeight: 'bold',
          fontSize: '24rpx',
        }"
        lineColor="rgba(64, 200, 131, 1)"
        :itemStyle="{
          paddingBottom: '20rpx',
          fontSize: '24rpx',
          paddingRight: 0,
          paddingLeft: 0,
          width: '150rpx',
        }"
      ></u-tabs>
    </u-sticky>
    <view class="list">
      <view class="item" v-for="(item, index) in dataList" :key="index">
        <view class="user">
          <u-avatar :src="item.avatar" shape="circle" size="80rpx"></u-avatar>
          <view class="info">
            <view class="phone">{{ item.userName }}</view>
            <view class="comment">
              <u-image
                :src="`/static/images/comment/${item.averageGrade}.png`"
                width="36rpx"
                height="36rpx"
              ></u-image>
              <view class="text"
                >{{ item.averageGrade }}分
                {{ backAverageGradeText(item.averageGrade) }}</view
              >
            </view>
          </view>
          <view class="right">
            <view class="time">{{ item.createTime }} 发表</view>
            <!-- <view class="model">WEY 坦克 300</view> -->
          </view>
        </view>
        <view class="content">{{ item.commentContent }}</view>
        <view class="pics" v-if="item.imgs">
          <view class="img" v-for="(itemp, indexp) in item.imgs" :key="indexp">
            <u-image
              :src="itemp"
              radius="8rpx"
              :width="imgWidth"
              :height="imgWidth"
              @click="handlePreviewImage(indexp, item.imgs)"
            ></u-image>
          </view>
        </view>
        <!-- <view class="give">
          <view class="btn">
            <u-icon
              name="thumb-up"
              color="rgba(196, 196, 196, 1)"
              size="28rpx"
            ></u-icon>
            <view class="text">有用</view>
          </view>
        </view> -->
      </view>
      <view class="more" v-if="dataList.length !== 0">
        <u-loadmore :status="loadStatus" />
      </view>
      <view class="noData" v-if="dataList.length === 0">
        <u--image
          src="/static/icon_no_data.png"
          width="390rpx"
          height="390rpx"
        ></u--image>
        <view class="text">暂无评论</view>
      </view>
    </view>
    <view class="footer">
      <view class="btn" @click="handleBack">返回</view>
    </view>
  </view>
</template>

<script>
import { getCommentPage } from "@/api/comment";

export default {
  data() {
    return {
      tabsMenu: [
        {
          name: "全部",
        },
        {
          name: "有图(0)",
        },
        {
          name: "追评(0)",
        },
        {
          name: "中差评(0)",
        },
        {
          name: "好评(0)",
        },
      ],
      current: 0,
      pageNum: 1,
      pageSize: 10,
      dataList: [],
      loadStatus: "loadmore",
      isLoadMore: false,
      params: {},
      countData: {},
    };
  },
  onLoad() {
    uni.$on("businessComment", (data) => {
      this.params = data;
      uni.setNavigationBarTitle({
        title: data.name,
      });
      this.getData();
    });
  },
  onReachBottom() {
    if (!this.isLoadMore) {
      this.isLoadMore = true;
      this.pageNum += 1;
      this.getData();
      this.loadStatus = "loading";
    }
  },
  onUnload() {
    uni.$off("businessComment");
  },
  methods: {
    handlePreviewImage(current, urls) {
      uni.previewImage({
        current,
        urls,
      });
    },
    backAverageGradeText(num) {
      if (num >= 4) {
        return "好评";
      }
      if (num >= 3) {
        return "中评";
      }
      if (num < 3) {
        return "差评";
      }
      return "-";
    },
    getData() {
      uni.showLoading({
        title: "加载中",
      });
      const { pageNum, pageSize, current, params } = this;
      let searchType = current;
      getCommentPage({
        businessGuid: params.businessGuid,
        carGuid: params.carGuid,
        storeGuid: params.storeGuid,
        pageNum,
        pageSize,
        searchType,
      }).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          if (res.data && res.data.records) {
            if (res.countData) {
              this.countData = res.countData;
              this.tabsMenu = [
                {
                  name: "全部",
                },
                {
                  name: `有图(${res.countData.hasImgNum})`,
                },
                {
                  name: `追评(${res.countData.followNum})`,
                },
                {
                  name: `中差评(${res.countData.badNum})`,
                },
                {
                  name: `好评(${res.countData.goodNum})`,
                },
              ];
            }
            res.data.records.map((item) => {
              item.averageGrade = Math.round(item.averageGrade);
              if (item.averageGrade == 0) {
                item.averageGrade = 1;
              }
              if (item.imgUrl) {
                item.imgs = item.imgUrl.split(",");
              }
            });
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
    handleBack() {
      uni.navigateBack();
    },
    handleTabs(e) {
      this.current = e.index;
      this.pageNum = 1;
      this.dataList = [];
      this.loadStatus = "loadmore";
      this.isLoadMore = false;
      this.getData();
    },
  },
  computed: {
    imgWidth() {
      let sys = uni.getSystemInfoSync();
      let winWidth = sys.windowWidth;
      const winrate = 750 / winWidth;
      return `${((winWidth - 48) / 3) * winrate}rpx`;
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f6f6f6;
}
.bus_box {
  .header {
    display: flex;
    align-items: center;
    padding: 50rpx 32rpx 40rpx 32rpx;
    .zh {
      font-size: 28rpx;
      color: rgba(46, 46, 46, 1);
    }
    .num {
      color: rgba(250, 83, 45, 1);
      font-size: 36rpx;
      font-weight: bold;
      padding-left: 4rpx;
      padding-right: 4rpx;
    }
    .fen {
      font-size: 28rpx;
    }
    .total {
      flex: 1;
      padding-left: 40rpx;
      color: rgba(141, 141, 141, 1);
      font-size: 24rpx;
    }
    .sort {
      display: flex;
      .item {
        padding-left: 16rpx;
        border-right: rgba(236, 236, 236, 1) 1px solid;
        padding-right: 16rpx;
        font-size: 24rpx;
        color: rgba(141, 141, 141, 1);
        &:last-child {
          padding-right: 0;
          border: 0;
        }
      }
      .active {
        color: rgba(64, 200, 131, 1);
      }
    }
  }
  .more {
    padding: 30rpx;
  }
  .list {
    width: 100%;
    overflow: hidden;
    padding-bottom: 142rpx;
    .item {
      background: #fff;
      margin-top: 20rpx;
      padding: 32rpx;
      .user {
        padding-top: 8rpx;
        padding-bottom: 32rpx;
        border-bottom: rgba(237, 237, 237, 1) 1px solid;
        display: flex;
        align-items: center;
        .info {
          flex: 1;
          padding-left: 12rpx;
          .phone {
            color: rgba(46, 46, 46, 1);
            font-size: 24rpx;
            padding-bottom: 8rpx;
          }
          .comment {
            float: left;
            border-radius: 20rpx;
            background: rgba(253, 243, 194, 1);
            display: flex;
            align-items: center;
            .text {
              font-size: 24rpx;
              padding-left: 16rpx;
              padding-right: 16rpx;
            }
          }
        }
        .right {
          color: rgba(135, 139, 138, 1);
          font-size: 24rpx;
          .model {
            padding-top: 10rpx;
          }
        }
      }
      .content {
        padding-top: 28rpx;
        line-height: 36rpx;
        font-size: 26rpx;
        color: rgba(46, 46, 46, 1);
      }
      .pics {
        display: flex;
        flex-wrap: wrap;
        margin-right: -16rpx;
        padding-bottom: 24rpx;
        overflow: hidden;
        .img {
          margin: 16rpx 16rpx 0 0;
        }
      }
      .give {
        display: flex;
        flex-direction: row-reverse;
        .btn {
          height: 52rpx;
          border-radius: 12rpx;
          border: 1px solid rgba(207, 207, 207, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 16rpx;
          padding-right: 16rpx;
          .text {
            color: rgba(137, 140, 139, 1);
            font-size: 28rpx;
            margin-left: 8rpx;
          }
        }
      }
    }
  }
  .footer {
    width: 100%;
    height: 140rpx;
    border-top: #f1f1f1 1px solid;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    .btn {
      width: 686rpx;
      height: 88rpx;
      border-radius: 12rpx;
      background: rgba(64, 200, 131, 1);
      border: 1px solid rgba(64, 200, 131, 1);
      line-height: 88rpx;
      text-align: center;
      color: #fff;
      font-size: 32rpx;
      margin: 20rpx auto;
    }
  }
  .noData {
    height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .text {
      font-size: 28rpx;
      padding-top: 50rpx;
      color: #808080;
    }
  }
}
</style>
