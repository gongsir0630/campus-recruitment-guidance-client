<template>
  <view>
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right">柚子帮成员详情</block>
    </cu-custom>
    <!-- 内推详情 -->
    <!-- 头像 -->
    <view class="topbg">
      <view class="cu-avatar my-avatar">
        <image :src="avatar" />
      </view>
    </view>
    <!-- 详情 -->
    <view class="zhidetail">
      <view class="content">
        <view class="flex align-center">
          <view class="text-xxl">
            <view class="action">
              <text class="cuIcon-titles text-orange"></text>{{ fullName }}
            </view>
          </view>
          <view class='cu-tag text-white bg-blue light radius good-tag margin-left-xs'>校友</view>
        </view>
        <!-- 多个头衔使用 join 函数处理 -->
        <view class="text-lg margin-top margin-left">
          {{ title.join(" | ") }}
        </view>
        <!-- 领域标签 -->
        <view class="margin-top text-lg margin-left">
          <view v-for="tag in fieldTags" class='cu-tag text-orange bg-orange light radius good-tag'>
            {{ tag }}
          </view>
        </view>
        <!-- 话题 -->
        <view class="margin-top">
          <view class="text-xxl">
            <view class="action">
              <text class="cuIcon-titles text-orange"></text>擅长话题
            </view>
          </view>
          <view v-for="topic in topics" class="text-content margin-left margin-top">
            <view>
              <text class="text-white bg-yellow text-sm my-tag">#</text>
              <text class="margin-left-xs">{{ topic.title }}</text>
            </view>
            <view>{{ topic.content }}</view>
          </view>
        </view>
        <!-- 个人自述 -->
        <view class="margin-top">
          <view class="text-xxl">
            <view class="action">
              <text class="cuIcon-titles text-orange"></text>柚子自述
            </view>
          </view>
          <view class="text-content margin-left margin-top">
            <view>
              我的个人自述阿尔山如图热官方文档前二天你以后认同和购物券个人皇台酒业认同和给伟哥然后他发给你的人格网费贵日多方位
              爱的方式广东榕泰非会员人体各我发的
              二手房热狗无法启动分割然后贴你要放
              爱我的份上的个人返回同一个今天很热挂服务器的人皇台酒业如何隔
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部悬浮 -->
    <view class="nei-bottom">
      <view class="left">喜欢</view>
      <view class="right">分享</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      id: 1,
      avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
      nickName: '码之泪殇',
      realName: '龚涛',
      title: ['计算机协会会长', '计算机科学学院学生会主席'],
      fieldTags: ['简历指导', '笔试面试', '校招内推'],
      topics:[{
        title:'就业指导',
        content:'就业指导'
      },{
        title:'就业指导',
        content:'就业指导'
      },{
        title:'就业指导',
        content:'就业指导'
      }]
    }
  },
  computed: {
    fullName () {
      return this.nickName + ' | ' + this.realName
    }
  }
}
</script>

<style lang="scss">
@import "index";
</style>