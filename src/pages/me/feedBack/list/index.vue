<template>
    <view>
      <cu-custom bgColor="#fa8c15" isBack="true">
        <block slot="back">返回</block>
        <block slot="right">反馈记录</block>
      </cu-custom>

      <van-empty v-if="myFeeds.total===0" description="你还没有反馈过奥~~"/>

      <view v-else>
        <view class="cu-card dynamic" v-for="(item,idx) in myFeeds.list" :key="idx">
          <view class="cu-item shadow">
            <view class="cu-list menu-avatar">
              <view class="cu-item">
                <view class="cu-avatar round lg">
                  <image class="cu-avatar lg round" :src="wxUser.avatar"/>
                </view>
                <view class="content flex-sub">
                  <view class="text-orange">{{ wxUser.nickName }}</view>
                  <!-- 反馈时间 -->
                  <text class="text-sm">
                    {{ item.feedTime }}
                  </text>
                </view>
              </view>
            </view>
            <view class="movecard-tag padding">
              <view class='text-content'>
                {{ item.content }}
              </view>
              <view v-if="item.picUrl.startsWith('https://')" class="bg-img">
                <image :src="item.picUrl" mode="aspectFit" @tap="viewImg(item.picUrl)"></image>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
</template>

<script>

import {mapState} from "vuex";

export default {
  data () {
    return {
      myFeeds:{
        total:10,
        list:[{
          acceptStatus: "待受理",
          content: "暂时不支持emoji字段 开启事务管理",
          feedTime: "2021-05-03",
          id: 6,
          openId: "olAW-4vIdX8DTkzftHveDWIlR4zU",
          picUrl: "",
          type: "BUG 提交",
        }]
      }
    }
  },
  computed: {
    ...mapState('user',['wxUser']),
  },
  methods: {
    viewImg(imgUrl) {
      uni.previewImage({
        urls: [imgUrl],
        current: imgUrl
      });
    },
    onShow () {
      this.loadMyFeed()
    },
    async loadMyFeed () {
      const {data} = await this.$api.feedback.getMyFeedList()
      console.log(data)
      this.myFeeds.list = data
      this.myFeeds.total = this.myFeeds.list.length
    }
  }
}
</script>

<style lang="scss">
   
</style>