<template>
  <view class="Func">
    <cu-custom bgColor="#fa8c15">
      <block slot="navname">个人中心</block>
    </cu-custom>
    <view class="mine-info">
      <!-- 登录信息 -->
      <view class="mine-info">
        <view class="cu-avatar xl margin-left round">
<!--          <open-data type="userAvatarUrl"></open-data>-->
           <image class="cu-avatar xl round" :src="wxUser.avatar"></image>
        </view>
        <button
          v-if="showLogin"
          class="cu-btn margin-left"
          open-type="getUserInfo"
          @click="handleGetUserInfo"
        >
          获取头像昵称
        </button>
        <view v-else class="info">
          你好，
          <!-- <open-data type="userNickName"></open-data> -->
          <text>{{wxUser.nickName}}</text>
          <!-- TODO:性别用颜色加以区分 -->
          <!-- <text class="sex">{{ sex }}</text> -->
        </view>
      </view>
    </view>

    <!-- 功能菜单 -->
    <view class="func-box margin-top">
      <view class="my_line" @tap="toPage('./profile/index')">
        <view class="func-item">
          <text class="cuIcon-friend my_icon"></text>
        </view>
        <text>个人信息管理</text>
      </view>
      <view class="my_line" @tap="toPage('./auth/index')">
        <view class="func-item">
          <text class="cuIcon-settings my_icon"></text>
        </view>
        <text>认证管理</text>
      </view>
      <view class="my_line" @tap="toPage('./content/index')">
        <view class="func-item">
          <text class="cuIcon-text my_icon"></text>
        </view>
        <text>内容管理</text>
      </view>
    </view>

    <view class="cu-list menu sm-border card-menu margin-top" >
      <view class="cu-item arrow">
        <button class="cu-btn content" open-type="contact">
          <text class="cuIcon-btn text-olive"></text>
          <text class="text-grey">客服咨询</text>
        </button>
      </view>
      <view class="cu-item arrow">
        <button class="cu-btn content" @tap="toPage('./feedBack/index')">
          <text class="cuIcon-btn text-olive"></text>
          <text class="text-grey">留言与反馈</text>
        </button>
      </view>
      <view class="cu-item arrow">
        <button class="cu-btn content" @tap="toPage('./about/index')">
          <text class="cuIcon-btn text-olive"></text>
          <text class="text-grey">关于柚子帮</text>
        </button>
      </view>
      <view class="cu-item arrow">
        <button class="cu-btn content" @tap="toPage('./joinUs/index')">
          <text class="cuIcon-btn text-olive"></text>
          <text class="text-grey">联系我们</text>
        </button>
      </view>
    </view>
    <!-- vant-weapp 轻提示 -->
    <van-toast id="van-toast" />
  </view>
</template>

<script>
import {wxLogin, getUserProfile} from '@/utils/userUtil'
import {mapState, mapActions} from 'vuex'
import {Gender} from '@/constants'
import Toast from '@/wxcomponents/@vant/weapp/dist/toast/toast'

export default {
  data() {
    return {
      showLogin: true
    }
  },
  computed: {
    ...mapState('user', ['wxUser','isLogin','token']),
    sex() {
      return this.wxUser.gender === Gender.MALE ? '♂' : '♀'
    }
  },
  methods: {
    // 引入 user 命名空间下的方法
    ...mapActions('user', ['setToken', 'setUserInfo','setWxUserInfo','setLoginStatus']),
    ...mapActions('edu', ['getEduInfoById']),
    ...mapActions('job', ['getJobInfoById']),
    /**
     * 自动登录
     * @returns {Promise<void>}
     */
    async autoLogin() {
      const {data} = await this.$api.user.getProfile()
      // 获取用户信息
      const userInfo = data?.userInfo
      this.setUserInfo(userInfo)
      // eduInfo
      await this.getEduInfoById(this.wxUser.eduId)
      // jobInfo
      await this.getJobInfoById(this.wxUser.jobId)
      // 设置登录状态
      this.setLoginStatus(true)
      console.log("login success, 欢迎你: "+this.wxUser.nickName)
      console.log(this.wxUser)
    },
    /**
     *
     */
    onShow () {
      console.log("current loginStatus: "+this.isLogin)
      console.log("app token: "+this.token)
      // token有效则自动登录
      this.showLogin = !(this.token && this.isLogin && this.wxUser.openId!=='visitor');
      if (this.token && !this.isLogin) {
        this.autoLogin()
        this.showLogin = false
      }
    },
    /**
     * 页面路由跳转
     * @param url 页面路径
     */
    toPage(url) {
      uni.navigateTo({url})
    },
    /**
     * 授权获取基本信息并登录
     */
    handleGetUserInfo() {
      uni.showLoading({
        title: '登陆中',
        mask: true
      })
      // 只能获取匿名的无用信息,换用open-data展示头像与昵称
      getUserProfile()
        .then(async ([err, res]) => {
          // 临时获取用户的微信公开信息
          let {nickName, gender, avatarUrl} = res?.userInfo
          console.log(gender)
          // 性别转换
          gender = gender === Gender.MALE ? '男' : '女'
          console.log('用户信息: ' + nickName)
          // 将微信基本信息存入vuex
          this.setWxUserInfo({
            nickName: nickName,
            gender,
            avatar: avatarUrl
          })
          // 登录
          wxLogin().then(async ([err, res]) => {
            try {
              // 自动注册登陆
              const {code, data, errMsg} = await this.$api.user.login(
                res.code
              )
              // 获取 token
              const token = data.token
              this.setToken(token)
              // 首次登录，跳转注册
              if (code === 1000) {
                // TODO: 注册
                uni.navigateTo({
                  url: `./profile/index?toLogin=${true}`,
                })
              } else {
                // 用户已存在，直接登录获取信息
                // 获取用户信息
                const userInfo = data.userInfo
                // 将完整用户信息存入vuex
                this.setUserInfo(userInfo)
                // eduInfo
                await this.getEduInfoById(this.wxUser.eduId)
                // jobInfo
                await this.getJobInfoById(this.wxUser.jobId)
                // 设置登录状态
                this.setLoginStatus(true)
                Toast.success({
                  message: '登录成功',
                  forbidClick: true
                })
                this.showLogin = false
              }
            } catch (error) {
              Toast.fail(` 登陆失败\n${error.msg}`)
              this.showLogin = true
            } finally {
              uni.hideLoading()
            }
          })
        })
        .catch((err) => {
          uni.hideLoading()
          this.showLogin = true
        })
      setTimeout(() => {
        uni.hideLoading()
      }, 5000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./index";
</style>