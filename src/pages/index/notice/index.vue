<template>
  <view>
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right">所有公告</block>
    </cu-custom>
    <van-empty v-if="notice.total===0" description="暂无更多公告"/>
    <!-- 公告卡片 -->
    <view v-else>
      <view class="cu-card dynamic" v-for="(item,idx) in notice.list" :key="idx">
        <view class="cu-item shadow">
          <view class="cu-list menu-avatar">
            <view class="cu-item">
              <view class="cu-avatar round lg">
                <image class="cu-avatar lg round" :src="appLogo"/>
              </view>
              <view class="content flex-sub">
                <view class="text-orange">{{ item.title }}</view>
                <!-- 发布时间 -->
                <text class="text-sm">
                  {{ `『${appName}』` + " - " + item.publishTime }}
                </text>
              </view>
            </view>
          </view>
          <view class="movecard-tag padding">
            <view class='text-content'>
              {{ item.content }}
            </view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
import {mapState} from 'vuex';
export default {
  data() {
    return {
      appLogo: 'https://cdn.gongsir.club/blog/image/2021/04/27logo.png',
      appName: '柚子帮'
    }
  },
  computed: {
    ...mapState('notice',['notice']),
  },
  methods: {}
}
</script>

<style lang="scss">
</style>