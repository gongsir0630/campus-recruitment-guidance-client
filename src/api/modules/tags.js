import http from '../../utils/http'

function getTagsByType (type) {
  return http.get(`public/tags/${type}`)
}

export default {
  getTagsByType
}
