const state = {
  token: uni.getStorageSync('token'),
  avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
  nickname: '码之泪殇',
  gender: 1
}

const mutations = {
  setToken (state, payload) {
    state.token = payload
    uni.setStorageSync('token',payload)
  },
  clearToken (state) {
    state.token = ''
  },
  setUserInfo (state, payload) {
    const { avatar, nickname, gender } = payload
    state.avatar = avatar
    state.nickname = nickname
    state.gender = gender
  }
}

const actions = {
  setUserInfo (context, payload) {
    context.commit('setUserInfo', payload)
  },
  setToken ({ commit }, payload) {
    commit('setToken', payload)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
