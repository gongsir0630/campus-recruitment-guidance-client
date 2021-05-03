<template>
  <view>
    <!-- 导航 -->
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right">个人资料完善</block>
    </cu-custom>
    <!-- 信息完善 -->
    <view class="mine-info">
      <view class="cu-avatar xl round margin-left bg-red">
        <image class="cu-avatar xl margin-left round" :src="wxUser.avatar"></image>
      </view>
    </view>
    <!-- 设置信息 -->
    <form>
      <view class="cu-bar bg-white neitui-bar margin-top">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text>基本信息
        </view>
      </view>
      <view class="cu-form-group">
        <view class="title">昵称</view>
        <input name="input" v-model="wxUser.nickName"/>
      </view>
      <view class="cu-form-group">
        <view class="title">性别</view>
        <picker @change="indexChange('gender',$event)" :value="genderIndex" :range="sexPicker">
          <view class="picker">
            {{sexPicker[genderIndex]}}
          </view>
        </picker>
      </view>
      <view class="cu-form-group">
        <view class="title">真实姓名</view>
        <input name="input" v-model="wxUser.realName"/>
      </view>
      <view class="cu-form-group">
        <view class="title">手机号码</view>
        <input name="input" v-model="wxUser.phoneNumber"/>
        <view class="cu-capsule radius">
          <view class='cu-tag bg-blue '>
            +86
          </view>
          <view class="cu-tag line-blue">
            中国大陆
          </view>
        </view>
      </view>
      <view class="cu-form-group">
        <view class="title">邮箱</view>
        <input name="input" v-model="wxUser.email"/>
      </view>
      <view class="cu-bar bg-white neitui-bar margin-top">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text>当前状态
        </view>
      </view>
      <view class="cu-form-group">
        <view class="title">当前状态</view>
        <picker @change="indexChange('status',$event)" :value="nowIndex" :range="nowPicker">
          <view class="picker">{{nowPicker[nowIndex]}}</view>
        </picker>
      </view>
      <!-- 教育信息 -->
      <view class="cu-bar bg-white neitui-bar margin-top">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text>教育信息
        </view>
      </view>
      <view class="cu-form-group">
        <view class="title">学校名称</view>
        <picker @change="indexChange('school',$event)" :value="schIndex" :range="schPicker" range-key="name">
          <view class="picker">{{schPicker[schIndex].name}}</view>
        </picker>
      </view>
      <view class="cu-form-group">
        <view class="title">专业名称</view>
        <picker @change="indexChange('major',$event)" :value="majIndex" :range="majPicker">
          <view class="picker">{{majPicker[majIndex]}}</view>
        </picker>
      </view>
      <view class="cu-form-group">
        <view class="title">学历</view>
        <picker @change="indexChange('level',$event)" :value="levelIndex" :range="levelPicker">
          <view class="picker">{{levelPicker[levelIndex]}}</view>
        </picker>
      </view>
      <view class="cu-form-group">
        <view class="title">个人简介</view>
        <input name="input" v-model="wxUser.profile"/>
      </view>
      <!-- 工作信息, 根据当前状态动态显示 -->
      <template v-if="nowIndex===1">
        <view class="cu-bar bg-white neitui-bar margin-top">
          <view class="action">
            <text class="cuIcon-titles text-orange"></text>工作信息
          </view>
        </view>
        <view class="cu-form-group">
          <view class="title">公司名称</view>
          <picker @change="indexChange('company',$event)" :value="companyIndex" :range="companyPicker" range-key="name">
            <view class="picker">{{companyPicker[companyIndex].name}}</view>
          </picker>
        </view>
        <view class="cu-form-group">
          <view class="title">所在部门</view>
          <input name="input" v-model="jobInfo.department"/>
        </view>
        <view class="cu-form-group">
          <view class="title">职位名称</view>
          <input name="input" v-model="jobInfo.jobTitle"/>
        </view>
        <view class="cu-form-group">
          <view class="title">经历描述</view>
          <input name="input" v-model="jobInfo.description"/>
        </view>
      </template>
    </form>
    <!-- 更新 -->
    <view class="cu-bar btn-group margin-top">
      <button class="cu-btn bg-orange shadow-blur round lg" @click="toUpdate">更新信息</button>
    </view>
  </view>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {Gender} from "@/constants";

