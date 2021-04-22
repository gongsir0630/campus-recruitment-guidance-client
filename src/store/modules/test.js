const state = {
  num: 0
}

const getters = {
  doubleNum: state => {
    return state.num * 2
  }
}

const mutations = {
  increaseNum (state, payload) {
    state.num += payload
  },
  decreaseNum (state, payload) {
    state.num -= payload
  },
}

const actions = {
  asyncIncrease (context, payload) {
    setTimeout(() => {
      context.commit('increaseNum', payload)
    }, 1000)
  },
  asyncDecrease (context, payload) {
    setTimeout(() => {
      context.commit('decreaseNum', payload)
    }, 1000)
  }
}
export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
