<h1 align="center">任我行租车小程序</h1>

<div align="center">

开箱即用的租车系统。

<a href="https://github.com/vuejs/vue">
<img src="https://img.shields.io/badge/vue-2.6.5-brightgreen.svg" alt="vue">
</a>
<a href="https://github.com/ElemeFE/element">
<img src="https://img.shields.io/badge/element--ui-2.9.1-brightgreen.svg" alt="element-ui">
</a>
<a href="https://gitee.com/dcloud/uni-app">uni-app</a>
<a href="https://gitee.com/y_project/RuoYi-App"><img src="https://img.shields.io/badge/RuoYi-v1.0.0-brightgreen.svg"></a>

</div>

## 系统简介

- 系统功能完备，开箱即用。
- 采用 uni-app 开发，一套代码打包多端，兼容多个平台。
- 支持异地取还车设置。
- 支持支付宝芝麻免押验证。
- 集成支付宝小程序支付、抖音小程序支付。
- 支持夜间服务费配置。
- 集成了第三方租车平台的数据。

## 寻求合作

当前只开源客户端 uni-app 代码，如需后台服务代码、管理端代码需付费或合作！

## 技术栈

后端技术栈：基于 RuoYi 的 Java 快速开发框架，采用 Spring Boot、Spring Security、Redis & Jwt。

前端技术栈：采用 Vue、Element UI、RuoYi。

小程序：uni-app 架构，兼容 H5 手机、支付宝小程序、抖音小程序，以上 3 个平台绝对兼容。其它平台未做测试，但相信不会做太多兼容性调整！

## 使用

```bash
git clone https://github.com/sccpt/car.git
cd car
npm install
```

修改 config.js 下的 baseUrl 参数为自己的服务器后台地址。

修改 config.js 下的 aMap 参数为自己的高德地图 key。

修改 manifest.json 下所有的 aMap 参数为自己的高德地图 key。

运行项目

> 打开 HBuilder X 编辑器，依次点击 运行 > 运行到内置浏览器

## 后台功能

```bash
├─ 登录
|	├─ 登录退出
├─ 首页
|	├─ 欢迎统计页
├─ 商户门店
|	├─ 商户管理--增删改查
|	├─ 全部门店--增删改查、服务设置、送车上面配置等
|	├─ 夜间服务费--增删改查
|	├─ 点评管理--增删改查
├─ 车辆管理
|	├─ 全部车辆--增删改查、上下线、价格设置、调度等
|	├─ 年检管理--增删改查
|	├─ 违章管理--增删改查
|	├─ 信用免押--增删改查
|	├─ 价格设置--增删改查
|	├─ 车型库--增删改查
├─ 订单管理
|	├─ 全部订单--增删改查、取消订单、排车、续租等
|	├─ 线上对账--增删改查、导出、质疑等
├─ 会员管理
|	├─ 租车会员--增删改查、拉黑、批量发短信等
├─ 系统管理
|	├─ 用户管理--增删改查
|	├─ 角色管理--增删改查
|	├─ 菜单管理--增删改查
|	├─ 部门管理--增删改查
|	├─ 岗位管理--增删改查
|	├─ 字典管理--增删改查
|	├─ 参数设置--增删改查
|	├─ 通知公告--增删改查
|	├─ 日志管理--增删改查
|	├─ 其它配置--增删改查
├─ 系统监控
|	├─ 在线用户
|	├─ 定时任务
|	├─ 数据监控
|	├─ 服务监控
|	├─ 缓存监控
|	├─ 缓存列表
```

## 小程序功能

```bash
├─ 登录
|	├─ 手机号发送短信登录
|	├─ 支付宝、抖音快捷登录
├─ 网站首页
|	├─ 异地取还车
|	├─ 在线验证芝麻免押
|	├─ 仿携程租取车时间选择控件，可选择当天取还车
├─ 订单
|	├─ 全部
|	├─ 待支付
|	├─ 待取车
|	├─ 已取车
|	├─ 已完成
|	├─ 已取消
├─ 我的
|	├─ 用户信息
|	├─ 个人资料修改
|	├─ 消息中心
|	├─ 违章查询
|	├─ 驾驶员管理
|	├─ 我的订单
```

## 界面截图

**微信小程序**

![商户管理](https://github.com/sccpt/car/blob/main/car/p1.png)

![全部门店](https://github.com/sccpt/car/blob/main/car/p2.png)

![全部车辆](https://github.com/sccpt/car/blob/main/car/p3.png)

![全部订单](https://github.com/sccpt/car/blob/main/car/p4.png)

**后台**

![首页](https://github.com/sccpt/car/blob/main/car/index.png)

![我的](https://github.com/sccpt/car/blob/main/car/my.png)

![下单](https://github.com/sccpt/car/blob/main/car/buy.png)

![时间控件](https://github.com/sccpt/car/blob/main/car/time.png)

![车型列表](https://github.com/sccpt/car/blob/main/car/car.png)

![订单中心](https://github.com/sccpt/car/blob/main/car/order.png)

## 感谢支持

如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^\_^
