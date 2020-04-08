<template>
  <div class="w-full rounded-md overflow-hidden shadow-lg bg-white">

    <div class="font-bold text-xl px-4 py-2 shadow-md">Karte</div>
    
    <div class="w-full h-40">
      <!-- Content inside of the div#map will be overwritten once the map is loaded -->

      <!-- <div v-show="mapInitiated" id="map" class="w-full h-full">
        <div v-show="!mapInitiated" class="w-full h-full text-xl text-center pt-12">
          Sorry, die Karte konnte nicht geladen werden. Bitte lade die Seite neu :)
        </div>
      </div>

      <div v-show="!mapInitiated" class="w-full h-full text-xl text-center pt-12">
        Karte wird geladen...
      </div> -->

      <div id="map" class="w-full h-full">
        <div v-show="!mapInitiated" class="w-full h-full text-xl text-center pt-12">
          <!-- Sorry, die Karte konnte nicht geladen werden. Bitte lade die Seite neu :) -->
          Karte wird geladen...
        </div>
      </div>

      <!-- <div v-show="!mapInitiated" class="w-full h-full text-xl text-center pt-12">
        Karte wird geladen...
      </div> -->

    </div>

  </div>
</template>

<script>
//TODO exchange loadingMessage for LoadingIndicator component combined with v-if

export default {
  data() {
    return {
      mapInitiated: false,
      mapInitStarted: false,
      map: {},
      homeMarker: {},
      mapMarkers: [],
      zoomedToUserPosition: false,
      refreshTimerId: NaN,
      queuedCenter: {
        lat: NaN,
        lng: NaN,
      },
      queuedRadius: NaN,
    };
  },
  watch: {
    map: {
      handler: function() {

        this.updatedMarkersOnMap();
        // pan and zoom to current center after map is loaded
        this.panToCenter();
      
      }
    },
    userPosition: {
      handler: function(newPosition) {

        if (!this.zoomedToUserPosition && this.mapInitiated) {
          
          if (this.homeMarker.setMap != undefined) {
            this.homeMarker.setMap(null);
          }
          
          this.homeMarker = new window.google.maps.Marker({
            position: newPosition,
            map: this.map,
            title: 'Dein Standort',
          })

          // this.panToCenter();

          this.zoomedToUserPosition = true;
          
        }

      }
    },
    zoom: {
      handler: function(newZoomLevel) {

        let newRadius;

        switch (newZoomLevel) {
          case 11:
            newRadius = 14000;
            break;
          case 12:
            newRadius = 7000;
            break;
          case 13:
            newRadius = 3500;
            break;
          case 14:
            newRadius = 1400;
            break;
          case 15:
            newRadius = 700;
            break;
          case 16:
            newRadius = 350;
            break;
          case 17:
            newRadius = 140;
            break;
          case 18:
            newRadius = 70;
            break;
          case 19:
            newRadius = 35;
            break;
          case 20:
            newRadius = 14;
            break;
        
          default:
            newRadius = 15000;
            break;
        }

        this.queuedRadius = newRadius;
        this.commitUpdates();

      }
    },
    loadedScript: {
      handler: function() {
        this.initMapIfReady();
      }
    },
    isValidCenter: {
      handler: function() {
        this.initMapIfReady();
      }
    },
    markets: {
      handler: function() {
        if (this.mapInitiated) {
          this.updatedMarkersOnMap();
        }
      }
    }
  },
  computed: {
    center: function() {
      return this.$store.getters.center;
    },
    isValidCenter: function() {
      return (!isNaN(this.center.lat) && !isNaN(this.center.lng));
    },
    zoom: function() {
      return this.$store.getters.zoom;
    },
    loadedScript: function() {
      return this.$store.getters.mapsScriptLoaded;
    },
    markets: function() {
      return this.$store.getters.markets;
    },
    userPosition: function() {
      return this.$store.getters.userPosition;
    }
  },
  methods: {
    commitUpdates() {

      if (!isNaN(this.refreshTimerId)) {

        clearTimeout(this.refreshTimerId);
        this.refreshTimerId = setTimeout(() => {

          console.log('long timeout');

          if (!isNaN(this.queuedCenter.lat) && !isNaN(this.queuedCenter.lng)) {
            this.$store.dispatch('updateCenter', this.queuedCenter);
          }

          if (!isNaN(this.queuedRadius)) {
            this.$store.dispatch('updateRadius', this.queuedRadius);
          }

        }, 1000);

      } else {
        this.refreshTimerId = setTimeout(() => {

          console.log('short timeout');

          if (!isNaN(this.queuedCenter.lat) && !isNaN(this.queuedCenter.lng)) {
            this.$store.dispatch('updateCenter', this.queuedCenter);
          }

          if (!isNaN(this.queuedRadius)) {
            this.$store.dispatch('updateRadius', this.queuedRadius);
          }
          
        }, 1);
      }
      
    },
    loadScript() {
      let mapsApiScript = document.createElement('script');
      mapsApiScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCIHJCRgVNdpdHQigIEebTzT4RDiTwt6jk');
      document.body.appendChild(mapsApiScript);
      mapsApiScript.onload = () => {

        console.log('maps script loaded!');
        this.$store.dispatch('mapsScriptLoaded');
        
      };
    },
    initMapIfReady() {

      if (this.loadedScript && this.isValidCenter && !this.mapInitStarted) {
        this.initMap();
      }
      
    },
    initMap() {

      this.mapInitStarted = true;

      this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: this.center,
          zoom: this.zoom,
          gestureHandling: 'greedy',
          // zoomControl: false, == default (only show in fullscreen)
          // mapTypeControl: false, == default (only show in fullscreen)
          scaleControl: true,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true,
          styles: [
            {
              featureType: 'poi.business',
              stylers: [{visibility: 'off'}],
            },
            {
              featureType: 'transit',
              elementType: 'labels.icon',
              stylers: [{visibility: 'off'}],
            }
          ]
      });

      this.map.addListener('projection_changed', () => {
        this.mapInitiated = true;
      })

      this.map.addListener('tilesloaded', () => {
        // visible map tiles have been *fully* loaded
      })

      this.map.addListener('zoom_changed', () => {
        this.$store.dispatch('updateZoom', this.map.getZoom());
      })

      // reload markets in the vicinity when the user drags the map
      this.map.addListener('dragend', () => {
        this.queuedCenter = {lat: this.map.center.lat(), lng: this.map.center.lng()};
        this.commitUpdates();
      })

      this.homeMarker = new window.google.maps.Marker({
        position: this.userPosition,
        map: this.map,
        title: 'Dein Standort',
      })

    },
    updatedMarkersOnMap() {

      console.log('called');

      this.mapMarkers.forEach(marker => {
        marker.setMap(null);
      })

      this.mapMarkers = [];

      this.markets.forEach(market => {

        let marker = new window.google.maps.Marker({
          position: {lat: market.lat, lng: market.lng},
          icon: "/media/Pin.svg",
          map: this.map,
          clickable: true,
          draggable: false,
        })

        marker.addListener('click', () => {
          // navigate to the stores detail page
          this.$router.push(`store/${market.mapsId}`);
        })
        
        this.mapMarkers.push(marker);
      });
      
    },
    panToCenter() {

      this.map.panTo(this.center);
      this.map.setZoom(this.zoom);
      
    }
  },
  mounted() {

      if (!this.loadedScript) {
        this.loadScript();
      } else {
        this.initMap();
      }

    }
};
</script>