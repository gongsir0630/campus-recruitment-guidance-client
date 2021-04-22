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
        <image class="cu-avatar xl margin-left round" :src="avatar"></image>
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
        <picker @change="indexChange('major',$event)" :value="index" :range="majPicker">
          <view class="picker">{{majPicker[0]}}</view>
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
          <picker @change="indexChange('company',$event)" :value="companyIndex" :range="companyPicker">
            <view class="picker">{{companyPicker[companyIndex]}}</view>
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
import {mapState} from "vuex";
import {Gender} from "@/constants";
let wxUser = {
  avatar: '',
  nickName:'码之泪殇',
  gender: '男',
  realName: '龚涛',
  phoneNumber:'17361040630',
  email:'gongsir0630@gmail.com',
  profile:'个人简介'
}
let jobInfo = {
  department:'研发',
  jobTitle:'Java 研发',
  description:'经历描述',
}
let eduInfo = {
  schoolId:'',
  major:'',
  entrance:'',
  graduate:'',
  level:'',
  description:''
}
export default {
  data(){
    return{
      wxUser,
      eduInfo,
      jobInfo,
      // 选择器，部分需要从 api 初始化
      sexPicker:['男','女'],
      schPicker:[{
        id:1,
        name:'西南石油大学'
      },{
        id:2,
        name:'四川大学'
      }],
      majPicker:['计算机科学与技术','软件工程'],
      levelPicker:['本科','硕士','博士及以上'],
      companyPicker:[{
        id:1,
        name:'快手'
      },{
        id:2,
        name:'美团'
      }],
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
    ...mapState('user', ['avatar', 'nickname', 'gender']),
    sex() {
      this.genterIndex = this.gender-1;
      return this.gender === Gender.MALE ? '♂' : '♀'
    }
  },
  methods:{
    onLaunch () {
      this.userInfo.nickName = this.nickname
    },
    // 更新用户信息
    async toUpdate() {
      wxUser.avatar = this.avatar;
      wxUser.gender = this.sexPicker[this.genderIndex];

      eduInfo.major = this.majPicker[this.majIndex];
      eduInfo.level = this.levelPicker[this.levelIndex];
      eduInfo.schoolId = this.schPicker[this.schIndex].id;
      jobInfo.companyId = this.companyPicker[this.companyIndex].id;
      let userInfo = {
        wxUser,
        eduInfo,
        jobInfo
      }
      console.log(userInfo)
      const { code,errMsg,data } = await this.$api.user.updateUserInfo(userInfo)
      console.log(errMsg)
      if (code === 0) {
        uni.showToast({
          title:errMsg
        })
      }
    },
    // 选择器切换
    indexChange (type, e) {
      console.log(type+":"+e.target.value)
      console.log(typeof +e.target.value)
      switch (type) {
        case 'status':
          this.nowIndex = +e.target.value;
          break;
        case 'school':
          this.schIndex = +e.target.value;
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