export default {
  data(){
    return{
      toLogin:false,
      // 选择器，部分需要从 api 初始化
      sexPicker:['男','女'],
      schPicker:[],
      majPicker:[],
      levelPicker:['本科','硕士','博士及以上'],
      companyPicker:[],
      nowPicker:['学生（提交教育信息）','工作（提交教育信息和工作信息）'],
      sexIndex:0,
      schIndex:0,
      majIndex:0,
      levelIndex:0,
      companyIndex:0,
      nowIndex:0,
      genderIndex:0
    }
  },
  computed: {
    ...mapState('user', ['wxUser','isLogin']),
    ...mapState('edu', ['eduInfo']),
    ...mapState('job', ['jobInfo']),
    sex() {
      this.genderIndex = this.wxUser.gender === '男' ? 0 : 1
      return this.wxUser.gender === Gender.MALE ? '♂' : '♀'
    }
  },
  methods:{
    ...mapActions('edu',['getEduInfoById']),
    ...mapActions('job',['getJobInfoById']),
    onLoad ({toLogin}) {
      // 是否自动登录
      this.toLogin = toLogin
      this.dataInit()
    },
    /**
     * 页面数据预拉取：学校、公司下拉列表
     */
    dataInit () {
      console.log("--->获取学校下拉列表<---")
      this.schPicker = this.$api.school.getSchoolList()
      console.log(this.schPicker)
      // 选中我的学校
      this.schPicker.forEach(sch => {
        if (this.eduInfo.schoolId === sch.id) {
          this.schIndex = this.schPicker.indexOf(sch)
        }
      })
      // 专业列表变化
      this.majPicker = this.schPicker[this.schIndex].majors

      console.log("--->获取公司下拉列表<---")
      this.companyPicker = this.$api.company.getCompanyList()
      console.log(this.companyPicker)
      // 选中我的公司
      this.companyPicker.forEach(com => {
        if (this.jobInfo.companyId === com.id)
          this.companyIndex = this.companyPicker.indexOf(com)
      })
    },
    // 更新用户信息
    async toUpdate() {
      this.wxUser.gender = this.sexPicker[this.genderIndex];

      this.eduInfo.major = this.majPicker[this.majIndex];
      this.eduInfo.level = this.levelPicker[this.levelIndex];
      this.eduInfo.schoolId = this.schPicker[this.schIndex].id;
      this.jobInfo.companyId = this.companyPicker[this.companyIndex].id;
      let userInfo = {
        wxUser: this.wxUser,
        eduInfo: this.eduInfo,
        jobInfo: this.jobInfo
      }
      console.log(userInfo)
      const { code,errMsg,data } = await this.$api.user.updateUserInfo(userInfo)
      console.log(errMsg)
      if (code === 0) {
        if (this.toLogin) {
          this.isLogin = false
        } else {
          uni.showToast({
            title:'信息更新成功'
          })
        }
      }
    },
    // 选择器切换
    indexChange (type, e) {
      switch (type) {
        case 'status':
          this.nowIndex = +e.target.value;
          break;
        case 'school':
          this.schIndex = +e.target.value;
          this.majPicker = this.schPicker[this.schIndex].majors
          break;
        case 'major':
          this.majIndex = +e.target.value;
          break;
        case 'level':
          this.levelIndex = +e.target.value;
          break;
        case 'company':
          this.companyIndex = +e.target.value;
          break;
        default:
          this.genderIndex = +e.target.value;
          break;
      }
    }
  }
}
</script>

<style lang="scss">
@import "index";
</style>