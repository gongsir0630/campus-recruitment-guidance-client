<template>
  <view>
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right">问题反馈</block>
    </cu-custom>
    <!-- 当前状态 -->
    <view class="neidetail">
      <view class="cu-list menu-avatar">
        <view class="cu-item">
          <!-- 头像 -->
          <image class="cu-avatar lg margin-left round" :src="wxUser.avatar"></image>
          <view class="content flex-sub margin-left">
            <!-- 用户昵称 -->
            <view>{{ wxUser.nickName }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="cu-form-group">
      <view class="title">反馈类型</view>
      <picker @change="pickerChg" :value="index" :range="picker" placeholder="">
        <view class="picker">
          {{ picker[index] ? picker[index] : '请选择类型' }}
        </view>
      </picker>
    </view>
    <view class="cu-form-group">
          <textarea maxlength="-1"
                    v-model="feedBack.content"
                    placeholder="有什么问题可以反馈给我们奥~~">
          </textarea>
    </view>
    <view class="cu-bar bg-white margin-top">
      <view class="action">
        图片上传
      </view>
      <view class="action">
        {{ imgList.length }}
      </view>
    </view>
    <view class="cu-form-group">
      <view class="grid col-4 grid-square flex-sub">
        <view class="bg-img" v-for="(item,index) in imgList"
              :key="index" @tap="viewImg" :data-url="imgList[index]">
          <image :src="item" mode="aspectFill"></image>
          <view class="cu-tag bg-red" @tap.stop="deleteImg" :data-index="index">
            <text class='cuIcon-close'></text>
          </view>
        </view>
        <view class="solids" @tap="chooseImg" v-if="imgList.length<1">
          <text class='cuIcon-cameraadd'></text>
        </view>
      </view>
    </view>
    <view class="cu-bar btn-group margin-top">
      <button class="cu-btn bg-orange shadow-blur round lg" @tap="save">提交</button>
    </view>
  </view>
</template>

<script>
import {mapState} from 'vuex'
import {ChooseImage, DelImg, ViewImage} from "@/utils/uploadFile";

export default {
  data() {
    return {
      feedBack:{
        type: '',
        content: '',
        picUrl: ''
      },
      picker: ['BUG 提交', '留言'],
      imgList: [],
      index: 0
    }
  },
  computed: {
    ...mapState('user', ['wxUser'])
  },
  methods: {
    /**
     * 提交反馈
     */
    async save () {
      this.feedBack.picUrl = (this.imgList || '').join(',')
      this.feedBack.type = this.picker[this.index]
      console.log(this.feedBack)
      try {
        const {code,errMsg,data } = await this.$api.feedback.addFeedBack(this.feedBack)
        if (code === 0) {
          uni.showToast({
            title:'提交成功, 感谢你的反馈和建议',
            icon:'success'
          })
          // todo: 页面刷新
        }
      } catch (err) {
        console.log(err)
        console.log("更新失败")
      }
    },
    pickerChg(e) {
      this.index = +e.target.value
      this.feedBack.type = this.picker[this.index]
    },
    chooseImg () {
      ChooseImage(this)
    },
    deleteImg (e) {
      DelImg(e,this)
    },
    viewImg (e) {
      ViewImage(e,this)
    },
  }
}
</script>

<style lang="scss">

</style>