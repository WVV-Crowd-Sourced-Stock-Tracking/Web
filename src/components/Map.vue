<template>
  <gmap-map
    :center="center"
    :zoom="7"
  >
    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      @click="center=m.position"
    ></gmap-marker>
  </gmap-map>
</template>

<script>
export default {
  name: 'Map',
  data() {
    return {
      center: { lat: 51, lng: 10 },
      markers: []
    }
  },
  mounted() {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      return;
    }
    console.log("Locating…");
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log("position:", position);

        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      },
      err => {
        console.log(err);
      }
    );

    this.addMarker(this.center.lat, this.center.lng);
  },
  methods: {
    addMarker(latitude, longitude, icon = null) {
      console.log('latitude:', latitude);
      console.log('longitude:', longitude);

      let markerOptions = {
        position: {lat: latitude, lng: longitude},
        map: this.map,
      };

      if (icon != null) {
        console.log('icon:', icon);
        markerOptions.icon = icon;
      }

      // let marker = new google.maps.Marker(markerOptions);

      // set the marker to the array index it will be at, or to the given id
      // marker.name = name === false ? this.markers.length : name;

      this.markers.push(markerOptions);
    },

    getAllMarkers() {
      return this.markers;
    }
  }
}
</script>

<style scoped>
.vue-map-container {
  width: 100%;
  height: 100%;
}
</style>
