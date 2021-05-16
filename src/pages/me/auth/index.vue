<template>
    <view>
      <cu-custom bgColor="#fa8c15" isBack="true">
        <block slot="back">返回</block>
        <block slot="right">信息认证</block>
      </cu-custom>

      <view class="cu-bar neitui-bar margin-top">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text>教育信息认证
        </view>
      </view>
      <view class="cu-card dynamic">
        <view class="cu-item shadow">
          <view class="cu-list menu-avatar">
            <view v-if="wxUser" class="cu-item align-center">
              <!-- 头像 -->
              <view class="cu-avatar round lg">
                <image class="cu-avatar lg round" :src="wxUser.eduInfo.school.logo"/>
              </view>
              <view class="content flex-sub">
                <view class="text-orange">{{ wxUser.eduInfo.school.name }}</view>
                <view class="text-gray text-sm flex justify-between">
                  {{ wxUser.eduInfo.major}}
                </view>
                <view class="text-gray text-sm flex justify-between">
                  {{ wxUser.eduInfo.entrance + ' - ' + wxUser.eduInfo.graduate}}
                </view>
              </view>
              <text v-if="wxUser.eduInfo.status==='false'"
                    @tap="toPage(`./applyAuth?type=0`)"
                    class='cu-tag text-white bg-blue light radius good-tag margin-right'>
                去认证
              </text>
              <text v-else class='cu-tag text-white bg-green light radius good-tag margin-right'>{{ wxUser.eduInfo.status }}</text>
            </view>
          </view>
        </view>
      </view>

      <!-- 工作信息认证 -->
      <view v-if="wxUser.jobId !== 0" class="cu-bar neitui-bar margin-top">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text>工作信息认证
        </view>
      </view>
      <view v-if="wxUser.jobId !== 0" class="cu-card dynamic">
        <view class="cu-item shadow">
          <view class="cu-list menu-avatar">
            <view v-if="wxUser" class="cu-item align-center">
              <!-- 头像 -->
              <view class="cu-avatar round lg">
                <image class="cu-avatar lg round" :src="wxUser.jobInfo.company.logo"/>
              </view>
              <view class="content flex-sub">
                <view class="text-orange">{{ wxUser.jobInfo.company.name }}</view>
                <view class="text-gray text-sm flex justify-between">
                  {{ wxUser.jobInfo.jobTitle}}
                </view>
              </view>
              <text v-if="wxUser.jobInfo.status==='false'"
                    @tap="toPage(`./applyAuth?type=1`)"
                    class='cu-tag text-white bg-blue light radius good-tag margin-right'>
                去认证
              </text>
              <text v-else class='cu-tag text-white bg-green light radius good-tag margin-right'>{{ wxUser.jobInfo.status }}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  data () {
    return {

    }
  },
  computed: {
    ...mapState('user',['wxUser']),
  },
  methods:{
    ...mapActions('user',['setUserInfo']),
    // 页面跳转
    toPage: (url) => {
      uni.navigateTo({url})
    },
    async loadUserInfo () {
      const {data} = await this.$api.user.getProfile()
      this.setUserInfo(data.userInfo)
    },
    onShow () {
      this.loadUserInfo()
    }
  }
}
</script>

<style lang="scss">
@import "index";
</style>