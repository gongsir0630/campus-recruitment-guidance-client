import api from '@/api/index'

// 动态信息
const state = {
  dynamic: {
    total: 1,
    list: [{
      avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
      nickName: '码之泪殇',
      jobTitle:'快手 Java 研发线',
      major:'2017级计算机科学与技术',
      isLike:false,
      likeCount:199,
      collection:false,
      detail: {
        id:1,
        openId:'',
        content:'这是一条测试动态',
        imgUrl:'https://cdn.gongsir.club/blog/image/2021/04/221.jpg',
        topicTags:'',
        publishTime:'',
        likeList:'',
        collectionList:''
      }
    }]
  }
}

const getters = {

}

const mutations = {
  setDynamicList (state, payload) {
    console.log(payload)
    if (payload) {
      const {total,list} = payload
      state.dynamic.list = list
      state.dynamic.total = total
    }
  }
}

const actions = {
  getDynamicList (context, payload) {
    return api.dynamic
      .getDynamicList()
      .then(res => {
        context.commit('setDynamicList',
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
