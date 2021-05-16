<template>
  <view class="background">
    <!-- 导航栏 -->
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right">{{ pageTitle }}</block>
    </cu-custom>

    <!-- 内推卡片 -->
    <view v-if="ids.length>0" class="movecard">
      <view class="cu-card dynamic"
            v-for="(id,idx) in showIds"
            :key="idx"
            @tap="toPage(`../../../neitui/detail/index?id=${id}`)">
        <view class="cu-item shadow">
          <view class="cu-list menu-avatar">
            <view class="cu-item">
              <view class="cu-avatar round lg">
                <image class="cu-avatar lg round" :src="nt.list[id2Idx(id)].user.jobInfo.company.logo"/>
              </view>
              <view class="content flex-sub">
                <view class="flex align-center justify-between">
                  <text class="text-orange text-lg">{{ nt.list[id2Idx(id)].user.jobInfo.company.name }}</text>
                  <text class='cu-tag text-white bg-blue light radius good-tag margin-left-xs'>{{ nt.list[id2Idx(id)].form }}</text>
                  <text class="cuIcon-close text-red" @tap.stop="delById(id)"></text>
                </view>
                <!-- 发布人信息 -->
                <text class="text-sm">
                  {{ nt.list[id2Idx(id)].user.eduInfo.major+nt.list[id2Idx(id)].user.eduInfo.entrance+'级'+nt.list[id2Idx(id)].user.realName+'同学' }}
                </text>
              </view>
            </view>
          </view>
          <view class="movecard-tag padding">
            <!-- 内容 -->
            <view class="text-content margin-bottom">
              {{ nt.list[id2Idx(id)].details.slice(0,30) }}
            </view>
            <view v-for="(tag,tid) in (nt.list[id2Idx(id)].positionTags || '').split(',').filter(t => t!=='')"
                  :key="tid"
                  class='cu-tag text-orange bg-orange light radius good-tag'>
              {{ tag }}
            </view>
          </view>
          <view v-for="(topic,pid) in nt.list[id2Idx(id)].topics"
                :key="pid"
                class="text-content">
            <text class="text-white bg-orange text-sm my-tag">#</text>
            <text>{{ topic }}</text>
          </view>
        </view>
      </view>
    </view>
    <van-empty v-else description="未找到相关数据源~~"/>

    <!-- vant-weapp 轻提示 -->
    <van-dialog id="van-dialog"/>
  </view>
</template>

<script>
import {mapActions, mapState} from 'vuex'
import Dialog from '@/wxcomponents/@vant/weapp/dist/dialog/dialog';

export default {
  data() {
    return {
      curPage: 1,
      pageSize: 5,
      ids: [],
      pageTitle: '我的内推',
      type:0
    }
  },
  computed: {
    ...mapState('nt', ['nt']),
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
    delById (id) {
      id = +id;
      let idx = this.ids.indexOf(id)
      Dialog.confirm({
        title: '内推删除',
        message: '确认要删除这条内推信息吗',
      }).then(() => {
        console.log(idx)
        this.ids.splice(idx,1)
        // TODO: 异步删除
        this.$api.recommend.deleteById(id)
      })
    },
    /**
     * id 转 idx
     */
    id2Idx(id) {
      let idx = -1
      for (let nt of this.nt.list) {
        if (nt.id === id) {
          idx = this.nt.list.indexOf(nt)
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
          this.ids = this.content.publishRecommendations
          break
        case 1:
          this.pageTitle = '我的订阅'
          this.ids = this.content.likeRecommendations
          break
      }
    },
  }
}
</script>

<style lang="scss">
@import "../../../neitui/index";
</style>