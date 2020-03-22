import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MarketDetail from "../views/MarketDetail.vue";
import Filter from "../views/Filter.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/market/:id",
    name: "MarketDetail",
    component: MarketDetail,
    props: true
  },
  {
    path: "/filter",
    name: "ProductFilter",
    component: Filter,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
