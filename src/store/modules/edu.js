import api from '@/api/index'

// 教育信息
const state = {
  eduInfo:{
    id: 0,
    openId:'',
    schoolId:1,
    major:'',
    entrance:2017,
    graduate:2021,
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
  }
}

const getters = {

}

const mutations = {
  setEduInfo (state, payload) {
    if (payload) {
      state.eduInfo = payload
    }
  }
}

const actions = {
  getEduInfoById (context, payload) {
    return api.edu
      .getEduInfoById(payload)
      .then(res => {
        context.commit('setEduInfo',
          res.data)
      })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
