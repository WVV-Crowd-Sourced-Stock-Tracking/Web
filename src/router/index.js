import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MarketDetail from "../views/MarketDetail.vue";
import Filter from "../views/Filter.vue";
import FourOhFour from "../views/FourOhFour.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // props: true,
    meta: {
      title: 'Home',
    }
  },
  {
    path: "/store/:mapsId",
    name: "MarketDetail",
    component: MarketDetail,
    meta: {
      title: 'Store',
    }
  },
  {
    path: "/filter",
    name: "Filter",
    component: Filter,
    props: true
  },
  // 404, leave this as last route!!!
  {
    path: '/*',
    component: FourOhFour,
    props: true
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
