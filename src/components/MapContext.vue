<template>
  <div class="w-full rounded overflow-hidden shadow-lg">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">Karte</div>
      <!-- <div id="map" class="text-gray-700 text-base"></div> -->
      <GmapMap
        :center="this.center"
        :zoom="15"
        map-type-id="roadmap"
        style="width: 100%; height: 300px"
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
  name: "MapContext",
  data() {
    return {
      // Berlin as Center :D
      center: {
        lat: 52.520008,
        lng: 13.404954
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
      // return this.markers;
    }
  }
};
</script>
