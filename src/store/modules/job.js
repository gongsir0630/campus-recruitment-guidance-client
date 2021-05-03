import api from '@/api/index'

// 工作信息
const state = {
  jobInfo: {
    id: 0,
    companyId:1,
    department:'',
    jobTitle:'',
    description:'',
    status:''
  }
}

const getters = {

}

const mutations = {
  setJobInfo (state, payload) {
    state.jobInfo = payload
  }
}

const actions = {
  getJobInfoById (context, payload) {
    return api.job
      .getJobInfoById(payload)
      .then(res => {
        context.commit('setJobInfo',
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
