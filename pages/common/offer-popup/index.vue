<template>
  <u-popup :show="show" @close="close" round="32rpx" mode="bottom">
    <view class="offer_pop_box">
      <view class="close" @click="close">
        <u-icon name="close" color="rgba(78, 89, 105, 1)" size="32rpx"></u-icon>
      </view>
      <view class="offer_header">
        <view class="car">
          <u-image
            :src="offer.info.pic"
            width="172rpx"
            height="88rpx"
          ></u-image>
          <view class="info">
            <view class="text">{{ offer.info.name }}</view>
            <view class="des">{{ offer.info.des }}</view>
          </view>
        </view>
        <view class="tabs">
          <view
            v-for="(item, index) in offer.info.year"
            :key="index"
            :class="{ item: true, active: item.active }"
            @click="handleTabs(item.name, index)"
            >{{ item.name }}款</view
          >
        </view>
      </view>
      <scroll-view
        scroll-y="true"
        class="offer_warp"
        :style="{ height: offer.list.length > 2 ? '820rpx' : 'auto' }"
      >
        <view
          class="item"
          v-for="(item, index) in offer.list"
          :key="index"
          @click="handleToConfirm(item)"
        >
          <view class="title">
            <view class="left">
              <view class="text">{{ item.storeName }}</view>
              <view class="more">
                <u-icon
                  name="arrow-right"
                  color="rgba(140, 140, 140, 1)"
                  size="14rpx"
                ></u-icon>
              </view>
            </view>
            <view class="num" v-if="!item.source || item.source !== 'wk'"
              >{{ item.commentNum }}条评论</view
            >
            <view class="df" v-if="!item.source || item.source !== 'wk'">{{
              toFiex(item.grade)
            }}</view>
            <view class="fen" v-if="!item.source || item.source !== 'wk'"
              >分</view
            >
          </view>
          <view class="info">{{ item.labelA }}</view>
          <view class="mood">
            <view
              class="sub"
              v-for="(yitem, yindex) in item.labelsB"
              :key="yindex"
              >{{ yitem }}</view
            >
          </view>
          <view class="icons">
            <view
              v-for="(titem, tindex) in item.labels"
              :key="tindex"
              :class="{ sub: true, sxz: titem === '随心租' }"
            >
              <u-image
                src="@/static/images/car/sxz.png"
                width="84rpx"
                height="32rpx"
                v-if="titem === '随心租'"
              ></u-image>
              <text v-else>{{ titem }}</text>
            </view>
          </view>
          <view class="average"
            >日均 ¥ <text class="num">{{ item.price }}</text></view
          >
          <view class="offer">
            <!-- <view class="num">车辆已消毒</view> -->
            <view class="num"></view>
            <view class="total">总价¥{{ item.amount }}起</view>
          </view>
        </view>
      </scroll-view>
    </view>
  </u-popup>
</template>

<script>
import props from "./props.js";
import { isLogin } from "@/utils/common";

export default {
  mixins: [props],
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit("close");
    },
    toFiex(num) {
      return Number(num).toFixed(1);
    },
    handleTabs(year, index) {
      this.$emit("handleTabs", { year, index });
    },
    handleToConfirm(row) {
      if (isLogin()) {
        const { params, carinfoGuid, isOtherAddress } = this;
        setTimeout(() => {
          uni.$emit("buyParams", {
            ...params,
            isOtherAddress,
            carinfoGuid,
            businessGuid: row.businessGuid,
            storeGuid: row.storeGuid,
          });
        }, 500);
        uni.navigateTo({
          url: `/pages/order/buy`,
        });
      } else {
        uni.navigateTo({
          url: "/pages/login",
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.offer_pop_box {
  position: relative;
  .offer_header {
    padding: 32rpx 32rpx 10rpx 32rpx;
    border-bottom: #f1f1f1 1px solid;
    .car {
      display: flex;
      align-items: center;
      padding-bottom: 28rpx;
      .info {
        flex: 1;
        padding-left: 24rpx;
        .text {
          color: rgba(46, 46, 46, 1);
          font-size: 28rpx;
          font-weight: bold;
        }
        .des {
          padding-top: 12rpx;
          color: rgba(166, 166, 166, 1);
          font-size: 24rpx;
        }
      }
    }
    .tabs {
      display: flex;
      align-items: center;
      .item {
        width: 136rpx;
        height: 54rpx;
        border-radius: 8rpx;
        background: rgba(246, 246, 246, 1);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24rpx;
        margin-right: 8rpx;
      }
      .active {
        background: rgba(224, 255, 244, 1);
        color: rgba(64, 200, 131, 1);
      }
    }
  }
  .close {
    position: absolute;
    top: 44rpx;
    right: 40rpx;
    z-index: 20;
  }
  .offer_warp {
    width: 100%;
    background: rgba(249, 249, 249, 1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .item {
      padding: 32rpx;
      margin-bottom: 16rpx;
      background: #fff;
      .title {
        display: flex;
        align-items: center;
        .left {
          flex: 1;
          display: flex;
          align-items: center;
          .text {
            color: rgba(46, 46, 46, 1);
            font-size: 28rpx;
            font-weight: bold;
          }
          .more {
            width: 28rpx;
            height: 28rpx;
            border: 1px solid rgba(204, 204, 204, 1);
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 14rpx;
            border-radius: 50%;
          }
        }
        .num {
          font-size: 24rpx;
        }
        .df {
          font-size: 32rpx;
          margin-left: 28rpx;
          font-weight: bold;
        }
        .fen {
          font-size: 24rpx;
        }
      }
      .info {
        padding-top: 28rpx;
        font-size: 24rpx;
        padding-bottom: 4rpx;
      }
      .mood {
        width: 100%;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        .sub {
          height: 40rpx;
          padding-left: 8rpx;
          padding-right: 8rpx;
          line-height: 40rpx;
          border: 1px solid rgba(227, 227, 227, 1);
          margin: 12rpx 12rpx 0 0;
          font-size: 24rpx;
        }
      }
      .icons {
        padding-bottom: 20rpx;
        display: flex;
        flex-wrap: wrap;
        .sub {
          height: 40rpx;
          border-radius: 4rpx;
          border: 1px solid rgba(227, 227, 227, 1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(64, 200, 131, 1);
          font-size: 24rpx;
          margin: 12rpx 12rpx 0 0;
          padding-left: 8rpx;
          padding-right: 8rpx;
        }
        .sxz {
          background: rgba(64, 200, 131, 1);
          border: 1px solid rgba(64, 200, 131, 1);
        }
      }
      .average {
        text-align: right;
        font-size: 24rpx;
        color: rgba(250, 67, 67, 1);
        .num {
          font-size: 40rpx;
        }
      }
      .offer {
        display: flex;
        padding-top: 12rpx;
        .num {
          flex: 1;
          font-size: 24rpx;
        }
        .total {
          font-size: 24rpx;
        }
      }
    }
  }
}
</style>
