<template>
  <view v-if="item">
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right">柚子帮成员详情</block>
    </cu-custom>
    <!-- 内推详情 -->
    <!-- 头像 -->
    <view class="topbg">
      <view class="cu-avatar my-avatar">
        <image class="cu-avatar lg round" :src="item.member.photo"/>
      </view>
    </view>
    <!-- 详情 -->
    <view class="zhidetail">
      <view class="content">
        <view class="flex align-center">
          <view class="text-xxl">
            <view class="action">
              <text class="cuIcon-titles text-orange"></text>{{ fullName }}
            </view>
          </view>
          <view class='cu-tag text-white bg-blue light radius good-tag margin-left-xs'>校友</view>
        </view>
        <!-- 多个头衔使用 join 函数处理 -->
        <view class="text-lg margin-top margin-left">
          {{ (item.member.title || '').split(",").join(" | ") }}
        </view>
        <!-- 领域标签 -->
        <view class="margin-top text-lg margin-left">
          <view v-for="(tag,idx) in (item.member.fieldTags || '').split(',')"
                :key="idx"
                class='cu-tag text-orange bg-orange light radius margin-bottom'>
            {{ tag }}
          </view>
        </view>
        <!-- 话题 -->
        <view class="margin-top">
          <view class="text-xxl">
            <view class="action">
              <text class="cuIcon-titles text-orange"></text>擅长话题
            </view>
          </view>
          <view v-for="(topic,idx) in JSON.parse(item.member.topics)"
                :key="idx"
                class="text-content margin-left margin-top">
            <view>
              <text class="text-white bg-yellow text-sm my-tag">#</text>
              <text class="margin-left-xs">{{ topic.key }}</text>
            </view>
            <view>{{ topic.val }}</view>
          </view>
        </view>
        <!-- 个人自述 -->
        <view class="margin-top">
          <view class="text-xxl">
            <view class="action">
              <text class="cuIcon-titles text-orange"></text>柚子自述
            </view>
          </view>
          <view class="text-content margin-left margin-top">
            <view>
              {{item.member.introduction}}
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 关注分享 -->
    <view class="padding flex align-center justify-center">
      <button class="cu-btn bg-gradual-orange round lg" @tap="likeThisMember">
        {{isFollow?'取关':'关注'}}
      </button>
      <button class="cu-btn bg-orange round lg margin-left" @tap="">分享</button>
    </view>
  </view>
</template>

<script>
import {mapState} from "vuex";

export default {
  data() {
    return {
      item: {
        companyName:"请先完成职位认证",
        grade:"2017",
        major:"计科",
        member:{
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
          topics:'[{"key":"测试1","val":"测试 111"}]'
        },
        realName:"龚涛",
        selectStatus:"工作"
      },
      isFollow: false
    }
  },
  computed: {
    ...mapState('member',['member']),
    ...mapState('user',['wxUser']),
    fullName () {
      return this.item.realName
    }
  },
  methods: {
    async likeThisMember () {
      console.log(`点赞柚子帮成员: ${this.item.member.id}`)
      await this.$api.member.like(this.item.member.id)
      if (!this.isFollow) {
        uni.showToast({
          title: "已关注"
        })
      } else {
        uni.showToast({
          title: "已取消关注"
        })
      }
      this.isFollow = !this.isFollow
    },
    onLoad ({id}) {
      // 类型转换，坑
      id = +id
      console.log("查看成员详情: "+id)
      for (let dt of this.member.list) {
        if (dt.member.id === id)
          this.item = dt
      }
      console.log(this.wxUser.openId)
      console.log(this.item)
      this.isFollow = (this.item.member.likeList || '').split(',').includes(this.wxUser.openId)
      console.log(this.isFollow)
    }
  }
}
</script>

<style lang="scss">
@import "index";
</style>