<template>
  <view>
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right">动态详情</block>
    </cu-custom>
    <!-- 动态详情 -->
    <view>
      <view class="cu-card dynamic no-card">
        <view class="cu-item shadow">
          <!-- 用户信息 -->
          <view class="cu-list menu-avatar">
            <view class="cu-item">
              <!-- 头像 -->
              <view class="cu-avatar round lg">
                <image class="cu-avatar lg round" :src="item.avatar"/>
              </view>
              <view class="content flex-sub">
                <view class="text-orange">{{ item.nickName }}</view>
                <view v-if="item.jobTitle!=='未认证职业信息'" class="text-gray text-sm flex justify-between">
                  {{ item.jobTitle }}
                </view>
                <view v-else class="text-gray text-sm flex justify-between">
                  {{ item.major }}
                </view>
              </view>
              <view class="my-moreandroid cuIcon-moreandroid text-gray" @tap="onShare"></view>
            </view>
          </view>
          <!-- 内容 -->
          <view class="margin-top text-content">
            {{ item.content }}
          </view>
          <!-- 图片 -->
          <view class="grid flex-sub padding-lr col-1">
            <image :src="item.imgUrl"></image>
          </view>
          <!-- 互动功能 -->
          <van-divider contentPosition="center">
            <text class="text-orange">点个赞吧</text>
          </van-divider>
          <!-- 点赞名单 -->
          <view class="dian-name" @tap="toPage('/like/index')">
            <text class="cuIcon-appreciatefill text-blue"></text>
            <text class="text-content">
              <text v-if="allLikeList.includes(nickname)" class="text-orange">
                {{ nickname + (allLikeList.length>1 ? ', ':'') }}
              </text>
              <text v-if="allLikeList.includes(nickname) && allLikeList.length>1" class="text-blue">
                {{ allLikeList.slice(1,10).join(", ") }}
              </text>
              <text v-else class="text-blue">
                {{ allLikeList.slice(0,10).join(", ") }}
              </text>
            </text>
          </view>
          <view class="dian-box">
            <button class="cu-btn line-gray round"
                    @tap="toLike">
              <text class="cuIcon-appreciate" :class="isLike?'text-orange':'text-gray'">&nbsp;点赞</text>
            </button>
            <button class="cu-btn line-gray round"
                    @tap="onShare">
              <text class="cuIcon-share text-gray">分享</text>
            </button>
            <button class="cu-btn line-gray round" @tap="toCollection">
              <text class="cuIcon-favor" :class="isCollection?'text-orange':'text-gray'">收藏</text>
            </button>
          </view>

          <!-- vant-weapp 分享面板 -->
          <van-share-sheet
            :show="showShare"
            title="立即分享给好友"
            :options="options"
            @select="onSelect"
            @close="onClose"
          />
        </view>
      </view>
    </view>

    <!-- vant-weapp 轻提示 -->
    <van-toast id="van-toast" />
  </view>
</template>

<script>
import Toast from '@/wxcomponents/@vant/weapp/dist/toast/toast'
import {mapState} from 'vuex';
export default {
  data() {
    return {
      allLikeList:['码之泪殇','深邃','🍄','helloTest'],
      showShare: false,
      options: [[
        { name: '微信', icon: 'wechat', openType: 'share' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],[
        { name: '收藏', icon: 'link' },
        { name: '删除', icon: 'poster' },
        { name: '修改', icon: 'qrcode' },
      ]],
      item: {
        id: 1,
        avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
        nickName: '码之泪殇',
        jobTitle: '快手 Java 研发线',
        major: '2017级计算机科学与技术',
        topTags: ['校招指导', '工作内推'],
        likeCount: 199,
        collection: true,
        content: '这是一条测试动态',
        imgUrl: 'https://cdn.gongsir.club/blog/image/2021/04/221.jpg'
      },
      isLike: false,
      isCollection: false
    }
  },
  computed: {
    ...mapState('user',['nickname','avatar'])
  },
  methods: {
    /**
     * share
     * @param event
     */
    onShare(event) {
      console.log(event)
      this.showShare = true
    },
    // close share
    onClose() {
      this.showShare = false
    },
    /**
     * share item
     * @param event
     */
    onSelect(event) {
      console.log(event.detail.name);
      this.onClose();
    },
    toLike () {
      // TODO: 异步请求
      if (this.isLike) {
        this.allLikeList.shift()
      } else {
        this.allLikeList.unshift(this.nickname)
      }
      this.isLike = !this.isLike
    },
    toCollection () {
      this.isCollection ? Toast.success('已取消收藏') : Toast.success('收藏成功')
      this.isCollection = !this.isCollection
    },
    /**
     * page-router
     * @param url page-url
     */
    toPage (url) {
      uni.navigateTo({url})
    },
    onLoad () {
      if (this.allLikeList.includes(this.nickname)) {
        this.isLike = true
      }
    }
  },
}
</script>

<style lang="scss">
@import "index";
</style>