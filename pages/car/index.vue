<!--
 * @Date: 2022-09-12 15:28:53
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-19 21:56:04
 * @FilePath: \小程序\pages\car\index.vue
-->
<template>
  <view class="car_box" :style="{ height: boxHeight }">
    <view class="header">
      <view class="check" @click="showEditPlace = true">
        <view class="address">{{ topCont.address }}</view>
        <view class="time"
          >{{ topCont.startTime }} - {{ topCont.endTime }}</view
        >
        <view class="edit">
          <u-icon
            name="edit-pen"
            color="rgba(42, 130, 228, 1)"
            size="36rpx"
          ></u-icon>
        </view>
      </view>
      <view class="screen">
        <view
          :class="{ item: true, active: showMore.sort }"
          @click="handleScreen('sort')"
        >
          <view class="text">推荐排序</view>
          <u-icon
            name="arrow-down"
            color="rgba(46, 46, 46, 1)"
            size="20rpx"
            v-if="!showMore.sort"
          ></u-icon>
          <u-icon
            name="arrow-up"
            color="rgba(64, 200, 131, 1)"
            size="20rpx"
            v-else
          ></u-icon>
        </view>
        <view
          :class="{ item: true, active: showMore.model }"
          @click="handleScreen('model')"
        >
          <view class="text">车型/配置</view>
          <u-icon
            name="arrow-down"
            color="rgba(46, 46, 46, 1)"
            size="20rpx"
            v-if="!showMore.model"
          ></u-icon>
          <u-icon
            name="arrow-up"
            color="rgba(64, 200, 131, 1)"
            size="20rpx"
            v-else
          ></u-icon>
        </view>
        <view
          :class="{ item: true, active: showMore.more }"
          @click="handleScreen('more')"
        >
          <view class="text">更多筛选</view>
          <u-icon
            name="arrow-down"
            color="rgba(46, 46, 46, 1)"
            size="20rpx"
            v-if="!showMore.more"
          ></u-icon>
          <u-icon
            name="arrow-up"
            color="rgba(64, 200, 131, 1)"
            size="20rpx"
            v-else
          ></u-icon>
        </view>
      </view>
      <view class="moreIcon">
        <view
          class="item"
          :class="params.isTakeStillFree == 1 ? 'green' : ''"
          @click="handleMoreScreen('isTakeStillFree')"
        >
          上门取送车
        </view>
        <view
          class="item"
          :class="
            params.isDoubleFree && params.isDoubleFree == 1 ? 'green' : 'yellow'
          "
          @click="handleMoreScreen('isDoubleFree')"
        >
          <u--image
            src="/static/images/car/sm_green.png"
            width="104rpx"
            height="30rpx"
            v-if="params.isDoubleFree && params.isDoubleFree == 1"
          ></u--image>
          <u--image
            src="/static/images/car/sm.png"
            width="104rpx"
            height="30rpx"
            v-else
          ></u--image>
        </view>
        <view
          class="item"
          :class="params.isOneYearCar == 1 ? 'green' : ''"
          @click="handleMoreScreen('isOneYearCar')"
        >
          一年新车
        </view>
        <view
          class="item"
          :class="params.isFreeCancel == 1 ? 'green' : ''"
          @click="handleMoreScreen('isFreeCancel')"
        >
          免费取消
        </view>
      </view>
      <view class="zhima">
        <u--image
          src="/static/images/car/sd.png"
          width="28rpx"
          height="32rpx"
        ></u--image>
        <view class="info">
          <text style="color: rgba(99, 188, 255, 1)">芝麻信用分</text>
          ｜550分以上有机会享受免押租车
        </view>
        <view class="more">
          <view class="text" @click="handleToZhima">查看详情</view>
          <u-icon
            name="arrow-right"
            color="rgba(68, 138, 216, 1)"
            size="24rpx"
          ></u-icon>
        </view>
      </view>
      <view class="screenCont" v-if="showMore.sort">
        <view class="sort">
          <view
            :class="{ item: true, active: sort == 0 }"
            @click="
              sort = 0;
              showMore.sort = false;
            "
          >
            <view class="text">推荐排序</view>
            <u-icon
              name="checkbox-mark"
              color="rgba(64, 200, 131, 1)"
              size="32rpx"
              v-if="sort == 0"
            ></u-icon>
          </view>
          <view
            :class="{ item: true, active: sort == 1 }"
            @click="
              sort = 1;
              showMore.sort = false;
            "
          >
            <view class="text">总价 低→高</view>
            <u-icon
              name="checkbox-mark"
              color="rgba(64, 200, 131, 1)"
              size="32rpx"
              v-if="sort == 1"
            ></u-icon>
          </view>
        </view>
      </view>
      <view class="screenCont" v-if="showMore.model">
        <view class="model">
          <view class="cont">
            <scroll-view scroll-y="true" class="menu">
              <view
                :class="{ item: true, active: toModelView === 'old' }"
                @click="toModelView = 'old'"
              >
                <view class="text">车龄</view>
              </view>
              <view
                :class="{ item: true, active: toModelView === 'number' }"
                @click="toModelView = 'number'"
              >
                <view class="text">座位数</view>
              </view>
              <view
                :class="{ item: true, active: toModelView === 'gear' }"
                @click="toModelView = 'gear'"
              >
                <view class="text">车辆排挡</view>
              </view>
              <view
                :class="{ item: true, active: toModelView === 'config' }"
                @click="toModelView = 'config'"
              >
                <view class="text">车辆配置</view>
              </view>
              <view
                :class="{ item: true, active: toModelView === 'brand' }"
                @click="toModelView = 'brand'"
              >
                <view class="text">车辆品牌</view>
              </view>
            </scroll-view>
            <scroll-view
              scroll-y="true"
              class="list"
              :scroll-into-view="toModelView"
              scroll-with-animation="true"
              @scrolltoupper="toModelView = 'old'"
            >
              <view class="tit" id="old">
                <view class="text">车龄</view>
              </view>
              <view class="main">
                <view
                  v-for="(item, index) in e_car_age"
                  :key="index"
                  :class="{ item: true, active: item.active }"
                  @click="
                    handleScreenItem('age', 'e_car_age', index, item.dictValue)
                  "
                >
                  <view class="btn">{{ item.dictLabel }}</view>
                </view>
              </view>
              <view class="tit" id="number">
                <view class="text">座位数</view>
              </view>
              <view class="main">
                <view
                  v-for="(item, index) in e_car_seat_number"
                  :key="index"
                  :class="{ item: true, active: item.active }"
                  @click="
                    handleScreenItem(
                      'seatingNum',
                      'e_car_seat_number',
                      index,
                      item.dictValue
                    )
                  "
                >
                  <view class="btn">{{ item.dictLabel }}</view>
                </view>
              </view>
              <view class="tit" id="gear">
                <view class="text">车辆排挡</view>
              </view>
              <view class="main">
                <view
                  v-for="(item, index) in e_car_gear_type"
                  :key="index"
                  :class="{ item: true, active: item.active }"
                  @click="
                    handleScreenItem(
                      'gearType',
                      'e_car_gear_type',
                      index,
                      item.dictValue
                    )
                  "
                >
                  <view class="btn">{{ item.dictLabel }}</view>
                </view>
              </view>
              <view class="tit" id="config">
                <view class="text">车辆配置</view>
              </view>
              <view class="main">
                <view
                  v-for="(item, index) in e_car_config"
                  :key="index"
                  :class="{ item: true, active: item.active }"
                  @click="
                    handleScreenItem(
                      'carConfig',
                      'e_car_config',
                      index,
                      item.dictValue
                    )
                  "
                >
                  <view class="btn">{{ item.dictLabel }}</view>
                </view>
              </view>
              <view class="tit" id="brand">
                <view class="text">车辆品牌</view>
                <view
                  class="more"
                  v-if="carBrand.length !== 0 && !showMoreBrand"
                  @click="showMoreBrand = true"
                  >展开</view
                >
                <u-icon
                  name="arrow-down"
                  color="rgba(85, 194, 139, 1)"
                  size="20rpx"
                  v-if="carBrand.length !== 0 && !showMoreBrand"
                ></u-icon>
                <view
                  class="more"
                  v-if="showMoreBrand"
                  @click="showMoreBrand = false"
                  >收起</view
                >
                <u-icon
                  name="arrow-up"
                  color="rgba(85, 194, 139, 1)"
                  size="20rpx"
                  v-if="showMoreBrand"
                ></u-icon>
              </view>
              <view
                class="pinpai"
                :style="
                  carBrand.length === 0 || showMoreBrand
                    ? ''
                    : 'height: 120rpx; overflow: hidden;'
                "
              >
                <view
                  class="pp_list"
                  v-for="(item, index) in carBrand"
                  :key="index"
                >
                  <view class="index">{{ item.index }}</view>
                  <view class="pp_cont">
                    <view
                      v-for="(cItem, cIndex) in item.list"
                      :key="cIndex"
                      :class="{ item: true, active: cItem.active }"
                      @click="
                        handleScreenItem(
                          'brandGuids',
                          'carBrand',
                          cIndex,
                          cItem.brandGuid,
                          item.index
                        )
                      "
                    >
                      <view class="btn">
                        <view class="pic">
                          <u-image
                            :src="cItem.blogo"
                            width="32rpx"
                            height="32rpx"
                          ></u-image>
                        </view>
                        <view class="text">{{ cItem.brandName }}</view>
                      </view>
                    </view>
                  </view>
                </view>
              </view>
            </scroll-view>
          </view>
          <view class="footer">
            <view class="reset" @click="handleReset">重置</view>
            <view class="ok" @click="handleSearch">确定</view>
          </view>
        </view>
      </view>
      <view class="screenCont" v-if="showMore.more">
        <view class="model">
          <view class="cont">
            <scroll-view scroll-y="true" class="menu">
              <view
                :class="{ item: true, active: toMoreView === 'service' }"
                @click="toMoreView = 'service'"
              >
                <view class="text">门店服务</view>
              </view>
              <view
                :class="{ item: true, active: toMoreView === 'company' }"
                @click="toMoreView = 'company'"
              >
                <view class="text">租车公司</view>
              </view>
            </scroll-view>
            <scroll-view
              scroll-y="true"
              class="list"
              :scroll-into-view="toMoreView"
              scroll-with-animation="true"
              @scrolltoupper="toMoreView = 'service'"
            >
              <view class="tit" id="service">
                <view class="text">门店服务</view>
              </view>
              <view class="main">
                <view
                  v-for="(item, index) in e_store_door_service"
                  :key="index"
                  @click="
                    handleScreenItem(
                      'store',
                      'e_store_door_service',
                      index,
                      item.dictValue
                    )
                  "
                  :class="{ item: true, active: item.active }"
                >
                  <view class="btn">{{ item.dictLabel }}</view>
                </view>
              </view>
              <view class="tit" id="company">
                <view class="text">租车公司</view>
                <view
                  class="more"
                  v-if="carCompany.length !== 0 && !showMoreCompany"
                  @click="showMoreCompany = true"
                  >展开</view
                >
                <u-icon
                  name="arrow-down"
                  color="rgba(85, 194, 139, 1)"
                  size="20rpx"
                  v-if="carCompany.length !== 0 && !showMoreCompany"
                ></u-icon>
                <view
                  class="more"
                  v-if="showMoreCompany"
                  @click="showMoreCompany = false"
                  >收起</view
                >
                <u-icon
                  name="arrow-up"
                  color="rgba(85, 194, 139, 1)"
                  size="20rpx"
                  v-if="showMoreCompany"
                ></u-icon>
              </view>
              <view
                class="main"
                :style="
                  carCompany.length === 0 || showMoreCompany
                    ? ''
                    : 'height: 140rpx; overflow: hidden;'
                "
              >
                <view
                  v-for="(item, index) in carCompany"
                  :key="index"
                  :class="{ item: true, active: item.active }"
                  @click="
                    handleScreenItem(
                      'businessIds',
                      'carCompany',
                      index,
                      item.businessGuid
                    )
                  "
                >
                  <view class="btn">{{ item.deptName }}</view>
                </view>
              </view>
            </scroll-view>
          </view>
          <view class="footer">
            <view class="reset" @click="handleReset">重置</view>
            <view class="ok" @click="handleSearch">确定</view>
          </view>
        </view>
      </view>
    </view>
    <view class="warp" :style="loading ? { background: '#ffffff' } : {}">
      <scroll-view
        scroll-y="true"
        class="menu"
        :style="{ height: scrollH + 'rpx' }"
      >
        <view
          v-for="(item, index) in menuList"
          :key="index"
          :class="{ item: true, active: item.active }"
          @click="handleMenu(index, item.category)"
        >
          <view class="text">{{ item.categoryDesc }}</view>
          <view class="price">￥{{ item.price }}起</view>
        </view>
      </scroll-view>
      <scroll-view
        scroll-y="true"
        class="list"
        :style="{ height: scrollH + 'rpx' }"
        @scrolltolower="loadMoreData"
      >
        <view
          class="item"
          v-for="(item, index) in dataList"
          :key="index"
          @click="handleItem(item)"
        >
          <view class="car">
            <u-image :src="item.carImg" width="172rpx" height="88rpx"></u-image>
            <view class="info">
              <view class="title">
                <view class="text"
                  >{{ item.brandName }}.{{ item.seriesName }}</view
                >
                <view class="more">
                  <u-icon
                    name="arrow-right"
                    color="rgba(140, 140, 140, 1)"
                    size="14rpx"
                  ></u-icon>
                </view>
              </view>
              <view class="des"
                >{{ item.categoryDesc }} | {{ item.seatingNum }}座 |
                {{ item.doorNum }}门 | {{ item.gearTypeDesc }} |
                {{ item.displacement }}</view
              >
            </view>
          </view>
          <view class="icons">
            <view
              v-for="(titem, tindex) in item.labels"
              :key="tindex"
              :class="{ subItem: true, sxz: titem === '随心租' }"
            >
              <u-image
                src="/static/images/car/sxz.png"
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
            <view class="num">{{ item.storeNum || 0 }}个报价</view>
            <view class="total">总价¥{{ item.amount }}起</view>
          </view>
        </view>
        <view class="moreData" v-if="dataList.length !== 0">
          <u-loadmore :status="loadStatus" />
        </view>
        <view class="skeleton" v-if="loading">
          <u-skeleton
            rows="2"
            :loading="loading"
            avatar
            avatarSize="160rpx"
            avatarShape="square"
          ></u-skeleton>
          <u-skeleton
            rows="2"
            :loading="loading"
            style="margin-top: 60rpx"
            avatar
            avatarSize="160rpx"
            avatarShape="square"
          ></u-skeleton>
          <u-skeleton
            rows="2"
            :loading="loading"
            style="margin-top: 60rpx"
            avatar
            avatarSize="160rpx"
            avatarShape="square"
          ></u-skeleton>
        </view>
        <view class="noData" v-if="!loading && dataList.length === 0">
          <u--image
            src="/static/icon_no_data.png"
            width="390rpx"
            height="390rpx"
          ></u--image>
          <view class="text">暂无车型数据</view>
        </view>
      </scroll-view>
    </view>
    <view class="popup">
      <offer-popup
        :show="showOffer"
        :offer="offerData"
        @close="showOffer = false"
        @handleTabs="handleOfferTabs"
        :carinfoGuid="carinfoGuid"
        :params="params"
        :isOtherAddress="editPlaceBack"
      ></offer-popup>
    </view>
    <view class="popup" v-if="showEditPlace">
      <edit-place-popup
        :show="showEditPlace"
        @close="showEditPlace = false"
        @handleCheckTime="handleCheckTime"
        :checkAddress="params"
        :backCar="editPlaceBack"
        @handleSearchEditPlace="handleEditPlaceSearch"
        @setEditPlaceBack="setEditPlaceBack"
        @editPlaceChage="editPlaceChage"
      ></edit-place-popup>
    </view>
    <view
      class="overlay"
      @click.stop="handleOverlay"
      v-if="showMore.sort || showMore.model || showMore.more"
    ></view>
  </view>
