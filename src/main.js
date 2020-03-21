import Vue from "vue";
import App from "./App.vue";
import "@/assets/css/output.css";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyCIHJCRgVNdpdHQigIEebTzT4RDiTwt6jk"
  }
});

new Vue({
  render: h => h(App)
}).$mount("#app");
