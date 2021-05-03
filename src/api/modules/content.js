import http from '../../utils/http'

function getMyContent () {
  return http.get(`wx/content/me`)
}

export default {
  getMyContent
}
