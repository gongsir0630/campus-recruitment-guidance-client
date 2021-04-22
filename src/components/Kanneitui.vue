<template>
	<view>
        <!-- 看内推 -->
        <!-- 搜索框 -->
        <view class="cu-bar search bg-white">
            <view class="search-form round">
                <text class="cuIcon-search"></text>
                <input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" 
                    placeholder="搜索感兴趣的公司或者职业标签" confirm-type="search"></input>
                <button class="cu-btn bg-orange shadow-blur round">搜索</button>
            </view>
        </view>
        <!-- 轮播图 -->
        <Swiper2></Swiper2>
	    <!-- 内推卡片 -->
        <view class="cu-bar bg-white neitui-bar">
            <view class="action">
				<text class="cuIcon-titles text-orange"></text>列表
			</view>
			<view class="action" @tap="changeType">
				<text class="cuIcon-order text-orange"></text>{{barText}}
			</view>
		</view>
        <view class="movecard">
			<view class="cu-card dynamic">
				<view class="cu-item shadow" v-for="item in neiCardList"
                    :key="item.id"
                    @tap="toneiCardPage">
                    <view class="cu-list menu-avatar">
                        <view class="cu-item">
                            <view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);"></view>
                            <view class="content flex-sub">
                                <view>公司名</view>
                                <view class="text-gray text-sm flex justify-between">
                                    <!-- 内推人信息：专业年级-真实姓名 -->
                                    {{item.message}}
                                </view>
                                <view>{{item.tag}}</view>
                            </view>
                            <!-- 内推形式：实习/校招 -->
                            <view class="text-red">{{item.type}}</view>
                        </view>
                    </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

import Swiper2 from '@/components/Swiper2.vue'
export default {
    components:{
        Swiper2
    },
    data(){
        return{
            typename:'看内推',
            barText:'推荐',
            swiperList: [{
                id: 0,
                type: 'image',
                url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
            }, {
                id: 1,
                type: 'image',
                url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
            }, {
                id: 2,
                type: 'image',
                url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
            }, {
                id: 3,
                type: 'image',
                url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
            },
            , {
                id: 4,
                type: 'image',
                url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
            }, {
                id: 5,
                type: 'image',
                url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
            }],
            neiCardList:[
                {id:1,message:'计算机科学与技术2017级XX',tag:'职业标签',type:'校招'},
                {id:2,message:'计算机科学与技术2017级XX',tag:'职业标签',type:'实习'},
                {id:3,message:'计算机科学与技术2017级XX',tag:'职业标签',type:'校招'}
            ]
        }
    },
    methods: {
        InputBlur(){},
        InputFocus(){
            uni.navigateTo({ url:'../neisearch/index'})
        },
        toneiCardPage(){
            uni.navigateTo({url:'../neiDetail/index'})
        },
        changeType(){
            if(this.barText==='推荐'){
                this.barText='最新';
                //api
            }else if(this.barText==='最新'){
                this.barText='推荐';
                //api
            }
        }
	}
}
</script>

<style lang="scss">
    .neitui-bar{
        display: flex;
        justify-content: space-between;
    }
</style>