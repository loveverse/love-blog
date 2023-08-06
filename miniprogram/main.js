import Vue from 'vue'
import './uni.promisify.adaptor'
import App from './App'
import { dicts } from "./utils/constant.js"
Vue.config.productionTip = false
Vue.prototype.dicts = dicts
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount("#app")
