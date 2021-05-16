import http from '../../utils/http'

const getAllHistory = () => {
  return  http.get(`wx/history`)
}

const saveHistory = (key,val) => {
  return http.post(`wx/history`,{
    key,
    val
  })
}

export default {
  getAllHistory,
  saveHistory,
}