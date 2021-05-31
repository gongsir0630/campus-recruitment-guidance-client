<template>
  <view>
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right">加入柚子帮</block>
    </cu-custom>
    <form>
      <!-- 展示信息 -->
      <view class="cu-form-group margin-top">
        <view class="title">当前状态</view>
        <picker @change="indexChange" :value="statusIndex" :range="statusPicker">
          <view class="picker">
            {{ statusPicker[statusIndex] }}
          </view>
        </picker>
      </view>
      <!-- 校友信息 -->
      <view class="cu-bar bg-white neitui-bar margin-top">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text>
          认证信息
        </view>
      </view>
      <view class="cu-form-group">
        <view class="title">教育信息</view>
        <text>{{ eduInfo.school.name }}-{{ eduInfo.major }}-{{ wxUser.realName }}</text>
      </view>
      <view v-if="statusIndex === 1" class="cu-form-group">
        <view class="title">工作信息</view>
        <text>{{ jobInfo.company.name }}-{{ jobInfo.jobTitle }}</text>
      </view>
      <!-- 头衔 -->
      <view class="cu-bar bg-white neitui-bar margin-top">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text>
          社会工作
        </view>
      </view>
      <view v-for="(item,idx) in showTitle"
            :key="idx"
            class="cu-form-group">
        <view class="title">曾担任</view>
        <input :placeholder="item" v-model="inputTitle[idx]" name="input"/>
      </view>

      <!-- 按钮 -->
      <view class="padding flex align-center justify-center">
        <button class="cu-btn bg-gradual-blue sm" @tap="changShowTitleId('add')">添加</button>
        <button class="cu-btn bg-gradual-blue sm margin-left" @tap="changShowTitleId('sub')">删除</button>
      </view>
      <!-- 擅长领域标签 -->
      <view class="cu-bar bg-white neitui-bar margin-top">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text>
          领域标签
        </view>
      </view>
      <checkbox-group class="block" @change="CheckboxChange">
        <view class="cu-form-group" v-for="(item,idx) in tagsList" :key="idx">
          <view class="title">{{ item.tagName }}</view>
          <checkbox :value="item.tagName"
                    :checked="selectedList.includes(item.tagName)">
          </checkbox>
        </view>
      </checkbox-group>
      <!-- 个人简述 -->
      <view class="cu-bar bg-white neitui-bar margin-top">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text>
          个人简述（请提供联系方式）
        </view>
      </view>
      <view class="cu-form-group">
				<textarea maxlength="-1" :disabled="modalName!=null"
                  placeholder="个人简述"
                  v-model="myInfo.introduction">
        </textarea>
      </view>
      <!-- 擅长话题 -->
      <view v-for="(topic,idx) in showTopic"
            :key="idx">
        <view class="cu-bar bg-white neitui-bar margin-top">
          <view class="action">
            <text class="cuIcon-titles text-orange"></text>
            擅长话题 {{ idx + 1 }}
          </view>
        </view>
        <view class="cu-form-group">
          <view class="title">话题题目</view>
          <input :placeholder="topic.key" v-model="inputTopic[idx*2]" name="input"/>
        </view>
        <view class="cu-form-group">
            <textarea maxlength="-1" :disabled="modalName!=null"
                      :placeholder="topic.val"
                      v-model="inputTopic[idx*2+1]"
            ></textarea>
        </view>
      </view>
      <!-- 按钮 -->
      <view class="padding flex align-center justify-center">
        <button class="cu-btn bg-gradual-blue sm" @tap="changShowTopicId('add')">添加</button>
        <button class="cu-btn bg-gradual-blue sm margin-left" @tap="changShowTopicId('sub')">删除</button>
      </view>
      <!-- 上传真实头像 -->
      <view class="cu-bar bg-white neitui-bar margin-top">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text>
          上传真实头像
        </view>
      </view>
      <view class="cu-form-group">
        <view class="grid col-4 grid-square flex-sub">
          <view class="bg-img" v-for="(item,idx) in imgList" :key="idx" @tap="viewImg" :data-url="imgList[0]">
            <image :src="item" mode="aspectFill"></image>
            <view class="cu-tag bg-red" @tap.stop="deleteImg" :data-index="idx">
              <text class='cuIcon-close'></text>
            </view>
          </view>
          <view class="solids" @tap="chooseImg" v-if="imgList.length<1">
            <text class='cuIcon-cameraadd'></text>
          </view>
        </view>
      </view>
    </form>
    <view class="padding flex flex-direction">
      <button class="cu-btn bg-yellow lg" @tap="savaOrUpdate">提交更新</button>
    </view>
    <!-- vant-weapp 轻提示 -->
    <van-toast id="van-toast"/>
  </view>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Toast from '@/wxcomponents/@vant/weapp/dist/toast/toast'
import {ChooseImage, ViewImage, DelImg} from '@/utils/uploadFile'

