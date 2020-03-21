<template>
  <div></div>
</template>

<script>
import { google } from 'vue2-google-maps'

export default {
  name: 'MapContext',
  data() {
    return {
      map: this._map,
      markers: []
    }
  },
  props: {
    _map: Object
  },
  mounted() {
    this.addMarker(this.map.center.lat(), this.map.center.lng());
  },
  methods: {
    addMarker(latitude, longitude, icon = null, name = false) {
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

      let marker = new google.maps.Marker(markerOptions);

      // set the marker to the array index it will be at, or to the given id
      marker.name = name === false ? this.markers.length : name;

      this.markers.push(marker);
    },
    getAllMarkers() {
      return this.markers;
    }
  }
}
</script>
