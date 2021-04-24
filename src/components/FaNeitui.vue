<template>
  <view>
    <!-- 发内推 -->
    <form>
      <view class="cu-form-group">
        <view class="title">公司名称</view>
        <input placeholder="公司名称" name="input"/>
      </view>
      <view class="cu-form-group margin-top">
        <view class="title">内推形式</view>
        <picker @change="PickerChange" :value="index" :range="picker">
          <view class="picker">
            {{ picker[0] }}
          </view>
        </picker>
      </view>
      <view class="cu-form-group margin-top">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput"
                  placeholder="内推详情"></textarea>
      </view>
      <!-- 相关图片 -->
      <view class="cu-bar bg-white margin-top">
        <view class="action">
          相关图片
        </view>
        <view class="action">
          {{ imgList.length }}/4
        </view>
      </view>
      <view class="cu-form-group">
        <view class="grid col-4 grid-square flex-sub">
          <view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
            <image :src="imgList[index]" mode="aspectFill"></image>
            <view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
              <text class='cuIcon-close'></text>
            </view>
          </view>
          <view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
            <text class='cuIcon-cameraadd'></text>
          </view>
        </view>
      </view>
      <!-- 职位标签 -->
      <view class="cu-bar bg-white margin-top">
        <view class="action">
          职位标签
        </view>
      </view>
      <checkbox-group class="block" @change="CheckboxChange">
        <view class="cu-form-group" v-for="item in tagsList" :key="item.id">
          <view class="title">{{ item.name }}</view>
          <checkbox value="前端"></checkbox>
        </view>
      </checkbox-group>
    </form>
    <view class="padding flex flex-direction">
      <button class="cu-btn bg-orange lg">发布</button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      index: -1,
      picker: ['实习', '校招', '实习/校招'],
      imgList: [],
      modalName: null,
      textareaAValue: '',
      tagsList: [
        {id: '1', name: '前端'},
        {id: '2', name: 'Java'},
        {id: '3', name: 'hr'},
        {id: '4', name: '测试'}
      ]
    };
  },
  methods: {
    PickerChange(e) {
      this.index = e.detail.value
    },
    CheckboxChange(e) {
      console.log(e.detail.value);
    },
    ChooseImage() {
      uni.chooseImage({
        count: 4, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {
          if (this.imgList.length != 0) {
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
    getTagsList() {
      //获得职位标签
    }
  },
  created() {
    this.getTagsList();
  }
}
</script>

<style>
.cu-form-group .title {
  min-width: calc(4em + 15px);
}

</style>
