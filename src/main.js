import Vue from 'vue'
import App from './App'
import http from './utils/http'
import api from './api/index'
import store from './store/index'

Vue.prototype.$http = http
Vue.prototype.$api = api;

Vue.config.productionTip = false

App.mpType = 'app'

// 全局注册自定义导航组件
import cuCustom from 'colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom);

const app = new Vue({
  ...App,
  store
})
app.$mount()
