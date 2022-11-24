<!--
 * @Date: 2022-09-09 09:37:35
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-19 22:11:41
 * @FilePath: \小程序\pages\order\buy.vue
-->
<!--
 * @Date: 2022-09-09 09:37:35
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-10-26 11:45:04
 * @FilePath: 任我行\pages\order\buy.vue
-->
<template>
  <view class="buyC_box">
    <view class="box">
      <view class="list">
        <view class="car_info">
          <view class="des">
            <view class="name">
              <view class="text"
                >{{ carInfo.brandName || "" }}
                {{ carInfo.seriesName || "" }}</view
              >
              <view class="year">{{ carInfo.yearType || "" }}款</view>
            </view>
            <view class="content"
              >{{ carInfo.categoryDesc || "" }} |
              {{ carInfo.seatingNum || "" }}座 | {{ carInfo.doorNum || "" }}门 |
              {{ carInfo.gearTypeDesc || "" }} |
              {{ carInfo.displacement || "" }}</view
            >
            <u--image
              src="/static/images/order/tips.png"
              width="292rpx"
              height="24rpx"
            ></u--image>
          </view>
          <u--image
            :src="carInfo.carImg || ''"
            width="220rpx"
            height="104rpx"
          ></u--image>
        </view>
        <view class="backTime">
          <view class="time">{{ formatDateTime(params.takeTime) }}</view>
          <view class="day">
            <view class="text">{{ diffDay }}天</view>
            <u--image
              src="/static/images/home/time.png"
              width="94rpx"
              height="8rpx"
            ></u--image>
          </view>
          <view class="time">{{ formatDateTime(params.stillTime) }}</view>
        </view>
        <view class="backMode">
          <view class="btn">还取方式</view>
          <view class="text">{{ storeInfo.labelA || "" }}</view>
        </view>
        <view class="map">
          <view class="des">
            <view class="name">{{ storeInfo.deptName }}</view>
            <view class="row"
              >营业时间{{ storeInfo.sellStartTime || "" }}-{{
                storeInfo.sellEndTime || ""
              }}</view
            >
            <view class="row"
              >距离门店直线距离{{ storeInfo.pureDistance || "" }}km</view
            >
          </view>
          <view class="icon">
            <u-icon
              name="map"
              color="rgba(64, 200, 131, 1)"
              size="26rpx"
              @click="handleMap()"
            ></u-icon>
            <view class="text" @click="handleMap()">地图</view>
          </view>
        </view>
      </view>
      <view class="list">
        <view class="comment_title" @click="handleBusiness">
          <view class="text">{{ storeInfo.storeName }}</view>
          <view class="t" v-if="!storeInfo.source || storeInfo.source !== 'wk'"
            >综合</view
          >
          <view
            class="num"
            v-if="!storeInfo.source || storeInfo.source !== 'wk'"
            >{{ averageGrade }}</view
          >
          <view class="t" v-if="!storeInfo.source || storeInfo.source !== 'wk'"
            >分</view
          >
          <u-icon
            name="arrow-right"
            color="rgba(186, 186, 186, 1)"
            size="28rpx"
            v-if="!storeInfo.source || storeInfo.source !== 'wk'"
          ></u-icon>
        </view>
        <view class="comment_label">
          <view
            class="item"
            v-for="(item, index) in storeInfo.labelsB"
            :key="index"
            >{{ item }}</view
          >
        </view>
        <view class="comment_policy">
          <view
            v-for="(item, index) in storeInfo.labels"
            :key="index"
            :class="item == '随心租' ? 'i1' : 'item'"
            >{{ item }}</view
          >
        </view>
      </view>
      <view class="list">
        <view class="driver_tit">驾驶员</view>
        <view class="driver_cont" v-if="defaultDriver && defaultDriver.name">
          <view class="row">
            <view class="text">姓名</view>
            <view class="content">{{ defaultDriver.name }}</view>
            <u-icon
              name="arrow-right"
              @click="handleAddDriver"
              color="#999"
              size="28rpx"
            ></u-icon>
          </view>
          <view class="row">
            <view class="text">身份证</view>
            <view class="content">{{ defaultDriver.cardNo }}</view>
          </view>
          <view class="row" style="border: 0">
            <view class="text">手机号</view>
            <view class="content">{{ defaultDriver.phone }}</view>
          </view>
        </view>
        <view
          class="driver_cont"
          style="text-align: center"
          v-else
          @click="handleAddDriver"
          >新增驾驶员</view
        >
        <view class="driver_stuff">
          <u--image
            src="/static/images/order/stuff.png"
            width="164rpx"
            height="50rpx"
          ></u--image>
          <view class="content">
            <rich-text
              :nodes="
                strToArrHtml(
                  `${
                    storeInfo.storePolicys &&
                    storeInfo.storePolicys.driverLicense
                      ? storeInfo.storePolicys.driverLicense
                      : ''
                  }<br /> ${
                    storeInfo.storePolicys &&
                    storeInfo.storePolicys.identityCard
                      ? storeInfo.storePolicys.identityCard
                      : ''
                  }`
                )
              "
              class="text"
            ></rich-text>
          </view>
        </view>
      </view>
      <view class="list">
        <view class="driver_tit">增值服务</view>
        <view class="ser_jc">
          <view class="text">基础保障服务</view>
          <view class="price"
            >¥{{
              storeInfo.carPriceBase && storeInfo.carPriceBase.basicFee
                ? storeInfo.carPriceBase.basicFee
                : 0
            }}</view
          >
          <view class="des">已含</view>
        </view>
        <view class="ser_list">
          <view class="item">
            <u-icon
              name="checkbox-mark"
              color="rgba(64, 200, 131, 1)"
              size="28rpx"
            ></u-icon>
            <view class="text"
              >您无需承担车辆损失超过1500元以上的部分(不含玻璃、不含轮胎损失)</view
            >
          </view>
          <view class="item">
            <u-icon
              name="checkbox-mark"
              color="rgba(64, 200, 131, 1)"
              size="28rpx"
            ></u-icon>
            <view class="text"
              >您无需承担行车致使第三方人身或财产损失50万以内的部分</view
            >
          </view>
          <view class="item">
            <u-icon
              name="checkbox-mark"
              color="rgba(64, 200, 131, 1)"
              size="28rpx"
            ></u-icon>
            <view class="text">车损3000元以下，您无需承担车辆折旧费</view>
          </view>
          <view class="item">
            <u-icon
              name="error-circle"
              color="rgba(137, 140, 139, 1)"
              size="28rpx"
            ></u-icon>
            <view class="text">需要承担车辆停运损失费</view>
          </view>
        </view>
        <view
          class="ser_new"
          v-if="storeInfo.carPriceBase && storeInfo.carPriceBase.enjoyIsShow"
        >
          <view class="tit">
            <u--image
              src="/static/images/order/new.png"
              width="164rpx"
              height="50rpx"
            ></u--image>
            <view class="te">60%用户选择升级保障，安心出行,用车无忧</view>
          </view>
          <view class="ser_zx">
            <view class="text">尊享服务</view>
            <view class="price"
              >¥{{ storeInfo.carPriceBase.enjoyFee || 0 }}</view
            >
            <u-checkbox-group
              v-model="buyZx"
              style="flex: none"
              @change="handleChangeZunx"
            >
              <u-checkbox
                shape="circle"
                :name="1"
                activeColor="rgba(64, 200, 131, 1)"
              >
              </u-checkbox>
            </u-checkbox-group>
          </view>
          <view class="ser_zx_cont">
            <view class="item">
              <u-icon
                name="checkbox-mark"
                color="rgba(64, 200, 131, 1)"
                size="28rpx"
              ></u-icon>
              <view class="text"
                >您无需承担全部车辆损失(不含玻璃、不含轮胎损失)</view
              >
            </view>
            <view class="item">
              <u-icon
                name="checkbox-mark"
                color="rgba(64, 200, 131, 1)"
                size="28rpx"
              ></u-icon>
              <view class="text"
                >您无需承担行车致使第三方人身或财产损失50万以内的部分</view
              >
            </view>
            <view class="item">
              <u-icon
                name="checkbox-mark"
                color="rgba(64, 200, 131, 1)"
                size="28rpx"
              ></u-icon>
              <view class="text">车损3000元以下，您无需承担车辆折旧费</view>
            </view>
            <view class="item">
              <u-icon
                name="error-circle"
                color="rgba(137, 140, 139, 1)"
                size="28rpx"
              ></u-icon>
              <view class="text">需要承担车辆停运损失费</view>
            </view>
          </view>
        </view>
      </view>
      <view class="list">
        <view class="rule_title">
          <view class="title">押金</view>
        </view>
        <u-radio-group
          v-model="mianyaRadio"
          placement="column"
          activeColor="#40c883"
        >
          <view class="my_item">
            <view class="m_row">
              <view class="radio">
                <u-radio
                  name="1"
                  :disabled="systemInfo == 'other' ? true : false"
                ></u-radio>
              </view>
              <view class="text">
                <text style="color: #40c883">信用租</text> . 押金双免
              </view>
            </view>
            <view class="my_cont" style="font-weight: bold"
              >免￥{{
                storeInfo.carPriceBase && storeInfo.carPriceBase.damageFee
                  ? storeInfo.carPriceBase.damageFee
                  : 0
              }}
              车损押金，免￥{{
                storeInfo.carPriceBase && storeInfo.carPriceBase.illegalFee
                  ? storeInfo.carPriceBase.illegalFee
                  : 0
              }}违章押金</view
            >
            <view class="my_cont">
              <view class="my_tip">
                <view class="jt">
                  <view class="icon">
                    <u-icon
                      name="arrow-up"
                      color="#40c883"
                      size="32rpx"
                    ></u-icon>
                  </view>
                </view>
                <view class="text">芝麻信用550分以上有机会可享</view>
                <view class="btn" v-if="systemInfo == 'other'"
                  >请前往支付宝“任我行”小程序授权</view
                >
                <view class="btn" v-else @click="handleZhiMa">立即授权</view>
              </view>
            </view>
          </view>
          <view class="my_item">
            <view class="m_row">
              <view class="radio">
                <u-radio name="2"></u-radio>
              </view>
              <view class="text">到店支付押金</view>
            </view>
            <view class="my_cont">取还车时在门店支付押金</view>
          </view>
        </u-radio-group>
      </view>
      <view class="zhima">
        <view class="title">
          <view class="left">
            <view class="text">芝麻信用·押金双免</view>
            <view class="des"
              >芝麻信用550分以上并授权成功后<text
                style="display: inline; color: rgba(3, 193, 97, 1)"
                >免收</text
              ></view
            >
          </view>
          <u--image
            src="/static/images/order/sd.png"
            width="72rpx"
            height="84rpx"
          ></u--image>
        </view>
        <view class="table">
          <view class="row">
            <view class="w1">车损押金</view>
            <view class="w2">
              <view class="tu"
                >￥{{
                  storeInfo.carPriceBase && storeInfo.carPriceBase.damageFee
                    ? storeInfo.carPriceBase.damageFee
                    : 0
                }}
              </view>
              <view class="free">免收</view>
            </view>
          </view>
          <view class="row">
            <view class="w1">违章押金</view>
            <view class="w2">
              <view class="tu"
                >￥{{
                  storeInfo.carPriceBase && storeInfo.carPriceBase.illegalFee
                    ? storeInfo.carPriceBase.illegalFee
                    : 0
                }}
              </view>
              <view class="free">免收</view>
            </view>
          </view>
          <view class="row" style="border-bottom: 0">
            <view class="w1">免押政策</view>
            <view class="w3">
              授权成功后无需支付,若无车损及违章还车后30-35天内解除授权
            </view>
          </view>
        </view>
      </view>
      <view class="list">
        <view class="rule_title">
          <view class="title">门店政策</view>
          <view class="more" @click="handleXuZhi">更多</view>
          <u-icon
            name="arrow-right"
            color="rgba(186, 186, 186, 1)"
            size="28rpx"
            @click="handleXuZhi"
          ></u-icon>
        </view>
        <view class="rule_sub">取消规则</view>
        <view class="rule_table" v-if="storeInfo.storePolicys">
          <view class="head">
            <view class="col w1">取消时间</view>
            <view class="col w2">扣费标注</view>
          </view>
          <view
            class="body"
            v-for="(item, index) in storeInfo.storePolicys.cancelRues"
            :key="index"
          >
            <view class="col w1">{{ item.time }}</view>
            <view class="col w2">{{ item.desc }}</view>
          </view>
        </view>
        <view class="rule_sub">里程限制</view>
        <view class="rule_content">
          <rich-text
            :nodes="
              strToArrHtml(
                storeInfo.storePolicys && storeInfo.storePolicys.milesLimit
                  ? storeInfo.storePolicys.milesLimit
                  : ''
              )
            "
          ></rich-text>
        </view>
        <view class="rule_sub">用车区域</view>
        <view class="rule_content">
          <rich-text
            :nodes="
              strToArrHtml(
                storeInfo.storePolicys && storeInfo.storePolicys.regionLimit
                  ? storeInfo.storePolicys.regionLimit
                  : ''
              )
            "
          ></rich-text>
        </view>
        <view class="rule_sub">发票</view>
        <view class="rule_content">
          <rich-text
            :nodes="
              strToArrHtml(
                storeInfo.storePolicys && storeInfo.storePolicys.invoice
                  ? storeInfo.storePolicys.invoice
                  : ''
              )
            "
          ></rich-text>
        </view>
      </view>
      <view class="treaty">
        <view class="read">
          <u-checkbox-group v-model="treaty" style="flex: none">
            <u-checkbox
              shape="circle"
              :name="1"
              activeColor="rgba(64, 200, 131, 1)"
            >
            </u-checkbox>
          </u-checkbox-group>
          <view class="des">我已阅读并同意</view>
          <view class="te" @click="handleXieYi">《用户租车协议》</view>
        </view>
        <view class="now"
          >当前有{{ randomNum }}人在看，避免无库存，请抓紧时间预订</view
        >
      </view>
    </view>
    <view class="buy1_footer">
      <view class="price">
        <view class="total">总价</view>
        <view class="money">¥{{ costPrice.realTotalMoney || 0 }}</view>
        <!-- <view class="old">369</view> -->
        <view class="more" @click="showCost = true">明细</view>
        <u-icon
          name="arrow-up"
          color="rgba(85, 160, 243, 1)"
          size="20rpx"
          @click="showCost = true"
        ></u-icon>
      </view>
      <view class="green_btn" @click="handlePay">立即下单</view>
    </view>
    <view class="popup" v-if="showBusiness">
      <business-popup
        :show="showBusiness"
        @close="showBusiness = false"
        :name="storeInfo.storeName"
        :businessGuid="params.businessGuid"
        :storeGuid="params.storeGuid"
        :carinfoGuid="params.carinfoGuid"
        :commentData="commentData"
      ></business-popup>
    </view>
    <view class="popup" style="z-index: 20">
      <cost-popup
        :show="showCost"
        :costPrice="costPrice"
        @close="showCost = false"
      ></cost-popup>
    </view>
    <view class="popup">
      <pay-popup
        :show="showPay"
        @close="showPay = false"
        :orderInfo="orderInfo"
      ></pay-popup>
    </view>
  </view>
