import api from '@/api/index'

// 教育信息
const state = {
  eduInfo:{
    id: 0,
    schoolId:1,
    major:'',
    entrance:'',
    graduate:'',
    level:'',
    description:'',
    status:''
  }
}

const getters = {

}

const mutations = {
  setEduInfo (state, payload) {
    state.eduInfo = payload
    // state.id = payload.id
    // state.schoolId = payload.schoolId
    // state.major = payload.major
    // state.entry = payload.entrance
    // state.graduate = payload.graduate
    // state.level = payload.level
    // state.description = payload.description
    // state.status = payload.status
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
