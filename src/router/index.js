import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MarketDetail from "../views/MarketDetail.vue";
import FourOhFour from "../views/FourOhFour.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/store/:mapsId",
    name: "MarketDetail",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: MarketDetail,
    props: true,
  },
  // 404, leave this as last route!!!
  {
    path: '/*',
    component: FourOhFour
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
