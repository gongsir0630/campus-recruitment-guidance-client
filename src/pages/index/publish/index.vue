<template>
  <view>
    <!-- 自定义导航栏 -->
    <cu-custom bgColor="#f0f0f0" isBack="true">
      <block slot="back">取消</block>
      <block slot="navname">柚子帮-校招指导服务平台</block>
    </cu-custom>

    <!-- 内容输入 -->
    <van-cell-group>
      <van-field
        :value="content"
        type="textarea"
        placeholder="这一刻想分享点什么~"
        :autosize="{ minHeight: 200 }"
        :border=true
        maxlength="100"
        show-word-limit=true
        auto-focus=true
        @change="inputContent"
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
        话题标签
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
        <text class="text-content text-gray">试试添加一些话题标签吧~~</text>
      </template>
    </view>
    <view class="cu-form-group justify-center">
      <button class="cu-btn bg-gradual-blue shadow-blur round sm"
              @tap="onAddTag">
        添加标签
      </button>
    </view>
    <!-- 发布按钮 -->
    <view class="cu-bar btn-group margin-top">
      <button class="cu-btn bg-orange shadow-blur round lg"
              :disabled="content.length===0"
              @tap="save">
        发布
      </button>
    </view>

    <!-- 弹出面板 -->
    <van-action-sheet :show="isShowDialog" title="选择话题标签" @click-overlay="onClose" @close="onClose">
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
import {ChooseImage, DelImg, ViewImage} from "@/utils/uploadFile";

export default {
  data() {
    return {
      isShowDialog: false,
      imgList: [],
      content: '',
      myTagList: [],
      allTagList: [{
        id: 9,
        tagName: '近日动态'
      }, {
        id: 10,
        tagName: '失物招领'
      }]
    }
  },
  methods: {
    onShow () {
      this.loadAllTagList()
    },
    async loadAllTagList () {
      const {data} = await this.$api.tags.getTagsByType(0)
      this.allTagList = data
    },
    async save () {
      let info = {
        content: this.content,
        imgUrl: this.imgList[0] ? this.imgList[0] : '',
        topicTags: (this.myTagList || []).join(",")
      }
      console.log(info)
      // 异步发布
      const {code,errMsg,data} = await this.$api.dynamic.save(info)
      if (code === 0) {
        uni.navigateBack({
          delta:1
        })
      }
    },
    inputContent (e) {
      this.content = e.detail
    },
    onClose () {
      this.isShowDialog = false
    },
    deleteTag (id) {
      let idx = this.myTagList.indexOf(id)
      this.myTagList.splice(idx,1)
      console.log(this.myTagList)
    },
    onAddTag () {
      this.isShowDialog = true
    },
    /**
     * 标签复选变更
     */
    CheckboxChange(e) {
      this.myTagList = e.detail.value.map(Number)
      console.log(this.myTagList)
    },
    getTagNameById (id) {
      for (const tag of this.allTagList) {
        if (tag.id === id ) return tag.tagName
      }
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

<style lang="scss">
.publish-content {
}
</style>