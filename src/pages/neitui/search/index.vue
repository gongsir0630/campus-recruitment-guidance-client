<template>
  <view>
    <!-- 搜索 -->
    <!-- 顶部 -->
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right">搜索内推</block>
    </cu-custom>
    <!-- 搜索框 -->
    <view class="cu-bar bg-white search">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input @focus="inputFocus" @blur="inputBlur"
               :adjust-position="false" type="text"
               placeholder="搜索关键字或者职位标签"
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
          <h1>职位标签</h1>
          <view class="search-box">
            <view class='cu-tag radius bg-white search-tag'
                  v-for="(item,idx) in tagList" :key="idx" @tap.stop="onSearch(item.tagName)">
              {{ item.tagName }}
            </view>
          </view>
        </view>

      </view>
    </template>
    <template v-else>
      <view v-if="neiCardList.length>0">
        <view class="cu-card dynamic"
              v-for="(item,idx) in neiCardList"
              :key="idx"
              @tap="toDetail(`./detail/index?id=${item.id}`)">
          <view class="cu-item shadow">
            <view class="cu-list menu-avatar">
              <view class="cu-item">
                <view class="cu-avatar round lg">
                  <image class="cu-avatar lg round" :src="item.user.jobInfo.company.logo"/>
                </view>
                <view class="content flex-sub">
                  <view class="flex align-center justify-between">
                    <text class="text-orange text-lg">{{ item.user.jobInfo.company.name }}</text>
                    <text class='cu-tag text-white bg-blue light radius good-tag margin-left-xs'>{{ item.form }}</text>
                  </view>
                  <!-- 发布人信息 -->
                  <text class="text-sm">
                    {{ item.user.eduInfo.major+item.user.eduInfo.entrance+'级'+item.user.realName+'同学' }}
                  </text>
                </view>
              </view>
            </view>
            <view class="movecard-tag padding">
              <!-- 内容 -->
              <view class="text-content margin-bottom">
                {{ item.details.slice(0,30) }}
              </view>
              <view v-for="(tag,tid) in (item.positionTags || '').split(',').filter(t => t!=='')"
                    :key="tid"
                    class='cu-tag text-orange bg-orange light radius good-tag'>
                {{ tag }}
              </view>
            </view>
            <view v-for="(topic,pid) in item.topics"
                  :key="pid"
                  class="text-content">
              <text class="text-white bg-orange text-sm my-tag">#</text>
              <text>{{ topic }}</text>
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
      historyList: [],
      keywords: '',
      neiCardList: [],
    }
  },
  computed: {
    ...mapState('nt', ['nt']),
    ...mapState('history',['history'])
  },
  methods: {
    ...mapActions('history',['getMyAllHistory']),
    onShow () {
      this.loadAllTagList()
      this.loadAllHistory()
    },
    async loadAllTagList () {
      const {data} = await this.$api.tags.getTagsByType(1)
      this.tagList = data
    },
    /**
     * 异步提交搜索历史
     */
    onSaveHistory () {
      const key = 'nt'
      let val = this.historyList.join(',')
      this.$api.history.saveHistory(key,val)
    },
    async loadAllHistory () {
      // 加载搜索历史
      await this.getMyAllHistory(null)
      this.historyList = this.history.record?.ntRec?.split(',') ?? this.historyList
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
    onSearch(val) {
      if (val.length>0) {
        // 记录搜索历史, 去重
        if (!this.historyList.includes(val)) {
          this.historyList.unshift(val)
          this.onSaveHistory()
        }
        this.keywords = val
        this.showSearchPage = false
        this.neiCardList = this.keywords !== '' ? this.nt.list.filter(
          m => m.details.match(this.keywords)
            || m.positionTags.match(this.keywords)) : []
      }
    },
    /**
     * 详情
     * @param id
     */
    toDetail(id) {
      uni.navigateTo({url: `../detail/index?id=${id}`})
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