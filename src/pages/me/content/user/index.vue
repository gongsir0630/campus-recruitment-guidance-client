<template>
  <view class="background">
    <!-- 导航栏 -->
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right">{{ pageTitle }}</block>
    </cu-custom>

    <!-- 用户卡片 -->
    <view v-if="ids.length>0 && userList.length>0" class="movecard">
      <view class="cu-card dynamic"
            v-for="(id,idx) in showIds"
            :key="idx"
            @tap="toPage(`../../../help/detail/index?id=${id}`)">
        <view class="cu-item shadow">
          <view class="cu-list menu-avatar">
            <view v-if="getUserInfoByOpenId(id)" class="cu-item">
              <!-- 头像 -->
              <view class="cu-avatar round lg">
                <image class="cu-avatar lg round" :src="getUserInfoByOpenId(id).avatar"/>
              </view>
              <view class="content flex-sub">
                <view class="text-orange">{{ getUserInfoByOpenId(id).nickName }}</view>
                <view v-if="getUserInfoByOpenId(id).jobInfo">
                  <view v-if="getUserInfoByOpenId(id).jobInfo.jobTitle.length>0"
                        class="text-gray text-sm flex justify-between">
                    {{ getUserInfoByOpenId(id).jobInfo.jobTitle }}
                  </view>
                  <view v-else class="text-gray text-sm flex justify-between">
                    {{ getUserInfoByOpenId(id).eduInfo.major }}
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <van-empty v-else description="这里空空如也~~"/>

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
      pageTitle: '我的关注',
      type:0,
      userList:[]
    }
  },
  computed: {
    ...mapState('content', ['content']),
    ...mapState('member', ['member']),
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
    ...mapActions('member',['getMemberList']),
    async setUserInfoByOpenIds (ids,type) {
      for (const id of ids) {
        let openId = id
        if (type === 0) {
          openId = this.member.list[this.id2Idx(id)].openId
        }
        const {data} = await this.$api.user.getUserInfoByOpenId(openId)
        this.userList.push(data)
      }
      console.log(this.userList)
      console.log(this.userList.length)
    },
    getUserInfoByOpenId (id) {
      if (this.type === 0) {
        id = this.member.list[this.id2Idx(id)].openId
      }
      return this.userList.find(user=>user.openId === id)
    },
    /**
     * id 转 idx
     */
    id2Idx(id) {
      let idx = -1
      for (let m of this.member.list) {
        if (m.id === id) {
          idx = this.member.list.indexOf(m)
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
      if (this.type === 0) {
        uni.navigateTo({url})
      }
    },
    onShow () {
      this.loadData()
    },
    async loadData() {
      await this.getMyContent(null)
      switch (this.type) {
        case 0:
          this.ids = this.content.myFollow
          break
        case 1:
          this.pageTitle = '关注我的'
          this.ids = this.content.followMe
          break
      }
      // 加载用户数据
      await this.setUserInfoByOpenIds(this.ids,this.type)
    }
  },
}
</script>

<style lang="scss">
@import "../../../index/index";
</style>