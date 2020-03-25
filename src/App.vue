<template>
  <div id="app" class="h-full m-0 p-0 bg-100">
    <router-view 
      :userPosition= "this.userPosition"
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
      userPosition: this.getCurrentPosition(),
    }
  },
  watch: {
    '$route' (to) {
      document.title = to.meta.title || 'Your Website'
    }
  },
  methods: {
    async getCurrentPosition() {
      
        if (!navigator.geolocation) {
          console.error('Geolocation is not supported by your browser');
        } else {
          console.log('Locating…');
          let position;

          try {
            position = await (async () => {
              return new Promise((resolve, reject) => {
              
                navigator.geolocation.getCurrentPosition(position => {

                console.log('user lat:', position.coords.latitude);
                console.log('user lng:', position.coords.longitude);

                resolve({lat: position.coords.latitude, lng: position.coords.longitude});
                
              }, err => {
                console.error(`Couldn't acces user's position:`, err);
                reject({lat: 0, lng: 0});
              });
              
              })
            })
          } catch (err) {
            console.error(err);
          }

          return position;
          
        }
      
    }
  },
  mounted() {
    this.$store.commit("getCurrentPosition");
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
