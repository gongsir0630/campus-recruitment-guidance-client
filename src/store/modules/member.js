import api from '@/api/index'

// 动态信息
const state = {
  myInfo: {
    applyTime:'',
    certificationStatus:'',
    currentState:'',
    fieldTags:"",
    id:-1,
    introduction:"",
    likeCount:0,
    likeList:'',
    openId:'',
    photo:'',
    title:'',
    topics:'[{"key":"","val":""}]',
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
        schoolId:1,
        major:'',
        entrance:'',
        graduate:'',
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
  },
  member: {
    total: 0,
    list: [{
      applyTime:"2021-04-27",
      certificationStatus:"待审核",
      currentState:"工作",
      fieldTags:"考研保研,校招答疑,简历指导,岗位内推,学科竞赛,校园社团,技术咨询",
      id:4,
      introduction:"测试测试",
      likeCount:1,
      likeList:"olAW-4vIdX8DTkzftHveDWIlR4zU",
      openId:"olAW-4vIdX8DTkzftHveDWIlR4zU",
      photo:"https://cdn.yzhelp.top/campus-recruitment-guidance/visitor/d640f58c-50c5-40f1-a252-36bd8e1f44a9.png",
      title:"计算机协会会长",
      topics:"",
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
          entrance:'',
          graduate:'',
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
    }]
  }
}

const getters = {

}

const mutations = {
  setMemberList (state, payload) {
    console.log(payload)
    if (payload) {
      const {total,list} = payload
      state.member.list = list
      state.member.total = total
    }
  },

  setMyInfo (state, payload) {
    if (payload) {
      state.myInfo = payload
    }
  }
}

const actions = {
  getMemberList (context, payload) {
    return api.member
      .getMemberList()
      .then(res => {
        context.commit('setMemberList',
          res.data)
      })
  },

  getMyInfo (context, payload) {
    return api.member
      .getMyInfo()
      .then(res =>{
        context.commit('setMyInfo',
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
