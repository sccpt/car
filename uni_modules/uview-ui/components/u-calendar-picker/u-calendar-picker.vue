<template>
  <u-popup
    :show="show"
    mode="bottom"
    closeable
    @close="close"
    :round="round"
    :closeOnClickOverlay="closeOnClickOverlay"
  >
    <view class="u-calendar">
      <uHeader
        :title="title"
        :subtitle="subtitle"
        :showSubtitle="showSubtitle"
        :showTitle="showTitle"
      ></uHeader>
      <scroll-view
        :style="{
          height: $u.addUnit(listHeight),
        }"
        scroll-y
        @scroll="onScroll"
        :scroll-top="scrollTop"
        :scrollIntoView="scrollIntoView"
      >
        <uMonth
          :color="color"
          :rowHeight="rowHeight"
          :showMark="showMark"
          :months="months"
          :mode="mode"
          :maxCount="maxCount"
          :startText="startText"
          :endText="endText"
          :defaultDate="defaultDate"
          :minDate="innerMinDate"
          :maxDate="innerMaxDate"
          :maxMonth="monthNum"
          :readonly="readonly"
          :maxRange="maxRange"
          :rangePrompt="rangePrompt"
          :showRangePrompt="showRangePrompt"
          :allowSameDay="allowSameDay"
          ref="month"
          @monthSelected="monthSelected"
          @updateMonthTop="updateMonthTop"
        ></uMonth>
      </scroll-view>
      <slot name="footer" v-if="showConfirm">
        <view class="u-calendar__confirm">
          <view class="u_calendar_date">
            <view
              :class="
                !buttonDisabled
                  ? 'u_calendar_date_main'
                  : 'u_calendar_date_main_d'
              "
            >
              <view v-if="!buttonDisabled" class="u_calendar_date_icon">
                <image
                  :src="
                    showPickerDate
                      ? '/static/images/date_down.png'
                      : '/static/images/date_up.png'
                  "
                  mode="scaleToFill"
                  @click="showPickerDate = !showPickerDate"
                />
              </view>
              <view class="c_col">
                <view class="c_title">????????????</view>
                <view
                  class="c_time_main"
                  style="border-right: #f1f1f1 1px solid"
                >
                  <picker-view
                    :value="pickerValueStart"
                    class="picker-view"
                    @change="(e) => bindChange(e, 'start')"
                    :indicator-style="indicatorStyle"
                    v-if="!buttonDisabled && showPickerDate"
                  >
                    <picker-view-column>
                      <view
                        class="item"
                        v-for="(item, index) in hourData"
                        :key="index"
                        >{{ item }}</view
                      >
                    </picker-view-column>
                    <picker-view-column>
                      <view
                        class="item"
                        v-for="(item, index) in minuteData"
                        :key="index"
                        >{{ item }}</view
                      >
                    </picker-view-column>
                  </picker-view>
                  <view
                    class="c_time_cont"
                    @click="showPickerDate = true"
                    v-else
                  >
                    <view class="c_time_date">{{ selectedDate[0] }}</view>
                    <u-icon
                      name="arrow-down-fill"
                      :color="!buttonDisabled ? '#343434' : '#999'"
                      size="20rpx"
                    ></u-icon>
                  </view>
                </view>
              </view>
              <view class="c_col">
                <view class="c_title">????????????</view>
                <view class="c_time_main">
                  <picker-view
                    :value="pickerValueEnd"
                    class="picker-view"
                    @change="(e) => bindChange(e, 'end')"
                    :indicator-style="indicatorStyle"
                    v-if="!buttonDisabled && showPickerDate"
                  >
                    <picker-view-column>
                      <view
                        class="item"
                        v-for="(item, index) in hourData"
                        :key="index"
                        >{{ item }}</view
                      >
                    </picker-view-column>
                    <picker-view-column>
                      <view
                        class="item"
                        v-for="(item, index) in minuteData"
                        :key="index"
                        >{{ item }}</view
                      >
                    </picker-view-column>
                  </picker-view>
                  <view
                    class="c_time_cont"
                    @click="showPickerDate = true"
                    v-else
                  >
                    <view class="c_time_date">{{ selectedDate[1] }}</view>
                    <u-icon
                      name="arrow-down-fill"
                      :color="!buttonDisabled ? '#343434' : '#999'"
                      size="20rpx"
                    ></u-icon>
                  </view>
                </view>
              </view>
            </view>
          </view>
          <view class="u_calendar_footer_checked">
            <view class="row"
              >?????? <text v-if="innerStartTime">{{ innerStartTime }}</text>
              <text style="color: #999" v-else>?????????????????????</text></view
            >
            <view class="row"
              >??????<text v-if="innerEndTime">{{ innerEndTime }}</text>
              <text style="color: #999" v-else>?????????????????????</text>
            </view>
          </view>
          <view class="u_calendar_footer_btn">
            <u-button
              shape="circle"
              :text="buttonDisabled ? confirmDisabledText : confirmText"
              :color="color"
              @click="confirm"
              :disabled="buttonDisabled"
            ></u-button>
          </view>
        </view>
      </slot>
    </view>
  </u-popup>
