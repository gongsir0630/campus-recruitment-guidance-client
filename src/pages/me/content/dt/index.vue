<template>
  <view class="background">
    <!-- 导航栏 -->
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right">{{ pageTitle }}</block>
    </cu-custom>

    <!-- 动态卡片 -->
    <view v-if="ids.length>0" class="movecard">
      <view class="cu-card dynamic"
            v-for="(id,idx) in showIds"
            :key="idx"
            @tap="toPage(`../../../index/detail/index?id=${id}`)">
        <view class="cu-item shadow">
          <view class="cu-list menu-avatar">
            <view class="cu-item">
              <!-- 头像 -->
              <view class="cu-avatar round lg">
                <image class="cu-avatar lg round" :src="dynamic.list[id2Idx(id)].avatar"/>
              </view>
              <view class="content flex-sub">
                <view class="text-orange">{{ dynamic.list[id2Idx(id)].nickName }}</view>
                <view v-if="dynamic.list[id2Idx(id)].jobTitle!=='未认证职业信息'"
                      class="text-gray text-sm flex justify-between">
                  {{ dynamic.list[id2Idx(id)].jobTitle }}
                </view>
                <view v-else class="text-gray text-sm flex justify-between">
                  {{ dynamic.list[id2Idx(id)].major }}
                </view>
              </view>
              <view class="my-moreandroid cuIcon-moreandroid text-gray"></view>
            </view>
          </view>
          <view class="margin-top text-content">
            {{ dynamic.list[id2Idx(id)].detail.content }}
          </view>
          <view v-if="dynamic.list[id2Idx(id)].detail.imgUrl.startsWith('https://')"
                class="grid flex-sub padding-lr col-1">
            <view class="bg-img">
              <image :src="dynamic.list[id2Idx(id)].detail.imgUrl"></image>
            </view>
          </view>
          <view class="movecard-tag  padding">
            <view
              v-for="(tag,idx) in (dynamic.list[id2Idx(id)].detail.topicTags || '').split(',').filter(t=>t.length>0)"
              :key="idx" class='cu-tag radius text-blue'>
              {{ '#' + tag }}
            </view>
          </view>
          <view class="movecard-icon text-gray padding">
            <!-- 点赞 -->
            <text :class="dynamic.list[id2Idx(id)].isLike ? 'cuIcon-appreciatefill text-red' : 'cuIcon-appreciate'">
              {{ dynamic.list[id2Idx(id)].likeCount }}
            </text>
            <!-- 收藏 -->
            <text :class="dynamic.list[id2Idx(id)].collection ? 'cuIcon-favorfill text-red' : 'cuIcon-favor'">
              {{ dynamic.list[id2Idx(id)].collection ? '取消收藏' : '收藏' }}
            </text>
            <!-- 分享 -->
            <text class="cuIcon-forwardfill text-red">分享</text>
          </view>
        </view>
      </view>
    </view>
    <van-empty v-else description="未找到相关数据源~~"/>

  </view>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  data() {
    return {
      curPage: 1,
      pageSize: 5,
      ids: [],
      pageTitle: '我的动态',
      type:0
    }
  },
  computed: {
    ...mapState('dynamic', ['dynamic']),
    ...mapState('content', ['content']),
    pageCount() {
      console.log(this.ids.length)
      return Math.ceil(this.ids.length / this.pageSize)
    },
    showIds() {
      return this.ids.slice(0, this.curPage * this.pageSize)
    },
  },
  methods: {
    ...mapActions('content',['getMyContent']),
    ...mapActions('dynamic',['getDynamicList']),
    /**
     * id 转 idx
     */
    id2Idx(id) {
      let idx = -1
      for (let dt of this.dynamic.list) {
        if (dt.detail.id === id) {
          idx = this.dynamic.list.indexOf(dt)
          break
        }
      }
      return idx
    },
    /**
     * 上拉加载更多
     */
    onReachBottom() {
      if (++this.curPage <= this.pageCount) {
        uni.showToast({
          title: '努力为你加载...',
          icon: 'loading',
          mask: true
        })
        console.log(this.curPage)
      } else {
        uni.showToast({
          title: '没有更多数据了~',
          icon: 'success'
        })
      }
    },
    /**
     * 页面加载
     */
    onLoad({type}) {
      console.log(typeof type)
      type = +type
      this.type = type
    },
    /**
     * 页面跳转
     */
    toPage(url) {
      uni.navigateTo({url})
    },
    onShow () {
      this.loadData()
    },
    async loadData() {
      await this.getMyContent(null)
      switch (this.type) {
        case 0:
          this.ids = this.content.publishNews
          break
        case 1:
          this.pageTitle = '我的收藏'
          this.ids = this.content.collectNews
          break
        case 2:
          this.pageTitle = '我的点赞'
          this.ids = this.content.likeNews
          break
      }
    }
  },
}
</script>

<style lang="scss">
@import "../../../index/index";
</style>