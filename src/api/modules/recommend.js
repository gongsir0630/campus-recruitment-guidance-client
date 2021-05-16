import http from '../../utils/http'

const getRecommendationList = type => {
  return http.get(`wx/nt/list/${type}`)
}

const save = (info) => {
  return http.post(`wx/nt`,{
    ...info
  })
}

const deleteById = id => {
  return  http.delete(`wx/nt/${id}`)
}

export default {
  getRecommendationList,
  save,
  deleteById
}