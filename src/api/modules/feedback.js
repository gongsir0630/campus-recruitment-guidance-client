import http from '../../utils/http'

function addFeedBack (data) {
  return http.put(`wx/feed`,{
    ...data
  })
}

function getMyFeedList () {
  return http.get(`wx/feed/me`)
}

export default {
  addFeedBack,
  getMyFeedList
}
