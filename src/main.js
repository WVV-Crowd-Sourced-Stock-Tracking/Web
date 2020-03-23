import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/output.css";
import axios from "axios";
import VueAxios from "vue-axios";
import router from "./router";
import {store} from "./vuex";
import vueHeadful from 'vue-headful';

Vue.use(VueAxios, axios);

Vue.component('vue-headful', vueHeadful);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
