<template>
  <div id="app" class="container h-full mx-auto px-4 bg-100">
    <Header />
    <router-view 
      :userPosition="userPosition"
    />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
export default {
  name: "App",
  components: {
    Header
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
    }
  },
  methods: {
    getCurrentPosition() {
      return new Promise((resolve, reject) => {
      
        if (!navigator.geolocation) {
          console.error('Geolocation is not supported by your browser');
        } else {
          console.log('Locating…');

          navigator.geolocation.getCurrentPosition(position => {

            console.log('user lat:', position.coords.latitude);
            console.log('user lng:', position.coords.longitude);

            resolve({lat: position.coords.latitude, lng: position.coords.longitude});
            
          }, err => {
            console.error(`Couldn't acces user's position:`, err);
            reject(`Couldn't acces user's position!`);
          });
          
        }
      
      })
    }
  },
  mounted() {
    // this.$store.commit("getCurrentPosition");
    this.getCurrentPosition()
    .then(position => {
      console.log('position:', position);
      this.userPosition = position;
    })
    .catch(err => {
      console.error(err);
    })

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
