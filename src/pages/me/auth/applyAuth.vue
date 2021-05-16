<template>
    <view>
      <cu-custom bgColor="#fa8c15" isBack="true">
        <block slot="back">返回</block>
        <block slot="right">信息认证</block>
      </cu-custom>

      <view class="text-content margin-left margin-right">
        <template v-if="type===0">
          <view class="text-content margin-top text-xxl">
            学校邮箱认证
          </view>
          <view class="text-content margin-top flex flex-direction">
            <view>
              请提交你的学校邮箱 (<text class="text-orange">{{ eduInfo.school.name }}</text>)
            </view>
            <view>
              点击邮件确认链接即可完成认证, 免审核即时生效奥~
            </view>
            <view>
              认证结果将以微信小程序订阅消息的形式下发给你~
            </view>
          </view>
          <view class="cu-form-group margin-top">
            <view class="title">学校邮箱</view>
            <input name="input" v-model="mail"/>
            <view class="cu-capsule radius">
              <view class="">
                {{ eduInfo.school.mailSuffix }}
              </view>
            </view>
          </view>
        </template>
        <template v-else>
          <view class="text-content margin-top text-xxl">
            公司邮箱认证
          </view>
          <view class="text-content margin-top flex flex-direction">
            <view>
              请提交你的公司邮箱 (<text class="text-orange">{{ jobInfo.company.name }}</text>)
            </view>
            <view>
              点击邮件确认链接即可完成认证, 免审核即时生效奥~
            </view>
            <view>
              认证结果将以微信小程序订阅消息的形式下发给你~
            </view>
          </view>
          <view class="cu-form-group margin-top">
            <view class="title">公司邮箱</view>
            <input name="input" v-model="mail"/>
            <view class="cu-capsule radius">
              <view class="">
                {{ jobInfo.company.mailSuffix }}
              </view>
            </view>
          </view>
        </template>

        <!-- 提交 -->
        <view class="cu-bar btn-group margin-top">
          <button class="cu-btn bg-black shadow-blur round lg" @tap="openSubMsg">发送认证邮件</button>
        </view>
      </view>

      <!-- 弹出面板 -->
      <van-action-sheet :show="isShowDialog" title="邮件已发送">
        <view class="flex flex-direction text-content text-gray margin-right margin-left">
          <text>认证邮件已发送，请点击邮件中的确认链接完成验证</text>
          <text>如未找到邮件，请在垃圾箱中查找</text>
          <text>认证通过之后，你会收到微信小程序通知</text>
          <text>认证过程中如有其它问题，请联系客服</text>
        </view>
        <view class="cu-bar btn-group margin-top margin-bottom">
          <button class="cu-btn bg-black shadow-blur round lg"
                  @tap="onClose">
            好，我知道了
          </button>
        </view>
      </van-action-sheet>
    </view>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {TEMPLATE_IDS} from "@/constants";

export default {
  data () {
    return {
      isShowDialog: false,
      type: 0,
      mail:''
    }
  },
  computed: {
    ...mapState('user',['wxUser']),
    ...mapState('edu',['eduInfo']),
    ...mapState('job',['jobInfo']),
  },
  methods:{
    ...mapActions('user',['setUserInfo']),
    openSubMsg () {
      wx.requestSubscribeMessage({
        tmplIds:TEMPLATE_IDS.auth_sub_id,
        success: (res) => {
          console.log(res)
          this.sendMail()
          this.isShowDialog = true
        }
      })
    },
    /**
     * 发送邮箱认证
     */
    sendMail () {
      console.log(this.type)
      console.log(typeof this.type)
      if (this.type === 0) {
        let fullMail = this.mail+this.eduInfo.school.mailSuffix
        this.$api.edu.sendMail(fullMail)
      } else {
        let fullMail = this.mail+this.jobInfo.company.mailSuffix
        this.$api.job.sendMail(fullMail)
      }
    },
    onClose () {
      this.isShowDialog = false
      uni.navigateBack({delta:1})
    },
    // 页面跳转
    toPage: (url) => {
      uni.navigateTo({url})
    },
    async loadUserInfo () {
      const {data} = await this.$api.user.getProfile()
      this.setUserInfo(data.userInfo)
    },
    onLoad ({type}) {
      this.loadUserInfo()
      this.type = +type
    }
  }
}
</script>

<style lang="scss">
@import "index";
</style>