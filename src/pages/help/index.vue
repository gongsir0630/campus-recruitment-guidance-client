<template>
  <view>
    <!-- 柚子帮 -->
    <cu-custom bgColor="#fff" isSearch="true" @topage="searchPage">
      <block slot="search">柚子帮</block>
    </cu-custom>
    <!-- 申请入口 -->
    <view class="banner" @tap="toApply">
      <Swiper :swiperList="swiperList"></Swiper>
    </view>
    <!-- 人脉卡片 -->
    <view>
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
  </view>
</template>

<script>
import Swiper from '@/components/Swiper';
import {mapState,mapActions} from 'vuex';

export default {

  data() {
    return {
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
        topics:'[{"key":"测试1","val":"测试 111"}]',
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
      }]
    }
  },
  computed: {
    ...mapState('member',['member']),
    ...mapState('user',['wxUser'])
  },
  components: {
    Swiper
  },
  methods: {
    ...mapActions('member',['getMemberList']),
    /**
     * 页面加载
     */
    onShow () {
      this.loadMember()
    },
    /**
     * 异步加载成员信息
     */
    async loadMember () {
      await this.getMemberList(null)
      this.renCardList = this.member.list.filter(member=>member.certificationStatus==='认证通过')
    },
    toApply() {
      uni.navigateTo({url: './apply/index'})
    },
    /**
     * 详情
     * @param id
     */
    toDetail (id) {
      uni.navigateTo({url: `./detail/index?id=${id}`})
    },
    /**
     * 页面跳转
     */
    searchPage () {
      uni.navigateTo({url:'./search/index'})
    },
    /**
     * id 定位 idx
     * @param id
     * @returns {number}
     */
    id2Idx (id) {
      let idx = -1
      for (let item of this.member.list) {
        if (item.id === id) {
          idx = this.member.list.indexOf(item)
          break
        }
      }
      return idx
    }
  }
}
</script>

<style lang="scss">
@import "index";
</style>
