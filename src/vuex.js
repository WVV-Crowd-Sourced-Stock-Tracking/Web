import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    center: {
      lat: 0,
      lng: 0,
    },
    radius: 2000,
  },
  mutations: {
    SET_CENTER_POSITION(state, newCenter) {
      state.center = newCenter;
    },
    SET_RADIUS(state, newRadius) {
      state.radius = newRadius;
    }
  },
  actions: {
    updateCenter(context, newCenter) {
      context.commit('SET_CENTER_POSITION', newCenter);
    },
    updateRadius(context, newRadius) {
      context.commit('SET_RADIUS', newRadius);
    }
  },
  getters: {
    center: state => {
      return state.center;
    },
    radius: state => {
      return state.radius;
    }
  }

})