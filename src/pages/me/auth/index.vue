<template>
    <view>
      <cu-custom bgColor="#fa8c15" isBack="true">
        <block slot="back">返回</block>
        <block slot="right">信息认证</block>
      </cu-custom>

      <view class="fankui-box">
        <view class="myline" @tap="toEduAuth">
          <view class="fankui">
            <text class="cuIcon-people text-black myicon"></text>
          </view>
          <text>教育信息认证</text>
        </view>
        <view class="myline" @tap="toJobAuth">
          <view class="kefu">
            <text class="cuIcon-scan text-black myicon"></text>
          </view>
          <text>工作信息认证</text>
        </view>
      </view>
    </view>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods:{
    toEduAuth () {
      uni.navigateTo({ url:'./list/index'})
    },
    toJobAuth () {
      uni.navigateTo({ url:'./fanDetail/index'});
    }
  }
}
</script>

<style lang="scss">
@import "index";
</style>