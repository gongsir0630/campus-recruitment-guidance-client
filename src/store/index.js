import Vue from 'vue'
import Vuex from 'vuex'
import test from './modules/test'
import user from './modules/user'
import edu from "./modules/edu"
import job from "./modules/job"
import notice from "./modules/notice"
import dynamic from "./modules/dynamic"
import member from "./modules/member"
import content from "./modules/content"
import nt from "./modules/nt"
import history from "./modules/history"


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    test,
    user,
    edu,
    job,
    notice,
    dynamic,
    member,
    content,
    nt,
    history
  }
})
