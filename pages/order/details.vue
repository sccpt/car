<!--
 * @Date: 2022-09-08 16:03:31
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-19 23:05:49
 * @FilePath: \小程序\pages\order\details.vue
-->
<template>
  <view class="ord_det_box" v-if="loading">
    <view class="bg"></view>
    <view class="box">
      <view class="info">
        <view class="status">{{ backStatus }}</view>
        <view class="des" v-if="datas.orderInfoAppVO.userOrderState == 1"
          >请在<text style="color: rgba(250, 67, 67, 1)">{{
            datas.payTime
          }}</text
          >之前完成付款，避免订单超时关闭</view
        >
        <view class="des" v-if="datas.orderInfoAppVO.userOrderState == 2"
          >请在<text style="color: rgba(250, 67, 67, 1)">{{
            datas.orderInfoAppVO.takeTime
          }}</text
          >之前完成取车，避免逾期取车</view
        >
        <view class="des" v-if="datas.orderInfoAppVO.userOrderState == 3"
          >请在<text style="color: rgba(250, 67, 67, 1)">{{
            datas.orderInfoAppVO.stillTime
          }}</text
          >之前还车，避免逾期还车，如需续租请申请续租或提前联系商家</view
        >
        <view class="des" v-if="datas.orderInfoAppVO.userOrderState == 4"
          >您的订单已完成，如需要继续用车，请重新下单!</view
        >
        <view class="des" v-if="datas.orderInfoAppVO.userOrderState == 5"
          >您已取消订单，如需用车，请重新下单!</view
        >
        <view class="money">
          <view class="m1">总额：</view>
          <view class="m2"
            >¥ {{ datas.costPriceInfo.realTotalMoney || 0 }}</view
          >
          <view class="m3" @click="showCost = true">费用明细</view>
        </view>
        <view
          class="gobuy"
          @click="handleToHome"
          v-if="datas.orderInfoAppVO.userOrderState == 5"
          >去租车</view
        >
        <view
          class="gobuy"
          @click="handleCancel"
          v-if="datas.orderInfoAppVO.userOrderState == 2"
          >取消订单</view
        >
        <view class="goBtns" v-if="datas.orderInfoAppVO.userOrderState == 1">
          <view class="btn2" @click="handlePay">去支付</view>
          <view class="btn1" @click="handleCancel">取消订单</view>
        </view>
      </view>
      <view class="list" v-if="datas.orderInfoAppVO.userOrderState == 4">
        <view class="yj_tit">
          <view class="text">押金</view>
          <view class="lable">免收</view>
          <view class="more">免押明细</view>
        </view>
        <view class="yj_wz">
          <text>违章/车损</text>
          <text class="small">(暂无)</text>
        </view>
        <view class="yj_cont"
          >若有违章，车行一般会在还车后的15个工作日左右收到未处理的违章信息，请持续关注。</view
        >
        <view class="yj_more">
          <!-- <view class="btns">我要追评</view> -->
          <view class="btns" @click="handleToHome">再次预订</view>
        </view>
      </view>
      <view class="list">
        <view class="car_info">
          <view class="des">
            <view class="name">
              <view class="text"
                >{{ datas.orderInfoAppVO.brandName || "" }}
                {{ datas.orderInfoAppVO.seriesName || "" }}</view
              >
              <view class="year"
                >{{ datas.orderInfoAppVO.yearType || "" }}款</view
              >
            </view>
            <view class="content"
              >{{ datas.orderInfoAppVO.categoryDesc || "" }} |
              {{ datas.orderInfoAppVO.seatingNum || "" }}座 |
              {{ datas.orderInfoAppVO.doorNum || "" }}门 |
              {{ datas.orderInfoAppVO.gearTypeDesc || "" }} |
              {{ datas.orderInfoAppVO.displacement || "" }}</view
            >
            <u--image
              src="/static/images/order/tips.png"
              width="292rpx"
              height="24rpx"
            ></u--image>
          </view>
          <u--image
            :src="datas.orderInfoAppVO.carImg || ''"
            width="220rpx"
            height="104rpx"
          ></u--image>
        </view>
        <view class="backTime">
          <view class="time">{{
            formatDateTime(datas.orderInfoAppVO.takeTime)
          }}</view>
          <view class="day">
            <view class="text">{{ diffDay }}天</view>
            <u--image
              src="/static/images/home/time.png"
              width="94rpx"
              height="8rpx"
            ></u--image>
          </view>
          <view class="time">{{
            formatDateTime(datas.orderInfoAppVO.stillTime)
          }}</view>
        </view>
        <view class="backMode">
          <view class="btn">还取方式</view>
          <view class="text">{{ datas.orderStoreInfoAppVO.labelA || "" }}</view>
        </view>
        <view class="map">
          <view class="des">
            <view class="name">{{ datas.orderStoreInfoAppVO.deptName }}</view>
            <view class="row"
              >营业时间{{ datas.orderStoreInfoAppVO.sellStartTime }}-{{
                datas.orderStoreInfoAppVO.sellEndTime
              }}</view
            >
            <view class="row"
              >距离门店直线距离{{
                datas.orderStoreInfoAppVO.pureDistance || "-"
              }}km</view
            >
          </view>
          <view class="icon" @click="handleMap()">
            <u-icon
              name="map"
              color="rgba(64, 200, 131, 1)"
              size="26rpx"
            ></u-icon>
            <view class="text">地图</view>
          </view>
        </view>
      </view>
      <view class="list">
        <view class="comment_title" @click="handleBusiness">
          <view class="text">{{ datas.orderStoreInfoAppVO.storeName }}</view>
          <view
            class="t"
            v-if="
              !datas.orderStoreInfoAppVO.source ||
              datas.orderStoreInfoAppVO.source !== 'wk'
            "
            >综合</view
          >
          <view
            class="num"
            v-if="
              !datas.orderStoreInfoAppVO.source ||
              datas.orderStoreInfoAppVO.source !== 'wk'
            "
            >{{ averageGrade }}</view
          >
          <view
            class="t"
            v-if="
              !datas.orderStoreInfoAppVO.source ||
              datas.orderStoreInfoAppVO.source !== 'wk'
            "
            >分</view
          >
          <u-icon
            name="arrow-right"
            color="rgba(186, 186, 186, 1)"
            size="28rpx"
          ></u-icon>
        </view>
        <view class="comment_label">
          <view
            class="item"
            v-for="(item, index) in datas.orderStoreInfoAppVO.labelsB"
            :key="index"
            >{{ item }}</view
          >
        </view>
        <view class="comment_policy">
          <view
            v-for="(item, index) in datas.orderStoreInfoAppVO.labels"
            :key="index"
            :class="item == '随心租' ? 'i1' : 'item'"
            >{{ item }}</view
          >
        </view>
      </view>
      <view class="list">
        <view class="driver_tit">驾驶员</view>
        <view class="driver_cont">
          <view class="row">
            <view class="text">姓名</view>
            <view class="content">{{ datas.employeeDriver.name }}</view>
          </view>
          <view class="row">
            <view class="text">身份证</view>
            <view class="content">{{ datas.employeeDriver.cardNo }}</view>
          </view>
          <view class="row" style="border: 0">
            <view class="text">手机号</view>
            <view class="content">{{ datas.employeeDriver.phone }}</view>
          </view>
        </view>
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
                  `${storePolicy.driverLicense || ''}<br /> ${
                    storePolicy.identityCard || ''
                  }`
                )
              "
              class="text"
            ></rich-text>
          </view>
        </view>
      </view>
      <view class="list" v-if="datas.orderInfoAppVO.userOrderState != 4">
        <view class="driver_tit">增值服务</view>
        <view class="ser_jc">
          <view class="text">基础保障服务</view>
          <view class="price">¥{{ datas.costPriceInfo.basicFeeSum }}</view>
          <view class="des">{{
            datas.costPriceInfo.basicFeeSum > 0 ? "已含" : "未含"
          }}</view>
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
        <view class="ser_new">
          <view class="tit">
            <u--image
              src="/static/images/order/new.png"
              width="164rpx"
              height="50rpx"
            ></u--image>
            <view class="te">60%用户选择升级保障，安心出行,用车无忧</view>
          </view>
          <view class="ser_zx" v-if="datas.costPriceInfo.isChangeEnjoy">
            <view class="text">尊享服务</view>
            <view class="price"
              >¥{{ datas.costPriceInfo.enjoyFeeSum || 0 }}</view
            >
            <view class="des" style="color: rgba(135, 139, 138, 1)">{{
              datas.costPriceInfo.enjoyFeeSum > 0 ? "已购买" : "未购买"
            }}</view>
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
      <view
        class="list"
        v-if="
          datas.orderInfoAppVO.userOrderState == 1 ||
          datas.orderInfoAppVO.userOrderState == 2
        "
      >
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
                datas.costPriceInfo && datas.costPriceInfo.damageFee
                  ? datas.costPriceInfo.damageFee
                  : 0
              }}
              车损押金，免￥{{
                datas.costPriceInfo && datas.costPriceInfo.illegalFee
                  ? datas.costPriceInfo.illegalFee
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
      <view class="zhima" v-if="datas.orderInfoAppVO.userOrderState != 4">
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
                  datas.costPriceInfo && datas.costPriceInfo.damageFee
                    ? datas.costPriceInfo.damageFee
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
                  datas.costPriceInfo && datas.costPriceInfo.illegalFee
                    ? datas.costPriceInfo.illegalFee
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
      <view class="list" v-if="datas.orderInfoAppVO.userOrderState == 4">
        <view class="driver_tit">租金明细</view>
        <view class="mx_cont">
          <view class="item">
            <view class="text">车辆租金</view>
            <view class="day"
              >¥{{ datas.costPriceInfo.carPriceForDay }}×{{
                datas.costPriceInfo.days
              }}天</view
            >
            <view class="money">¥{{ datas.costPriceInfo.carPriceSum }}</view>
          </view>
          <u-line color="rgba(237, 237, 237, 1)"></u-line>
          <view class="item">
            <view class="text">服务费/手续费</view>
          </view>
          <view class="item">
            <view class="text gray">手续费</view>
            <view class="money">¥{{ datas.costPriceInfo.carPrepareFee }}</view>
          </view>
          <view class="item" v-if="datas.costPriceInfo.otherStoreFreeMoney">
            <view class="text gray">异店取还车服务费</view>
            <view class="money"
              >¥{{ datas.costPriceInfo.otherStoreFreeMoney || 0 }}</view
            >
          </view>
          <view class="item" v-if="datas.costPriceInfo.stillCarMoney">
            <view class="text gray">还车上门费用</view>
            <view class="money"
              >¥{{ datas.costPriceInfo.stillCarMoney || 0 }}</view
            >
          </view>
          <view class="item" v-if="datas.costPriceInfo.takeCarMoney">
            <view class="text gray">取车上门费用</view>
            <view class="money"
              >¥{{ datas.costPriceInfo.takeCarMoney || 0 }}</view
            >
          </view>
          <view class="item" v-if="datas.costPriceInfo.isChangeChildren == 1">
            <view class="text gray">儿童座椅费</view>
            <view class="day"
              >¥{{ datas.costPriceInfo.childrenFeeForDay }}/个×{{
                datas.costPriceInfo.days
              }}天×{{ datas.costPriceInfo.childrenMakeNum }}个</view
            >
            <view class="money">¥{{ datas.costPriceInfo.childrenFeeSum }}</view>
          </view>
          <u-line color="rgba(237, 237, 237, 1)"></u-line>
          <view class="item">
            <view class="text">租车保障费</view>
          </view>
          <view class="item">
            <view class="text">基础服务费</view>
            <view class="day"
              >¥{{ datas.costPriceInfo.basicFeeForDay }}×{{
                datas.costPriceInfo.days
              }}天</view
            >
            <view class="money">¥{{ datas.costPriceInfo.basicFeeSum }}</view>
          </view>
          <view class="item">
            <view class="text">尊享服务费</view>
            <view class="day"
              >¥{{ datas.costPriceInfo.enjoyFeeForDay }}×{{
                datas.costPriceInfo.days
              }}天</view
            >
            <view class="money"
              >¥{{ datas.costPriceInfo.enjoyFeeSum || 0 }}</view
            >
          </view>
          <u-line color="rgba(237, 237, 237, 1)"></u-line>
          <view class="item">
            <view class="total">合计</view>
            <view class="money" style="font-size: 36rpx"
              >¥{{ datas.costPriceInfo.realTotalMoney }}</view
            >
          </view>
          <!-- <view class="item">
            <view class="total">优惠</view>
            <view class="money">-¥63</view>
          </view> -->
        </view>
      </view>
      <view class="list" v-if="datas.orderInfoAppVO.userOrderState == 4">
        <view class="driver_tit">押金</view>
        <view class="deposit_row">
          <view class="row">
            <view class="text">车损押金</view>
            <view class="info"
              >¥{{ datas.orderStoreInfoAppVO.carPriceBase.damageFee }}</view
            >
          </view>
          <view class="row">
            <view class="text">违章押金</view>
            <view class="info"
              >¥{{ datas.orderStoreInfoAppVO.carPriceBase.illegalFee }}</view
            >
          </view>
        </view>
        <view class="deposit_free">
          <view class="row">
            <view class="btn">信用免押</view>
            <view class="text">本单支付后可享</view>
            <view class="green">免押金</view>
          </view>
          <view class="row">
            <view class="text">若不申请线上免押金，需要在取车时支付押金</view>
          </view>
        </view>
        <view class="deposit_info">
          <rich-text :nodes="strToArrHtml(nodes2)" class="text"></rich-text>
        </view>
      </view>
      <view class="list">
        <view class="rule_title">
          <view class="title">门店政策</view>
          <view class="more" @click="handleXuZhi()">更多</view>
          <u-icon
            name="arrow-right"
            color="rgba(186, 186, 186, 1)"
            size="28rpx"
            @click="handleXuZhi()"
          ></u-icon>
        </view>
        <view class="rule_sub">取消规则</view>
        <view class="rule_table">
          <view class="head">
            <view class="col w1">取消时间</view>
            <view class="col w2">扣费标注</view>
          </view>
          <view
            class="body"
            v-for="(item, index) in storePolicy.cancelRues"
            :key="index"
          >
            <view class="col w1">{{ item.time }}</view>
            <view class="col w2">{{ item.desc }}</view>
          </view>
        </view>
        <view class="rule_sub">里程限制</view>
        <view class="rule_content">
          <rich-text
            :nodes="strToArrHtml(storePolicy.milesLimit || '')"
          ></rich-text>
        </view>
        <view class="rule_sub">禁行区域</view>
        <view class="rule_content">
          <rich-text
            :nodes="strToArrHtml(storePolicy.regionLimit || '')"
          ></rich-text>
        </view>
        <view class="rule_sub">发票</view>
        <view class="rule_content">
          <rich-text
            :nodes="strToArrHtml(storePolicy.invoice || '')"
          ></rich-text>
        </view>
      </view>
      <!-- <view class="list">
        <view class="driver_tit">预留信息</view>
        <view class="reserve_row">
          <view class="t1">订单号：</view>
          <view class="t2">{{ datas.orderInfoAppVO.orderGuid }}</view>
          <view
            class="t3"
            @click="handleCopyOrderId(datas.orderInfoAppVO.orderGuid)"
            >复制</view
          >
        </view>
        <view class="reserve_row">
          <view class="t1">创建订单时间：</view>
          <view class="t2">{{ datas.orderInfoAppVO.applyTime }}</view>
        </view>
        <view class="reserve_row">
          <view class="t1">支付订单时间：</view>
          <view class="t2">{{ datas.orderInfoAppVO.payTime }}</view>
        </view>
        <view class="reserve_row">
          <view class="t1">取车时间：</view>
          <view class="t2">2022-02-08 10:31</view>
        </view>
        <view class="reserve_row">
          <view class="t1">还车时间：</view>
          <view class="t2">2022-02-08 10:31</view>
        </view>
        <view class="reserve_row">
          <view class="t1">评价时间：</view>
          <view class="t2">2022-02-08 10:31</view>
        </view>
      </view> -->
    </view>
    <view class="footer">
      <view
        class="green_btn"
        v-if="datas.orderInfoAppVO.userOrderState != 1"
        @click="handleCall"
        >联系商家</view
      >
      <view
        class="blue_btn"
        v-if="datas.orderInfoAppVO.userOrderState == 2 && !isMianYa"
        @click="handleZhiMa"
        >使用芝麻免押</view
      >
      <view
        class="pay_btn"
        @click="handlePay"
        v-if="datas.orderInfoAppVO.userOrderState == 1"
        >立即支付</view
      >
      <view class="pay_text" v-if="datas.orderInfoAppVO.userOrderState == 1">
        <view class="text">总价</view>
        <view class="total">
          <text style="font-size: 28rpx">¥</text>
          <text style="font-size: 36rpx">{{
            datas.costPriceInfo.realTotalMoney
          }}</text>
        </view>
        <!-- <view class="old">369</view> -->
      </view>
    </view>
    <view class="d_popup">
      <business-popup
        :show="showBusiness"
        @close="showBusiness = false"
        :name="datas.orderStoreInfoAppVO.storeName"
        :businessGuid="datas.orderStoreInfoAppVO.businessGuid"
        :carinfoGuid="datas.orderInfoAppVO.carGuid"
        :storeGuid="datas.orderStoreInfoAppVO.storeGuid"
        :commentData="commentData"
      ></business-popup>
    </view>
    <view class="d_popup">
      <cost-popup
        :show="showCost"
        showTotal
        @close="showCost = false"
        :costPrice="datas.costPriceInfo || {}"
      ></cost-popup>
    </view>
    <view class="d_popup">
      <pay-popup
        :show="showPay"
        @close="showPay = false"
        :orderInfo="orderInfo"
      ></pay-popup>
    </view>
  </view>
</template>

<script>
import parseHtml from "@/utils/parseHtml";
import { getOrderDetail, getStorePolicy } from "@/api/order";
import BusinessPopup from "../common/business-popup";
import CostPopup from "../common/cost-popup";
import PayPopup from "../common/pay-popup";
import moment from "moment";
moment.locale("zh-cn");
import { isGantZhiMa, depositFreeze } from "@/api/home";
import { getCommentPage } from "@/api/comment";

export default {
  components: {
    BusinessPopup,
    CostPopup,
    PayPopup,
  },
  data() {
    return {
      isMianYa: false,
      showBusiness: false,
      showCost: false,
      showPay: false,
      loading: false,
      orderGuid: "",
      commentData: {
        data: {
          records: [],
        },
        countData: {},
      },
      datas: {
        orderInfoAppVO: {},
        ecarPriceAppVO: {},
        employeeDriver: {},
        orderStoreInfoAppVO: {},
        sellEndTime: {},
        sellStartTime: {},
        costPriceInfo: {},
        carPriceBase: {},
      },
      orderInfo: {},
      nodes:
        "<b>驾驶员本人身份证原件：</b>有效期1个月以上<br /> <b>驾驶员本人驾照原件：</b>有效期2个月以上、驾龄需1年以上<br /> <b>驾驶员本人国内信用卡：</b>有效期1个月以上(免押订单无需提供)",
      nodes2:
        "· 取车时支付车辆押金，若无车损，还车时退还；<br /> · 还车时支付违章押金，若无违章，还车后30~45天内退还",
      mianyaRadio: "",
      systemInfo: "",
      storePolicy: {
        cancelRues: [],
      },
    };
  },
  onLoad(options) {
    this.orderGuid = options.orderGuid;
    this.getData();
    // #ifdef  MP-ALIPAY
    this.systemInfo = "alipay";
    this.mianyaRadio = "1";
    // #endif
    // #ifndef  MP-ALIPAY
    this.systemInfo = "other";
    this.mianyaRadio = "2";
    // #endif
  },
  onShow() {
    this.getMianYa();
  },
  methods: {
    handleBusiness() {
      const { datas } = this;
      if (
        datas.orderStoreInfoAppVO &&
        datas.orderStoreInfoAppVO.source &&
        datas.orderStoreInfoAppVO.source === "wk"
      ) {
        return;
      }
      uni.showLoading({
        title: "加载中",
      });
      getCommentPage({
        businessGuid: datas.orderStoreInfoAppVO.businessGuid,
        carGuid: datas.orderInfoAppVO.carGuid,
        storeGuid: datas.orderStoreInfoAppVO.storeGuid,
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
    handleZhiMa() {
      // #ifdef  MP-ALIPAY
      depositFreeze({}).then((res) => {
        if (res.code === 200) {
          my.tradePay({
            orderStr: res.data,
            success: (reselt) => {
              this.$modal.msg("授权成功");
              this.getMianYa();
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
    getMianYa() {
      isGantZhiMa({}).then((res) => {
        if (res.code === 200 && res.data && res.data.isGrant == 0) {
          this.isMianYa = true;
        } else {
          this.isMianYa = false;
        }
      });
    },
    handlePay() {
      const { datas, orderGuid } = this;
      this.orderInfo = {
        payTime: datas.payTime,
        realTotalMoney: datas.costPriceInfo.realTotalMoney,
        orderGuid,
      };
      this.showPay = true;
    },
    handleCall() {
      const { datas } = this;
      uni.makePhoneCall({
        phoneNumber: datas.orderStoreInfoAppVO.contactPhone,
      });
    },
    handleCancel() {
      const { orderGuid } = this;
      uni.showModal({
        title: "提示",
        content: "是否取消订单？",
        cancelText: "再等等",
        confirmText: "确定",
        success: (res) => {
          if (res.confirm) {
            uni.navigateTo({
              url: `/pages/order/cancel?orderGuid=${orderGuid}`,
            });
          }
        },
      });
    },
    handleToHome() {
      uni.switchTab({
        url: "/pages/index",
      });
    },
    handleMap() {
      const { datas } = this;
      setTimeout(() => {
        uni.$emit("updateStore", datas.orderStoreInfoAppVO || {});
      }, 500);
      uni.navigateTo({
        url: `/pages/buy/map`,
      });
    },
    formatDateTime(time) {
      return moment(time).format("MM月DD日 HH:mm");
    },
    getStorePolicyData(params) {
      uni.showLoading({
        title: "加载中",
      });
      getStorePolicy({
        carinfoGuid: params.orderInfoAppVO.carGuid,
        stillTime: params.orderInfoAppVO.stillTime,
        storeGuid: params.orderInfoAppVO.storeGuid,
        takeTime: params.orderInfoAppVO.takeTime,
      }).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          this.storePolicy = res.data;
        }
      });
    },
    getData() {
      try {
        const { orderGuid } = this;
        uni.showLoading({
          title: "加载中",
        });
        getOrderDetail({ orderGuid }).then((res) => {
          this.loading = true;
          uni.hideLoading();
          if (res.code === 200) {
            this.datas = res.data;
            this.getStorePolicyData(res.data);
          }
        });
      } catch (error) {
        this.loading = false;
      }
    },
    handleXuZhi() {
      const { storePolicy } = this;
      const params = {
        milesLimit: storePolicy.milesLimit || "",
        regionLimit: storePolicy.regionLimit || "",
      };
      setTimeout(() => {
        uni.$emit("buyParamsUnderstood", params);
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
      const { datas } = this;
      if (datas.orderStoreInfoAppVO && datas.orderStoreInfoAppVO.averageGrade) {
        return Number(datas.orderStoreInfoAppVO.averageGrade).toFixed(1);
      }
      return 0;
    },
    backStatus() {
      const { datas } = this;
      if (datas.orderInfoAppVO && datas.orderInfoAppVO.userOrderState) {
        switch (datas.orderInfoAppVO.userOrderState) {
          case 1:
            return "待支付";
          case 2:
            return "待取车";
          case 3:
            return "已取车";
          case 4:
            return "已完成";
          case 5:
            return "已取消";
        }
      }
      return "";
    },
    backStillType() {
      const { datas } = this;
      let quche = "";
      switch (datas.orderInfoAppVO.takeType) {
        case 1:
          quche = "门店取还";
          break;
        case 2:
          quche = "免费接送";
          break;
        case 3:
          quche = "上门取还";
          break;
      }
      return quche;
    },
    diffDay() {
      const { datas } = this;
      const d1 = moment(datas.orderInfoAppVO.takeTime);
      const d2 = moment(datas.orderInfoAppVO.stillTime);
      return d2.diff(d1, "day");
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f6f6f6;
}
.ord_det_box {
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
  .goBtns {
    width: 100%;
    display: flex;
    margin-top: 30rpx;
    margin-bottom: 20rpx;
    .btn1 {
      flex: 1;
      height: 80rpx;
      border-radius: 12rpx;
      color: rgba(64, 200, 131, 1);
      line-height: 80rpx;
      text-align: center;
      border: 1px solid rgba(204, 204, 204, 1);
      box-sizing: border-box;
    }
    .btn2 {
      flex: 1;
      margin-right: 26rpx;
      height: 80rpx;
      border-radius: 12rpx;
      background: rgba(64, 200, 131, 1);
      color: #fff;
      line-height: 80rpx;
      text-align: center;
    }
  }
  .yj_tit {
    display: flex;
    padding-bottom: 28rpx;
    border-bottom: rgba(237, 237, 237, 1) 1px solid;
    align-items: center;
    .text {
      font-size: 32rpx;
      font-weight: bold;
    }
    .lable {
      padding: 6rpx 10rpx 6rpx 10rpx;
      font-size: 24rpx;
      background: rgba(234, 245, 241, 1);
      color: rgba(64, 200, 131, 1);
      margin-left: 14rpx;
    }
    .more {
      flex: 1;
      text-align: right;
      color: rgba(85, 160, 243, 1);
      font-size: 24rpx;
    }
  }
  .yj_wz {
    padding-bottom: 28rpx;
    padding-top: 28rpx;
    font-size: 32rpx;
    font-weight: bold;
    .small {
      font-size: 24rpx;
      font-weight: normal;
      margin-left: 16rpx;
    }
  }
  .yj_cont {
    font-size: 24rpx;
    color: rgba(135, 139, 138, 1);
    line-height: 32rpx;
  }
  .yj_more {
    padding-top: 56rpx;
    display: flex;
    flex-direction: row-reverse;
    .btns {
      width: 160rpx;
      height: 64rpx;
      border-radius: 8rpx;
      line-height: 64rpx;
      text-align: center;
      font-size: 28rpx;
      border: 1px solid rgba(64, 200, 131, 1);
      margin-left: 16rpx;
      color: rgba(64, 200, 131, 1);
    }
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
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
  .footer {
    width: 100%;
    height: 140rpx;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 30;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    border-top: #f1f1f1 1px solid;
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
    .blue_btn {
      width: 328rpx;
      height: 88rpx;
      border-radius: 12rpx;
      border: 1px solid rgba(0, 160, 233, 1);
      box-sizing: border-box;
      line-height: 88rpx;
      text-align: center;
      margin-right: 30rpx;
      color: rgba(0, 160, 233, 1);
      font-size: 32rpx;
    }
    .pay_btn {
      width: 240rpx;
      height: 88rpx;
      border-radius: 12rpx;
      background: rgba(64, 200, 131, 1);
      line-height: 88rpx;
      text-align: center;
      margin-right: 32rpx;
      color: #fff;
      font-size: 32rpx;
    }
    .pay_text {
      flex: 1;
      padding-left: 60rpx;
      display: flex;
      align-items: center;
      .text {
        font-size: 24rpx;
      }
      .total {
        color: rgba(250, 67, 67, 1);
        margin-left: 12rpx;
      }
      .old {
        margin-left: 22rpx;
        color: rgba(166, 166, 166, 1);
        font-size: 24rpx;
        text-decoration: line-through;
      }
    }
  }
  .mx_cont {
    .item {
      height: 88rpx;
      line-height: 88rpx;
      display: flex;
      align-items: center;
      font-size: 28rpx;
      .text {
        flex: 1;
      }
      .day {
        color: rgba(128, 128, 128, 1);
        margin-right: 20rpx;
      }
      .money {
        color: rgba(250, 67, 67, 1);
      }
      .gray {
        color: rgba(128, 128, 128, 1);
      }
      .red {
        color: rgba(250, 67, 67, 1) !important;
      }
      .total {
        flex: 1;
        text-align: right;
        padding-right: 24rpx;
      }
    }
  }
  .zhima {
    background: rgba(226, 242, 255, 1);
    padding: 32rpx;
    border-radius: 20rpx;
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
  .d_popup {
    position: absolute;
  }
}
</style>
