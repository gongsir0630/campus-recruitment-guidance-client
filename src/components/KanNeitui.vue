<template>
  <view>
    <!-- 看内推 -->
    <!-- 搜索框 -->
    <view class="cu-bar search bg-white">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input @focus="toPage('./search/index')" @blur="InputBlur" :adjust-position="false" type="text"
               placeholder="搜索感兴趣的公司或者职业标签" confirm-type="search"/>
        <button class="cu-btn bg-orange shadow-blur round">搜索</button>
      </view>
    </view>
    <!-- 轮播图 -->
    <view class="banner">
      <Swiper :swiperList="swiperList"></Swiper>
    </view>

    <!-- 内推卡片 -->
    <view class="cu-bar bg-white neitui-bar">
      <view class="action">
        <text class="cuIcon-titles text-orange"></text>
        列表
      </view>
      <view class="action" @tap="changeType">
        <text class="cuIcon-order text-orange"></text>
        {{ barText }}
      </view>
    </view>

    <view>
      <view class="cu-card dynamic"
            v-for="(item,idx) in neiCardList"
            :key="idx"
            @tap="toPage(`./detail/index/idx=${idx}`)">
        <view class="cu-item shadow">
          <view class="cu-list menu-avatar">
            <view class="cu-item">
              <view class="cu-avatar round lg">
                <image class="cu-avatar lg round" :src="item.avatar"/>
              </view>
              <view class="content flex-sub">
                <view class="flex align-center">
                  <text class="text-orange text-lg">{{ item.companyName }}</text>
                  <text class='cu-tag text-white bg-blue light radius good-tag margin-left-xs'>{{ item.type }}</text>
                </view>
                <!-- 发布人信息 -->
                <text class="text-sm">
                  {{ item.nickName }}
                </text>
              </view>
            </view>
          </view>
          <view class="movecard-tag padding">
            <view v-for="(tag,tid) in item.fieldTags"
                  :key="tid"
                  class='cu-tag text-orange bg-orange light radius good-tag'>
              {{ tag }}
            </view>
          </view>
          <view v-for="(topic,pid) in item.topics"
                :key="pid"
                class="text-content">
            <text class="text-white bg-orange text-sm my-tag">#</text>
            <text>{{ topic }}</text>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>

import Swiper from '@/components/Swiper'

export default {
  components: {
    Swiper
  },
  data() {
    return {
      typename: '看内推',
      barText: '推荐',
      // 轮播图数据列表
      swiperList: [{
        id: 2,
        type: 'image',
        url: 'https://cdn.gongsir.club/blog/image/2021/04/22tieba.jpg'
      }, {
        id: 2,
        type: 'image',
        url: 'https://cdn.gongsir.club/blog/image/2021/04/221.jpg'
      }],
      neiCardList: [
        {
          id: 1,
          avatar: 'https://cdn.gongsir.club/blog/image/2021/04/24ks.jpg',
          nickName: '2017级算计科学与技术专业学长',
          companyName: '北京快手科技有限公司',
          fieldTags: ['Java 后端', '前端开发', '产品经理'],
          type: '校招'
        },
        {
          id: 1,
          avatar: 'https://cdn.gongsir.club/blog/image/2021/04/24ks.jpg',
          nickName: '码之泪殇',
          companyName: '北京快手科技有限公司',
          fieldTags: ['Java 后端', '前端开发', '产品经理'],
          type: '校招'
        },
        {
          id: 1,
          avatar: 'https://cdn.gongsir.club/blog/image/2021/04/24ks.jpg',
          nickName: '码之泪殇',
          companyName: '北京快手科技有限公司',
          fieldTags: ['Java 后端', '前端开发', '产品经理'],
          type: '实习/校招'
        },
      ]
    }
  },
  methods: {
    InputBlur() {
    },
    toPage(url) {
      uni.navigateTo({url})
    },
    changeType() {
      if (this.barText === '推荐') {
        this.barText = '最新';
        //api
      } else if (this.barText === '最新') {
        this.barText = '推荐';
        //api
      }
    }
  }
}
</script>

<style lang="scss">
.banner{
  height: 200px;
}
.neitui-bar {
  display: flex;
  justify-content: space-between;
}
</style>