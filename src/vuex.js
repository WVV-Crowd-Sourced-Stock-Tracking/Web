import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
      count: 0,
      userPosition: {lat: "", lng: ""}
    },
    mutations: {
        increment (state) {
            state.count++
        },
        getCurrentPosition(state) {
            if (!navigator.geolocation) {
            console.error('Geolocation is not supported by your browser');
            } else {
                console.log('Locating…');
                navigator.geolocation.getCurrentPosition(position => {

                    console.log('user lat:', position.coords.latitude);
                    console.log('user lng:', position.coords.longitude);

                    state.userPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
                })
            }
        }
    }
})