</template>

<script>
import OfferPopup from "../common/offer-popup";
import EditPlacePopup from "../common/edit-place-popup";
import moment from "moment";
moment.locale("zh-cn");
import {
  getCarListMenu,
  getCarList,
  getDictType,
  getCarBrand,
  getCarDept,
  getCarPriceList,
} from "@/api/car";

export default {
  components: {
    OfferPopup,
    EditPlacePopup,
  },
  data() {
    return {
      menuList: [],
      dataList: [],
      showMoreCompany: false,
      showMoreBrand: false,
      showOffer: false,
      toModelView: "old",
      toMoreView: "service",
      editPlaceBack: false,
      showEditPlace: false,
      loading: true,
      offerData: {
        info: {},
        list: [],
      },
      sort: 0,
      showMore: {
        sort: false,
        model: false,
        more: false,
      },
      topCont: {
        address: "",
        startTime: "",
        endTime: "",
      },
      params: {},
      oldParams: {},
      category: "",
      pageNum: 1,
      pageSize: 10,
      loadStatus: "loadmore",
      isLoadMore: false,
      carBrand: [],
      carCompany: [],
      priceData: [],
      carinfoGuid: "",
      e_car_config: [],
      e_car_age: [],
      e_car_seat_number: [],
      e_car_gear_type: [],
      e_store_door_service: [],
    };
  },
  onLoad() {
    this.getDictData("e_car_config");
    this.getDictData("e_car_age");
    this.getDictData("e_car_seat_number");
    this.getDictData("e_car_gear_type");
    this.getDictData("e_store_door_service");
  },
  onShow() {
    uni.$on("carListParams", (data) => {
      this.params = { ...data };
      this.topCont.address = data.address;
      this.topCont.startTime = moment(data.takeTime).format("MM月DD日 HH:mm");
      this.topCont.endTime = moment(data.stillTime).format("MM月DD日 HH:mm");
      if (data.backCar) {
        this.editPlaceBack = true;
      }
      this.getMenuData();
      this.getCarBrandData();
      this.getCarCompany();
    });
    uni.$on("updateTown", (data) => {
      if (data.type === "go") {
        this.params.cityName = data.cityName;
        this.params.location = data.location;
        this.params.address = data.address;
        this.params.cityCode = data.areaCode;
        this.topCont.address = data.address;
      }
      if (data.type === "back") {
        this.params.backCityName = data.cityName;
        this.params.backLoc = data.location;
        this.params.backAddress = data.address;
        this.params.backCityCode = data.areaCode;
        this.showEditPlace = false;
        setTimeout(() => {
          this.showEditPlace = true;
        }, 200);
      }
    });
  },
  onUnload() {
    uni.$off("carListParams");
    uni.$off("updateTown");
  },
  methods: {
    loadMoreData() {
      if (!this.isLoadMore) {
        this.isLoadMore = true;
        this.pageNum += 1;
        this.getCarListData();
        this.loadStatus = "loading";
      }
    },
    handleMenu(i, category) {
      this.category = category;
      const datas = this.menuList.map((item, index) => {
        if (i == index) {
          item.active = true;
        } else {
          item.active = false;
        }
        return item;
      });
      this.menuList = datas;
      this.pageNum = 1;
      this.loadStatus = "loadmore";
      this.isLoadMore = false;
      this.dataList = [];
      this.loading = true;
      this.getCarListData();
    },
    handleCheckTime(time) {
      this.params.takeTime = time.startTime;
      this.params.stillTime = time.endTime;
      this.topCont.startTime = moment(time.startTime).format("MM月DD日 HH:mm");
      this.topCont.endTime = moment(time.endTime).format("MM月DD日 HH:mm");
    },
    setEditPlaceBack(e) {
      this.editPlaceBack = e;
    },
    handleToZhima() {
      uni.navigateTo({
        url: "/pages/other/zhima",
      });
    },
    handleReset() {
      const obj = { ...this.params };
      delete obj.store;
      delete obj.seatingNum;
      delete obj.isTakeStillFree;
      delete obj.isOneYearCar;
      delete obj.isFreeCancel;
      delete obj.isDoubleFree;
      delete obj.gearType;
      delete obj.brandGuids;
      delete obj.businessIds;
      delete obj.carConfig;
      delete obj.carInfoIds;
      this.params = obj;
      this.pageNum = 1;
      this.pageSize = 10;
      this.loadStatus = "loadmore";
      this.isLoadMore = false;
      this.dataList = [];
      this.getMenuData();
      this.resetData("e_car_config");
      this.resetData("e_car_age");
      this.resetData("e_car_seat_number");
      this.resetData("e_car_gear_type");
      this.resetData("e_store_door_service");
      this.resetData("carBrand");
      this.resetData("carCompany");
      this.showMore = {
        sort: false,
        model: false,
        more: false,
      };
      this.showEditPlace = false;
    },
    handleEditPlaceSearch() {
      this.handleSearch();
      this.getCarBrandData();
      this.getCarCompany();
    },
    handleSearch() {
      this.pageNum = 1;
      this.pageSize = 10;
      this.loadStatus = "loadmore";
      this.isLoadMore = false;
      this.dataList = [];
      this.getMenuData();
      this.showMore = {
        sort: false,
        model: false,
        more: false,
      };
      this.showEditPlace = false;
    },
    handleOfferTabs(e) {
      this.getPriceData(e.year);
      const datas = this.offerData.info.year.map((item, index) => {
        if (e.index == index) {
          item.active = true;
        } else {
          item.active = false;
        }
        return item;
      });
      this.offerData.info.year = datas;
    },
    resetData(dictName) {
      if (dictName === "carBrand") {
        const datas = this.carBrand.map((item) => {
          item.list.map((iList) => {
            iList.active = false;
            return iList;
          });
          return item;
        });
        this.carBrand = datas;
        return;
      }
      const datas = this[dictName].map((item) => {
        item.active = false;
        return item;
      });
      this[dictName] = datas;
    },
    handleMoreScreen(name) {
      const obj = { ...this.params };
      if (obj[name] === undefined || obj[name] == 0) {
        obj[name] = 1;
      } else {
        obj[name] = 0;
      }
      this.params = obj;
      this.handleSearch();
    },
    handleScreenItem(paramsName, dictName, index, value, letter) {
      if (paramsName === "age" || paramsName === "gearType") {
        const datas = this[dictName].map((item, i) => {
          if (index === i && !item.active) {
            this.params[paramsName] = value;
            item.active = true;
          } else if (index === i && item.active) {
            this.params[paramsName] = "";
            item.active = false;
          } else {
            item.active = false;
          }
          return item;
        });
        this[dictName] = datas;
      }
      if (
        paramsName === "seatingNum" ||
        paramsName === "carConfig" ||
        paramsName === "store" ||
        paramsName === "businessIds"
      ) {
        const datas = this[dictName].map((item, i) => {
          if (index === i && !item.active) {
            if (this.params[paramsName]) {
              this.params[paramsName].push(value);
            } else {
              this.params[paramsName] = [value];
            }
            item.active = true;
          } else if (index === i && item.active) {
            const pI = this.params[paramsName].indexOf(value);
            this.params[paramsName].splice(pI, 1);
            item.active = false;
          }
          return item;
        });
        this[dictName] = datas;
      }
      if (paramsName === "brandGuids") {
        const datas = this.carBrand.map((item) => {
          if (item.index === letter) {
            item.list.map((cItem, cIndex) => {
              if (cIndex === index && !cItem.active) {
                if (this.params[paramsName]) {
                  this.params[paramsName].push(value);
                } else {
                  this.params[paramsName] = [value];
                }
                cItem.active = true;
              } else if (cIndex === index && cItem.active) {
                const pI = this.params[paramsName].indexOf(value);
                this.params[paramsName].splice(pI, 1);
                cItem.active = false;
              }
              return cItem;
            });
          }
          return item;
        });
        this.carBrand = datas;
      }
    },
    formatParams() {
      const p = { ...this.params };
      if (this.editPlaceBack) {
        const backLoc = p.backLoc.split(",");
        p.isOtherAddress = 1;
        p.backLat = backLoc[1];
        p.backLng = backLoc[0];
      } else {
        p.isOtherAddress = 0;
      }
      for (const key in p) {
        if (typeof p[key] == "object") {
          p[key] = `${p[key]}`;
        }
      }
      return p;
    },
    getMenuData() {
      this.loading = true;
      const { params } = this;
      const loc = params.location.split(",");
      const p = this.formatParams();
      getCarListMenu({
        lat: loc[1],
        lng: loc[0],
        ...p,
      }).then((res) => {
        if (res.code === 200) {
          if (!res.data || res.data.length === 0) {
            this.loading = false;
          }
          res.data?.map((item, index) => {
            if (index === 0) {
              item.active = true;
              this.category = item.category;
              this.getCarListData();
            } else {
              item.active = false;
            }
          });
          this.menuList = res.data;
        }
      });
    },
    getCarListData() {
      const { params, category, pageNum, pageSize } = this;
      const loc = params.location.split(",");
      const p = this.formatParams();
      getCarList({
        category,
        lat: loc[1],
        lng: loc[0],
        ...p,
        pageNum,
        pageSize,
      }).then((res) => {
        this.loading = false;
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
    getDictData(dictType) {
      getDictType(dictType).then((res) => {
        if (res.code === 200) {
          this[dictType] = res.data;
        }
      });
    },
    getCarBrandData() {
      const { params } = this;
      const loc = params.location.split(",");
      const p = this.formatParams();
      getCarBrand({
        lat: loc[1],
        lng: loc[0],
        ...p,
      }).then((res) => {
        if (res.code === 200 && res.data) {
          const toTree = (data) => {
            let result = [];
            const obj = {};
            data.map((item) => {
              if (obj[item.firstletter]) {
                obj[item.firstletter].push({ ...item });
              } else {
                obj[item.firstletter] = [{ ...item }];
              }
            });
            for (const key in obj) {
              const ob = { index: key, list: [] };
              obj[key].map((item) => {
                ob.list.push(item);
              });
              result.push(ob);
            }
            return result;
          };
          this.carBrand = toTree(res.data);
        }
      });
    },
    getCarCompany() {
      const { params } = this;
      const loc = params.location.split(",");
      const p = this.formatParams();
      getCarDept({
        ...p,
        lat: loc[1],
        lng: loc[0],
      }).then((res) => {
        if (res.code === 200) {
          this.carCompany = res.data;
        }
      });
    },
    getPriceData(yearType) {
      uni.showLoading({
        title: "加载中",
      });
      const { params, carinfoGuid } = this;
      const loc = params.location.split(",");
      const p = this.formatParams();
      getCarPriceList({
        ...p,
        lat: loc[1],
        lng: loc[0],
        yearType,
        carInfoIds: carinfoGuid,
      }).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          this.offerData.list = res.data;
          this.showOffer = true;
        }
      });
    },
    handleBackEdit() {
      uni.navigateBack();
    },
    handleItem(row) {
      const yearData = [];
      row.yearTypeList?.map((item, index) => {
        if (index == 0) {
          yearData.push({
            active: true,
            name: item,
          });
        } else {
          yearData.push({
            active: false,
            name: item,
          });
        }
      });
      this.carinfoGuid = row.carinfoGuid;
      this.getPriceData(row.yearTypeList[0]);
      this.offerData.info.year = yearData;
      this.offerData.info.pic = row.carImg;
      this.offerData.info.name = `${row.brandName}.${row.seriesName}`;
      this.offerData.info.des = `${row.categoryDesc || ""} | ${
        row.seatingNum || ""
      }座 |
                ${row.doorNum || ""}门 | ${row.gearTypeDesc || ""} |
                ${row.displacement || ""}`;
    },
    handleOverlay() {
      const showMore = { ...this.showMore };
      for (const key in this.showMore) {
        if (this.showMore[key]) {
          showMore[key] = false;
        }
      }
      this.showMore = showMore;
    },
    handleScreen(index) {
      const showMore = { ...this.showMore };
      for (const key in showMore) {
        if (key === index) {
          showMore[key] = !this.showMore[key];
        } else {
          showMore[key] = false;
        }
      }
      this.showMore = showMore;
    },
  },
  computed: {
    scrollH() {
      let sys = uni.getSystemInfoSync();
      let winWidth = sys.windowWidth;
      let winrate = 750 / winWidth;
      let winHeight = parseInt(sys.windowHeight * winrate);
      return winHeight - 370;
    },
    boxHeight() {
      let sys = uni.getSystemInfoSync();
      let winWidth = sys.windowWidth;
      let winrate = 750 / winWidth;
      let winHeight = parseInt(sys.windowHeight * winrate);
      return winHeight + "rpx";
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f6f6f6;
}
.car_box {
  display: flex;
  flex-direction: column;
  position: relative;

  .popup {
    position: absolute;
  }
  .header {
    width: 100%;
    // height: 370rpx;
    background: #fff;
    position: relative;
    z-index: 99;
  }
  .check {
    margin: 0 32rpx 0 32rpx;
    border-radius: 8rpx;
    background: rgba(246, 246, 246, 1);
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20rpx;
    .address {
      color: rgba(46, 46, 46, 1);
      font-size: 28rpx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 90%;
      text-align: center;
    }
    .time {
      color: rgba(46, 46, 46, 1);
      font-size: 24rpx;
      padding-top: 4rpx;
    }
    .edit {
      position: absolute;
      right: 28rpx;
      top: 28rpx;
      z-index: 20;
    }
  }
  .screen {
    display: flex;
    padding: 50rpx 20rpx 36rpx 20rpx;
    align-items: center;
    .item {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      .text {
        color: rgba(46, 46, 46, 1);
        font-size: 28rpx;
        margin-right: 6rpx;
      }
    }
    .active {
      .text {
        color: rgba(64, 200, 131, 1);
      }
    }
  }
  .moreIcon {
    display: flex;
    padding-left: 34rpx;
    padding-right: 34rpx;
    .item {
      flex: 1;
      margin-left: 8rpx;
      margin-right: 8rpx;
      height: 54rpx;
      border-radius: 8rpx;
      background: rgba(246, 246, 246, 1);
      display: flex;
      align-items: center;
      justify-content: center;
      color: rgba(38, 38, 38, 1);
      font-size: 24rpx;
    }
    .yellow {
      background: rgba(255, 223, 196, 1);
    }
    .green {
      background: rgba(241, 253, 250, 1);
      color: rgba(64, 200, 131, 1);
    }
  }
  .zhima {
    width: 100%;
    height: 54rpx;
    background: rgba(230, 244, 255, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 24rpx;
    font-size: 24rpx;
    .info {
      margin-left: 10rpx;
    }
    .more {
      margin-left: 50rpx;
      color: rgba(68, 138, 216, 1);
      display: flex;
      align-items: center;
      .text {
        margin-right: 14rpx;
      }
    }
  }
  .warp {
    flex: 1;
    display: flex;
    position: relative;
    z-index: 10;
    background: #f6f6f6;
    .menu {
      width: 156rpx;
      display: flex;
      flex-direction: column;
      background: #f6f6f6;
      .item {
        width: 100%;
        padding-bottom: 20rpx;
        padding-top: 20rpx;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .text {
          font-size: 28rpx;
        }
        .price {
          font-size: 24rpx;
        }
      }
      .active {
        background: #fff;
        .text {
          color: rgba(64, 200, 131, 1);
        }
        .price {
          color: rgba(64, 200, 131, 1);
        }
      }
    }
    .list {
      flex: 1;
      display: flex;
      flex-direction: column;
      .item {
        padding: 32rpx;
        background: #fff;
        margin-bottom: 16rpx;
        .car {
          display: flex;
          align-items: center;
          padding-top: 4rpx;
          padding-bottom: 28rpx;
          border-bottom: #f1f1f1 1px solid;
          .info {
            flex: 1;
            padding-left: 24rpx;
            .title {
              display: flex;
              align-items: center;
              .text {
                flex: 1;
                color: rgba(46, 46, 46, 1);
                font-size: 28rpx;
                font-weight: bold;
              }
              .more {
                width: 26rpx;
                height: 26rpx;
                border: 1px solid rgba(204, 204, 204, 1);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            }
            .des {
              padding-top: 12rpx;
              color: rgba(166, 166, 166, 1);
              font-size: 24rpx;
              line-height: 42rpx;
            }
          }
        }
        .icons {
          padding-top: 12rpx;
          padding-bottom: 20rpx;
          display: flex;
          flex-wrap: wrap;
          .subItem {
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
  .overlay {
    width: 750rpx;
    height: 100vh;
    background: rgba($color: #000000, $alpha: 0.3);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 30;
  }
  .screenCont {
    width: 750rpx;
    overflow: hidden;
    position: absolute;
    background: #fff;
    left: 0;
    top: 220rpx;
    z-index: 10;
    .sort {
      padding: 32rpx;
      .item {
        padding-top: 28rpx;
        padding-bottom: 28rpx;
        border-bottom: rgba(204, 204, 204, 1) 1px solid;
        display: flex;
        align-items: center;
        &:last-child {
          border: 0;
        }
        .text {
          font-size: 28rpx;
          flex: 1;
        }
      }
      .active {
        .text {
          color: rgba(64, 200, 131, 1);
        }
      }
    }
    .model {
      width: 750rpx;
      height: 880rpx;
      display: flex;
      background: rgba(246, 246, 246, 1);
      flex-direction: column;
      .cont {
        width: 750rpx;
        height: calc(880rpx - 144rpx);
        display: flex;
      }
      .footer {
        width: 100%;
        height: 144rpx;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: #f1f1f1 1px solid;
        .reset {
          width: 248rpx;
          height: 88rpx;
          border-radius: 12rpx;
          border: 1px solid rgba(204, 204, 204, 1);
          line-height: 88rpx;
          text-align: center;
          font-size: 32rpx;
          color: rgba(64, 200, 131, 1);
        }
        .ok {
          width: 418rpx;
          height: 88rpx;
          border-radius: 12rpx;
          background: rgba(64, 200, 131, 1);
          border: 1px solid rgba(64, 200, 131, 1);
          font-size: 32rpx;
          color: #fff;
          line-height: 88rpx;
          text-align: center;
          margin-left: 20rpx;
        }
      }
      .menu {
        width: 176rpx;
        display: flex;
        overflow: hidden;
        flex-direction: column;
        .item {
          width: 100%;
          padding-top: 28rpx;
          padding-bottom: 28rpx;
          overflow: hidden;
          .text {
            padding-left: 32rpx;
            font-size: 28rpx;
          }
        }
        .active {
          background: #fff;
          .text {
            color: rgba(64, 200, 131, 1);
          }
        }
      }
      .list {
        width: calc(100% - 176rpx);
        height: 736rpx;
        overflow-x: hidden;
        overflow-y: auto;
        padding: 8rpx 28rpx 28rpx 28rpx;
        background: #fff;
        .tit {
          padding-bottom: 20rpx;
          padding-top: 20rpx;
          display: flex;
          .text {
            flex: 1;
            font-size: 28rpx;
          }
          .more {
            color: rgba(85, 194, 139, 1);
            font-size: 24rpx;
            margin-right: 6rpx;
          }
        }
        .aTit {
          color: rgba(64, 200, 131, 1);
        }
        .main {
          display: flex;
          flex-wrap: wrap;
          margin-left: -12rpx;
          .item {
            width: 33.3%;
            overflow: hidden;
            display: flex;
            margin-bottom: 12rpx;
            .btn {
              margin-left: 12rpx;
              flex: 1;
              height: 56rpx;
              border-radius: 4rpx;
              background: rgba(246, 246, 246, 1);
              line-height: 56rpx;
              text-align: center;
              font-size: 24rpx;
            }
          }
          .active .btn {
            color: rgba(64, 200, 131, 1);
            background: rgba(64, 200, 131, 0.1);
          }
        }
        .pinpai {
          width: 100%;
          .pp_list {
            width: 100%;
            overflow: hidden;
            display: flex;
            .index {
              line-height: 56rpx;
              padding-right: 12rpx;
              font-size: 24rpx;
            }
            .pp_cont {
              flex: 1;
              display: flex;
              flex-wrap: wrap;
              margin-right: -12rpx;
              .item {
                width: 50%;
                overflow: hidden;
                display: flex;
                margin-bottom: 12rpx;
                .btn {
                  margin-right: 12rpx;
                  flex: 1;
                  height: 56rpx;
                  border-radius: 4rpx;
                  background: rgba(246, 246, 246, 1);
                  line-height: 56rpx;
                  font-size: 24rpx;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  .pic {
                    margin-left: 12rpx;
                  }
                  .text {
                    flex: 1;
                    padding-left: 8rpx;
                    padding-right: 8rpx;
                    font-size: 24rpx;
                    white-space: nowrap;
                    overflow: hidden;
                    text-align: left;
                    text-overflow: ellipsis;
                  }
                }
              }
              .active .btn {
                color: rgba(64, 200, 131, 1);
                background: rgba(64, 200, 131, 0.1);
              }
            }
          }
        }
      }
    }
  }
  .moreData {
    padding: 30rpx;
  }
  .warpNoData {
    flex: 1;
    display: flex;
    position: relative;
    z-index: 10;
    background: #f6f6f6;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .noData {
    margin-left: -80rpx;
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
  .skeleton {
    flex: 1;
    padding: 36rpx;
    display: flex;
    flex-direction: column;
  }
}
</style>
