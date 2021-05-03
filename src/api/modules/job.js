import http from '../../utils/http'

/**
 * 根据 id 获取job信息
 * @param id
 */
function getJobInfoById (id) {
  return http.get(`wx/job/${id}`)
}

export default {
  getJobInfoById
}
