import http from '../../utils/http'

function getCompanyList () {
  return http.get(`wx/company/list`)
}

export default {
  getCompanyList
}
