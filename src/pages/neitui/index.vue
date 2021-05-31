<template>
  <view>
    <cu-custom bgColor="#fa8c15" isOrder="true" @chtype="changType">
      <block slot="order">{{ typename }}</block>
    </cu-custom>

    <!-- 内推卡片 -->
    <!-- 看内推 -->
    <KanNeitui v-if="neiType"
               :neiCardList="showRecommendationList">
    </KanNeitui>
    <!-- 发内推 -->
    <FaNeitui v-if="!neiType" :allTagList="showAllTags"></FaNeitui>
  </view>
</template>

<script>

import KanNeitui from '@/pages/neitui/KanNeitui';
import FaNeitui from '@/pages/neitui/FaNeitui';
import {mapActions, mapState} from "vuex";

export default {
  components: {
    KanNeitui,
    FaNeitui
  },
  data() {
    return {
      typename: '发内推',
      neiType: true,
      allTagList:[]
    }
  },
  computed: {
    ...mapState('user',['wxUser']),
    ...mapState('nt',['nt']),
    ...mapState('job',['jobInfo']),
    /**
     * 计算属性处理显示数据
     */
    showRecommendationList () {
      return this.nt.list
    },
    showAllTags () {
      return this.allTagList
    }
  },
  methods: {
    ...mapActions('nt',['getRecommendationList']),
    /**
     * 页面显示事件监听
     */
    onShow () {
      this.loadRecommendations()
      this.loadAllTagList()
      console.log(this.nt)
    },
    /**
     *  加载职位标签
     */
    async loadAllTagList() {
      // type = 1 表示加载职位标签
      const {data} = await this.$api.tags.getTagsByType(1)
      this.allTagList = data
    },
    /**
     * 异步加载内推数据
     * @returns {Promise<void>}
     */
    async loadRecommendations () {
      await this.getRecommendationList(0)
    },
    /**
     * 顶部切换事件
     */
    changType() {
      if (this.typename === '发内推') {
        if (this.jobInfo.status === '认证通过') {
          this.neiType = false;
          this.typename = '看内推';
        } else {
          uni.showModal({
            title:'提示',
            content:'请先完成工作信息认证',
            showCancel:false
          })
        }
      } else if (this.typename === '看内推') {
        this.neiType = true;
        this.typename = '发内推';
      }
      // 刷新数据
      this.loadRecommendations()
      this.loadAllTagList()
    }
  }
}
</script>

<style lang="scss">

</style>