</template>

<script>
import uHeader from "./header.vue";
import uMonth from "./month.vue";
import props from "./props.js";
import util from "./util.js";
import dayjs from "../../libs/util/dayjs.js";
import Calendar from "../../libs/util/calendar.js";
import moment from "moment";

/**
 * Calendar ??????
 * @description  ??????????????????????????????????????????????????????????????????????????????????????????????????????.
 * @tutorial https://www.uviewui.com/components/calendar.html
 *
 * @property {String}				title				???????????? (?????? ???????????? )
 * @property {Boolean}				showTitle			??????????????????  (?????? true )
 * @property {Boolean}				showSubtitle		?????????????????????	(?????? true )
 * @property {String}				mode				??????????????????  single-?????????????????????multiple-???????????????????????????range-?????????????????? ??? ?????? 'single' )
 * @property {String}				startText			mode=range??????????????????????????????????????????  (?????? '??????' )
 * @property {String}				endText				mode=range????????????????????????????????????????????? (?????? '??????' )
 * @property {Array}				customList			???????????????
 * @property {String}				color				????????????????????????????????????????????????  (?????? ???#3c9cff' )
 * @property {String | Number}		minDate				?????????????????????	 (?????? 0 )
 * @property {String | Number}		maxDate				??????????????????  (?????? 0 )
 * @property {Array | String| Date}	defaultDate			????????????????????????mode???multiple???range????????????????????????
 * @property {String | Number}		maxCount			mode=multiple?????????????????????????????????  (?????? 	Number.MAX_SAFE_INTEGER  )
 * @property {String | Number}		rowHeight			???????????? (?????? 56 )
 * @property {Function}				formatter			?????????????????????
 * @property {Boolean}				showLunar			??????????????????  (?????? false )
 * @property {Boolean}				showMark			??????????????????????????? (?????? true )
 * @property {String}				confirmText			????????????????????? (?????? '??????' )
 * @property {String}				confirmDisabledText	?????????????????????????????????????????? (?????? '??????' )
 * @property {Boolean}				show				???????????????????????? (?????? false )
 * @property {Boolean}				closeOnClickOverlay	???????????????????????????????????? (?????? false )
 * @property {Boolean}				readonly	        ????????????????????????????????????????????????????????? (?????? false )
 * @property {String | Number}		maxRange	        ???????????????????????????????????????????????????mode = range?????????
 * @property {String}				rangePrompt	        ?????????????????????????????????????????????????????????mode = range?????????
 * @property {Boolean}				showRangePrompt	    ?????????????????????????????????????????????????????????????????????mode = range????????? (?????? true )
 * @property {Boolean}				allowSameDay	    ??????????????????????????????????????????????????????mode = range????????? (?????? false )
 * @property {Number|String}	    round				???????????????????????????  (?????? 0 )
 * @property {Number|String}	    monthNum			???????????????????????????  (?????? 3 )
 *
 * @event {Function()} confirm 		???????????????????????????		?????????????????????????????????
 * @event {Function()} close 		?????????????????????			???????????????????????????????????????
 * @example <u-calendar  :defaultDate="defaultDateMultiple" :show="show" mode="multiple" @confirm="confirm">
	</u-calendar>
 * */
