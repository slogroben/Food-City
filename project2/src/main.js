import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from '../src/router/index'
import Axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.prototype.$axios=Axios
Vue.use(ElementUI)
// Axios.defaults.withCredentials = true;
new Vue({
  el:"#app",
  render: h => h(App),
  router:router
})
