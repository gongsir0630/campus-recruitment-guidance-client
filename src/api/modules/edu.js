import http from '../../utils/http'

/**
 * 根据 id 获取教育信息
 * @param id
 */
function getEduInfoById (id) {
  return http.get(`wx/edu/${id}`)
}

export default {
  getEduInfoById
}
