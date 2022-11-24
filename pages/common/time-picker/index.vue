<!--
 * @Date: 2022-09-06 08:50:57
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-03 20:45:29
 * @FilePath: 任我行\pages\common\time-picker\index.vue
-->
<template>
  <u-popup
    :show="show"
    round="32rpx"
    mode="bottom"
    @close="close"
    :customStyle="{ boxShadow: '0 0 16rpx #ccc' }"
  >
    <view class="time_pop_box">
      <view class="title">取还车时间</view>
      <view class="icon" @click="close">
        <u-icon name="close" color="rgba(78, 89, 105, 1)" size="28rpx"></u-icon>
      </view>
      <view class="tabs">
        <view
          :class="{ item: true, active: currentTab === 0 }"
          @click="handleItem(0)"
        >
          <view class="text">取车时间</view>
          <view class="time">{{ formatTime(selected.startTime) }}</view>
        </view>
        <view
          :class="{ item: true, active: currentTab === 1 }"
          @click="handleItem(1)"
        >
          <view class="text">还车时间</view>
          <view class="time">{{ formatTime(selected.endTime) }}</view>
        </view>
      </view>
      <picker-view
        :value="pickerValue"
        class="picker-view"
        @change="bindChange"
        :indicator-style="indicatorStyle"
      >
        <picker-view-column class="picker-item1">
          <view class="item" v-for="(item, index) in dateData" :key="index">{{
            item
          }}</view>
        </picker-view-column>
        <picker-view-column class="picker-item2">
          <view class="item" v-for="(item, index) in hourData" :key="index">{{
            item
          }}</view>
        </picker-view-column>
        <picker-view-column class="picker-item3">
          <view class="item" v-for="(item, index) in minuteData" :key="index">{{
            item
          }}</view>
        </picker-view-column>
      </picker-view>
      <view class="buttonBox">
        <view class="btn" @click="confirm">确定</view>
      </view>
    </view>
  </u-popup>
</template>

<script>
import props from "./props.js";
import moment from "moment";
moment.locale("zh-cn");

