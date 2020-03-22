<template>
  <div class="w-full rounded overflow-hidden shadow-lg">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">Karte</div>
      <!-- <div id="map" class="text-gray-700 text-base"></div> -->
      <GmapMap
        :center="this.center"
        :zoom="15"
        :options="this.mapStyle"
        map-type-id="roadmap"
        class="w-full h-48"
      >
        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center = m.position"
        />
      </GmapMap>
    </div>
  </div>
</template>

<script>
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
        disableDefaultUi: false,
        supressMarkers: true
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
    // this.addMarker(this.map.center.lat(), this.map.center.lng());
    this.getAllMarkers();
  },
  methods: {
    getAllMarkers() {
      this.axios.get("http://localhost:3000/markets").then(response => {
        // console.log(response.data);
        response.data.forEach(market => {
          // console.log(market);
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
