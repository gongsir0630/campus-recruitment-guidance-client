<template>
  <view v-if="item">
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right">内推详情</block>
    </cu-custom>
    <!-- 内推详情 -->
    <!-- 公司 logo 头像 -->
    <view class="topbg margin-bottom">
      <view class="cu-avatar my-avatar">
        <image class="cu-avatar lg round" :src="item.user.jobInfo.company.logo"/>
      </view>
    </view>
    <!-- 详情 -->
    <view class="zhidetail">
      <view class="content">
        <view class="flex align-center">
          <view class="text-xxl">
            <view class="action">
              <text class="cuIcon-titles text-orange"></text>公司信息
            </view>
          </view>
        </view>
        <!-- 公司信息 -->
        <view class="text-lg margin-top margin-left flex flex-direction">
          <view class="text-orange text-lg">{{ item.user.jobInfo.company.name }}</view>
          <view class="text-black text-lg margin-top">{{ `『${item.user.jobInfo.company.slogan}』` }}</view>
        </view>

        <!-- 标签 -->
        <view class="margin-top text-lg margin-left">
          <text class='cu-tag text-white bg-blue light radius good-tag margin-left-xs'>{{ item.form }}</text>
          <view v-for="(tag,tid) in (item.positionTags || '').split(',').filter(t => t!=='')"
                :key="tid"
                class='cu-tag text-orange bg-orange light radius good-tag'>
            {{ tag }}
          </view>
        </view>

        <view class="flex align-center margin-top">
          <view class="text-xxl">
            <view class="action">
              <text class="cuIcon-titles text-orange"></text>内推人
            </view>
          </view>
        </view>
        <!-- 用户信息 -->
        <view class="text-lg margin-top margin-left flex align-center">
          <!-- 头像 -->
          <view class="cu-avatar round lg">
            <image class="cu-avatar lg round" :src="item.user.avatar"/>
          </view>
          <view class="content flex-sub margin-left">
            <view class="text-orange text-lg">{{ item.user.nickName+'-'+item.user.realName }}</view>
            <view class="text-black text-lg margin-top">{{ item.user.eduInfo.major+item.user.eduInfo.entrance+'级' }}</view>
            <view class="text-black text-lg margin-top">{{ item.user.jobInfo.jobTitle }}</view>
          </view>
        </view>

        <!-- 内推详情 -->
        <view class="margin-top">
          <view class="text-xxl">
            <view class="action">
              <text class="cuIcon-titles text-orange"></text>内推详情
            </view>
          </view>
          <view class="text-content margin-left margin-top">
            <!-- 内容 -->
            <view class="margin-top text-content">
              {{ item.details }}
            </view>
            <!-- 图片 -->
            <view v-if="item.imgUrl" class="bg-img">
              <image :src="item.imgUrl" mode="aspectFit" @tap.stop="viewImg(item.imgUrl)"></image>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 分享 -->
    <view class="padding flex align-center justify-center">
      <button class="cu-btn bg-orange round lg margin-left" open-type="share">分享</button>
    </view>
  </view>
</template>

<script>
import {mapState} from "vuex";

export default {
  data() {
    return {
      item: {},
    }
  },
  computed: {
    ...mapState('nt',['nt']),
    ...mapState('user',['wxUser']),
  },
  methods: {
    viewImg(imgUrl) {
      uni.previewImage({
        urls: [imgUrl],
        current: imgUrl
      });
    },
    /**
     * 页面加载监听
     * @param id
     */
    onLoad ({id}) {
      // 类型转换，坑
      id = +id
      console.log("查看内推详情: "+id)
      for (let t of this.nt.list) {
        if (t.id === id)
          this.item = t
      }
      console.log(this.item)
    }
  }
}
</script>

<style lang="scss">
@import "index";
</style>