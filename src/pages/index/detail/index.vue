<template>
  <view>
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right">动态详情</block>
    </cu-custom>
    <!-- 动态详情 -->
    <view class="movecard">
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
            </view>
          </view>
          <!-- 内容 -->
          <view class="text-content">
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

          <view class="dian-name" @tap="moreDian">
            <text class="cuIcon-appreciatefill text-blue"></text>
            <text class="text-content text-blue">name1,name2等X人觉得很赞</text>
          </view>
          <view class="dian-box">
            <button class="cu-btn line-gray round lg"
                    @tap="toDian">
              <text class="cuIcon-appreciate" :class="isDian?'text-orange':'text-gray'">点赞</text>
            </button>
            <button class="cu-btn line-gray round lg"
                    @tap="onShare">
              <text class="cuIcon-share text-gray">分享</text>
            </button>
            <button class="cu-btn line-gray round lg" @tap="toShou">
              <text class="cuIcon-favor" :class="isShou?'text-orange':'text-gray'">收藏</text>
            </button>
          </view>

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
    <!-- 弹框 -->
    <view class="cu-modal" :class="modalName=='RadioModal'?'show':''" @tap="hideModal">
      <view class="cu-dialog" @tap.stop="">
        <radio-group class="block" @change="RadioChange">
          <view class="cu-list menu text-left">
            <view class="cu-item">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">删除</view>
                <radio class="round"></radio>
              </label>
            </view>
            <view class="cu-item">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">修改</view>
                <radio class="round"></radio>
              </label>
            </view>
            <view class="cu-item">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">收藏</view>
                <radio class="round"></radio>
              </label>
            </view>
            <view class="cu-item">
              <label class="flex justify-between align-center flex-sub">
                <view class="flex-sub">投诉</view>
                <radio class="round"></radio>
              </label>
            </view>
          </view>
        </radio-group>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat', openType: 'share' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
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
      isDian: false,
      isShou: false,
      modalName: null
    }
  },
  methods: {
    onShare(event) {
      console.log(event)
      this.showShare = true
    },

    onClose() {
      this.showShare = false
    },

    onSelect(event) {
      console.log(event.detail.name);
      this.onClose();
    },
    showModal(e) {
      this.modalName = e.currentTarget.dataset.target
    },
    hideModal() {
      this.modalName = null;
    },
    RadioChange(e) {
      console.log(e);
    },
    toDian() {
      if (!this.isDian) {
        this.isDian = true;
      } else {
        this.isDian = false;
      }
    },
    toShou() {
      if (!this.isShou) {
        this.isShou = true;
      } else {
        this.isShou = false;
      }
    },
    moreDian() {
      uni.navigateTo({url: '../dianzan/index'})
    }
  },
}
</script>

<style lang="scss">
@import "index";
</style>