</template>

<script>
import BusinessPopup from "../common/business-popup";
import CostPopup from "../common/cost-popup";
import PayPopup from "../common/pay-popup";
import parseHtml from "@/utils/parseHtml";
import {
  getCarInfo,
  getPriceInfo,
  getStoreInfo,
  addOrder,
  costCarPrice,
} from "@/api/order";
import { getDefaultDriver } from "@/api/driver";
import moment from "moment";
moment.locale("zh-cn");
import { getCommentPage } from "@/api/comment";
import { depositFreeze } from "@/api/home";

export default {
  components: {
    BusinessPopup,
    CostPopup,
    PayPopup,
  },
  data() {
    return {
      nodes:
        "<b>驾驶员本人身份证原件：</b>有效期1个月以上<br /> <b>驾驶员本人驾照原件：</b>有效期2个月以上、驾龄需1年以上<br /> <b>驾驶员本人国内信用卡：</b>有效期1个月以上(免押订单无需提供)",
      nodes2:
        "· 取车时支付车辆押金，若无车损，还车时退还；<br /> · 还车时支付违章押金，若无违章，还车后30~45天内退还",
      buyZx: [],
      treaty: [],
      showBusiness: false,
      showCost: false,
      showPay: false,
      params: {},
      carInfo: {},
      storeInfo: {},
      servieInfo: {},
      defaultDriver: {},
      randomNum: 10,
      costPrice: {},
      orderInfo: {},
      commentData: {
        data: {
          records: [],
        },
        countData: {},
      },
      mianyaRadio: "",
      systemInfo: "",
    };
  },
  onLoad(options) {
    this.getDriverData();
    uni.$on("buyParams", (data) => {
      this.params = { ...data };
      this.getCarData(data);
      this.getStoreData(data);
      this.getCarPrice();
    });
    uni.$on("checkDriver", (data) => {
      this.defaultDriver = data;
    });
    // #ifdef  MP-ALIPAY
    this.systemInfo = "alipay";
    this.mianyaRadio = "1";
    // #endif
    // #ifndef  MP-ALIPAY
    this.systemInfo = "other";
    this.mianyaRadio = "2";
    // #endif
  },
  onUnload() {
    uni.$off("buyParams");
  },
  onShow() {
    this.random();
  },
  methods: {
    handleZhiMa() {
      // #ifdef  MP-ALIPAY
      depositFreeze({}).then((res) => {
        if (res.code === 200) {
          my.tradePay({
            orderStr: res.data,
            success: (reselt) => {
              this.$modal.msg("授权成功");
            },
            fail: (reselt) => {
              this.$modal.msg("授权失败");
            },
          });
        }
      });
      // #endif
      //#ifndef MP-ALIPAY
      this.$modal.msg("请前往支付宝“任我行”小程序进行操作");
      // #endif
    },
    handleBusiness() {
      const { params, storeInfo } = this;
      if (storeInfo && storeInfo.source === "wk") {
        return;
      }
      uni.showLoading({
        title: "加载中",
      });
      if (params.isOtherAddress) {
        const backLoc = params.backLoc.split(",");
        params.isOtherAddress = 1;
        params.backLat = backLoc[1];
        params.backLng = backLoc[0];
      } else {
        params.isOtherAddress = 0;
      }
      getCommentPage({
        ...params,
        pageNum: 1,
        pageSize: 2,
      }).then((res) => {
        uni.hideLoading();
        if (res.code === 200 && res.data) {
          res.data.records.map((item) => {
            item.averageGrade = Math.round(item.averageGrade);
            if (item.averageGrade == 0) {
              item.averageGrade = 1;
            }
          });
          this.commentData = {
            data: res.data,
            countData: res.countData,
          };
          this.showBusiness = true;
        }
      });
    },
    handleChangeZunx(e) {
      if (e.length !== 0) {
        this.getCarPrice(1);
      } else {
        this.getCarPrice(0);
      }
      this.buyZx = e;
    },
    getCarPrice(isChangeEnjoy) {
      const { params } = this;
      const loc = params.location.split(",");
      if (isChangeEnjoy !== undefined) {
        params.isChangeEnjoy = isChangeEnjoy;
      }
      if (params.isOtherAddress) {
        const backLoc = params.backLoc.split(",");
        params.isOtherAddress = 1;
        params.backLat = backLoc[1];
        params.backLng = backLoc[0];
      } else {
        params.isOtherAddress = 0;
      }
      costCarPrice({
        lat: loc[1],
        lng: loc[0],
        ...params,
        deliveryType: 1,
        isChangeEnjoy: params.isChangeEnjoy || 0,
      }).then((res) => {
        if (res.code === 200) {
          this.costPrice = res.data || {};
        }
      });
    },
    random() {
      this.randomNum = Math.floor(Math.random() * (10 - 1)) + 1;
    },
    handleXieYi() {
      uni.navigateTo({
        url: `/pages/other/xieyi`,
      });
    },
    handlePay() {
      const { treaty, defaultDriver } = this;
      if (!defaultDriver.empGuid) {
        uni.showToast({
          title: "请选择驾驶员",
          icon: "none",
        });
        return;
      }
      if (treaty.length === 0) {
        uni.showToast({
          title: "请阅读《用户租车协议》并勾选",
          icon: "none",
        });
        return;
      }
      const { params, buyZx } = this;
      if (buyZx.length !== 0) {
        params.isChangeEnjoy = 1;
      }
      uni.showLoading({
        title: "下单中",
      });
      if (params.isOtherAddress) {
        const backLoc = params.backLoc.split(",");
        params.isOtherAddress = 1;
        params.backLat = backLoc[1];
        params.backLng = backLoc[0];
      } else {
        params.isOtherAddress = 0;
      }
      const loc = params.location.split(",");
      let orderSource = 1;
      // #ifdef MP-ALIPAY
      orderSource = 2;
      // #endif
      // #ifdef MP-TOUTIAO
      orderSource = 1;
      // #endif
      addOrder({
        lat: loc[1],
        lng: loc[0],
        ...params,
        isChangeEnjoy: params.isChangeEnjoy || 0,
        empGuid: defaultDriver.empGuid,
        deliveryType: 1,
        orderSource,
      }).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          this.orderInfo = res.data;
          this.showPay = true;
        } else {
          this.$modal.msg(res.msg || "下单失败");
        }
      });
      // this.showPay = true;
      this.showCost = false;
      this.showBusiness = false;
    },
    handleAddDriver() {
      uni.navigateTo({
        url: `/pages/mine/driver/index?check=1`,
      });
    },
    getDriverData() {
      uni.showLoading({
        title: "加载中",
      });
      getDefaultDriver().then((res) => {
        uni.hideLoading();
        if (res.code === 200 && res.data) {
          this.defaultDriver = res.data;
        }
      });
    },
    formatDateTime(time) {
      return moment(time).format("MM月DD日 HH:mm");
    },
    getCarData(params) {
      uni.showLoading({
        title: "加载中",
      });
      getCarInfo(params.carinfoGuid).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          this.carInfo = res.data;
        }
      });
    },
    getStoreData(params) {
      uni.showLoading({
        title: "加载中",
      });
      const loc = params.location.split(",");
      if (params.isOtherAddress) {
        const backLoc = params.backLoc.split(",");
        params.isOtherAddress = 1;
        params.backLat = backLoc[1];
        params.backLng = backLoc[0];
      } else {
        params.isOtherAddress = 0;
      }
      getStoreInfo({
        lat: loc[1],
        lng: loc[0],
        ...params,
        deliveryType: 1,
      }).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          this.storeInfo = res.data;
        }
      });
    },
    getServieData() {
      const { params } = this;
      uni.showLoading({
        title: "加载中",
      });
      getPriceInfo(params.carinfoGuid).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          this.servieInfo = res.data;
        }
      });
    },
    handleMap() {
      const { storeInfo } = this;
      setTimeout(() => {
        uni.$emit("updateStore", storeInfo);
      }, 500);
      uni.navigateTo({
        url: `/pages/buy/map`,
      });
    },
    handleXuZhi() {
      const { storeInfo } = this;
      setTimeout(() => {
        uni.$emit("buyParamsUnderstood", {
          milesLimit: storeInfo.storePolicys.milesLimit,
          regionLimit: storeInfo.storePolicys.regionLimit,
        });
      }, 500);
      uni.navigateTo({
        url: `/pages/understood/index`,
      });
    },
    handleCopyOrderId(orderId) {
      uni.setClipboardData({
        data: orderId,
        success: function () {
          uni.showToast({
            title: "复制成功",
            icon: "none",
          });
        },
      });
    },
    strToArrHtml(str) {
      return parseHtml(str);
    },
  },
  computed: {
    averageGrade() {
      const { storeInfo } = this;
      if (storeInfo && storeInfo.averageGrade) {
        return Number(storeInfo.averageGrade).toFixed(1);
      }
      return "0";
    },
    diffDay() {
      const { params } = this;
      const d1 = moment(params.takeTime);
      const d2 = moment(params.stillTime);
      return d2.diff(d1, "day");
    },
    backStillType() {
      const { storeInfo } = this;
      switch (storeInfo.takeType) {
        case 1:
          return (quche = "门店取还");
        case 2:
          return (quche = "免费接送");

        case 3:
          return (quche = "上门取还");
      }
      return "";
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f6f6f6;
}
.buyC_box {
  .my_item {
    padding-bottom: 20rpx;
    padding-top: 20px;
    .m_row {
      display: flex;
      align-items: center;
      .radio {
        padding-right: 10rpx;
      }
      .text {
        flex: 1;
        font-size: 30rpx;
        font-weight: bold;
      }
    }
    .my_cont {
      font-size: 28rpx;
      padding-top: 12rpx;
      padding-left: 60rpx;
    }
    .my_tip {
      border: #40c883 1px solid;
      padding: 20rpx;
      margin-top: 10rpx;
      position: relative;
      .jt {
        position: absolute;
        left: 10rpx;
        top: -22rpx;
        background: #fff;
        width: 24rpx;
        overflow: hidden;
        .icon {
          margin-left: -4rpx;
        }
      }
      display: flex;
      align-items: center;
      .text {
        flex: 1;
        font-size: 28rpx;
        color: #999;
        padding-right: 20rpx;
      }
      .btn {
        max-width: 280rpx;
        padding: 8rpx 14rpx 8rpx 14rpx;
        border-radius: 12rpx;
        background: #40c883;
        color: #fff;
        font-size: 24rpx;
      }
    }
  }
  .popup {
    position: absolute;
  }
  .treaty {
    padding: 56rpx 56rpx 56rpx 24rpx;
    .read {
      display: flex;
      align-items: center;
      .des {
        color: rgba(46, 46, 46, 1);
        font-size: 24rpx;
      }
      .te {
        color: rgba(85, 160, 243, 1);
        font-size: 24rpx;
        margin-left: 10rpx;
      }
    }
    .now {
      padding-left: 44rpx;
      padding-top: 12rpx;
      color: rgba(64, 200, 131, 1);
      font-size: 24rpx;
    }
  }
  .zhima {
    background: rgba(226, 242, 255, 1);
    padding: 32rpx;
    border-radius: 20rpx;
    margin-top: 30rpx;
    .title {
      display: flex;
      padding-top: 12rpx;
      align-items: center;
      .left {
        flex: 1;
        .text {
          color: rgba(46, 46, 46, 1);
          font-size: 36rpx;
          font-weight: bold;
        }
        .des {
          padding-top: 32rpx;
          color: rgba(137, 140, 139, 1);
          font-size: 24rpx;
        }
      }
    }
    .table {
      margin-top: 24rpx;
      border: 1px solid rgba(234, 234, 234, 1);
      background: #fff;
      border-radius: 16rpx;
      .row {
        border-bottom: 1px solid rgba(234, 234, 234, 1);
        display: flex;
        align-items: center;
        .w1 {
          line-height: 72rpx;
          text-align: center;
          color: rgba(46, 46, 46, 1);
          font-size: 24rpx;
          width: 188rpx;
        }
        .w2 {
          flex: 1;
          line-height: 72rpx;
          display: flex;
          font-size: 24rpx;
          color: rgba(46, 46, 46, 1);
          border-left: 1px solid rgba(234, 234, 234, 1);
          .tu {
            margin-left: 40rpx;
            text-decoration: line-through;
          }
          .free {
            color: rgba(3, 193, 97, 1);
            margin-left: 10rpx;
          }
        }
        .w3 {
          padding: 20rpx 40rpx 20rpx 40rpx;
          font-size: 24rpx;
          color: rgba(123, 123, 123, 1);
          line-height: 40rpx;
          text-align: left;
          flex: 1;
          border-left: 1px solid rgba(234, 234, 234, 1);
        }
      }
    }
  }
  .ser_jc {
    padding-top: 32rpx;
    display: flex;
    align-items: center;
    .text {
      color: rgba(46, 46, 46, 1);
      font-size: 28rpx;
      flex: 1;
    }
    .price {
      color: rgba(250, 67, 67, 1);
      font-size: 32rpx;
    }
    .des {
      color: rgba(137, 140, 139, 1);
      font-size: 28rpx;
      margin-left: 30rpx;
    }
  }
  .ser_list,
  .ser_zx_cont {
    padding-top: 16rpx;
    padding-bottom: 24rpx;
    .item {
      padding-top: 16rpx;
      display: flex;
      align-items: flex-start;
      .text {
        color: rgba(137, 140, 139, 1);
        font-size: 24rpx;
        margin-left: 14rpx;
      }
    }
  }
  .ser_new {
    border-radius: 16rpx;
    background: rgba(186, 255, 230, 0.5);
    margin-left: -20rpx;
    margin-right: -20rpx;
    .tit {
      height: 50rpx;
      background: rgba(3, 193, 97, 0.1);
      display: flex;
      align-items: center;
      .te {
        margin-left: 16rpx;
        color: rgba(64, 200, 131, 1);
        font-size: 24rpx;
      }
    }
  }
  .ser_zx {
    padding: 28rpx 28rpx 6rpx 28rpx;
    display: flex;
    align-items: center;
    .text {
      color: rgba(46, 46, 46, 1);
      font-size: 28rpx;
      flex: 1;
    }
    .price {
      color: rgba(250, 67, 67, 1);
      font-size: 32rpx;
      margin-right: 24rpx;
    }
  }
  .ser_zx_cont {
    padding-left: 24rpx;
    padding-left: 24rpx;
  }
  .gobuy {
    width: 100%;
    height: 80rpx;
    border-radius: 12rpx;
    background: rgba(64, 200, 131, 1);
    margin-top: 30rpx;
    margin-bottom: 20rpx;
    color: #fff;
    line-height: 80rpx;
    text-align: center;
  }
  .bg {
    width: 750rpx;
    height: 400rpx;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(246, 246, 246, 1) 76.46%,
      rgba(246, 246, 246, 1) 100%
    );
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
  .box {
    position: relative;
    z-index: 20;
    padding: 24rpx 24rpx 164rpx 24rpx;
    .info {
      padding: 32rpx 32rpx 6rpx 32rpx;
      .status {
        color: rgba(46, 46, 46, 1);
        font-size: 36rpx;
        font-weight: bold;
      }
      .des {
        padding-top: 26rpx;
        color: rgba(46, 46, 46, 1);
        font-size: 24rpx;
      }
      .money {
        padding-top: 28rpx;
        display: flex;
        align-items: center;
        .m1 {
          color: rgba(46, 46, 46, 1);
          font-size: 28rpx;
        }
        .m2 {
          color: rgba(250, 67, 67, 1);
          font-size: 32rpx;
          font-weight: bold;
          flex: 1;
        }
        .m3 {
          color: rgba(85, 160, 243, 1);
          font-size: 28rpx;
        }
      }
    }
    .list {
      padding: 32rpx;
      background: #fff;
      border-radius: 20rpx;
      box-shadow: 0px 0px 10rpx 0px rgba(240, 240, 240, 0.5);
      margin-top: 24rpx;
    }
    .car_info {
      display: flex;
      padding-bottom: 32rpx;
      border-bottom: rgba(237, 237, 237, 1) 1px solid;
      padding-top: 12rpx;
      align-items: center;
      .des {
        flex: 1;
        padding-right: 20rpx;
        .name {
          display: flex;
          align-items: center;
          .text {
            color: rgba(46, 46, 46, 1);
            font-size: 36rpx;
            font-weight: bold;
          }
          .year {
            background: rgba(64, 200, 131, 1);
            border-radius: 6rpx;
            padding: 2rpx 6rpx 2rpx 6rpx;
            margin-left: 12rpx;
            font-size: 20rpx;
            color: #fff;
          }
        }
        .content {
          padding-top: 24rpx;
          padding-bottom: 16rpx;
          color: rgba(135, 139, 138, 1);
          font-size: 24rpx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .backTime {
      padding-top: 32rpx;
      padding-bottom: 32rpx;
      border-bottom: rgba(237, 237, 237, 1) 1px solid;
      display: flex;
      align-items: center;
      justify-content: center;
      .time {
        color: rgba(46, 46, 46, 1);
        font-size: 32rpx;
        font-weight: bold;
      }
      .day {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        .text {
          color: rgba(135, 139, 138, 1);
          font-size: 20rpx;
          padding-bottom: 4rpx;
        }
      }
    }
    .backMode {
      padding-bottom: 28rpx;
      padding-top: 28rpx;
      display: flex;
      border-bottom: rgba(237, 237, 237, 1) 1px solid;
      .btn {
        width: 112rpx;
        height: 40rpx;
        border-radius: 4rpx;
        border: 1px solid rgba(227, 227, 227, 1);
        line-height: 40rpx;
        text-align: center;
        color: rgba(64, 200, 131, 1);
        font-size: 24rpx;
      }
      .text {
        margin-left: 12rpx;
        color: rgba(46, 46, 46, 1);
        font-size: 28rpx;
      }
    }
    .map {
      padding-top: 28rpx;
      display: flex;
      align-items: center;
      .des {
        flex: 1;
        .name {
          color: rgba(71, 71, 71, 1);
          font-size: 28rpx;
          padding-bottom: 12rpx;
        }
        .row {
          color: rgba(135, 139, 138, 1);
          font-size: 24rpx;
        }
      }
      .icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        .text {
          color: rgba(64, 200, 131, 1);
          font-size: 24rpx;
          padding-top: 6rpx;
        }
      }
    }
  }
  .comment_title {
    display: flex;
    align-items: center;
    .text {
      color: rgba(46, 46, 46, 1);
      font-size: 36rpx;
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-weight: bold;
    }
    .t {
      color: rgba(46, 46, 46, 1);
      font-size: 28rpx;
      margin-right: 4rpx;
      margin-left: 4rpx;
    }
    .num {
      color: rgba(46, 46, 46, 1);
      font-size: 36rpx;
    }
  }
  .comment_label {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-top: 16rpx;
    .item {
      padding: 6rpx 8rpx 6rpx 8rpx;
      border-radius: 4rpx;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(227, 227, 227, 1);
      color: rgba(78, 89, 105, 1);
      font-size: 24rpx;
      margin: 12rpx 12rpx 0 0;
    }
  }
  .comment_policy {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .item,
    .i1 {
      padding: 6rpx 8rpx 6rpx 8rpx;
      border-radius: 4rpx;
      background: rgba(255, 255, 255, 1);
      border: 1px solid rgba(227, 227, 227, 1);
      color: rgba(64, 200, 131, 1);
      font-size: 24rpx;
      margin: 12rpx 12rpx 0 0;
    }
    .i1 {
      background: rgba(64, 200, 131, 1);
      border: 1px solid rgba(64, 200, 131, 1);
      color: #fff;
    }
  }
  .driver_tit {
    color: rgba(46, 46, 46, 1);
    font-size: 36rpx;
    font-weight: bold;
  }
  .driver_cont {
    padding-top: 14rpx;
    padding-bottom: 14rpx;
    .row {
      padding-bottom: 28rpx;
      padding-top: 28rpx;
      border-bottom: rgba(237, 237, 237, 1) 1px solid;
      display: flex;
      align-items: center;
      .text {
        width: 124rpx;
        color: rgba(135, 139, 138, 1);
        font-size: 28rpx;
      }
      .content {
        color: rgba(46, 46, 46, 1);
        font-size: 28rpx;
        font-weight: bold;
        flex: 1;
      }
    }
  }
  .driver_stuff {
    border-radius: 16rpx;
    background: rgba(250, 239, 191, 1);
    box-shadow: 0px 0px 10rpx 0px rgba(240, 240, 240, 0.5);
    .content {
      padding: 24rpx;
      .text {
        font-size: 24rpx;
        line-height: 48rpx;
      }
    }
  }
  .deposit_row {
    padding-top: 40rpx;
    .row {
      display: flex;
      align-items: center;
      font-weight: 28rpx;

      .text {
        color: rgba(46, 46, 46, 1);
        flex: 1;
      }
      .info {
        color: rgba(128, 128, 128, 1);
      }
    }
  }
  .deposit_free {
    padding-top: 32rpx;
    padding-bottom: 32rpx;
    border-top: rgba(237, 237, 237, 1) 1px solid;
    margin-top: 20rpx;
    .row {
      display: flex;
      padding-bottom: 16rpx;
      .btn {
        height: 40rpx;
        border-radius: 4rpx;
        border: 1px solid rgba(227, 227, 227, 1);
        line-height: 40rpx;
        text-align: center;
        color: rgba(64, 200, 131, 1);
        font-size: 24rpx;
        margin-right: 10rpx;
        padding-left: 10rpx;
        padding-right: 10rpx;
      }
      .text {
        font-size: 28rpx;
      }
      .green {
        font-size: 28rpx;
        color: rgba(3, 193, 97, 1);
      }
    }
  }
  .deposit_info {
    border-radius: 16rpx;
    background: rgba(245, 245, 245, 1);
    padding: 24rpx;
    .text {
      color: rgba(128, 128, 128, 1);
      font-size: 24rpx;
      line-height: 48rpx;
    }
  }
  .rule_title {
    display: flex;
    align-items: center;
    .title {
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
        border-bottom: 1px solid rgba(234, 234, 234, 1);
        border-right: 1px solid rgba(234, 234, 234, 1);
        padding: 20rpx 10rpx 20rpx 10rpx;
        text-align: center;
        color: rgba(123, 123, 123, 1);
        background: rgba(245, 245, 245, 1);
      }
      .w1 {
        width: 236rpx;
      }
      .w2 {
        flex: 1;
        border-right: 0;
      }
      &:last-child {
        .w1 {
          border-bottom: 0;
        }
        .w2 {
          border-bottom: 0;
        }
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
  .reserve_row {
    display: flex;
    padding-top: 28rpx;
    font-size: 28rpx;
    .t1 {
      color: rgba(123, 123, 123, 1);
    }
    .t2 {
      color: rgba(46, 46, 46, 1);
      flex: 1;
    }
    .t3 {
      color: rgba(85, 160, 243, 1);
    }
  }
  .buy1_footer {
    width: 100%;
    height: 140rpx;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 30;
    display: flex;
    align-items: center;
    border-top: #f1f1f1 1px solid;
    .price {
      flex: 1;
      display: flex;
      align-items: center;
      .total {
        font-size: 24rpx;
        color: rgba(46, 46, 46, 1);
        margin-left: 36rpx;
      }
      .money {
        color: rgba(250, 67, 67, 1);
        font-size: 36rpx;
        margin-left: 12rpx;
      }
      .old {
        margin-left: 22rpx;
        color: rgba(166, 166, 166, 1);
        font-size: 24rpx;
        text-decoration: line-through;
      }
      .more {
        color: rgba(85, 160, 243, 1);
        font-size: 24rpx;
        margin-left: 12rpx;
      }
    }
    .green_btn {
      width: 328rpx;
      height: 88rpx;
      border-radius: 12rpx;
      background: rgba(64, 200, 131, 1);
      line-height: 88rpx;
      text-align: center;
      margin-right: 32rpx;
      color: #fff;
      font-size: 32rpx;
    }
  }
}
</style>
