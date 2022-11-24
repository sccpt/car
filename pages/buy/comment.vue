<!--
 * @Date: 2022-09-11 15:24:39
 * @LastEditors: yuwangcx
 * @LastEditTime: 2022-11-01 11:24:39
 * @FilePath: 任我行\pages\buy\comment.vue
-->
<template>
  <view class="com_box11">
    <view class="com_tips">我们会根据您的评价努力改进哦~</view>
    <view class="com_main">
      <view class="com_tit">
        <view class="text">您对商家/车辆满意吗</view>
        <view class="lable">
          <u-checkbox-group
            v-model="checkboxValue"
            placement="row"
            shape="circle"
          >
            <u-checkbox label="匿名提交" :name="1"> </u-checkbox>
          </u-checkbox-group>
        </view>
      </view>
      <view class="com_list">
        <view class="item" v-for="(item, index) in rateList" :key="index">
          <view class="text">{{ item.name }}</view>
          <u-rate
            v-model="item.value"
            size="34rpx"
            activeColor="rgba(255, 206, 28, 1)"
          ></u-rate>
        </view>
      </view>
      <view class="com_input">
        <view class="textCont">
          <u--image
            src="/static/images/comment/inpt.png"
            width="32rpx"
            height="32rpx"
            style="margin-top: 22rpx"
          ></u--image>
          <u--textarea
            v-model="commentContent"
            placeholder="说说租车感受吧，给大家参考"
            height="220rpx"
            style="background: none"
            border="none"
          ></u--textarea>
        </view>
        <view class="fileList" v-if="fileList.length !== 0">
          <view class="item" v-for="(item, index) in fileList" :key="index">
            <u--image
              v-if="item.type === 'image'"
              :src="item.url"
              width="200rpx"
              height="200rpx"
            ></u--image>
            <video
              v-if="item.type === 'video'"
              :src="item.url"
              controls
              style="width: 200rpx; height: 200rpx"
            ></video>
            <view class="del" @click="handleDleFile(index)">X</view>
          </view>
        </view>
        <view class="com_add_file">
          <view class="item" @click="handleUploadType('图片')">
            <u--image
              src="/static/images/comment/camera1.png"
              width="56rpx"
              height="56rpx"
            ></u--image>
            <view class="text">上传图片</view>
          </view>
          <!-- <view class="item" @click="handleUploadType('视频')">
            <u--image
              src="/static/images/comment/camera2.png"
              width="56rpx"
              height="56rpx"
            ></u--image>
            <view class="text">上传视频</view>
          </view> -->
        </view>
      </view>
    </view>
    <view class="com_footer">
      <view class="gray_btn" @click="handleBack">取消评价</view>
      <view class="green_btn" @click="handleSubmit">提交</view>
    </view>
  </view>
</template>

<script>
import { addComment } from "@/api/comment";
import { uploadAvatar } from "@/api/system/user";

