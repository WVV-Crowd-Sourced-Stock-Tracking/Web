import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/output.css";
import axios from "axios";
import VueAxios from "vue-axios";
import * as VueGoogleMaps from "vue2-google-maps";
import router from "./router";
import {store} from "./vuex"

Vue.use(VueAxios, axios);

// Google Maps
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCIHJCRgVNdpdHQigIEebTzT4RDiTwt6jk",
    libraries: "places" // This is required if you use the Autocomplete plugin
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
