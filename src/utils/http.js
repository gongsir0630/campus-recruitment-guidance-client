import axios from 'axios-miniprogram'

const http = axios

// 请求base路径
http.defaults.baseURL = 'http://yzhelp.test.utools.club/'
// http.defaults.baseURL = 'https://yzhelp.top'
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

    // 部分功能需要登录才能访问
    if (code === 401) {
      uni.showModal({
        title:'提示',
        content:'你还没有登录奥~',
        showCancel:false
      })
      return Promise.reject(errMsg)
    }
    // 返回前操作
    return response.data
  },
  err => {
    // 访问出错,500
    console.log(err)
    uni.showModal({
      title:'提示',
      content:'出错了，请联我们~',
      showCancel:false
    })
    return Promise.reject(err)
  }
)

export default http