const hourData = [];
for (let i = 0; i < 24; i++) {
  if (i < 10) {
    hourData.push(`0${i}`);
  } else {
    hourData.push(`${i}`);
  }
}
const minuteData = [];
for (let i = 0; i < 60; i++) {
  if (i < 10) {
    minuteData.push(`0${i}`);
  } else {
    minuteData.push(`${i}`);
  }
}
export default {
  name: "u-calendar-picker",
  mixins: [uni.$u.mpMixin, uni.$u.mixin, props],
  components: {
    uHeader,
    uMonth,
  },
  data() {
    return {
      // ??????????????????????????????
      months: [],
      // ???????????????????????????????????????????????????index??????
      monthIndex: 0,
      // ???????????????????????????
      listHeight: 0,
      // month??????????????????????????????
      selected: [],
      selectedDate: [],
      scrollIntoView: "",
      scrollTop: 0,
      // ??????????????????
      innerFormatter: (value) => value,
      hourData,
      minuteData,
      showPickerDate: true,
      indicatorStyle: `height: 60rpx;`,
      pickerValueStart: [
        Number(moment().format("HH")),
        Number(moment().format("mm")),
      ],
      pickerValueEnd: [
        Number(moment().format("HH")),
        Number(moment().format("mm")),
      ],
      defaultDate: [],
    };
  },
  watch: {
    selectedChange: {
      immediate: true,
      handler(n) {
        this.setMonth();
      },
    },
    // ????????????????????????????????????
    show: {
      immediate: true,
      handler(n) {
        this.setMonth();
      },
    },
  },
  computed: {
    innerStartTime() {
      if (this.selected.length > 0) {
        const nowYear = moment().format("YYYY");
        const startTimeArr = this.selected[0].split("-");
        if (nowYear !== startTimeArr[0]) {
          return `${moment(this.selected[0]).format("YYYY???MM???DD???")} ${
            this.selectedDate[0]
          }`;
        }
        return `${moment(this.selected[0]).format("MM???DD???")} ${
          this.selectedDate[0]
        }`;
      }
      return "";
    },
    innerEndTime() {
      const { selected, selectedDate } = this;
      if (selected.length > 1) {
        const endTime = selected[selected.length - 1];
        const d1 = moment(selected[0]);
        const d2 = moment(endTime);
        const diffDay = d2.diff(d1, "day");
        const nowYear = moment().format("YYYY");
        const endTimeArr = endTime.split("-");
        if (diffDay != 0) {
          if (nowYear !== endTimeArr[0]) {
            return `${moment(endTime).format("YYYY???MM???DD???")} ${
              selectedDate[1]
            } (???${diffDay}???)`;
          }
          return `${moment(endTime).format("MM???DD???")} ${
            selectedDate[1]
          } (???${diffDay}???)`;
        }
        if (nowYear !== endTimeArr[0]) {
          return `${moment(endTime).format("YYYY???MM???DD???")} ${
            selectedDate[1]
          }`;
        }
        return `${moment(endTime).format("MM???DD???")} ${selectedDate[1]}`;
      }
      return "";
    },
    innerMaxDate() {
      return uni.$u.test.number(this.maxDate)
        ? Number(this.maxDate)
        : this.maxDate;
    },
    innerMinDate() {
      return uni.$u.test.number(this.minDate)
        ? Number(this.minDate)
        : this.minDate;
    },
    selectedChange() {
      return [this.innerMinDate, this.innerMaxDate, this.defaultDate];
    },
    subtitle() {
      if (this.months.length) {
        return `${this.months[this.monthIndex].year}???${
          this.months[this.monthIndex].month
        }???`;
      } else {
        return "";
      }
    },
    buttonDisabled() {
      if (this.mode === "range") {
        if (this.selected.length <= 1) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
  },
  created() {
    this.start = Date.now();
    this.init();
  },
  methods: {
    getTimeTwo(start, end) {
      let diffdate = new Array();
      let arr = [];
      let i = 0;
      while (start <= end) {
        diffdate[i] = start;
        let stime_ts = new Date(start).getTime();
        let next_date = stime_ts + 24 * 60 * 60 * 1000;
        let next_dates_y = new Date(next_date).getFullYear() + "-";
        let next_dates_m =
          new Date(next_date).getMonth() + 1 < 10
            ? "0" + (new Date(next_date).getMonth() + 1) + "-"
            : new Date(next_date).getMonth() + 1 + "-";
        let next_dates_d =
          new Date(next_date).getDate() < 10
            ? "0" + new Date(next_date).getDate()
            : new Date(next_date).getDate();
        start = next_dates_y + next_dates_m + next_dates_d;
        i++;
      }
      return diffdate;
    },
    bindChange(e, type) {
      const val = e.detail.value;
      const { hourData, minuteData, selected } = this;
      let hour = hourData[val[0]];
      let minute = minuteData[val[1]];
      const nowHour = moment().format("HH");
      const nowMinute = moment().format("mm");
      const nowDay = moment().format("YYYY-MM-DD");
      const dateArr = [...this.selectedDate];
      if (type == "start") {
        if (selected[0] === nowDay && hour < nowHour) {
          hour = nowHour;
        }
        if (selected[0] === nowDay && hour <= nowHour && minute < nowMinute) {
          minute = nowMinute;
        }
        dateArr[0] = `${hour}:${minute}`;
        if (selected.length === 2 && selected[0] === selected[1]) {
          this.pickerValueStart = [Number(hour), Number(minute)];
          let mDate = Number(minute) + 15;
          if (mDate >= 60 && hour < 23) {
            hour = Number(hour) + 1;
            mDate = mDate - 60;
          }
          if (hour == 23) {
            mDate = Number(minute);
          }
          if (mDate < 10) {
            mDate = `0${mDate}`;
          }
          dateArr[1] = `${hour}:${mDate}`;
          this.pickerValueEnd = [Number(hour), Number(mDate)];
        } else if (selected[0] === nowDay) {
          this.pickerValueStart = [Number(hour), Number(minute)];
        } else {
          this.pickerValueStart = val;
        }
        this.selectedDate = dateArr;
      } else {
        if (selected.length === 2 && selected[0] === selected[1]) {
          const startTime = dateArr[0].split(":");
          if (hour <= startTime[0]) {
            hour = startTime[0];
          }
          if (hour <= startTime[0] && minute <= Number(startTime[1]) + 15) {
            minute = Number(startTime[1]) + 15;
          }
          if (minute >= 60 && hour < 23) {
            hour = Number(hour) + 1;
            minute = minute - 60;
          }
          if (minute < 10) {
            minute = `0${Number(minute)}`;
          }
          this.pickerValueEnd = [Number(hour), Number(minute)];
        } else {
          this.pickerValueEnd = val;
        }
        dateArr[1] = `${hour}:${minute}`;
        this.selectedDate = dateArr;
      }
    },
    setFormatter(e) {
      this.innerFormatter = e;
    },
    monthSelected(e) {
      this.selected = e;
      if (e.length === 2 && e[0] === e[1]) {
        const dateArr = [...this.selectedDate];
        const nowHour = moment().format("HH");
        const nowMinute = moment().format("mm");
        dateArr[0] = `${nowHour}:${Number(nowMinute) + 15}`;
        dateArr[1] = `${nowHour}:${Number(nowMinute) + 30}`;
        this.selectedDate = dateArr;
        this.pickerValueStart = [Number(nowHour), Number(nowMinute) + 15];
        this.pickerValueEnd = [Number(nowHour), Number(nowMinute) + 30];
      }
      if (!this.showConfirm) {
        if (
          this.mode === "multiple" ||
          this.mode === "single" ||
          (this.mode === "range" && this.selected.length >= 2)
        ) {
          this.$emit("confirm", this.selected);
        }
      }
    },
    init() {
      if (
        this.innerMaxDate &&
        this.innerMinDate &&
        new Date(this.innerMaxDate).getTime() <
          new Date(this.innerMinDate).getTime()
      ) {
        return uni.$u.error("maxDate????????????minDate");
      }
      this.listHeight = this.rowHeight * 5 + 140;
      this.setMonth();
      const { checkTime } = this;
      this.selectedDate = [
        moment(checkTime.startTime).format("HH:mm"),
        moment(checkTime.endTime).format("HH:mm"),
      ];
      this.pickerValueStart = [
        Number(moment(checkTime.startTime).format("HH")),
        Number(moment(checkTime.startTime).format("mm")),
      ];
      this.pickerValueEnd = [
        Number(moment(checkTime.endTime).format("HH")),
        Number(moment(checkTime.endTime).format("mm")),
      ];
      setTimeout(() => {
        const defaultDate = this.getTimeTwo(
          moment(checkTime.startTime).format("YYYY-MM-DD"),
          moment(checkTime.endTime).format("YYYY-MM-DD")
        );
        this.defaultDate = defaultDate;
        this.selected = defaultDate;
      }, 300);
    },
    close() {
      this.$emit("close");
    },
    confirm() {
      if (!this.buttonDisabled) {
        const { selected, selectedDate } = this;
        const nowTime = moment().format("X");
        const startTime = moment(`${selected[0]} ${selectedDate[0]}:00`).format(
          "X"
        );
        const endTime = moment(
          `${selected[selected.length - 1]} ${selectedDate[1]}:00`
        ).format("X");
        if (startTime <= nowTime) {
          uni.showToast({
            title: "??????????????????????????????????????????",
            icon: "none",
          });
          return;
        }
        if (endTime <= startTime) {
          uni.showToast({
            title: "??????????????????????????????????????????",
            icon: "none",
          });
          return;
        }
        if (endTime - startTime < 900) {
          uni.showToast({
            title: "????????????????????????15??????",
            icon: "none",
          });
          return;
        }
        const time = {
          startTime: `${selected[0]} ${selectedDate[0]}:00`,
          endTime: `${selected[selected.length - 1]} ${selectedDate[1]}:00`,
        };
        this.$emit("confirm", time);
      }
    },
    getMonths(minDate, maxDate) {
      const minYear = dayjs(minDate).year();
      const minMonth = dayjs(minDate).month() + 1;
      const maxYear = dayjs(maxDate).year();
      const maxMonth = dayjs(maxDate).month() + 1;
      return (maxYear - minYear) * 12 + (maxMonth - minMonth) + 1;
    },
    disabledNowDay(day) {
      const nowDay = moment().format("YYYY-MM-DD");
      const nowDate = moment().format("HHmm");
      if (nowDay === day && nowDate > 2329) {
        return true;
      }
      return false;
    },
    setMonth() {
      const minDate = this.innerMinDate || dayjs().valueOf();
      const maxDate =
        this.innerMaxDate ||
        dayjs(minDate)
          .add(this.monthNum - 1, "month")
          .valueOf();
      const months = uni.$u.range(
        1,
        this.monthNum,
        this.getMonths(minDate, maxDate)
      );
      this.months = [];
      for (let i = 0; i < months; i++) {
        this.months.push({
          date: new Array(dayjs(minDate).add(i, "month").daysInMonth())
            .fill(1)
            .map((item, index) => {
              // ???????????????1-31
              let day = index + 1;
              // ?????????0-6???0?????????
              const week = dayjs(minDate).add(i, "month").date(day).day();
              const date = dayjs(minDate)
                .add(i, "month")
                .date(day)
                .format("YYYY-MM-DD");
              let bottomInfo = "";
              if (this.showLunar) {
                // ???????????????????????????
                const lunar = Calendar.solar2lunar(
                  dayjs(date).year(),
                  dayjs(date).month() + 1,
                  dayjs(date).date()
                );
                bottomInfo = lunar.IDayCn;
              }
              let config = {
                day,
                week,
                // ????????????????????????????????????????????????????????????????????????disabled??????
                disabled:
                  this.disabledNowDay(date) ||
                  dayjs(date).isBefore(dayjs(minDate).format("YYYY-MM-DD")) ||
                  dayjs(date).isAfter(dayjs(maxDate).format("YYYY-MM-DD")),
                // ???????????????????????????????????????formatter????????????????????????????????????????????????????????????
                date: new Date(date),
                bottomInfo,
                dot: false,
                month: dayjs(minDate).add(i, "month").month() + 1,
              };
              const formatter = this.formatter || this.innerFormatter;
              return formatter(config);
            }),
          // ?????????????????????
          month: dayjs(minDate).add(i, "month").month() + 1,
          // ????????????
          year: dayjs(minDate).add(i, "month").year(),
        });
      }
    },
    scrollIntoDefaultMonth(selected) {
      const _index = this.months.findIndex(({ year, month }) => {
        month = uni.$u.padZero(month);
        return `${year}-${month}` === selected;
      });
      if (_index !== -1) {
        // #ifndef MP-WEIXIN
        this.$nextTick(() => {
          this.scrollIntoView = `month-${_index}`;
        });
        // #endif
        // #ifdef MP-WEIXIN
        this.scrollTop = this.months[_index].top || 0;
        // #endif
      }
    },
    onScroll(event) {
      const scrollTop = Math.max(0, event.detail.scrollTop);
      for (let i = 0; i < this.months.length; i++) {
        if (scrollTop >= (this.months[i].top || this.listHeight)) {
          this.monthIndex = i;
        }
      }
    },
    updateMonthTop(topArr = []) {
      topArr.map((item, index) => {
        this.months[index].top = item;
      });

      if (!this.defaultDate) {
        const selected = dayjs().format("YYYY-MM");
        this.scrollIntoDefaultMonth(selected);
        return;
      }
      let selected = dayjs().format("YYYY-MM");
      if (!uni.$u.test.array(this.defaultDate)) {
        selected = dayjs(this.defaultDate).format("YYYY-MM");
      } else {
        selected = dayjs(this.defaultDate[0]).format("YYYY-MM");
      }
      this.scrollIntoDefaultMonth(selected);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../libs/css/components.scss";

.u-calendar {
  &__confirm {
    height: 118rpx;
    border-top: #f1f1f1 1px solid;
    display: flex;
    align-items: center;
    flex-direction: row;
    position: relative;
  }
}
.u_calendar_footer_checked {
  flex: 1;
  padding-left: 36rpx;
}
.u_calendar_footer_checked .row {
  width: 100%;
  padding-bottom: 6rpx;
  padding-top: 6rpx;
  font-size: 24rpx;
  display: flex;
  flex-direction: row;
}
.u_calendar_footer_btn {
  width: 206rpx;
  margin-right: 36rpx;
}
.u_calendar_date {
  width: 100%;
  overflow: hidden;
  box-shadow: 0 -6rpx 8rpx #f1f1f1;
  background: #fff;
  position: absolute;
  left: 0;
  bottom: 118rpx;
  z-index: 99;
}
.u_calendar_date_main,
.u_calendar_date_main_d {
  padding-top: 30rpx;
  padding-bottom: 30rpx;
  display: flex;
  align-items: center;
  position: relative;
  flex-direction: row;
  .c_col {
    flex: 1;
    display: flex;
    justify-content: center;
    .c_title {
      width: 100%;
      text-align: center;
      font-size: 28rpx;
    }
    .c_time_main {
      padding-top: 24rpx;
      width: 100%;
      overflow: hidden;
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
      .c_time_date {
        font-size: 26rpx;
        padding-right: 10rpx;
      }
    }
    .c_time_cont {
      display: flex;
      align-items: center;
      flex-direction: row;
      justify-content: center;
    }
  }
}
.u_calendar_date_main_d {
  .c_title {
    color: #999;
  }
  .c_time_date {
    color: #999;
  }
}
.u_calendar_date_icon {
  width: 67rpx;
  height: 19rpx;
  position: absolute;
  left: 342rpx;
  top: 10rpx;
  z-index: 10;
}
.picker-view {
  width: 240rpx;
  height: 210rpx;
  .item {
    height: 60rpx;
    align-items: center;
    justify-content: center;
    text-align: center;
    display: flex;
  }
}
</style>
