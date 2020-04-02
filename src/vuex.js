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
    zoom: 13,
    mapsScriptLoaded: false,
    locationPermissionStatus: 'pending',
    filter: [],
  },
  mutations: {
    SET_CENTER_POSITION(state, newCenter) {
      state.center = newCenter;
    },
    SET_RADIUS(state, newRadius) {
      state.radius = newRadius;
    },
    SET_ZOOM(state, newZoom) {
      state.zoom = newZoom;
    },
    SET_MAPS_SCRIPT_LOADED(state, loaded) {
      state.mapsScriptLoaded = loaded;
    },
    SET_LOCATION_PERMISSION_STATUS(state, newStatus) {
      state.locationPermissionStatus = newStatus;
    }
  },
  actions: {
    updateCenter(context, newCenter) {
      context.commit('SET_CENTER_POSITION', newCenter);
    },
    updateRadius(context, newRadius) {
      context.commit('SET_RADIUS', newRadius);
    },
    updateZoom(context, newZoom) {
      context.commit('SET_ZOOM', newZoom);
    },
    mapsScriptLoaded(context) {
      context.commit('SET_MAPS_SCRIPT_LOADED', true)
    },
    updateLocationPermissionStatus(context, newStatus) {
      context.commit('SET_LOCATION_PERMISSION_STATUS', newStatus);
    }
  },
  getters: {
    center: state => {
      return state.center;
    },
    radius: state => {
      return state.radius;
    },
    zoom: state => {
      return state.zoom;
    },
    mapsScriptLoaded: state => {
      return state.mapsScriptLoaded;
    },
    locationPermissionStatus: state => {
      return state.locationPermissionStatus;
    }
  }

})