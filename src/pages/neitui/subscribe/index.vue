<template>
  <view>
    <!-- 自定义导航栏 -->
    <cu-custom bgColor="#f0f0f0" isBack="true">
      <block slot="back">取消</block>
      <block slot="navname">柚子帮-内推订阅</block>
    </cu-custom>

    <!-- 添加订阅标签 -->
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
        <text class="text-content text-gray">订阅喜欢的职位标签吧~~</text>
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
              :disabled="subStatus"
              @tap="sendMsg">
        订阅
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

import {TEMPLATE_IDS} from '@/constants'
import {mapActions, mapState} from "vuex";

export default {
  data() {
    return {
      isShowDialog: false,
      myTagList: [],
      allTagList: [],
      subStatus:true
    }
  },
  computed: {
    ...mapState('history',['history']),
  },
  methods: {
    ...mapActions('history',['getMyAllHistory']),
    onShow () {
      this.loadAllTagList()
      this.loadAllHistory()
    },
    async loadAllHistory () {
      // 加载搜索历史
      await this.getMyAllHistory(null)
      this.myTagList = this.history.subscribe?.split(',').map(Number)
    },
    async loadAllTagList () {
      const {data} = await this.$api.tags.getTagsByType(1)
      this.allTagList = data
    },
    /**
     * 订阅
     */
    sendMsg () {
      wx.requestSubscribeMessage({
        tmplIds:TEMPLATE_IDS.nt_sub_id,
        success: (res) => {
          // TODO: 保存订阅记录
          console.log(res)
          this.save()
        }
      })
    },
    save () {
      const key = 'subscribe'
      let val = this.myTagList.join(',')
      console.log(this.myTagList)
      this.$api.history.saveHistory(key,val)
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
      this.subStatus = this.myTagList.length===0
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
      this.subStatus = this.myTagList.length===0
    },
    getTagNameById (id) {
      for (const tag of this.allTagList) {
        if (tag.id === id ) return tag.tagName
      }
    },
  }
}
</script>

<style lang="scss">
.publish-content {
}
</style>