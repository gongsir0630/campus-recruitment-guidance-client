<template>
  <view>
    <!-- 搜索 -->
    <!-- 顶部 -->
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right">搜索柚动态</block>
    </cu-custom>
    <!-- 搜索框 -->
    <view class="cu-bar bg-white search">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input @focus="inputFocus" @blur="inputBlur"
               :adjust-position="false" type="text"
               placeholder="搜索关键字或话题标签"
               confirm-type="search"
               v-model="keywords"/>
      </view>
      <view class="action">
        <text @tap="inputCancel">取消</text>
      </view>
    </view>
    <template v-if="showSearchPage">
      <!-- 搜索页面 -->
      <view class="search-view">
        <!-- 搜索历史 -->
        <view v-if="historyList.length>0" class="search-history">
          <view class="search-history-box">
            <h1>
              搜索历史
              <text class="cuIcon-deletefill history-delete" @tap="delAllHistory"></text>
            </h1>
          </view>
          <view class="search-box">
            <view class='cu-tag round bg-white search-tag'
                  v-for="(item,idx) in historyList" :key="idx">
              <text @tap.stop="onSearch(item)">{{ item }}</text>
              <text class="cuIcon-close close-tag" @tap="delHistory(idx)"></text>
            </view>
          </view>
        </view>
        <!-- 推荐标签 -->
        <view class="search-tags">
          <h1>推荐标签</h1>
          <view class="search-box">
            <view class='cu-tag radius bg-white search-tag'
                  v-for="(item,idx) in tagList" :key="idx" @tap.stop="onSearch(item.tagName)">
              {{ item.tagName }}
            </view>
          </view>
        </view>

        <!-- 热门搜索 -->
        <view class="search-hot">
          <h1>热门搜索
            <text class="cuIcon-hot text-red text-shadow"></text>
          </h1>
          <view class="search-hot-list">
            <view class="search-hot-item"
                  v-for="(item,idx) in hotList" :key="idx" @tap.stop="onSearch(item.name)">
              <text class="search-hot-icon cuIcon-emoji text-red"></text>
              <text class="search-hot-text">{{ item.name }}</text>
            </view>
          </view>
        </view>

      </view>
    </template>
    <template v-else>
      <!-- 动态卡片 -->
      <view v-if="dynamicList.length>0" class="movecard">
        <view class="cu-card dynamic"
              v-for="(item,idx) in dynamicList"
              :key="idx"
              @tap="toPage(`../detail/index?id=${item.detail.id}`)">
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
                <view class="my-moreandroid cuIcon-moreandroid text-gray"></view>
              </view>
            </view>
            <view class="margin-top text-content">
              {{ item.detail.content }}
            </view>
            <view v-if="item.detail.imgUrl.startsWith('https://')" class="grid flex-sub padding-lr col-1">
              <view class="bg-img">
                <image :src="item.detail.imgUrl" mode="aspectFit"></image>
              </view>
            </view>
            <view class="movecard-tag  padding">
              <view v-for="(tag,idx) in (item.detail.topicTags || '').split(',').filter(t=>t.length>0)"
                    :key="idx" class='cu-tag radius text-blue'>
                {{ '#' + tag }}
              </view>
            </view>
            <view class="movecard-icon text-gray padding">
              <!-- 点赞 -->
              <text :class="item.isLike ? 'cuIcon-appreciatefill text-red' : 'cuIcon-appreciate'">
                {{ item.likeCount }}
              </text>
              <!-- 收藏 -->
              <text :class="item.collection ? 'cuIcon-favorfill text-red' : 'cuIcon-favor'">
                {{ item.collection ? '取消收藏' : '收藏' }}
              </text>
              <!-- 分享 -->
              <text class="cuIcon-forwardfill text-red">分享</text>
            </view>
          </view>
        </view>
      </view>
      <van-empty v-else description="未找到相关数据源~~"/>
    </template>
  </view>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  data() {
    return {
      showSearchPage: true,
      tagList: [
        {
          id: 1,
          tagName: '标签标签标签标签标签标签标签'
        }
      ],
      historyList: ['柚子帮'],
      hotList: [
        {id: 1, name: '热门搜索1'},
        {id: 2, name: '热门搜索2'},
        {id: 3, name: '热门搜索3'},
        {id: 4, name: '热门搜索4'},
        {id: 5, name: '热门搜索5'}
      ],
      keywords:'',
      dynamicList:[],
    }
  },
  computed: {
    ...mapState('dynamic',['dynamic']),
    ...mapState('history',['history'])
  },
  methods: {
    ...mapActions('history',['getMyAllHistory']),
    onLoad ({tag}) {
      if (tag) {
        this.keywords = tag
        this.onSearch(tag)
      }
      this.loadAllTagList()
      this.loadAllHistory()
    },
    /**
     * 异步提交搜索历史
     */
    onSaveHistory () {
      const key = 'index'
      let val = this.historyList.join(',')
      this.$api.history.saveHistory(key,val)
    },
    async loadAllHistory () {
      // 加载搜索历史
      await this.getMyAllHistory(null)
      this.historyList = this.history.record?.indexRec?.split(',') ?? this.historyList
    },
    async loadAllTagList () {
      const {data} = await this.$api.tags.getTagsByType(0)
      this.tagList = data
    },
    delHistory (idx) {
      this.historyList.splice(idx,1)
      // TODO: 异步删除
      this.onSaveHistory()
    },
    delAllHistory () {
      this.historyList.splice(0)
      // TODO: 异步删除
      this.onSaveHistory()
    },
    onSearch (val) {
      if (val.length>0) {
        // 记录搜索历史, 去重
        if (!this.historyList.includes(val)) {
          this.historyList.unshift(val)
          this.onSaveHistory()
        }
        this.keywords = val
        this.showSearchPage = false
        this.dynamicList = this.keywords !== ''
          ? this.dynamic.list.filter(dt =>
            dt.detail.content.match(this.keywords)
            || dt.detail.topicTags.match(this.keywords)) : []
      }
    },
    /**
     * page-router
     * @param url page-url
     */
    toPage (url) {
      uni.navigateTo({url})
    },
    inputFocus() {
      console.log('focus');
    },
    inputBlur() {
      console.log('blur')
      this.onSearch(this.keywords)
    },
    inputCancel() {
      console.log('cancel')
      this.showSearchPage = true
      this.keywords = ''
    }
  }
}
</script>

<style lang="scss">
@import "index";
@import "../index";
</style>