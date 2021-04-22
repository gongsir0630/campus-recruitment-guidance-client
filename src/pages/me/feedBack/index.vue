<template>
  <view>
        <cu-custom bgColor="#fa8c15" isBack="true">
            <block slot="back">返回</block>
            <block slot="navname">问题反馈</block>
        </cu-custom>
        <view class="fankui-box">
            <view class="myline" @tap="toFankui">
                <view class="fankui">
                    <text class="cuIcon-write text-black myicon"></text>
                </view>
                <text>留言与反馈</text>
            </view>
            <view class="myline" @tap="toJilu">
                <view class="kefu">
                    <text class="cuIcon-text text-black myicon"></text>
                </view>
                <text>反馈记录</text>
            </view>
        </view>
  </view>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        toJilu () {
            uni.navigateTo({ url:'./list/index'})
        },
        toFankui () {
            uni.navigateTo({ url:'./fanDetail/index'});
        }
    }
}
</script>

<style lang="scss">
@import "index";
</style>