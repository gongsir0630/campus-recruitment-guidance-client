import api from '@/api/index'

// 我的内容管理
const state = {
  nt: {
    total: 0,
    list: [{
      details:'快手实习',
      form:'实习',
      id:1,
      openId:'olAW-4vIdX8DTkzftHveDWIlR4zU',
      positionTags:'前端开发',
      publishTime:'2021-05-03',
      imgUrl:'',
      user:{
        openId: 'visitor',
        avatar: 'https://thirdqq.qlogo.cn/qqapp/1110061270/E0B4163FDCD19C3791B49B64EDB9F688/100',
        nickName: '游客',
        gender: '男',
        realName:'游客',
        phoneNumber:'',
        email:'',
        eduId: 0,
        jobId: 0,
        profile:'',
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
        },
        jobInfo:{
          id: 0,
          openId:'',
          companyId:1,
          department:'',
          jobTitle:'',
          description:'',
          status:'',
          company: {
            id:1,
            logo:'',
            name:'',
            slogan:'',
            mailSuffix:''
          }
        }
      }
    }],
  }
}

const getters = {

}

const mutations = {
  setNtList (state, payload) {
    console.log(payload)
    if (payload) {
      state.nt.list = payload
      state.nt.total = state.nt.list.length
    }
  }
}

const actions = {
  getRecommendationList (context, payload) {
    return api.recommend
      .getRecommendationList(payload)
      .then(res => {
        context.commit('setNtList',
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
