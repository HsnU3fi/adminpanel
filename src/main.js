import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import VueAxios from "vue-axios";
import router from './router'
import vuetify from './plugins/vuetify';
let token = JSON.parse(localStorage.getItem('userData'));
if (token === null) {
  router.push("/login")
}else {
  axios.defaults.headers.common['Authorization'] = "bearer " + token.result;
}
Vue.config.productionTip = false;
Vue.use(VueAxios,axios);
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
