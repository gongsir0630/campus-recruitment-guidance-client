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
        <!-- show notice list, click to see detail -->
        <view v-for="(item,idx) in showNoticeList" :key="idx" class="notice-item" @tap="showNotice(item)">
          <text class="cuIcon-noticefill text-orange notice-number"></text>
          <text class="notice-content">{{ item.title }}</text>
          <text class="notice-hottag">新</text>
        </view>
        <!-- to all notice -->
        <view class="notice-item my-content" @tap="toPage('./notice/index')">
          <text class="notice-content text-blue">查看更多</text>
          <text class="cuIcon-right text-blue"></text>
        </view>
        <!-- vant-weapp 公告弹窗 -->
        <van-dialog id="van-dialog"/>
      </view>
    </view>

    <!-- 动态卡片 -->
    <view class="movecard">
      <view class="cu-card dynamic"
            v-for="(item,idx) in showDtList"
            :key="idx"
            @tap="toPage(`./detail/index?id=${item.detail.id}`)">
        <view class="cu-item shadow">
          <view class="cu-list menu-avatar">
            <view class="cu-item">
              <!-- 头像 -->
              <view class="cu-avatar round lg">
                <image class="cu-avatar lg round" :src="item.avatar"/>
              </view>
              <!-- user info -->
              <view class="content flex-sub">
                <view class="text-orange">{{ item.nickName }}</view>
                <view v-if="item.jobTitle!=='未认证职业信息'" class="text-gray text-sm flex justify-between">
                  {{ item.jobTitle }}
                </view>
                <view v-else class="text-gray text-sm flex justify-between">
                  {{ item.major }}
                </view>
              </view>
              <!-- topRight menu -->
              <view class="my-moreandroid cuIcon-moreandroid text-gray" @tap.stop="onShare(item.detail.id)"></view>
            </view>
          </view>
          <!-- dynamic content -->
          <view class="margin-top text-content">
            {{ item.detail.content }}
          </view>
          <!-- image -->
          <view v-if="item.detail.imgUrl.startsWith('https://')" class="grid flex-sub padding-lr col-1">
            <view class="bg-img">
              <image :src="item.detail.imgUrl" mode="aspectFit" @tap.stop="viewImg(item.detail.imgUrl)"></image>
            </view>
          </view>
          <!-- tag -->
          <view class="movecard-tag  padding">
            <view v-for="(tag,idx) in (item.detail.topicTags || '').split(',').filter(t=>t.length>0)"
                  :key="idx" class='cu-tag radius text-blue'
                  @tap.stop="toPage(`./search/index?tag=${tag}`)">
              {{ '#' + tag }}
            </view>
          </view>
          <view class="movecard-icon text-gray padding">
            <!-- 点赞 -->
            <text :class="item.isLike ? 'cuIcon-appreciatefill text-red' : 'cuIcon-appreciate'"
                  @tap.stop="onLike(item.detail.id)">
              {{ item.likeCount }}
            </text>
            <!-- 收藏 -->
            <text :class="item.collection ? 'cuIcon-favorfill text-red' : 'cuIcon-favor'"
                  @tap.stop="onCollection(item.detail.id)">
              {{ item.collection ? '取消收藏' : '收藏' }}
            </text>
            <!-- 分享 -->
            <text class="cuIcon-forwardfill text-red" @tap.stop="onShare(item.detail.id)">分享</text>
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
    <!-- vant-weapp 轻提示 -->
    <van-toast id="van-toast"/>
    <van-dialog id="van-dialog"/>
  </view>
</template>

<script>
import Toast from '@/wxcomponents/@vant/weapp/dist/toast/toast'
import Swiper from '@/components/Swiper';
import {Share_Options} from '@/constants';
import {mapState, mapActions, mapMutations} from 'vuex'
// 引入 vant-weapp-dialog 组件 -> 公告弹窗查看详情
import Dialog from '../../wxcomponents/@vant/weapp/dist/dialog/dialog';

