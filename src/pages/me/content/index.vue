<template>
    <view>
        <cu-custom bgColor="#fa8c15" isBack="true">
            <block slot="back">返回</block>
            <block slot="right">内容管理</block>
        </cu-custom>
        <!-- 我的动态 -->
        <view class="cu-bar bg-white solid-bottom">
            <view class="action">
                <text class="cuIcon-title text-orange "></text> 我的动态
            </view>
        </view>
        <view class="cu-list grid col-3 no-border">
            <view class="cu-item">
                <view class="cuIcon-messagefill  text-red"></view>
                <text>我的发布</text>
            </view>
            <view class="cu-item">
                <view class="cuIcon-favorfill  text-red"></view>
                <text>我的收藏</text>
            </view>
            <view class="cu-item">
                <view class="cuIcon-appreciatefill  text-red"></view>
                <text>我的点赞</text>
            </view>
        </view>
        <!-- 我的内推 -->
        <view class="cu-bar bg-white solid-bottom margin-top">
            <view class="action">
                <text class="cuIcon-title text-orange "></text> 我的内推
            </view>
        </view>
        <view class="cu-list grid col-3 no-border">
            <view class="cu-item">
                <view class="cuIcon-messagefill  text-red"></view>
                <text>我的发布</text>
            </view>
            <view class="cu-item">
                <view class="cuIcon-likefill  text-red"></view>
                <text>我的Like</text>
            </view>
        </view>

    </view>
</template>

<script>
export default {
    methods:{
        
    }
}
</script>

<style lang="scss">
  
</style>