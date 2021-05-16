<template>
	<view>
		<view class="cu-custom"
			:style="{'height':navHeight,'padding-top':navTop,'background':bgColor}">
			<!-- 返回 -->
			<view class="left" v-if="isBack" @tap="backPage">
				<text class="cuIcon-back"></text>
				<slot name="back"></slot>
			</view>
			<!-- 搜索栏 -->
			<view class="left" v-if="isSearch" @tap="toSearch">
				<text class="cuIcon-search margin-left"></text>
				<slot name="search"></slot>
			</view>
			<!-- 切换 -->
			<view class="left" v-if="isOrder" @tap="changeType">
				<text class="cuIcon-order margin-left"></text>
				<slot name="order"></slot>
			</view>
      <!-- 标题内容 -->
			<view class="content">
				<slot name="navname"></slot>
			</view>
      <!-- 右边区域内容 -->
			<view class="right">
				<slot name="right"></slot>
			</view>
		</view>
		<view class="cu-block" :style="{'height':navHeight}"></view>
	</view>
</template>

<script>
	export default {
		name: 'cu-custom',
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			isSearch:{
				type:[Boolean, String],
				default: false
			},
			isOrder:{
				type:[Boolean,String],
				default:false
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				navHeight:0,
				navTop:0
			};
		},
		methods: {
      /**
       * 点击返回事件
       * @constructor
       */
			backPage () {
			  // https://blog.csdn.net/hl18730262380/article/details/100036491 <--- __wxConfig
				if (getCurrentPages().length < 2 && 'undefined' !== typeof __wxConfig) {
          // console.log(__wxConfig)
					let url = '/' + __wxConfig.pages[0]
					return uni.redirectTo({url})
				}
				uni.navigateBack({
					delta: 1
				});
			},
      /**
       * 搜索组件点击事件
       * @constructor
       */
			toSearch () {
				this.$emit('topage');
			},
			changeType () {
				this.$emit('chtype');
			},
      /**
       * 初始化
       */
			init(){
				let menuButtonObj = uni.getMenuButtonBoundingClientRect(),
				that=this;
				uni.getSystemInfo({
					success:function(res){
						let statusBarHeight = res.statusBarHeight,
							navTop = menuButtonObj.top,
							navHeight = statusBarHeight+menuButtonObj.height+(menuButtonObj.top- statusBarHeight)*2;
						that.navHeight= navHeight + 'px';
						that.navTop = navTop +'px';
					}
				})
			}
		},
		created() {
			this.init();
		}
	}
</script>

<style lang="scss">
	.cu-custom{
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;

		.left{
			display: flex;
			position: fixed;
			left: 5px;
      align-items: center;

			text{
				margin-right: 5px;
			}
		}
		.cuIcon-order{
			transform: rotate(90deg);
		}
	}
</style>
