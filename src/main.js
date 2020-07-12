import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueScrollTo from 'vue-scrollto';
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import {faSearch, faDownload, faFileUpload, faFileDownload, faUpload, faTimesCircle, faCheckCircle} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


library.add(faSearch);
library.add(faDownload);
library.add(faUpload);
library.add(faFileDownload);
library.add(faFileUpload);
library.add(faTimesCircle);
library.add(faCheckCircle);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.use({
  install (Vue) {
    Vue.prototype.$api = axios.create({
      token: "",
      baseURL: 'http://localhost:5000/'
    })
  }
});
Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: 0,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
});
// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@/assets/_custom.scss'

Vue.config.productionTip = false;

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app');
