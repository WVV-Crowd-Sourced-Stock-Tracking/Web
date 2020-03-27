import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    center: {
      lat: NaN,
      lng: NaN,
    },
    radius: 2000,
    mapsScriptLoaded: false,
    filter: [],
  },
  mutations: {
    SET_CENTER_POSITION(state, newCenter) {
      state.center = newCenter;
    },
    SET_RADIUS(state, newRadius) {
      state.radius = newRadius;
    },
    SET_MAPS_SCRIPT_LOADED(state, loaded) {
      state.mapsScriptLoaded = loaded;
    }
  },
  actions: {
    updateCenter(context, newCenter) {
      context.commit('SET_CENTER_POSITION', newCenter);
    },
    updateRadius(context, newRadius) {
      context.commit('SET_RADIUS', newRadius);
    },
    mapsScriptLoaded(context) {
      context.commit('SET_MAPS_SCRIPT_LOADED', true)
    }
  },
  getters: {
    center: state => {
      return state.center;
    },
    radius: state => {
      return state.radius;
    },
    mapsScriptLoaded: state => {
      return state.mapsScriptLoaded;
    }
  }

})