<template>
	<view>
		<!-- 柚子帮 -->
		<cu-custom bgColor="#fff" isSearch="true" @topage="searchPage">
			<block slot="search">柚子帮</block>
		</cu-custom>
		<!-- 申请入口 -->
		<view class="banner" @tap="toApply">
			<Swiper :swiperList="swiperList" ></Swiper>
		</view>
		<!-- 人脉卡片 -->
		<view class="movecard">
			<view class="cu-card dynamic" v-for="item in renCardList" :key="item.id"
				@tap="toRenPage">
				<view class="cu-item shadow">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
							<view class="content flex-sub">
								<view>{{item.name}}</view>
								<text class="cu-tag bg-orange text-sm radius">
									头衔
								</text>
							</view>
						</view>
					</view>
					<view class="movecard-tag  padding">
						<view class='cu-tag text-orange bg-orange light radius good-tag'>擅长标签</view>
						<view class='cu-tag text-orange bg-orange light radius good-tag'>擅长标签</view>
					</view>
					<view class="text-content">
						<text class="text-white bg-orange text-sm my-tag">#</text>
						<text>擅长话题题目1</text>
					</view>
					<view class="text-content">
						<text class="text-white bg-orange text-sm my-tag">#</text>
						<text>擅长话题题目1</text>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Swiper from '@/components/Swiper';
export default {

  data() {
    return {
      // 轮播图数据列表
      swiperList:[{
        id: 2,
        type: 'image',
        url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
      }],
      renCardList:[
        {id:1,name:'name'},
        {id:2,name:'name'}
      ]
    }
  },
  components:{
    Swiper
  },
  methods: {
    searchPage () {},
    toApply(){
      uni.navigateTo({url:'../apply/index'})
    },
    toRenPage(){
      uni.navigateTo({url:'../renCard/index'})
    }
  }
}
</script>

<style lang="scss">
	.banner{
		height: 200px;
	}
	.my-tag{
		border-radius: 50%;
		padding: 4px;
		margin-right: 10px;
	}
	.good-tag{
		margin-right: 10px;
	}
</style>
