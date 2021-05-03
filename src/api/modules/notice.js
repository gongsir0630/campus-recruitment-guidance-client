import http from '../../utils/http'

function getNoticeList () {
  return http.get(`wx/notice/all`)
}

export default {
  getNoticeList
}
