import api from '@/api/index'

// 公告信息
const state = {
  notice: {
    total: 1,
    list: [{
      id: 1,
      title: '柚子帮正式运营了',
      content: '柚子帮正式运营了',
      publishTime: '2021年04月29日16:32:08'
    }]
  }
}

const getters = {

}

const mutations = {
  setNoticeList (state, payload) {
    console.log(payload)
    if (payload) {
      const {total,list} = payload
      state.notice.list = list
      state.notice.total = total
    }
  }
}

const actions = {
  getNoticeList (context, payload) {
    return api.notice
      .getNoticeList()
      .then(res => {
        context.commit('setNoticeList',
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
