import http from '../../utils/http'

function getSchoolList () {
  return [{
    id:1,
    name:'西南石油大学',
    majors: ['计算机科学与技术','软件工程','网络安全']
  },{
    id:2,
    name:'四川大学',
    majors: ['计科','软工','网安']
  }]
}

export default {
  getSchoolList
}
