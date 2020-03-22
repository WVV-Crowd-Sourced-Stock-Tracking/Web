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

export default {
  data() {
    return {
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
    console.log(this);
    this.centerOnUser();
    this.getAllMarkers();
  },
  computed: {
    google: gmapApi
  },
  methods: {
    centerOnUser() {

      if (!navigator.geolocation) {
        console.error('Geolocation is not supported by your browser');
      } else {
        console.log('Locating…');
        navigator.geolocation.getCurrentPosition(position => {

          this.center.lat = position.coords.latitude;
          this.center.lng = position.coords.longitude;

          this.zoom = 15;
          
        }, err => {
          console.error(`Couldn't acces user's position:`, err);
        });
      }

    },
    getAllMarkers() {
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