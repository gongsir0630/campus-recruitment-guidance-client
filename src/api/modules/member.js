import http from '../../utils/http'

function getMemberList () {
  return http.get(`wx/member/list`)
}

function getMyInfo () {
  return http.get(`wx/member/apply`)
}

const saveOrUpdateInfo = (info) => {
  return http.post(`wx/member/apply`,{
    ...info
  })
}

const like  = (id) => {
  return http.get(`wx/member/like/${id}`)
}



export default {
  getMemberList,
  getMyInfo,
  saveOrUpdateInfo,
  like
}
