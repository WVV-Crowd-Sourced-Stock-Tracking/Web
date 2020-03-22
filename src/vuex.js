import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      userPosition: {lat: 0, lng: 0}
    },
    mutations: {

        getCurrentPosition(state) {
            if (!navigator.geolocation) {
            console.error('Geolocation is not supported by your browser');
            } else {
                console.log('Locating…');
                navigator.geolocation.getCurrentPosition(position => {
                    state.userPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
                })
            }
        }
    },
    getters: {
        userPosition: state => {
            return state.userPosition;
        }
    }

})