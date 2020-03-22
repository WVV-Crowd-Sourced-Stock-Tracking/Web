<template>
  <div class="w-full rounded overflow-hidden shadow-lg">
    <div class="bg-white">
      <div class="font-bold text-xl px-4 py-2">Karte</div>
      <!-- <div id="map" class="text-gray-700 text-base"></div> -->
      <GmapMap
        :center="this.center"
        :zoom="this.zoom"
        :options="this.mapStyle"
        :styles="google && new google.maps.LatLng(1.38, 103.8)"
        map-type-id="roadmap"
        class="w-full h-40"
      >

        <!-- User Position -->
        <GmapMarker
          :position="this.center"
          :clickable="true"
          :draggable="false"
        />

        <!-- Shop Markers -->
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="false"
          @click="center = m.position"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>
import { gmapApi } from "vue2-google-maps";
import Market from "../assets/js/market";
import API from "../assets/js/api";

export default {
  data() {
    return {
      API: new API('https://wvvcrowdmarket.herokuapp.com/ws/rest'),
      mapStyle: {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false
      },
      // Berlin as Center :D
      center: {
        lat: 52.5204579,
        lng: 13.3885896
      },
      zoom: 4,
      markers: []
    };
  },
  mounted() {
    this.centerOnUser().then(() => {
      this.loadAll();
    })
    // this.getAllMarkers();
  },
  computed: {
    google: gmapApi
  },
  methods: {
    centerOnUser() {
      return new Promise((resolve, reject) => {
      
        if (!navigator.geolocation) {
          console.error('Geolocation is not supported by your browser');
        } else {
          console.log('Locating…');
          navigator.geolocation.getCurrentPosition(position => {

            this.center.lat = position.coords.latitude;
            this.center.lng = position.coords.longitude;

            console.log('this.center.lat:', this.center.lat);
            console.log('this.center.lng:', this.center.lng);

            this.zoom = 15;

            resolve();
            
          }, err => {
            console.error(`Couldn't acces user's position:`, err);
            reject();
          });
        }
      
      })
    },
    async loadAll() {
      let rawMarkets;
      let markets = [];

      console.log('this.center:', this.center);

      rawMarkets = await this.API.loadMarkets(this.center.lat, this.center.lng, 2000);
      console.log('rawMarkets:', rawMarkets);
      // rawMarkets = (
      //   await this.axios.get(`http://${window.location.hostname}:3000/markets`)
      // ).data;

      rawMarkets.forEach(rawMarket => {
        markets.push(
          new Market(
            rawMarket.id,
            rawMarket.name,
            rawMarket.city,
            rawMarket.street,
            rawMarket.lat,
            rawMarket.lng,
            rawMarket.distance,
            rawMarket.open,
            rawMarket.products
          )
        );
      });

      if (rawMarkets.length != markets.length) {
        throw new Error(`Conversion from raw to parsed markets failed!`);
      }

      markets.forEach(market => {
        this.markers.push({
          position: {
            lat: market.lat,
            lng: market.lng
          }
        });
      });
      
    },
    getAllMarkers() {
      //TODO get from api
      this.axios.get("http://localhost:3000/markets").then(response => {
        // console.log(response.data);
        response.data.forEach(market => {
          // console.log(market);
          this.markers.push({
            position: {
              lat: parseFloat(market.lat),
              lng: parseFloat(market.lng)
            }
          });
        });
      })
    }
  }
};
</script>