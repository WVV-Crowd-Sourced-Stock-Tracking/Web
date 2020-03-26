<template>
  <div id="app" class="h-full m-0 p-0 bg-100">
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
      initiatedCenter: false,
    }
  },
  watch: {
    '$route' (to) {
      document.title = to.meta.title || 'Your Website'
    },
    userPosition: {
      handler: function(newUserPosition) {

        if (!this.initiatedCenter) {

          console.log('Initiated center to user position');

          this.$store.dispatch('updateCenter', newUserPosition);
          this.initiatedCenter = true;
          
        } else {
          // console.log('center has already been initiated...')
        }

      }
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
    // this.$store.commit("getCurrentPosition");
    this.getCurrentPosition();

  }

};
</script>

<style>
:root {
  --header-height: 2.5rem;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  font-size: 1em;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #e5e5e5;
}
#app {
  background-color: #e5e5e5;
  height: auto;
  padding-bottom: 50px;
}

#home {
  padding-bottom: 25px;
}
.traffic-light.high {
  background-color: #6dd400;
}
.traffic-light.medium {
  background-color: #f7b500;
}
.traffic-light.low {
  background-color: #e02020;
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
