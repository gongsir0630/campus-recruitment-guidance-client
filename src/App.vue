<script>
import {mapActions, mapState} from "vuex";

export default {
  computed: {
    ...mapState('user', ['wxUser','isLogin','token']),
  },
  methods: {
    ...mapActions('user', ['setLoginStatus', 'setUserInfo']),
    ...mapActions('edu',['getEduInfoById']),
    ...mapActions('job',['getJobInfoById']),
    /**
     * 自动登录
     * @returns {Promise<void>}
     */
    async autoLogin() {
      const {code, data, errMsg} = await this.$api.user.getProfile()
      // 获取用户信息
      const userInfo = data.userInfo
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
  },
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    console.log('App Show')
    // token有效则自动登录
    console.log("token:"+this.token)
    if (this.token && !this.isLogin) {
      this.autoLogin()
    }
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style>
/*每个页面公共css */
/* vant - weapp */
@import '/wxcomponents/@vant/weapp/dist/common/index.wxss';

/* color ui */
@import 'colorui/main.css';
@import 'colorui/icon.css';

/* 自定义 */
@import "./public.scss";
</style>
