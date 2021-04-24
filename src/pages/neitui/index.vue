<template>
  <view>
    <cu-custom bgColor="#fa8c15" isOrder="true" @chtype="changType">
      <block slot="order">{{ typename }}</block>
    </cu-custom>

    <!-- 内推卡片 -->
    <!-- 看内推 -->
    <KanNeitui v-if="neiType"></KanNeitui>
    <!-- 发内推 -->
    <FaNeitui v-if="!neiType"></FaNeitui>
  </view>
</template>

<script>

import KanNeitui from '@/components/KanNeitui';
import FaNeitui from '@/components/FaNeitui';

export default {
  components: {
    KanNeitui,
    FaNeitui
  },
  data() {
    return {
      typename: '看内推',
      neiType: true
    }
  },
  methods: {
    changType() {
      if (this.typename === '发内推') {
        this.neiType = true;
        this.typename = '看内推';
      } else if (this.typename === '看内推') {
        this.neiType = false;
        this.typename = '发内推';
      }
    }
  }
}
</script>

<style lang="scss">

</style>