<!--
 * @Date: 2022-09-17 15:10:49
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-19 21:44:23
 * @FilePath: \小程序\pages\common\business-popup\index.vue
-->
<template>
  <u-popup :show="show" @close="close" round="32rpx" mode="bottom">
    <view class="busin_pop_box">
      <view class="title">{{ name }}</view>
      <view class="close" @click="close">
        <u-icon name="close" color="rgba(78, 89, 105, 1)" size="32rpx"></u-icon>
      </view>
      <u-tabs
        :list="tabsMenu"
        :scrollable="false"
        @click="handleTabs"
        :current="current"
        :activeStyle="{
          color: 'rgba(46, 46, 46, 1)',
          fontWeight: 'bold',
        }"
        lineColor="rgba(64, 200, 131, 1)"
        :itemStyle="{ paddingBottom: '20rpx', width: '375rpx' }"
      ></u-tabs>
      <view class="main">
        <view class="cont" v-if="current == 0">
          <view class="comment_tit">
            <view class="text">用户评价</view>
            <view class="zh">综合</view>
            <view class="num">{{
              commentData.countData && commentData.countData.averageGrade
                ? commentData.countData.averageGrade
                : 0
            }}</view>
            <view class="fen">分</view>
            <view class="total"
              >{{
                commentData.countData && commentData.countData.totalNum
                  ? commentData.countData.totalNum
                  : 0
              }}+条评论</view
            >
          </view>
          <view class="comment_list">
            <view
              class="item"
              v-for="(item, index) in commentData.data &&
              commentData.data.records
                ? commentData.data.records
                : []"
              :key="index"
            >
              <view class="user">
                <u-avatar
                  :src="item.avatar"
                  shape="circle"
                  size="80rpx"
                ></u-avatar>
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
                <view class="time">{{ item.createTime }}</view>
              </view>
              <view class="content">{{ item.commentContent }}</view>
            </view>
          </view>
          <view class="comment_more" @click="handleMoreCom">查看全部评论</view>
        </view>
        <!-- <view class="cont" v-if="current == 0">
          <view class="rule_title">
            <view class="text">门店政策</view>
            <view class="more" @click="handleXuZhi">更多</view>
            <u-icon
              name="arrow-right"
              color="rgba(186, 186, 186, 1)"
              size="28rpx"
              @click="handleXuZhi"
            ></u-icon>
          </view>
          <view class="rule_sub">取消规则</view>
          <view class="rule_table">
            <view class="head">
              <view class="col w1">取消时间</view>
              <view class="col w2">扣费标注</view>
            </view>
            <view class="body">
              <view class="col w1">2022-02-08 18:00前取消</view>
              <view class="col w2">免费取消</view>
            </view>
            <view class="body">
              <view class="col w1">2022-02-08 18:00前取消</view>
              <view class="col w2">免费取消</view>
            </view>
            <view class="body">
              <view class="col w1" style="border-bottom: 0"
                >2022-02-08 18:00前取消</view
              >
              <view class="col w2" style="border-bottom: 0">订单费用100</view>
            </view>
          </view>
          <view class="rule_sub">里程限制</view>
          <view class="rule_content">
            <rich-text :nodes="strToArrHtml('不限制里程')"></rich-text>
          </view>
          <view class="rule_sub">禁行区域</view>
          <view class="rule_content">
            <rich-text
              :nodes="
                strToArrHtml(
                  '车辆并不允许驶出四川省，并禁止驶入藏区、甘孜、阿坝州、四姑娘、凉山等地区，以取车门店告知的规则为准。'
                )
              "
            ></rich-text>
          </view>
          <view class="rule_sub">发票</view>
          <view class="rule_content">
            <rich-text
              :nodes="strToArrHtml('如需租车发票，请联系租车门店开具。')"
            ></rich-text>
          </view>
        </view> -->
      </view>
    </view>
  </u-popup>
</template>

<script>
import props from "./props.js";
import parseHtml from "@/utils/parseHtml";

