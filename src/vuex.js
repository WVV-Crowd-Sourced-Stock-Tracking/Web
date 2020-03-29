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
    zoom: 14,
    mapsScriptLoaded: false,
    markets: [],
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
    }
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

      console.log('teeeeeeest');

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
          rawMarket.periods
        ))
      })

      context.commit('SET_MARKETS', markets);
      
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
    }
  }

})