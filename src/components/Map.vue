<template>
  <div class="w-full rounded overflow-hidden shadow-lg">
    <div class="bg-white">
      <div class="font-bold text-xl px-4 py-2">Karte</div>
      <!-- <div id="map" class="text-gray-700 text-base"></div> -->
      <GmapMap
        :center="this.center"
        :zoom="15"
        :options="this.mapStyle"
        :styles="google && new google.maps.LatLng(1.38, 103.8)"
        map-type-id="roadmap"
        class="w-full h-40"
      >
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
      markers: []
    };
  },
  mounted() {
    console.log(this);
    this.getAllMarkers();
  },
  computed: {
    google: gmapApi
  },
  methods: {
    getAllMarkers() {
      this.axios
        .get(`http://${window.location.hostname}:3000/markets`)
        .then(response => {
          response.data.forEach(market => {
            this.markers.push({
              position: {
                lat: market.lat,
                lng: market.lng
              }
            });
          });
        });
    }
  }
};
</script>
