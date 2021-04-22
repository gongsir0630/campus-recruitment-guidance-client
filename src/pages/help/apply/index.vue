<template>
  <view>
    <cu-custom bgColor="#fa8c15" isBack="true">
      <block slot="back">返回</block>
      <block slot="right">加入柚子帮</block>
    </cu-custom>
    <form>
      <!-- 校友信息 -->
      <view class="cu-bar bg-white neitui-bar margin-top">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text>基本信息
        </view>
      </view>
      <view class="cu-form-group">
        <view class="title">姓名</view>
        <input placeholder="姓名" name="input" v-model="myInfo.realName"/>
      </view>
      <view class="cu-form-group">
        <view class="title">专业</view>
        <input placeholder="专业" name="input" v-model="myInfo.major"/>
      </view>
      <view class="cu-form-group">
        <view class="title">年级</view>
        <input placeholder="年级" name="input"/>
      </view>
      <!-- 当前状态 -->
      <view class="cu-form-group margin-top">
        <view class="title">当前状态</view>
        <picker @change="indexChange" :value="statusIndex" :range="statusPicker">
          <view class="picker">
            {{ statusPicker[statusIndex] }}
          </view>
        </picker>
      </view>
      <!-- 所在公司: 当前状态为工作才显示 -->
      <view v-if="statusIndex === 1" class="cu-form-group">
        <view class="title">所在公司</view>
        <input placeholder="所在公司" name="input"/>
      </view>
      <!-- 头衔 -->
      <view class="cu-bar bg-white neitui-bar margin-top">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text>头衔
        </view>
      </view>
      <view class="cu-form-group">
        <view class="title">头衔</view>
        <input placeholder="头衔" name="input"/>
      </view>
      <!-- 擅长领域标签 -->
      <view class="cu-bar bg-white neitui-bar margin-top">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text>领域标签
        </view>
      </view>
      <checkbox-group class="block" @change="CheckboxChange">
        <view class="cu-form-group" v-for="item in tagsList" :key="item.id">
          <view class="title">{{ item.name }}</view>
          <checkbox :value="item.name"></checkbox>
        </view>
      </checkbox-group>
      <!-- 个人简述 -->
      <view class="cu-bar bg-white neitui-bar margin-top">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text>个人简述（请提供联系方式）
        </view>
      </view>
      <view class="cu-form-group">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput"
                  placeholder="个人简述"></textarea>
      </view>
      <!-- 擅长话题 -->
      <view class="cu-bar bg-white neitui-bar margin-top">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text>擅长话题
        </view>
      </view>
      <view class="cu-form-group">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput2"
                  placeholder="擅长话题"></textarea>
      </view>
      <!-- 上传真实头像 -->
      <view class="cu-bar bg-white neitui-bar margin-top">
        <view class="action">
          <text class="cuIcon-titles text-orange"></text>上传真实头像
        </view>
      </view>
      <view class="cu-form-group">
        <view class="grid col-4 grid-square flex-sub">
          <view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[0]">
            <image :src="imgList[0]" mode="aspectFill"></image>
            <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
              <text class='cuIcon-close'></text>
            </view>
          </view>
          <view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
            <text class='cuIcon-cameraadd'></text>
          </view>
        </view>
      </view>
    </form>
    <view class="padding flex flex-direction">
      <button class="cu-btn bg-yellow lg">提交更新</button>
    </view>
  </view>
</template>

<script>
let myInfo = {
  realName:'龚涛',
  major:'计算机科学与技术',
  grade:'2017',
  selectStatus:['学生','工作'],
  companyName:'快手',
  member: {
    currentState:'工作',
    title:['计算机协会会长']
  }
}
export default {
  data() {
    return {
      myInfo,

      statusIndex: 0,
      statusPicker: ['学生', '工作'],

      imgList: [],
      modalName: null,
      textareaAValue: '',
      tagsList: [
        {id: '1', name: '考研保研'},
        {id: '2', name: '考研保研'},
        {id: '3', name: '考研保研'},
        {id: '4', name: '考研保研'},
        {id: '1', name: '考研保研'},
        {id: '2', name: '考研保研'},
        {id: '3', name: '考研保研'},
        {id: '4', name: '考研保研'}
      ]
    };
  },
  methods: {
    indexChange (e) {
      this.statusIndex = +e.detail.value
    },
    CheckboxChange(e) {
      console.log(e.detail.value);
    },
    ChooseImage() {
      uni.chooseImage({
        count: 1, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          if (this.imgList.length !== 0) {
            this.imgList = this.imgList.concat(res.tempFilePaths)
          } else {
            this.imgList = res.tempFilePaths
          }
        }
      });
    },
    ViewImage(e) {
      uni.previewImage({
        urls: this.imgList,
        current: e.currentTarget.dataset.url
      });
    },
    DelImg(e) {
      uni.showModal({
        title: '提示',
        content: '确定要删除这张图片吗？',
        cancelText: '取消',
        confirmText: '确定',
        success: res => {
          if (res.confirm) {
            this.imgList.splice(e.currentTarget.dataset.index, 1)
          }
        }
      })
    },
    textareaAInput(e) {
      this.textareaAValue = e.detail.value
    },
    textareaAInput2(e) {
      this.textareaAValue2 = e.detail.value
    },
    /**
     * 从后台获取领域标签列表
     */
    getTagList () {
    }
  },
  created() {
    this.getTagList();
  }
}
</script>

<style>
.cu-form-group .title {
  min-width: calc(4em + 15px);
}
</style>
