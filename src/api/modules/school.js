import http from '../../utils/http'

function getSchoolList () {
  return http.get(`wx/school/list`)
}

export default {
  getSchoolList
}
