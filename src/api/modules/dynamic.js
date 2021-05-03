import http from '../../utils/http'

function getDynamicList () {
  return http.get(`wx/dynamic/all`)
}

const like = id => {
  return http.get(`wx/dynamic/like/${id}`)
}

const collection = id => {
  return http.get(`wx/dynamic/collection/${id}`)
}

const save = (info) => {
  return http.post(`wx/dynamic`,{
    ...info
  })
}

const deleteById = id => {
  return http.delete(`wx/dynamic/${id}`)
}

export default {
  getDynamicList,
  like,
  collection,
  save,
  deleteById
}