export default {
  name: "BusinessPopup",
  mixins: [props],
  data() {
    return {
      tabsMenu: [
        // {
        //   name: "订单须知",
        // },
        {
          name: "用户评价",
        },
      ],
      current: 0,
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    handleTabs(e) {
      this.current = e.index;
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
    handleXuZhi() {
      uni.navigateTo({
        url: `/pages/understood/index`,
      });
    },
    handleMoreCom() {
      const { businessGuid, carinfoGuid, name, storeGuid } = this;
      setTimeout(() => {
        uni.$emit("businessComment", {
          carinfoGuid,
          businessGuid,
          storeGuid,
          name,
        });
      }, 300);
      uni.navigateTo({
        url: `/pages/buy/business`,
      });
    },
    strToArrHtml(str) {
      return parseHtml(str);
    },
  },
};
</script>

<style lang="scss" scoped>
.busin_pop_box {
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
  .main {
    background: rgba(246, 246, 246, 1);
    padding: 24rpx;
  }
  .cont {
    border-radius: 20rpx;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 10rpx 0px rgba(240, 240, 240, 0.5);
    padding: 24rpx;
  }
  .comment_tit {
    display: flex;
    align-items: center;
    .text {
      color: rgba(46, 46, 46, 1);
      font-size: 32rpx;
      font-weight: bold;
    }
    .zh {
      font-size: 28rpx;
      margin-left: 32rpx;
    }
    .num {
      padding-left: 4rpx;
      padding-right: 4rpx;
      font-size: 36rpx;
      font-weight: bold;
    }
    .fen {
      font-size: 28rpx;
    }
    .total {
      color: rgba(85, 160, 243, 1);
      font-size: 24rpx;
      flex: 1;
      text-align: right;
    }
  }
  .comment_list {
    overflow: hidden;
    clear: both;
    .item {
      padding-top: 40rpx;
      padding-bottom: 40rpx;
      border-bottom: rgba(237, 237, 237, 1) 1px solid;
      .user {
        display: flex;
        .info {
          flex: 1;
          padding-left: 12rpx;
          .phone {
            padding-top: 8rpx;
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
        .time {
          color: rgba(135, 139, 138, 1);
          font-size: 28rpx;
        }
      }
      .content {
        padding-top: 36rpx;
        font-size: 26rpx;
        line-height: 36rpx;
      }
      &:last-child {
        border: 0;
      }
    }
  }
  .comment_more {
    width: 224rpx;
    height: 64rpx;
    border-radius: 8rpx;
    border: 1px solid rgba(64, 200, 131, 1);
    color: rgba(64, 200, 131, 1);
    font-size: 28rpx;
    line-height: 64rpx;
    text-align: center;
    margin: 40rpx auto;
  }
  .rule_title {
    display: flex;
    align-items: center;
    .text {
      color: rgba(46, 46, 46, 1);
      font-size: 36rpx;
      font-weight: bold;
      flex: 1;
    }
    .more {
      color: rgba(137, 140, 139, 1);
      font-size: 28rpx;
      margin-right: 10rpx;
    }
  }
  .rule_sub {
    padding-top: 44rpx;
    color: rgba(46, 46, 46, 1);
    font-size: 28rpx;
    font-weight: bold;
    padding-bottom: 20rpx;
  }
  .rule_table {
    border: 1px solid rgba(234, 234, 234, 1);
    border-radius: 16rpx;
    font-size: 24rpx;
    .head,
    .body {
      display: flex;
      .col {
        height: 64rpx;
        border-bottom: 1px solid rgba(234, 234, 234, 1);
        border-right: 1px solid rgba(234, 234, 234, 1);
        line-height: 64rpx;
        text-align: center;
        color: rgba(123, 123, 123, 1);
        background: rgba(245, 245, 245, 1);
      }
      .w1 {
        flex: 1;
      }
      .w2 {
        width: 236rpx;
        border-right: 0;
      }
    }
    .body {
      .col {
        background: #fff;
        color: rgba(46, 46, 46, 1);
      }
    }
  }
  .rule_content {
    font-size: 24rpx;
    line-height: 48rpx;
    color: rgba(123, 123, 123, 1);
  }
}
</style>
