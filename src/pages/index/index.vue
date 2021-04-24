<template>
  <view class="background">
    <!-- 导航栏 -->
    <cu-custom bgColor="#fff" isSearch="true" @topage="toPage('./search/index')">
      <block slot="search">柚动态</block>
    </cu-custom>
    <!-- 轮播图 -->
    <view class="banner">
      <Swiper :swiperList="swiperList"></Swiper>
    </view>
    <!-- 公告模块 -->
    <view class="notice">
      <h1 class="text-center">柚子帮公告</h1>
      <view class="notice-list">
        <view v-for="item in notices" :key="item.id" class="notice-item" @tap="showNotice(item)">
          <text class="cuIcon-noticefill text-orange notice-number"></text>
          <text class="notice-content">{{ item.title }}</text>
          <text class="notice-hottag">新</text>
        </view>
        <view class="notice-item my-content" @tap="toPage('./notice/index')">
          <text class="notice-content text-blue">查看更多</text>
          <text class="cuIcon-right text-blue"></text>
        </view>
        <!-- vant-weapp 公告弹窗 -->
        <van-dialog id="van-dialog" />
      </view>
    </view>

    <!-- 动态卡片 -->
    <view class="movecard">
      <view class="cu-card dynamic" v-for="item in DynamicList" :key="item.id" @tap="toPage('./detail/index?id='+item.id)">
        <view class="cu-item shadow">
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
              <view class="my-moreandroid cuIcon-moreandroid text-gray" @tap.stop="onShare"></view>
            </view>
          </view>
          <view class="margin-top text-content">
            {{ item.content }}
          </view>
          <view class="grid flex-sub padding-lr col-1">
            <view class="bg-img">
              <image :src="item.imgUrl"></image>
            </view>
          </view>
          <view class="movecard-tag  padding">
            <view v-for="tag in item.topTags" :key="tag.length" class='cu-tag radius text-blue'>{{ '#'+tag }}</view>
          </view>
          <view class="movecard-icon text-gray padding">
            <text class="cuIcon-appreciate">{{ item.likeCount }}</text>
            <text v-if="item.collection===false" class="cuIcon-favor"></text>
            <text v-else class="cuIcon-favorfill text-red"></text>
            <text class="cuIcon-forward">分享</text>
          </view>
        </view>
      </view>
    </view>

    <!-- 动态发布 -->
    <view class="msg-publish" @tap="toPage('./publish/index')">
      <view class="msg-content">
        <text class="cuIcon-writefill text-black"></text>
        <text class="msg-text">发布</text>
      </view>
    </view>

    <van-share-sheet
      :show="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
      @close="onClose"
    />
  </view>
</template>

<script>
import Swiper from '@/components/Swiper';
// 引入 vant-weapp-dialog 组件 -> 公告弹窗查看详情
import Dialog from '../../wxcomponents/@vant/weapp/dist/dialog/dialog';
let test = {
  id:1,
  avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
  nickName: '码之泪殇',
  jobTitle:'快手 Java 研发线',
  major:'2017级计算机科学与技术',
  topTags:['校招指导','工作内推'],
  likeCount:199,
  collection:true,
  content:'这是一条测试动态',
  imgUrl:'https://cdn.gongsir.club/blog/image/2021/04/221.jpg'
}
export default {
  data() {
    return {
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
      // 公告列表
      notices: [{
        id: 1,
        title: '柚子帮正式运营了',
        content: '柚子帮正式运营了'
      }, {
        id: 2,
        title: '柚子帮正式运营了',
        content: '柚子帮正式运营了'
      }, {
        id: 3,
        title: '柚子帮正式运营了',
        content: '柚子帮正式运营了'
      }],
      // 轮播图数据列表
      swiperList: [{
        id: 2,
        type: 'image',
        url: 'https://cdn.gongsir.club/blog/image/2021/04/22tieba.jpg'
      }, {
        id: 2,
        type: 'image',
        url: 'https://cdn.gongsir.club/blog/image/2021/04/221.jpg'
      }],
      DynamicList: [
        test,
        test
      ],
    }
  },
  components: {
    Swiper
  },
  onLoad() {

  },
  methods: {
    /**
     * share
     * @param event
     */
    onShare(event) {
      // console.log(event)
      // 暂时隐藏 tabBar
      uni.hideTabBar()
      this.showShare = true
    },
    // close share
    onClose() {
      this.showShare = false
      uni.showTabBar()
    },
    /**
     * share item
     * @param event
     */
    onSelect(event) {
      console.log(event.detail.name);
      this.onClose();
    },
    /**
     * 页面跳转
     */
    toPage(url) {
      uni.navigateTo({url})
    },
    /**
     * api加载轮播图
     */
    getSwiperList() {
    },
    /**
     * 公告弹出
     */
    showNotice(notice) {
      // 弹窗显示公告详情
      // uni.showModal({
      //   title: notice.title,
      //   content: notice.content,
      //   showCancel:false,
      //   confirmText: '我知道了'
      // })
      Dialog.alert({
        title: notice.title,
        message: notice.content,
        confirmButtonText: '我知道了'
      })
    },
    showBottom(e) {
      this.bottomName = e.currentTarget.dataset.target;
    },
    hideBottom() {
    },
    bottomChange() {
    }
  },
  created() {
    this.getSwiperList();
  }
}
</script>

<style lang="scss">
@import "index";
</style>