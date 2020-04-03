<template>
  <div id="app">
    <transition
      enter-active-class="transition duration-300 ease-out"
      leave-active-class="transition duration-300 ease-out"
      enter-class="transform translate-x-64"
      enter-to-class="transform translate-x-0"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    getLocationPermissionStatus() {

      if ('permissions' in navigator) {

        navigator.permissions.query({ name: 'geolocation' }).then(permissionStatus => {
  
          this.$store.dispatch('updateLocationPermissionStatus', permissionStatus.state);
          
        })
        
      } else {

        console.log('permission api not available, prompting the user...');
        this.$store.dispatch('updateLocationPermissionStatus', 'prompt');
        
      }

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

#app {

  max-width: 950px;
  margin: 0 auto;
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
