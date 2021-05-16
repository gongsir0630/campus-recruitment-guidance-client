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
            {{ item.detail.content }}
          </view>
          <!-- 图片 -->
          <view v-if="item.detail.imgUrl.startsWith('https://')" class="grid flex-sub padding-lr col-1">
            <image :src="item.detail.imgUrl" mode="aspectFit" @tap="viewImg(item.detail.imgUrl)"></image>
          </view>
          <view class="movecard-tag  padding">
            <view v-for="(tag,idx) in (item.detail.topicTags || '').split(',').filter(t=>t.length>0)"
                  :key="idx" class='cu-tag radius text-blue'>
              {{ '#' + tag }}
            </view>
          </view>
          <!-- 互动功能 -->
          <van-divider contentPosition="center">
            <text class="text-orange">点个赞吧</text>
          </van-divider>
          <!-- 点赞名单 -->
          <view class="dian-name" @tap="toPage('/like/index')">
            <text v-if="item.isLike || allLikeList.length>0" class="cuIcon-appreciatefill text-blue"></text>
            <text class="text-content">
              <text v-if="item.isLike" class="text-orange">
                {{ wxUser.nickName + (allLikeList.length > 0 ? ', ' : '') }}
              </text>
              <text class="text-blue">
                {{ nickNameList }}
              </text>
            </text>
          </view>
          <view class="dian-box">
            <button class="cu-btn line-gray round"
                    @tap="onLike">
              <text class="cuIcon-appreciate" :class="item.isLike?'text-orange':'text-gray'">&nbsp;点赞</text>
            </button>
            <button class="cu-btn line-gray round"
                    @tap="onShare">
              <text class="cuIcon-share text-gray">分享</text>
            </button>
            <button class="cu-btn line-gray round" @tap="onCollection">
              <text class="cuIcon-favor" :class="item.collection?'text-orange':'text-gray'">收藏</text>
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
    <van-toast id="van-toast"/>
    <van-dialog id="van-dialog"/>
  </view>
</template>

<script>
import Toast from '@/wxcomponents/@vant/weapp/dist/toast/toast'
// 引入 vant-weapp-dialog 组件 -> 公告弹窗查看详情
import Dialog from '@/wxcomponents/@vant/weapp/dist/dialog/dialog';
import {Share_Options} from '@/constants'
import {mapState} from 'vuex';

export default {
  data() {
    return {
      allLikeList: ['test1', 'test2', '🍄', 'helloTest'],
      nickNameList: 'test1, test2',
      showShare: false,
      options: [...Share_Options],
      item: {
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
      },
    }
  },
  computed: {
    ...mapState('user', ['wxUser']),
    ...mapState('dynamic', ['dynamic']),
  },
  methods: {
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
     * share
     */
    onShare() {
      let openId = this.item.detail.openId
      if (openId !== this.wxUser.openId) {
        // 非本人视角，去掉删除操作
        this.options = Share_Options.slice(0, 2)
      } else {
        this.options = Share_Options
      }
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
          this.onDelete()
          break;
      }
      this.onClose();
    },
    async onLike() {
      // TODO: 异步请求
      await this.$api.dynamic.like(this.item.detail.id)
      if (this.item.isLike) {
        this.item.likeCount--
      } else {
        this.item.likeCount++
      }
      this.item.isLike = !this.item.isLike
    },
    async onCollection() {
      // TODO: 异步请求
      await this.$api.dynamic.collection(this.item.detail.id)
      this.item.collection ? Toast.success('已取消收藏') : Toast.success('收藏成功')
      this.item.collection = !this.item.collection
    },
    onDelete() {
      Dialog.confirm({
        title: '动态删除',
        message: '确认要删除这条动态吗',
      }).then(() => {
        // 异步请求
        this.$api.dynamic.deleteById(this.item.detail.id)
        this.dynamic.list.splice(this.id2Idx(this.item.detail.id), 1)
        this.dynamic.total--
        // 返回首页
        uni.navigateBack({
          delta:1
        })
      })
    },
    /**
     * page-router
     * @param url page-url
     */
    toPage(url) {
      uni.navigateTo({url})
    },
    /**
     * 根据动态 id 渲染动态详情
     * @param id
     */
    onLoad ({id}) {
      // 类型转换，坑
      id = +id
      for (let dt of this.dynamic.list) {
        if (dt.detail.id === id)
          this.item = dt
      }
      let likeList = this.item.detail.likeList
      this.allLikeList = (likeList || '').split(",").filter(openId => openId !== '')
      if (this.item.isLike) {
        // 把自己从点赞列表删除
        this.allLikeList.splice(this.allLikeList.indexOf(this.wxUser.openId), 1)
      }
      console.log(this.allLikeList)
      this.showLikeList2Name()
    },
    async showLikeList2Name () {
      const {data} = await this.$api.user.getNickNameByOpenIds(this.allLikeList.join(","))
      console.log(data)
      this.nickNameList = data.slice(0, Math.min(10, data.length)).join(", ")
    },
  },
}
</script>

<style lang="scss">
@import "index";
</style>