export default {
  data() {
    return {
      businessGuid: "",
      carGuid: "",
      storeGuid: "",
      commentContent: "",
      checkboxValue: [],
      fileList: [],
      rateList: [
        {
          name: "整体服务",
          value: 0,
        },
        {
          name: "车辆清洁",
          value: 0,
        },
        {
          name: "车辆硬件",
          value: 0,
        },
        {
          name: "取车便捷",
          value: 0,
        },
      ],
    };
  },
  onLoad(options) {
    this.businessGuid = options.businessGuid;
    this.carGuid = options.carGuid;
    this.storeGuid = options.storeGuid;
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
    handleSubmit() {
      const {
        rateList,
        fileList,
        commentContent,
        businessGuid,
        carGuid,
        storeGuid,
      } = this;
      if (!commentContent) {
        uni.showToast({
          title: "请输入租车感受",
          icon: "none",
        });
        return;
      }
      uni.showLoading({
        title: "提交中",
      });
      let attGrade = 0;
      let envGrade = 0;
      let otherGrade = 0;
      let quaGrade = 0;
      const files = [];
      fileList.map((item) => {
        files.push(item.url);
      });
      rateList.map((item) => {
        if (item.name === "整体服务") {
          attGrade = item.value;
        }
        if (item.name === "车辆清洁") {
          envGrade = item.value;
        }
        if (item.name === "车辆硬件") {
          quaGrade = item.value;
        }
        if (item.name === "取车便捷") {
          otherGrade = item.value;
        }
      });
      addComment({
        attGrade,
        envGrade,
        otherGrade,
        quaGrade,
        commentContent,
        businessGuid,
        carGuid,
        storeGuid,
        imgUrl: files.join(","),
      }).then((res) => {
        uni.hideLoading();
        if (res.code === 200) {
          uni.showToast({
            title: res.msg || "提交成功",
            icon: "none",
          });
          setTimeout(() => {
            this.handleBack();
          }, 1000);
        } else {
          uni.showToast({
            title: res.msg || "提交失败",
            icon: "none",
          });
        }
      });
    },
    fileType(filePath) {
      var index = filePath.lastIndexOf(".");
      var ext = filePath.substr(index + 1);
      if (
        ["mp4", "avi", "mov", "rmvb", "rm", "flv", "3gp"].indexOf(
          ext.toLowerCase()
        ) != -1
      ) {
        return "video";
      }
      if (
        [
          "png",
          "jpg",
          "jpeg",
          "bmp",
          "gif",
          "webp",
          "psd",
          "svg",
          "tiff",
        ].indexOf(ext.toLowerCase()) != -1
      ) {
        return "image";
      }
      if (
        ["cda", "wav", "mp3", "wmv", "flac", "aac"].indexOf(
          ext.toLowerCase()
        ) != -1
      ) {
        return "audio";
      }
      return "otherType";
    },
    uploadFile(data) {
      uni.showLoading({
        title: "上传中",
      });
      try {
        uploadAvatar(data).then((res) => {
          uni.hideLoading();
          if (res.code === 200) {
            const type = this.fileType(res.msg);
            this.fileList.push({
              type,
              url: res.msg,
            });
          } else {
            this.$modal.msg("上传失败");
          }
        });
      } catch (error) {
        uni.hideLoading();
        console.log(error);
      }
    },
    handleUploadType(name) {
      if (name === "视频") {
        uni.chooseVideo({
          sourceType: ["camera", "album"],
          success: (res) => {
            this.uploadFile({
              filePath: res.tempFilePath,
            });
          },
        });
      }
      if (name === "图片") {
        uni.chooseImage({
          count: 1,
          sizeType: ["compressed"],
          success: (res) => {
            this.uploadFile({
              filePath: res.tempFilePaths[0],
            });
          },
        });
      }
    },
    handleDleFile(index) {
      this.fileList.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
page {
  background: #fff;
}
.com_box11 {
  .com_tips {
    height: 76rpx;
    background: rgba(254, 251, 236, 1);
    padding-left: 34rpx;
    font-size: 24rpx;
    color: rgba(135, 139, 138, 1);
    line-height: 76rpx;
  }
  .com_main {
    padding: 32rpx;
    .com_tit {
      padding-top: 8rpx;
      display: flex;
      align-items: center;
      .text {
        font-size: 32rpx;
        font-weight: bold;
        flex: 1;
      }
      .lable {
        font-size: 24rpx;
        color: rgba(137, 140, 139, 1);
      }
    }
    .com_list {
      padding-top: 30rpx;
      padding-bottom: 42rpx;
      display: flex;
      flex-wrap: wrap;
      border-bottom: rgba(237, 237, 237, 1) 1px solid;
      .item {
        padding-top: 30rpx;
        display: flex;
        width: 50%;
        .text {
          margin-left: 12rpx;
          color: rgba(135, 139, 138, 1);
        }
      }
    }
    .com_input {
      border-radius: 16rpx;
      background: rgba(250, 250, 250, 1);
      border: 1px solid rgba(222, 222, 222, 1);
      padding: 24rpx;
      .textCont {
        height: 260rpx;
        display: flex;
      }
      .fileList {
        padding-top: 24rpx;
        display: flex;
        flex-wrap: wrap;
        margin-left: -16rpx;
        .item {
          width: 200rpx;
          height: 200rpx;
          margin-left: 16rpx;
          position: relative;
          margin-bottom: 16rpx;
          .del {
            width: 40rpx;
            height: 40rpx;
            position: absolute;
            right: 20rpx;
            top: 20rpx;
            z-index: 99;
            background: rgba($color: #000000, $alpha: 0.5);
            border-radius: 50%;
            line-height: 40rpx;
            text-align: center;
            font-size: 28rpx;
            color: #fff;
          }
        }
      }
    }
    .com_add_file {
      padding-top: 24rpx;
      display: flex;
      .item {
        width: 144rpx;
        height: 144rpx;
        border-radius: 8rpx;
        border: 1px dashed rgba(166, 166, 166, 1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-right: 24rpx;
        .text {
          font-size: 24rpx;
          color: rgba(135, 139, 138, 1);
          padding-top: 18rpx;
          text-align: center;
        }
      }
    }
  }
  .com_footer {
    width: 100%;
    height: 140rpx;
    background: rgba(255, 255, 255, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 999;
    .green_btn {
      width: 332rpx;
      height: 88rpx;
      border-radius: 12rpx;
      background: rgba(64, 200, 131, 1);
      border: 1px solid rgba(64, 200, 131, 1);
      line-height: 88rpx;
      text-align: center;
      color: #fff;
      font-size: 32rpx;
      box-sizing: border-box;
    }
    .gray_btn {
      width: 332rpx;
      height: 88rpx;
      border-radius: 12rpx;
      background: #fff;
      border: 1px solid rgba(207, 207, 207, 1);
      line-height: 88rpx;
      text-align: center;
      color: rgba(137, 140, 139, 1);
      font-size: 32rpx;
      box-sizing: border-box;
      margin-right: 22rpx;
    }
  }
}
</style>
