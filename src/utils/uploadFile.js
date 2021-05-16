/**
 * 选择图片
 */
export function ChooseImage(that) {
  uni.chooseImage({
    count: 1, //默认9
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], //从相册选择
    success: async (res) => {
      that.imgList = res.tempFilePaths
      // 上传到服务器
      await uni.uploadFile({
        url: 'https://yzhelp.top/public/upload', //仅为示例，非真实的接口地址
        filePath: that.imgList[0],
        name: 'file',
        success: (uploadFileRes) => {
          let data = JSON.parse(uploadFileRes.data)
          console.log(data.data.url)
          that.imgList[0] = data.data.url
        },
        fail: (error) => {
          that.imgList[0] = ''
        }
      });
    }
  });
}

/**
 *  图片预览
 */
export function ViewImage(e,that) {
  console.log(e)
  uni.previewImage({
    urls: that.imgList,
    current: e.currentTarget.dataset.url
  });
}

/**
 * 删除已选图片
 */
export function DelImg(e,that) {
  uni.showModal({
    title: '提示',
    content: '确定要删除这张图片吗？',
    cancelText: '取消',
    confirmText: '确定',
    success: res => {
      if (res.confirm) {
        that.imgList.splice(e.currentTarget.dataset.index, 1)
      }
    }
  })
}