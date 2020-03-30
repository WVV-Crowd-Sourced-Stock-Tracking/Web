<template>
  <div id="home" class="text-gray-800">

    <vue-headful
      title="Home - WhatsLeft"
      description="What's Left? Crowed Sourced Stock Tracking!"
    />

    <Prompt
      v-if="showLocationPrompt"
      v-on:closed="promptHandler($event);"
      type="location"
    />

    <Header />

    <div class="intro m-4">
      <h1 class="text-xl font-semibold">Shops</h1>
      <p>in Ihrer Umgebung</p>
    </div>

    <div class="px-2">

      <Map
        :userPositionProp="userPosition"
      />

      <Listings />

    </div>

  </div>
</template>

<script>

  import Header from "@/components/Header.vue";
  import Listings from "@/components/Listings.vue";
  import Map from "@/components/Map.vue";
  import Prompt from "@/components/Prompt.vue";

  export default {
    components: {
      Header,
      Listings,
      Map,
      Prompt
    },
    data() {
      return {
        // Berlin
        userPosition: {
          lat: NaN,
          lng: NaN
        },
        showPrompt: true,
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
      },
      locationPermissionStatus: {
        handler: function(newStatus) {

          if (newStatus == 'granted') {
            this.getCurrentPosition();
          } else if (newStatus == 'denied') {
            this.userPosition = {
              lat: 52.5204579,
              lng: 13.3885896
            };
          }
          
        }
      }
    },
    computed: {
      initiatedCenter: function() {
        return (!isNaN(this.$store.getters.center.lat) && !isNaN(this.$store.getters.center.lng));
      },
      locationPermissionStatus: function() {
        return this.$store.getters.locationPermissionStatus;
      },
      showLocationPrompt: function() {
        return (this.locationPermissionStatus == 'prompt' && this.showPrompt);
      }
    },
    methods: {
      getCurrentPosition() {
        
        if (!navigator.geolocation) {
          
          console.error('Geolocation is not supported by your browser');
          this.getZip('browser');

        } else {
          console.log('Locating…');

          this.$getLocation()
          .then(coords => {

            console.log('coords:', coords);
            this.userPosition = {lat: coords.lat, lng: coords.lng};
            this.$store.dispatch('updateLocationPermissionStatus', 'granted');

          })
          .catch(err => {

            console.error(`Couldn't acces user's position:`, err);
            this.userPosition = {
              lat: 52.5204579,
              lng: 13.3885896
            };
            this.$store.dispatch('updateLocationPermissionStatus', 'denied');
            
          })

          // navigator.geolocation.watchPosition(position => {

          //   console.log(`Current Position: lat: ${position.coords.latitude}, lng: ${position.coords.longitude}`);
          //   // alert(`Current Position: lat: ${position.coords.latitude}, lng: ${position.coords.longitude}`);

          //   this.userPosition = {lat: position.coords.latitude, lng: position.coords.longitude};
          
          // }, err => {

          //   console.error(`Couldn't acces user's position:`, err.message);
          //   this.getZip('user');
          //   this.userPosition = {lat: 0, lng: 0};

          // });
              
        }
      },
      promptHandler(result) {

        this.showPrompt = false;
        
        if (result) {
          this.getCurrentPosition();
        } else {

          this.userPosition = {
            lat: 52.5204579,
            lng: 13.3885896
          };
          
        }
        
      }
    },
    // mounted() {

    //   if (locationPermissionStatus == 'granted') {
    //     this.getCurrentPosition();
    //   }

    // }
  };

</script>
