import api from '@/api/index'

// 我的内容管理
const state = {
  content: {
    openId:'',
    publishNews:[],
    likeNews:[],
    collectNews:[],
    publishRecommendations:[],
    likeRecommendations:[],
    followMe:[],
    myFollow:[]
  }
}

const getters = {

}

const mutations = {
  setContent (state, payload) {
    if (payload) {
      state.content = payload
    }
  }
}

const actions = {
  getMyContent (context, payload) {
    return api.content
      .getMyContent()
      .then(res => {
        context.commit('setContent',
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
