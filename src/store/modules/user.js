const state = {
  token: uni.getStorageSync('token'),
  isLogin: false,
  wxUser: {
    openId: 'visitor',
    avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
    nickName: '游客',
    gender: 1,
    realName:'游客',
    phoneNumber:'',
    email:'',
    eduId: 1,
    jobId: 1,
    profile:''
  }
}

const mutations = {
  setToken (state, payload) {
    state.token = payload
    uni.setStorageSync('token',payload)
    state.isLogin = true
  },
  setLoginStatus (state, payload) {
    state.isLogin = payload
  },
  clearToken (state) {
    state.token = ''
    state.toLogin = true
  },
  setUserInfo (state, payload) {
    const { openId, avatar, gender, nickName, realName, phoneNumber, email, eduId, jobId, profile } = payload
    state.wxUser.openId = openId
    state.wxUser.avatar = avatar
    state.wxUser.nickName = nickName
    state.wxUser.gender = gender
    state.wxUser.realName = realName
    state.wxUser.phoneNumber = phoneNumber
    state.wxUser.email = email
    state.wxUser.eduId = eduId
    state.wxUser.jobId = jobId
    state.wxUser.profile = profile
  }
}

const actions = {
  setUserInfo (context, payload) {
    context.commit('setUserInfo', payload)
  },
  setToken ({ commit }, payload) {
    commit('setToken', payload)
  },
  setLoginStatus (context, payload) {
    context.commit('setLoginStatus',payload)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
