<template>
  <view>
    <!-- 看内推 -->
    <!-- 搜索框 -->
    <view class="cu-bar search bg-white">
      <view class="search-form round" @tap="toPage('./search/index')">
        <text class="cuIcon-search"></text>
        <input :adjust-position="false" type="text"
               placeholder="搜索关键字或者职位标签" confirm-type="search"/>
      </view>
      <button class="cu-btn bg-orange shadow-blur round margin-right" @tap="toPage('./subscribe/index')">
        订阅
      </button>
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
      <view v-for="(item,idx) in barText === '推荐' ? neiCardList : neiCardList.filter(nt=>{
        return myTagList.some(tag=>{
          return nt.positionTags.match(tag)
          || nt.details.match(tag)
          || nt.user.jobInfo.company.name.match(tag)
        })
      })"
            :key="idx"
            class="cu-card dynamic"
            @tap="toPage(`./detail/index?id=${item.id}`)">
        <view class="cu-item shadow">
          <view class="cu-list menu-avatar">
            <view class="cu-item">
              <view class="cu-avatar round lg">
                <image class="cu-avatar lg round" :src="item.user.jobInfo.company.logo"/>
              </view>
              <view class="content flex-sub">
                <view class="flex align-center justify-between">
                  <text class="text-orange text-lg">{{ item.user.jobInfo.company.name }}</text>
                  <text class='cu-tag text-white bg-blue light radius good-tag margin-left-xs'>{{ item.form }}</text>
                </view>
                <!-- 发布人信息 -->
                <text class="text-sm">
                  {{ item.user.eduInfo.major + item.user.eduInfo.entrance + '级' + item.user.realName + '同学' }}
                </text>
              </view>
            </view>
          </view>
          <view class="movecard-tag padding">
            <!-- 内容 -->
            <view class="text-content margin-bottom">
              {{ item.details.slice(0, 30) }}
            </view>
            <view v-for="(tag,tid) in (item.positionTags || '').split(',').filter(t => t!=='')"
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
import {mapActions, mapState} from "vuex";

export default {
  components: {
    Swiper
  },
  props: {
    swiperList: {
      type: Array,
      default: [{
        id: 2,
        type: 'image',
        url: 'https://cdn.gongsir.club/blog/image/2021/04/22tieba.jpg'
      }, {
        id: 2,
        type: 'image',
        url: 'https://cdn.gongsir.club/blog/image/2021/04/221.jpg'
      }],
    },
    neiCardList: {
      type: Array,
      default: [{
        details: '快手实习',
        form: '实习',
        id: 1,
        openId: 'olAW-4vIdX8DTkzftHveDWIlR4zU',
        positionTags: '前端开发',
        publishTime: '2021-05-03',
        imgUrl: '',
        user: {
          openId: 'visitor',
          avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
          nickName: '游客',
          gender: '男',
          realName: '游客',
          phoneNumber: '',
          email: '',
          eduId: 0,
          jobId: 0,
          profile: '',
          eduInfo: {
            id: 0,
            schoolId: 1,
            major: '',
            entrance: '',
            graduate: '',
            level: '',
            description: '',
            status: '',
            school: {
              id: 1,
              logo: '',
              name: '',
              majorList: '',
              mailSuffix: ''
            }
          },
          jobInfo: {
            id: 0,
            openId: '',
            companyId: 1,
            department: '',
            jobTitle: '',
            description: '',
            status: '',
            company: {
              id: 1,
              logo: '',
              name: '',
              slogan: '',
              mailSuffix: ''
            }
          }
        }
      }]
    }
  },
  data() {
    return {
      typename: '看内推',
      barText: '推荐',
      myTagList: ['腾讯'],
      allTagList:null
    }
  },
  computed: {
    ...mapState('history',['history']),
  },
  methods: {
    ...mapActions('history',['getMyAllHistory']),
    async loadAllTagList () {
      const {data} = await this.$api.tags.getTagsByType(1)
      this.allTagList = data
    },
    getTagNameById (id) {
      for (const tag of this.allTagList) {
        if (tag.id === id ) return tag.tagName
      }
    },
    async loadAllHistory () {
      await this.loadAllTagList()
      // 加载搜索历史
      await this.getMyAllHistory(null)
      let tagIds = this.history.subscribe?.split(',').map(Number)
      // 清空数组
      this.myTagList.splice(0)
      tagIds.forEach(id => {
        this.myTagList.push(this.getTagNameById(+id))
      })
      console.log(this.myTagList)
    },
    toPage(url) {
      uni.navigateTo({url})
    },
    changeType() {
      this.loadAllHistory()
      if (this.barText === '推荐') {
        this.barText = '最新';
        //todo: 刷新数据
      } else if (this.barText === '最新') {
        this.barText = '推荐';
        //todo: 刷新数据
      }
    }
  }
}
</script>

<style lang="scss">
@import "index";
</style>