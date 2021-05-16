<template>
  <view>
    <!-- 搜索 -->
    <!-- 顶部 -->
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right">搜索成员</block>
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
          <h1>领域标签</h1>
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
      <!-- 人物卡片 -->
      <!-- 人脉卡片 -->
      <view v-if="renCardList.length>0">
        <view class="cu-card dynamic" v-for="(item,idx) in renCardList"
              :key="idx"
              @tap="toDetail(item.id)">
          <view class="cu-item shadow">
            <view class="cu-list menu-avatar">
              <view class="cu-item">
                <view class="cu-avatar round lg">
                  <image class="cu-avatar lg round" :src="item.photo"/>
                </view>
                <view class="content flex-sub">
                  <view class="text-orange">{{ item.user.realName }}</view>
                  <!-- 多个头衔使用 join 函数处理 -->
                  <text class="text-sm">
                    {{ (item.title || '').split(",").join(" | ") }}
                  </text>
                </view>
              </view>
            </view>
            <view class="movecard-tag padding flex flex-wrap">
              <view v-for="(tag,tIdx) in item.fieldTags.split(',')"
                    v-if="tag!==''"
                    :key="tIdx"
                    class='cu-tag text-orange bg-orange light radius good-tag'>
                {{ tag }}
              </view>
            </view>
            <view v-for="(topic,index) in JSON.parse(item.topics)"
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
import {mapActions, mapState} from "vuex";

export default {
  data() {
    return {
      showSearchPage: true,
      tagList: [
        {
          id: 1,
          tagName: '标签标签标签标签标签标签标签'
        },
      ],
      historyList: ['码之泪殇'],
      keywords: '',
      renCardList: [{
        applyTime:"2021-04-27",
        certificationStatus:"待审核",
        currentState:"工作",
        fieldTags:"考研保研,校招答疑,简历指导,岗位内推,学科竞赛,校园社团,技术咨询",
        id:4,
        introduction:"测试测试",
        likeCount:1,
        likeList:"olAW-4vIdX8DTkzftHveDWIlR4zU",
        openId:"olAW-4vIdX8DTkzftHveDWIlR4zU",
        photo:"https://cdn.yzhelp.top/campus-recruitment-guidance/visitor/d640f58c-50c5-40f1-a252-36bd8e1f44a9.png",
        title:"计算机协会会长",
        topics:"",
        user:{
          openId: 'visitor',
          avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
          nickName: '游客',
          gender: '男',
          realName:'游客',
          phoneNumber:'',
          email:'',
          eduId: 0,
          jobId: 0,
          profile:'',
          eduInfo:{
            id: 0,
            schoolId:1,
            major:'',
            entrance:'',
            graduate:'',
            level:'',
            description:'',
            status:'',
            school: {
              id:1,
              logo:'',
              name:'',
              majorList:'',
              mailSuffix:''
            }
          },
          jobInfo:{
            id: 0,
            openId:'',
            companyId:1,
            department:'',
            jobTitle:'',
            description:'',
            status:'',
            company: {
              id:1,
              logo:'',
              name:'',
              slogan:'',
              mailSuffix:''
            }
          }
        }
      }],
    }
  },
  computed: {
    ...mapState('member', ['member']),
    ...mapState('history',['history']),
  },
  methods: {
    ...mapActions('history',['getMyAllHistory']),
    onShow () {
      this.loadAllTagList()
      this.loadAllHistory()
    },
    /**
     * 异步提交搜索历史
     */
    onSaveHistory () {
      const key = 'member'
      let val = this.historyList.join(',')
      this.$api.history.saveHistory(key,val)
    },
    async loadAllHistory () {
      // 加载搜索历史
      await this.getMyAllHistory(null)
      this.historyList = this.history.record?.memberRec?.split(',') ?? this.historyList
    },
    async loadAllTagList () {
      const {data} = await this.$api.tags.getTagsByType(2)
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
    onSearch(val) {
      if (val.length > 0) {
        // 记录搜索历史, 去重
        if (!this.historyList.includes(val)) {
          this.historyList.unshift(val)
          this.onSaveHistory()
        }
        this.keywords = val
        this.showSearchPage = false
        this.renCardList = this.keywords !== '' ? this.member.list.filter(
          m => m.user.realName.match(this.keywords)
            || m.user.eduInfo.major.match(this.keywords)
            || m.title.match(this.keywords)
            || m.fieldTags.match(this.keywords)) : []
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