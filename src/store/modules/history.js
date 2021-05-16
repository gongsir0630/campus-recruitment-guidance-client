import api from '@/api/index'

// 工作信息
const state = {
  history: {
    openId:'',
    keyword:null,
    subscribe:'',
    record: {
      indexRec:null,
      ntRec:null,
      memberRec:null
    }
  }
}

const getters = {

}

const mutations = {
  setHistory(state, payload) {
    if (payload) {
      state.history = payload
    }
  }
}

const actions = {
  getMyAllHistory (context, payload) {
    return api.history
      .getAllHistory()
      .then(res => {
        context.commit('setHistory',
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
