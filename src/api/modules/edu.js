import http from '../../utils/http'

/**
 * 根据 id 获取教育信息
 * @param id
 */
function getEduInfoById (id) {
  return http.get(`wx/edu/${id}`)
}

const sendMail = (mail) => {
  return http.get(`wx/edu/auth/mail`,{
    mail
  })
}

export default {
  getEduInfoById,
  sendMail
}
