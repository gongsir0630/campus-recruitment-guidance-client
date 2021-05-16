<template>
  <view>
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right">内容管理</block>
    </cu-custom>
    <!-- 我的动态 -->
    <view class="cu-bar bg-white solid-bottom">
      <view class="action">
        <text class="cuIcon-title text-orange "></text>
        动态
      </view>
    </view>
    <view class="cu-list grid col-3 no-border">
      <view class="cu-item" @tap="toPage(`./dt/index?type=0`)">
        <view class="cuIcon-messagefill  text-red"></view>
        <text>我的发布</text>
      </view>
      <view class="cu-item" @tap="toPage(`./dt/index?type=1`)">
        <view class="cuIcon-favorfill  text-red"></view>
        <text>我的收藏</text>
      </view>
      <view class="cu-item" @tap="toPage(`./dt/index?type=2`)">
        <view class="cuIcon-appreciatefill  text-red"></view>
        <text>我的点赞</text>
      </view>
    </view>
    <!-- 我的内推 -->
    <view class="cu-bar bg-white solid-bottom margin-top">
      <view class="action">
        <text class="cuIcon-title text-orange "></text>
        内推
      </view>
    </view>
    <view class="cu-list grid col-3 no-border">
      <view class="cu-item" @tap="toPage(`./nt/index?type=0`)">
        <view class="cuIcon-messagefill text-red"></view>
        <text>我的发布</text>
      </view>
      <view class="cu-item" @tap="toPage(`../../neitui/subscribe/index`)">
        <view class="cuIcon-likefill text-red"></view>
        <text>我的订阅</text>
      </view>
    </view>

    <!-- 柚子帮 -->
    <view class="cu-bar bg-white solid-bottom margin-top">
      <view class="action">
        <text class="cuIcon-title text-orange "></text>
        柚子帮
      </view>
    </view>
    <view class="cu-list grid col-3 no-border">
      <view class="cu-item" @tap="toPage(`./user/index?type=0`)">
        <view class="cuIcon-peoplefill text-red"></view>
        <text>我的关注</text>
      </view>
      <view class="cu-item" @tap="toPage(`./user/index?type=1`)">
        <view class="cuIcon-friendfill text-red"></view>
        <text>关注我的</text>
      </view>
    </view>

  </view>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState('content', ['content']),
    ...mapState('dynamic', ['dynamic']),
    ...mapState('nt', ['nt']),
    ...mapState('member', ['member']),
  },
  methods: {
    ...mapActions('content', ['getMyContent']),
    ...mapActions('dynamic', ['getDynamicList']),
    ...mapActions('nt', ['getRecommendationList']),
    ...mapActions('member', ['getMemberList']),
    /**
     * 页面显示加载数据
     */
    onShow() {
      this.loadDynamic()
      this.loadRecommendations()
      this.loadMembers()
      this.loadMyContent()
    },
    /**
     * 页面跳转
     */
    toPage(url) {
      uni.navigateTo({url})
    },
    /**
     * 加载当前用户内容数据
     */
    async loadMyContent() {
      await this.getMyContent(null)
      console.log(this.content)
    },
    async loadDynamic() {
      await this.getDynamicList(null)
      console.log(this.dynamic)
    },
    async loadRecommendations() {
      await this.getRecommendationList(0)
      console.log(this.nt)
    },
    async loadMembers() {
      await this.getMemberList(null)
      console.log(this.member)
    }
  }
}
</script>

<style lang="scss">

</style>