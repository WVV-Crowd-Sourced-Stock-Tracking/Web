<template>
  <div id="app">
    <router-view 
      :userPosition="userPosition"
    />
  </div>
</template>

<script>
export default {
  name: "App",
  components: {
  },
  data() {
    return {
      // Berlin
      userPosition: {
        lat: 52.5204579,
        lng: 13.3885896
      },
    }
  },
  watch: {
    '$route' (to) {
      document.title = to.meta.title || 'Your Website'
    },
    userPosition: {
      handler: function(newUserPosition) {

        if (!this.initiatedCenter) {

          this.$store.dispatch('updateCenter', newUserPosition);
          console.log('Initiated center to user position');
          
        } else {
          console.log('center has already been initiated...')
        }

      }
    }
  },
  computed: {
    initiatedCenter: function() {
      return (!isNaN(this.$store.getters.center.lat) && !isNaN(this.$store.getters.center.lng));
    }
  },
  methods: {
    getCurrentPosition() {
      
      if (!navigator.geolocation) {
        
        console.error('Geolocation is not supported by your browser');
        this.getZip('browser');

      } else {
        console.log('Locating…');

        navigator.geolocation.watchPosition(position => {

          console.log(`Current Position: lat: ${position.coords.latitude}, lng: ${position.coords.longitude}`);
          // alert(`Current Position: lat: ${position.coords.latitude}, lng: ${position.coords.longitude}`);

          this.userPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
        
        }, err => {

          console.error(`Couldn't acces user's position:`, err.message);
          this.getZip('user');
          this.userPosition = {lat: 0, lng: 0};

        });
            
      }
    },
    getZip(reason) {

      let promptReasonString = reason == 'browser' ? `Sorry, dein Browser unterstützt keine Standortabfragen.` : `Kein Live-Standort, alles klar.`;
      let zip = prompt(`${promptReasonString} Dann bräuchten wir deine Postleitzahl, um dir trotzdem relevante Infos anzuzeigen:`);
      if (zip != null && zip != '') {
        // user provided zip
      } else {
        // user didn't provide zip
      }
      
    },
  },
  mounted() {
    this.getCurrentPosition();
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
