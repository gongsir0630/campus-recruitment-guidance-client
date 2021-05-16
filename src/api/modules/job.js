import http from '../../utils/http'

/**
 * 根据 id 获取job信息
 * @param id
 */
function getJobInfoById (id) {
  return http.get(`wx/job/${id}`)
}

const sendMail = (mail) => {
  return http.get(`wx/job/auth/mail`,{
    mail
  })
}

export default {
  getJobInfoById,
  sendMail
}
