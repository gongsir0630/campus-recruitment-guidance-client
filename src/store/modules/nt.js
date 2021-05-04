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
    const {openId
      ,publishNews,likeNews,collectNews
      ,publishRecommendations,likeRecommendations
      ,followMe,myFollow} = payload
    state.content.openId = openId

    state.content.publishNews = (publishNews || '').split(',')
    state.content.likeNews = (likeNews || '').split(',')
    state.content.collectNews = (collectNews || '').split(',')

    state.content.publishRecommendations = (publishRecommendations || '').split(',')
    state.content.likeRecommendations = (likeRecommendations || '').split(',')
    state.content.followMe = (followMe || '').split(',')
    state.content.myFollow = (myFollow || '').split(',')
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
