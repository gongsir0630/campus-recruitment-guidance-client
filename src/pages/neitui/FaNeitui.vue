<template>
  <view>
    <form>
      <!-- 发内推 -->
      <view class="cu-form-group">
        <view class="title">公司名称</view>
        <text>{{ jobInfo.company.name }}</text>
      </view>
      <view class="cu-form-group margin-top">
        <view class="title">内推形式</view>
        <picker @change="indexChange" :value="index" :range="formPicker">
          <view class="picker">
            {{ formPicker[index] }}
          </view>
        </picker>
      </view>
      <!-- 内容输入 -->
      <van-cell-group>
        <van-field
          :value="details"
          type="textarea"
          placeholder="请简要描述一下内推岗位信息以及内推方式吧~"
          :autosize="{ minHeight: 200 }"
          :border=true
          maxlength="100"
          show-word-limit=true
          auto-focus=true
          @change="inputDetails"
        />
      </van-cell-group>
      <!-- 图片上传 -->
      <view class="cu-bar bg-white">
        <view class="action">
          要不来一张图片？
        </view>
        <view class="action">
          {{ imgList.length }}
        </view>
      </view>
      <!-- 图片预览 -->
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

      <!-- 添加标签选择 -->
      <view class="cu-bar bg-white margin-top">
        <view class="action">
          职位标签
        </view>
      </view>
      <view class="cu-form-group justify-start">
        <template v-if="myTagList.length>0">
          <view v-for="(tagId,idx) in myTagList"
                :key="idx"
                class='cu-tag text-orange bg-orange light radius margin-bottom'>
            {{ '#' + getTagNameById(tagId) }}
            <text class="cuIcon-close close-tag" @tap="deleteTag(tagId)"></text>
          </view>
        </template>
        <template v-else>
          <text class="text-content text-gray">试试添加一些职位标签吧~~</text>
        </template>
      </view>
      <view class="cu-form-group justify-center">
        <button class="cu-btn bg-gradual-blue shadow-blur round sm"
                @tap="onAddTag">
          添加标签
        </button>
      </view>
    </form>
    <view class="padding flex flex-direction">
      <button class="cu-btn bg-orange lg"
              :disabled="details.length===0"
              @tap="save">
        发布
      </button>
    </view>

    <!-- 弹出面板 -->
    <van-action-sheet :show="isShowDialog" title="选择职位标签" @click-overlay="onClose" @close="onClose">
      <checkbox-group class="block" @change="CheckboxChange">
        <view class="cu-form-group" v-for="(item,idx) in allTagList" :key="idx">
          <view class="title">{{ item.tagName }}</view>
          <checkbox :value="item.id"
                    :checked="myTagList.includes(item.id)">
          </checkbox>
        </view>
      </checkbox-group>

      <view class="cu-bar btn-group margin-top margin-bottom">
        <button class="cu-btn bg-orange shadow-blur round lg"
                @tap="onClose">
          完成
        </button>
      </view>
    </van-action-sheet>
  </view>
</template>

<script>
import {mapActions, mapState} from "vuex";
import {ChooseImage, DelImg, ViewImage} from "@/utils/uploadFile";

export default {
  props: {
    allTagList: {
      type: Array,
      default:[{
        id: 11,
        tagName: '前端开发'
      }, {
        id: 12,
        tagName: '校招内推'
      }]
    },
  },
  data() {
    return {
      isShowDialog: false,
      imgList: [],
      myTagList: [],
      details: '',
      index: 0,
      formPicker: ['实习', '校招', '实习/校招'],
    }
  },
  computed: {
    ...mapState('user', ['wxUser']),
    ...mapState('job', ['jobInfo'])
  },
  methods: {
    ...mapActions('nt',['getRecommendationList']),
    /**
     * 异步发布
     */
    async save() {
      let info = {
        form: this.formPicker[this.index],
        details: this.details,
        imgUrl: this.imgList[0] ? this.imgList[0] : '',
        positionTags: (this.myTagList || []).join(",")
      }
      console.log(info)
      // 异步发布
      const {code,errMsg,data} = await this.$api.recommend.save(info)
      if (code === 0) {
        // 清空数据
        this.index = 0
        this.details = ''
        this.imgList = []
        this.myTagList = []
        uni.showToast({
          title:'信息发布成功~',
          icon:'success'
        })
        this.getRecommendationList(0)
      }
    },
    /**
     * 当前内推详情
     * @param e
     */
    inputDetails(e) {
      this.details = e.detail
    },
    onClose() {
      this.isShowDialog = false
    },
    deleteTag(id) {
      let idx = this.myTagList.indexOf(id)
      this.myTagList.splice(idx, 1)
      console.log(this.myTagList)
    },
    onAddTag() {
      this.isShowDialog = true
    },
    /**
     * 标签复选变更
     */
    CheckboxChange(e) {
      this.myTagList = e.detail.value.map(Number)
      console.log(this.myTagList)
    },
    getTagNameById(id) {
      for (const tag of this.allTagList) {
        if (tag.id === id) return tag.tagName
      }
    },
    indexChange(e) {
      this.index = +e.detail.value
    },
    chooseImg() {
      ChooseImage(this)
    },
    deleteImg(e) {
      DelImg(e, this)
    },
    viewImg(e) {
      ViewImage(e, this)
    }
  }
}
</script>

<style>
.cu-form-group .title {
  min-width: calc(4em + 15px);
}

</style>