export default {
  data() {
    return {
      optionId: 0,
      options: ['加入柚子帮', '成员信息更新'],
      showTopicId: 1,
      showTitleId: 1,
      statusIndex: 0,
      statusPicker: ['学生', '工作'],
      imgList: [],
      modalName: null,
      textareaAValue: '',
      tagsList: [],
      topicsList: [{
        key: '例:校招答疑',
        val: '例:校招答疑相关指导'
      }, {
        key: '例:转专业',
        val: '例:转专业相关指导'
      }, {
        key: '例:开放实验',
        val: '例:开放实验相关指导'
      }],
      titleList: ['例:计算机协会会长', '例:计科院学生会主席', '例:小米实习生'],
      inputTitle: [],
      inputTopic: [],
      selectedList: []
    };
  },
  computed: {
    ...mapState('user', ['wxUser']),
    ...mapState('edu', ['eduInfo']),
    ...mapState('job', ['jobInfo']),
    ...mapState('member', ['myInfo']),
    showTitle() {
      return this.titleList.slice(0, this.showTitleId)
    },
    showTopic() {
      return this.topicsList.slice(0, this.showTopicId)
    }
  },
  methods: {
    ...mapActions('member', ['getMyInfo']),
    /**
     * 提交/更新信息
     */
    async savaOrUpdate() {
      this.myInfo.title = this.inputTitle.slice(0, this.showTitleId).join(",")
      let updateTopics = []
      for (let i = 0; i < this.inputTopic.length; i += 2) {
        updateTopics[i / 2] = {
          key: this.inputTopic[i],
          val: this.inputTopic[i + 1]
        }
      }
      this.myInfo.topics = JSON.stringify(updateTopics.slice(0, this.showTopicId))
      this.myInfo.photo = this.imgList[0] ? this.imgList[0] : this.wxUser.avatar

      // 省略user属性
      const { user,...newInfo } = this.myInfo

      console.log(newInfo)

      try {
        const {code, errMsg, data} = await this.$api.member.saveOrUpdateInfo(newInfo)
        if (code === 0) {
          Toast.success({
            message: '信息更新成功',
            forbidClick: true,
          })
          setTimeout(()=>{
            uni.navigateBack({delta:1})
          },2000)
        }
      } catch (err) {
        console.log("更新失败")
      }
    },
    changShowTitleId(ops) {
      if (ops === 'add') {
        if (this.showTitleId === 3) {
          uni.showToast({
            icon: 'none',
            title: '最多只能添加 3 项'
          })
          return;
        }
        this.showTitleId++
        console.log(this.showTitleId)
        console.log(this.showTitle)
      } else if (ops === 'sub') {
        if (this.showTitleId === 1) {
          uni.showToast({
            icon: 'none',
            title: '请至少提交 1 项'
          })
          return;
        }
        this.showTitleId--
      }
    },
    changShowTopicId(ops) {
      if (ops === 'add') {
        if (this.showTopicId === 3) {
          uni.showToast({
            icon: 'none',
            title: '最多只能添加 3 项'
          })
          return;
        }
        this.showTopicId++
        console.log(this.showTopicId)
      } else if (ops === 'sub') {
        if (this.showTopicId === 1) {
          uni.showToast({
            icon: 'none',
            title: '请至少提交 1 项'
          })
          return;
        }
        this.showTopicId--
      }
    },
    /**
     * 当前状态变更
     */
    indexChange(e) {
      this.statusIndex = +e.detail.value
      this.myInfo.currentState = this.statusPicker[this.statusIndex]
    },
    /**
     * 标签复选变更
     */
    CheckboxChange(e) {
      this.myInfo.fieldTags = e.detail.value.join(",")
      console.log(this.myInfo.fieldTags)
    },
    chooseImg() {
      ChooseImage(this)
    },
    deleteImg(e) {
      DelImg(e, this)
    },
    viewImg(e) {
      ViewImage(e, this)
    },
    /**
     * 从后台获取领域标签列表
     */
    async getTagList() {
      this.$api.tags
        .getTagsByType(2)
        .then(res => {
          console.log(res.data)
          this.tagsList = res.data
        })
    },
    /**
     * 加载我的申请信息
     */
    async loadMyInfo() {
      await this.getMyInfo(null)
      console.log(this.myInfo)
      // todo: 获取教育认证状态
      if (this.eduInfo.status !== '认证通过') {
        uni.showModal({
          title: '提示',
          content: '请先完成教育认证~',
          confirmText: '我知道了',
          showCancel: false,
          success: () => {
            uni.navigateBack({delta: 1})
          }
        })
      } else {
        // 修改模式
        this.optionId = 1
        // 当前状态
        if (this.myInfo.currentState === "工作")
          this.statusIndex = 1
        // 头衔数据
        this.myInfo.title = this.myInfo.title !== '' ? (this.myInfo.title || '').split(',') : ['']
        this.showTitleId = this.myInfo.title.length
        for (let i = 0; i < this.showTitleId; i++) {
          this.titleList[i] = this.myInfo.title[i]
        }
        this.inputTitle = this.titleList.slice(0, this.showTitleId)
        // 话题数据格式化
        this.myInfo.topics = JSON.parse(this.myInfo.topics)
        console.log(this.myInfo.topics)
        this.showTopicId = this.myInfo.topics.length
        for (let i = 0; i < this.showTopicId; i++) {
          this.topicsList[i] = this.myInfo.topics[i]
        }
        console.log(this.topicsList)
        for (let i = 0; i < this.showTopicId; i++) {
          this.inputTopic[i * 2] = this.topicsList[i].key
          this.inputTopic[i * 2 + 1] = this.topicsList[i].val
        }
        // 头像数据
        this.imgList[0] = this.myInfo.photo === '' ? this.wxUser.avatar : this.myInfo.photo
        // 领域标签选中数据
        this.selectedList = (this.myInfo.fieldTags || '').split(',')
      }
    },
    /**
     * 监听页面加载
     */
    onLoad({oid}) {
      this.optionId = oid
      this.loadMyInfo()
      this.getTagList()
    }
  }
}
</script>

<style>
.cu-form-group .title {
  min-width: calc(4em + 15px);
}
</style>
