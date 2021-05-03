import http from '../../utils/http'

function getBannerUrl (type) {
  return http.get(`public/banner/${type}`)
}

export default {
  getBannerUrl
}