export default {
  data() {
    return {
      // 当前分享面板操作的 itemId
      shareItemId: 1,
      curPage: 1,
      pageSize: 5,
      showShare: false,
      options: [
        ...Share_Options
      ],
      // 公告列表
      notices: [{
        id: 1,
        title: '柚子帮正式运营了',
        content: '柚子帮正式运营了',
        publishTime: '2021年04月29日16:32:08'
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
      // 分页展示列表
      dynamicList: [{
        avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
        nickName: '码之泪殇',
        jobTitle: '快手 Java 研发线',
        major: '2017级计算机科学与技术',
        isLike: false,
        likeCount: 199,
        collection: false,
        detail: {
          id: 1,
          openId: '',
          content: '这是一条测试动态',
          imgUrl: 'https://cdn.gongsir.club/blog/image/2021/04/221.jpg',
          topicTags: '',
          publishTime: '',
          likeList: '',
          collectionList: ''
        }
      }],
      imgList:[],
    }
  },
  computed: {
    ...mapState('user', ['wxUser']),
    ...mapState('notice', ['notice']),
    ...mapState('dynamic', ['dynamic']),
    pageCount() {
      console.log(this.dynamic)
      return Math.ceil(this.dynamic.total / this.pageSize)
    },
    showDtList () {
      this.dynamicList = this.dynamic.list.slice(0, this.curPage * this.pageSize)
      return this.dynamic.list.slice(0, this.curPage * this.pageSize)
    },
    showNoticeList () {
      this.notices = this.notice.list.slice(0, 3)
      return this.notices
    }
  },
  components: {
    Swiper
  },
  methods: {
    ...mapActions('notice', ['getNoticeList']),
    ...mapActions('dynamic', ['getDynamicList']),
    viewImg(imgUrl) {
      uni.previewImage({
        urls: [imgUrl],
        current: imgUrl
      });
    },
    /**
     * id 转 idx
     */
    id2Idx (id) {
      let idx = -1
      for (let dt of this.dynamic.list) {
        if (dt.detail.id === id) {
          idx = this.dynamic.list.indexOf(dt)
          break
        }
      }
      return idx
    },
    /**
     * 点赞
     */
    async onLike(id) {
      // 异步请求
      await this.$api.dynamic.like(id)

      let idx = this.id2Idx(id)
      if (this.dynamic.list[idx].isLike) {
        this.dynamic.list[idx].likeCount--
      } else {
        this.dynamic.list[idx].likeCount++
      }
      this.dynamic.list[idx].isLike = !this.dynamic.list[idx].isLike
      // 重新加载数据，刷新点赞列表
      await this.getDynamicList(null)
      console.log(this.dynamic.list[idx].detail.likeList)
    },
    /**
     * 收藏
     */
    async onCollection(id) {
      // 异步请求
      await this.$api.dynamic.collection(id)
      let idx = this.id2Idx(id)
      this.dynamic.list[idx].collection ? Toast.success('已取消收藏') : Toast.success('收藏成功')
      this.dynamic.list[idx].collection = !this.dynamic.list[idx].collection
    },
    onDelete(id) {
      let idx = this.id2Idx(id)
      Dialog.confirm({
        title: '动态删除',
        message: '确认要删除这条动态吗',
      }).then(() => {
        // 异步请求
        this.$api.dynamic.deleteById(id)
        this.dynamic.list.splice(idx, 1)
        this.dynamic.total--
      })
    },
    /**
     * 上拉加载更多
     */
    onReachBottom() {
      if (++this.curPage <= this.pageCount) {
        uni.showToast({
          title: '努力为你加载...',
          icon: 'loading',
          mask: true
        })
        console.log(this.curPage)
      } else {
        uni.showToast({
          title: '没有更多数据了~',
          icon: 'success'
        })
      }
    },
    /**
     * 页面加载
     */
    onShow() {
      // 加载公告
      this.loadNotice()
      this.loadDynamic()
    },
    /**
     * share
     */
    onShare(id) {
      // console.log(event)
      // 暂时隐藏 tabBar
      let idx = this.id2Idx(id)
      let openId = this.dynamicList[idx].detail.openId
      if (openId !== this.wxUser.openId) {
        // 非本人视角，去掉删除操作
        this.options = Share_Options.slice(0, 2)
      } else {
        this.options = Share_Options
      }
      uni.hideTabBar()
      // 当前分享面板操作的动态
      this.shareItemId = id
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
      let opName = event.detail.name
      console.log(opName);
      switch (opName) {
        case "复制链接":
          uni.showToast({
            title:'链接复制成功',
            icon:'success'
          })
          break;
        case "删除":
          this.onDelete(this.shareItemId)
          break;
      }
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
    async getSwiperList() {
    },
    /**
     * 异步加载公告信息,只显示最新三条
     */
    async loadNotice() {
      await this.getNoticeList(null)
    },
    /**
     * 异步加载动态信息
     */
    async loadDynamic() {
      await this.getDynamicList(null)
    },
    /**
     * 公告弹出
     */
    showNotice(notice) {
      // 弹窗显示公告详情
      Dialog.alert({
        title: notice.title,
        message: notice.content,
        confirmButtonText: '我知道了'
      })
    }
  },
}
</script>

<style lang="scss">
@import "index";
</style>