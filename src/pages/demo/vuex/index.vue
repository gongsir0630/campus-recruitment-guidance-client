<template>
  <view>
    <view class="title">
      <text>{{ title }}</text>
    </view>
    <view class="tc">
      原:<text>
        {{ num }}
      </text>
    </view>
    <view class="tc">
      双倍:<text>{{ doubleNum }}</text>
    </view>
    <view>
      <button @click="increaseNum(1)">同步+</button>
      <button @click="decreaseNum(1)">同步-</button>
      <button @click="asyncIncrease(1)">异步+</button>
      <button @click="asyncDecrease(1)">异步-</button>
    </view>
    <view class="tc">
      <text>每秒:{{ num }}次</text>
      <button @click="handleClick">疯狂点我</button>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      title: "vuex示例",
    };
  },
  computed: {
    ...mapState("test", ["num"]),
    ...mapGetters("test", ["doubleNum"]),
  },
  methods: {
    ...mapMutations("test", ["increaseNum", "decreaseNum"]),
    ...mapActions("test", ["asyncIncrease", "asyncDecrease"]),
    handleClick() {
      this.increaseNum(1);
      this.asyncDecrease(1);
    },
  },
};
</script>

<style scoped>
.title {
  text-align: center;
  padding: 20rpx;
}
.tc {
  text-align: center;
  font-size: 40rpx;
}
</style>
