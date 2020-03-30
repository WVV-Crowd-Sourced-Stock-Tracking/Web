<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    getLocationPermissionStatus() {

      navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {

        this.$store.dispatch('updateLocationPermissionStatus', permissionStatus.state);
        console.log('dispatched!');
        
      })
      
    }
  },
  watch: {
    '$route' (to) {
      document.title = to.meta.title || 'WhatsLeft'
    },
  },
  mounted() {
    this.getLocationPermissionStatus();
  }

};
</script>

<style>

:root {
  --header-height: 2.5rem;
}

body {
  background-color: #e5e5e5;
}

#home {
  padding-bottom: 5rem;
}

/*
show the app in production
*/
.vue-map {
  overflow: visible !important;
  height: 100% !important;
  width: 100% !important;
}
.vue-map-container {
  overflow: hidden;
}
</style>
