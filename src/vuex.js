import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

import API from '@/assets/js/api';
import Market from '@/assets/js/market';

const api = new API('https://wvv2.herokuapp.com/ws/rest');

export const store = new Vuex.Store({
  state: {
    userPosition: {
      lat: NaN,
      lng: NaN,
    },
    center: {
      lat: NaN,
      lng: NaN,
    },
    radius: 2000,
    zoom: 13,
    mapsScriptLoaded: false,
    markets: [],
    locationPermissionStatus: 'pending',
    locationPromptResult: 'pending',
    filter: [],
  },
  mutations: {
    SET_USER_POSITION(state, newUserPosition) {
      state.userPosition = newUserPosition;
    },
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
    SET_MARKETS(state, newMarkets) {
      state.markets = newMarkets;
    },
    SET_LOCATION_PERMISSION_STATUS(state, newStatus) {
      state.locationPermissionStatus = newStatus;
    },
    SET_LOCATION_PROMPT_RESULT(state, result) {
      state.locationPromptResult = result;
    },
    SET_FILTER(state, newFilter) {
      state.filter = newFilter;
    },
  },
  actions: {
    updateUserPosition(context, newUserPosition) {
      context.commit('SET_USER_POSITION', newUserPosition);
    },
    updateCenter(context, newCenter) {
      context.commit('SET_CENTER_POSITION', newCenter);
      context.dispatch('reloadMarkets');
    },
    updateRadius(context, newRadius) {
      context.commit('SET_RADIUS', newRadius);
      context.dispatch('reloadMarkets');
    },
    updateZoom(context, newZoom) {
      context.commit('SET_ZOOM', newZoom);
    },
    mapsScriptLoaded(context) {
      context.commit('SET_MAPS_SCRIPT_LOADED', true)
    },
    async reloadMarkets(context) {

      let rawMarkets;
      let markets = [];

      try {
        rawMarkets = await api.loadMarkets(context.getters.center.lat, context.getters.center.lng, context.getters.radius);
      } catch (err) {

        console.error(err);

        try {
          rawMarkets = await api.loadMarkets(context.getters.center.lat, context.getters.center.lng, context.getters.radius);
        } catch (err) {
          console.error(err);
          rawMarkets = [];
        }

      }

      console.log('rawMarkets:', rawMarkets);

      rawMarkets.forEach(rawMarket => {
        markets.push(new Market(
          rawMarket.market_id,
          rawMarket.market_name,
          rawMarket.city,
          rawMarket.street,
          rawMarket.latitude,
          rawMarket.longitude,
          rawMarket.distance,
          rawMarket.products,
          rawMarket.maps_id,
          rawMarket.zip,
          rawMarket.icon_url,
          rawMarket.periods,
          rawMarket.last_updated
        ))
      })

      console.log('markets:', markets);

      context.commit('SET_MARKETS', markets);
      
    },
    updateLocationPermissionStatus(context, newStatus) {
      context.commit('SET_LOCATION_PERMISSION_STATUS', newStatus);
    },
    updateLocationPromptResult(context, result) {
      context.commit('SET_LOCATION_PROMPT_RESULT', result);
    },
    updateFilter(context, newFilter) {
      context.commit('SET_FILTER', newFilter);
    },
    addToFilter(context, productId) {

      let newFilter = context.getters.filter;
      newFilter.push(productId);

      // filter dups
      newFilter = newFilter.filter((item, index) => newFilter.indexOf(item) === index);
      
      context.commit('SET_FILTER', newFilter);
      
    },
    removeFromFilter(context, productId) {

      let newFilter = context.getters.filter;

      let index = newFilter.indexOf(productId);
      if (index != -1) {
        newFilter.splice(index, 1);
      }

      context.commit('SET_FILTER', newFilter);
      
    }
  },
  getters: {
    userPosition: state => {
      return state.userPosition;
    },
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
    markets: state => {
      return state.markets;
    },
    locationPermissionStatus: state => {
      return state.locationPermissionStatus;
    },
    locationPromptResult: state => {
      return state.locationPromptResult;
    },
    filter: state => {
      return state.filter;
    },
  }

})