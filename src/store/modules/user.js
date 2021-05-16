import store from '@/store/index'
const state = {
  token: uni.getStorageSync('token'),
  isLogin: false,
  wxUser: {
    openId: 'visitor',
    avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
    nickName: '游客',
    gender: '男',
    realName:'游客',
    phoneNumber:'',
    email:'',
    eduId: 0,
    jobId: 0,
    profile:'',
    eduInfo:{
      id: 0,
      openId:'',
      schoolId:1,
      major:'',
      entrance:'',
      graduate:'',
      level:'',
      description:'',
      status:'',
      school: {
        id:1,
        logo:'',
        name:'',
        majorList:'',
        mailSuffix:''
      }
    },
    jobInfo:{
      id: 0,
      openId:'',
      companyId:1,
      department:'',
      jobTitle:'',
      description:'',
      status:'',
      company: {
        id:1,
        logo:'',
        name:'',
        slogan:'',
        mailSuffix:''
      }
    }
  }
}

const mutations = {
  setToken (state, payload) {
    state.token = payload
    uni.setStorageSync('token',payload)
  },
  setLoginStatus (state, payload) {
    state.isLogin = payload
  },
  clearToken (state) {
    state.token = ''
    state.isLogin = false
  },
  setUserInfo (state, payload) {
    if (payload) {
      state.wxUser = payload
      store.commit('edu/setEduInfo',payload.eduInfo)
      store.commit('job/setJobInfo',payload.jobInfo)
    }
  },
  setWxUserInfo (state,payload) {
    if (payload) {
      state.wxUser.avatar = payload.avatar
      state.wxUser.nickName = payload.nickName
      state.wxUser.gender = payload.gender
    }
  }
}

const actions = {
  setWxUserInfo (context, payload) {
    context.commit('setWxUserInfo',payload)
  },
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
