import axios from 'axios-miniprogram'

const http = axios

// 请求base路径
// http.defaults.baseURL = 'http://127.0.0.1:8082'
http.defaults.baseURL = 'https://yzhelp.top'
http.defaults.headers = {
  // 'content-Type': 'application/json'
  'content-type':'application/x-www-form-urlencoded'
}

http.interceptors.request.use(
  config => {
    // 所有请求都携带token
    Object.assign(config.headers, {
      Authorization: uni.getStorageSync('token')
    })
    // 发送之前操作config
    return config
  },
  err => {
    // 处理错误
    return Promise.reject(err)
  }
)

/**
 * 响应拦截
 */
http.interceptors.response.use(
  response => {
    console.log(response)
    // 对拿到的数据做一些额外操作操作 (如无权限,直接跳转首页)
    const { code, errMsg } = response.data

    if (code !== 0) {
      if (code === 1000) {
        // TODO: 用户不存在，注册
        uni.showModal({
          title: '提示',
          content: errMsg,
          success: res => {
            if (res.confirm) {
              console.log('用户点击确定');
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
        return response.data
      } else if (errMsg) {
        uni.showToast({
          title: errMsg
        })
      }
      return Promise.reject(response.data)
    }
    // 返回前操作
    return response.data
  },
  err => {
    return Promise.reject(err)
  }
)

export default http
