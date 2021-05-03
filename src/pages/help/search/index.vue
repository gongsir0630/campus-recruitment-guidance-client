<template>
  <view>
    <!-- 搜索 -->
    <!-- 顶部 -->
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right"></block>
    </cu-custom>
    <!-- 搜索框 -->
    <view class="cu-bar bg-white search">
      <view class="search-form round">
        <text class="cuIcon-search"></text>
        <input @focus="inputFocus" @blur="inputBlur"
               :adjust-position="false" type="text"
               placeholder="姓名或者专业"
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
        <view class="search-history">
          <view class="search-history-box">
            <h1>
              搜索历史
              <text class="cuIcon-deletefill history-delete"></text>
            </h1>
          </view>
          <view class="search-box">
            <view class='cu-tag round bg-white search-tag'
                  v-for="(item,idx) in historyList" :key="idx">
              <text @tap.stop="onSearch(item.name)">{{ item.name }}</text>
              <text class="cuIcon-close close-tag"></text>
            </view>
          </view>
        </view>
        <!-- 推荐标签 -->
        <view class="search-tags">
          <h1>领域标签</h1>
          <view class="search-box">
            <view class='cu-tag radius bg-white search-tag'
                  v-for="(item,idx) in tagList" :key="idx" @tap.stop="onSearch(item.name)">
              {{ item.name }}
            </view>
          </view>
        </view>

      </view>
    </template>
    <template v-else>
      <!-- 人物卡片 -->
      <!-- 人脉卡片 -->
      <view v-if="renCardList.length>0">
        <view class="cu-card dynamic" v-for="(item,idx) in renCardList"
              :key="idx"
              @tap="toDetail(item.member.id)">
          <view class="cu-item shadow">
            <view class="cu-list menu-avatar">
              <view class="cu-item">
                <view class="cu-avatar round lg">
                  <image class="cu-avatar lg round" :src="item.member.photo"/>
                </view>
                <view class="content flex-sub">
                  <view class="text-orange">{{ item.realName }}</view>
                  <!-- 多个头衔使用 join 函数处理 -->
                  <text class="text-sm">
                    {{ (item.member.title || '').split(",").join(" | ") }}
                  </text>
                </view>
              </view>
            </view>
            <view class="movecard-tag padding flex flex-wrap">
              <view v-for="(tag,tIdx) in item.member.fieldTags.split(',')"
                    v-if="tag!==''"
                    :key="tIdx"
                    class='cu-tag text-orange bg-orange light radius good-tag'>
                {{ tag }}
              </view>
            </view>
            <view v-for="(topic,index) in JSON.parse(item.member.topics)"
                  v-if="topic!==''"
                  :key="index"
                  class="text-content">
              <text class="text-white bg-orange text-sm my-tag">#</text>
              <text>{{ topic.key }}</text>
            </view>
          </view>
        </view>
      </view>
      <van-empty v-else description="未找到相关数据源~~"/>
    </template>
  </view>
</template>

<script>
import {mapState} from "vuex";

export default {
  data() {
    return {
      showSearchPage: true,
      tagList: [
        {
          id: 1,
          name: '标签标签标签标签标签标签标签'
        },
        {
          id: 2,
          name: '标签标签标签标签'
        },
        {
          id: 3,
          name: '标签标签标签标签标签标签标签'
        },
        {
          id: 4,
          name: '标签标签'
        }
      ],
      historyList: [
        {id: 1, name: '测试'},
        {id: 1, name: '测试测试'},
        {id: 1, name: '9'},
        {id: 1, name: '10'},
      ],
      hotList: [
        {id: 1, name: '热门搜索1'},
        {id: 2, name: '热门搜索2'},
        {id: 3, name: '热门搜索3'},
        {id: 4, name: '热门搜索4'},
        {id: 5, name: '热门搜索5'}
      ],
      keywords: '',
      renCardList: [],
    }
  },
  computed: {
    ...mapState('member', ['member']),
  },
  methods: {
    onSearch(val) {
      this.keywords = val
      this.showSearchPage = false
      this.renCardList = this.keywords !== '' ? this.member.list.filter(
        m => m.realName.match(this.keywords)
          || m.realName.match(this.keywords)
          || m.major.match(this.keywords)) : []
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