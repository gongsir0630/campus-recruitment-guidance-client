import http from '../../utils/http'

/**
 * 用户注册
 * @param userInfo 小程序用户信息
 */
function updateUserInfo (userInfo) {
  return http.post('wx/user/registry',{
    wxUser: userInfo.wxUser,
    eduInfo: userInfo.eduInfo,
    jobInfo: userInfo.jobInfo
  },{
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
  })
}

/**
 * 用户登录
 * @param code 小程序临时 code
 */
function login (code) {
  return http.post('/wx/user/login', {
    code
  })
}

export default {
  updateUserInfo,
  login
}