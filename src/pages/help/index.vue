<template>
  <view>
    <!-- 柚子帮 -->
    <cu-custom bgColor="#fff" isSearch="true" @topage="searchPage">
      <block slot="search">柚子帮</block>
    </cu-custom>
    <!-- 申请入口 -->
    <view class="banner" @tap="toApply">
      <Swiper :swiperList="swiperList"></Swiper>
    </view>
    <!-- 人脉卡片 -->
    <view>
      <view class="cu-card dynamic" v-for="item in renCardList" :key="item.id" @tap="toDetail">
        <view class="cu-item shadow">
          <view class="cu-list menu-avatar">
            <view class="cu-item">
              <view class="cu-avatar round lg">
                <image class="cu-avatar lg round" :src="item.avatar"/>
              </view>
              <view class="content flex-sub">
                <view>{{ item.nickName }}</view>
                <!-- 多个头衔使用 join 函数处理 -->
                <text class="text-sm">
                  {{ item.title.join(" | ") }}
                </text>
              </view>
            </view>
          </view>
          <view class="movecard-tag padding">
            <view v-for="tag in item.fieldTags" class='cu-tag text-orange bg-orange light radius good-tag'>
              {{ tag }}
            </view>
          </view>
          <view v-for="topic in item.topics" class="text-content">
            <text class="text-white bg-orange text-sm my-tag">#</text>
            <text>{{ topic }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import Swiper from '@/components/Swiper';

export default {

  data() {
    return {
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
      renCardList: [
        {
          id: 1,
          avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
          nickName: '码之泪殇',
          title: ['计算机协会会长', '计算机科学学院学生会主席'],
          fieldTags: ['简历指导', '笔试面试', '校招内推'],
          topics: ['就业指导', '学生工作', '项目指导']
        },
        {
          id: 1,
          avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
          nickName: '码之泪殇',
          title: ['计算机协会会长'],
          fieldTags: ['简历指导', '笔试面试', '校招内推'],
          topics: ['就业指导', '学生工作', '项目指导']
        },
        {
          id: 1,
          avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
          nickName: '码之泪殇',
          title: ['计算机协会会长'],
          fieldTags: ['简历指导', '笔试面试', '校招内推'],
          topics: ['就业指导', '学生工作', '项目指导'],
        }
      ]
    }
  },
  components: {
    Swiper
  },
  methods: {
    searchPage() {
    },
    toApply() {
      uni.navigateTo({url: './apply/index'})
    },
    toDetail () {
      uni.navigateTo({url: './detail/index'})
    }
  }
}
</script>

<style lang="scss">
.banner {
  height: 200px;
}

.my-tag {
  border-radius: 50%;
  padding: 4px;
  margin-right: 10px;
}

.good-tag {
  margin-right: 10px;
}
</style>