export default {
  mixins: [props],
  data() {
    const hourData = [];
    for (let i = 0; i < 24; i++) {
      if (i < 10) {
        hourData.push(`0${i}`);
      } else {
        hourData.push(`${i}`);
      }
    }
    return {
      dateData: this.backDateData(new Date(), 60),
      hourData,
      minuteData: this.backMinuteData(),
      currentYear: moment().format("YYYY"),
      selected: {
        startTime: moment().format("YYYY-MM-DD HH:mm:ss"),
        endTime: moment().subtract(-1, "days").format("YYYY-MM-DD HH:mm:ss"),
      },
      currentTab: 0,
      pickerValue: [
        0,
        Number(moment().format("HH")),
        Number(moment().format("mm")),
      ],
      indicatorStyle: `height: 80rpx;`,
    };
  },
  methods: {
    backDateData(time, range) {
      const currentYear = moment().format("YYYY");
      const dateData = [];
      for (let i = 0; i < range; i++) {
        const lastYear = moment(time)
          .subtract(0 - i, "days")
          .format("YYYY");
        if (currentYear === lastYear) {
          dateData.push(
            moment(time)
              .subtract(0 - i, "days")
              .format("MM月DD日 dddd")
          );
        } else {
          dateData.push(
            moment(time)
              .subtract(0 - i, "days")
              .format("YYYY年MM月DD日 dddd")
          );
        }
      }
      return dateData;
    },
    backMinuteData() {
      const minuteData = [];
      for (let i = 0; i < 60; i++) {
        if (i < 10) {
          minuteData.push(`0${i}`);
        } else {
          minuteData.push(`${i}`);
        }
      }
      return minuteData;
    },
    close() {
      this.$emit("close");
    },
    // 点击确定按钮
    confirm() {
      this.$emit("confirm", this.selected);
    },
    replaceTime(time) {
      const { currentYear } = this;
      let fullTime = time;
      if (time.indexOf("年") == -1) {
        fullTime = `${currentYear}年${time}`;
      }
      const year = fullTime.replace("年", "-");
      const month = year.replace("月", "-");
      const day = month.replace("日", "");
      const index = day.indexOf(" ");
      return day.substring(0, index);
    },
    handleItem(index) {
      this.currentTab = index;
      const { selected, hourData, minuteData } = this;
      if (index === 1) {
        const lastTime = moment(selected.startTime)
          .subtract(-1, "days")
          .format("YYYY-MM-DD HH:mm:ss");
        const dateData = this.backDateData(lastTime, 60);
        this.dateData = dateData;
        this.pickerValue = [
          0,
          Number(moment().format("HH")) - 1,
          Number(moment().format("mm")),
        ];
        this.selected.endTime = lastTime;
        this.formatTimeToCheckValue(lastTime, dateData, 0);
        this.formatTimeToCheckValue(lastTime, hourData, 1);
        this.formatTimeToCheckValue(lastTime, minuteData, 2);
      } else {
        const dateData = this.backDateData(new Date(), 60);
        this.dateData = dateData;
        this.formatTimeToCheckValue(selected.startTime, dateData, 0);
        this.formatTimeToCheckValue(selected.startTime, hourData, 1);
        this.formatTimeToCheckValue(selected.startTime, minuteData, 2);
      }
    },
    formatTimeToCheckValue(date, data, type) {
      const { currentYear } = this;
      const year = moment(date).format("YYYY");
      let time = "";
      if (type === 0) {
        if (year === currentYear) {
          time = moment(date).format("MM月DD日 dddd");
        } else {
          time = moment(date).format("YYYY年MM月DD日 dddd");
        }
      }
      if (type === 1) {
        time = moment(date).format("HH");
      }
      if (type === 2) {
        time = moment(date).format("mm");
      }
      data.map((item, index) => {
        if (time === item) {
          const pickerValue = [...this.pickerValue];
          pickerValue[type] = index;
          this.pickerValue = pickerValue;
        }
      });
    },
    formatTime(time) {
      return moment(time).format("MM月DD日 HH:mm");
    },
    bindChange(e) {
      const val = e.detail.value;
      const { dateData, currentTab, replaceTime, hourData, minuteData } = this;
      const time = replaceTime(`${dateData[val[0]]}`);
      const hour = hourData[val[1]];
      const minute = minuteData[val[2]];
      if (currentTab === 0) {
        this.selected.startTime = `${time} ${hour}:${minute}:00`;
        this.selected.endTime = moment(`${time} ${hour}:${minute}:00`)
          .subtract(-1, "days")
          .format("YYYY-MM-DD HH:mm:ss");
      } else {
        this.selected.endTime = `${time} ${hour}:${minute}:00`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.time_pop_box {
  width: 100%;
  position: relative;
  .title {
    padding-top: 36rpx;
    padding-bottom: 32rpx;
    text-align: center;
    width: 100%;
    color: rgba(46, 46, 46, 1);
    font-size: 36rpx;
  }
  .icon {
    position: absolute;
    top: 46rpx;
    right: 38rpx;
    z-index: 999;
  }
  .tabs {
    width: 100%;
    display: flex;
    .item {
      flex: 1;
      height: 108rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: rgba(247, 248, 250, 1);
      .text {
        font-size: 24rpx;
        color: rgba(46, 46, 46, 1);
        padding-bottom: 8rpx;
      }
      .time {
        font-size: 28rpx;
        color: rgba(46, 46, 46, 1);
        font-weight: bold;
      }
    }
    .active {
      background: rgba(227, 255, 241, 1);
      .text {
        color: rgba(64, 200, 131, 1);
      }
      .time {
        color: rgba(64, 200, 131, 1);
      }
    }
  }
  .picker-view {
    width: 750rpx;
    height: 480rpx;
    .item {
      height: 80rpx;
      align-items: center;
      justify-content: center;
      text-align: center;
      display: flex;
    }
  }
  .picker-item1 {
    width: 376rpx;
    flex: none;
  }
  .picker-item2 {
    width: 40rpx;
    margin-left: 140rpx;
    flex: none;
  }
  .picker-item3 {
    width: 40rpx;
    margin-left: 32rpx;
    flex: none;
  }
  .buttonBox {
    padding: 28rpx 32rpx 28rpx 32rpx;
    background: #fff;
    border-top: rgba($color: #000000, $alpha: 0.1) 1px solid;
    .btn {
      width: 100%;
      height: 88rpx;
      border-radius: 12rpx;
      background: rgba(64, 200, 131, 1);
      border: 1px solid rgba(64, 200, 131, 1);
      color: rgba(255, 255, 255, 1);
      font-size: 32rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
