<template>
  <div class="w-full rounded overflow-hidden shadow-lg">
    <div class="bg-white">
      <div class="font-bold text-xl px-4 py-2 shadow-lg">Karte</div>
      
      <div id="map" class="w-full h-40">
        <!-- Content inside of the div#map will be overwritten once the map is loaded -->

        <div v-show="!mapInitiated" class="w-full h-full text-xl text-center pt-12">
          Karte wird geladen...
        </div>
        
      </div>

    </div>
  </div>
</template>

<script>
//TODO exchange loadingMessage for LoadingIndicator component combined with v-if
// import { gmapApi } from "vue2-google-maps";
import Market from "../assets/js/market";
import API from "../assets/js/api";

export default {
  props: {
    userPositionProp: Object,
  },
  data() {
    return {
      userPosition: this.userPositionProp,
      API: new API('https://wvvcrowdmarket.herokuapp.com/ws/rest'),
      // center: this.userPositionProp,
      zoom: 4,
      map: {},
      homeMarker: {},
      mapMarkers: [],
      mapInitiated: false,
      zoomedToUserPosition: false,
    };
  },
  watch: {
    userPositionProp: function() {
      this.userPosition = this.userPositionProp;
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

          // this.center = newPosition;

          // this.panToPosition();

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

        this.$store.dispatch('updateRadius', newRadius);

      }
    },
    center: {
      handler: function(newCenter) {

        console.log('newCenter:', newCenter);
        
        this.loadAll()
        .then(markets => {

          console.log('markets:', markets);

          this.mapMarkers.forEach(marker => {
            marker.setMap(null);
          })

          this.mapMarkers = [];

          markets.forEach(market => {
            this.mapMarkers.push(
              new window.google.maps.Marker({
                position: {lat: market.lat, lng: market.lng},
                map: this.map,
              })
            )
          });
          
        })
        .catch(err => {
          console.error(err);
        })
        
      }
    }
  },
  computed: {
    center: function() {
      return this.$store.getters.center;
    },
    radius: function() {
      return this.$store.getters.radius;
    }
  },
  methods: {
    loadScript() {
      let mapsApiScript = document.createElement('script');
      mapsApiScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCIHJCRgVNdpdHQigIEebTzT4RDiTwt6jk');
      document.body.appendChild(mapsApiScript);
      mapsApiScript.onload = this.initMap;
    },
    initMap() {

      this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: this.userPosition,
          zoom: this.zoom,
          gestureHandling: 'greedy',
          // zoomControl: false, == default (only show in fullscreen)
          // mapTypeControl: false, == default (only show in fullscreen)
          scaleControl: true,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true
        });

      this.map.addListener('zoom_changed', () => {
        this.zoom = this.map.getZoom();
      })

      // reload markets in the vicinity when the user drags the map
      this.map.addListener('dragend', () => {
        this.$store.dispatch('updateCenter', {lat: this.map.center.lat(), lng: this.map.center.lng()});
        // this.center = ;
      })

      this.homeMarker = new window.google.maps.Marker({
        position: this.userPosition,
        map: this.map,
        title: 'Dein Standort',
      })

      this.mapInitiated = true;

      this.panToPosition();

    },
    async loadAll() {
      return new Promise((resolve, reject) => {
      
        let markets = [];

        console.log('this.radius:', this.radius);
        this.API.loadMarkets(this.center.lat, this.center.lng, this.radius)
        .then(rawMarkets => {

          console.log('rawMarkets:', rawMarkets);
          // rawMarkets = (
          //   await this.axios.get(`http://${window.location.hostname}:3000/markets`)
          // ).data;

          rawMarkets.forEach(rawMarket => {
            markets.push(
              new Market(
                rawMarket.id,
                rawMarket.name,
                rawMarket.city,
                rawMarket.street,
                rawMarket.lat,
                rawMarket.lng,
                rawMarket.distance,
                rawMarket.open,
                rawMarket.products
              )
            );
          });

          resolve(markets);
          
        })
        .catch(err => {
          reject(err);
        })

      })
    },
    panToPosition() {

      this.map.panTo(this.userPosition);
      this.zoom = 14;
      this.map.setZoom(this.zoom);
      // this.center = this.userPosition;
      
    }
  },
  mounted() {
      // check if userPosition has already been acquired, because in this case the watch handler doesn't fire anymore
      if (this.userPositionProp.lat != 0 && this.userPositionProp.lng != 0) {
        this.userPosition = {lat: this.userPositionProp.lat, lng: this.userPositionProp.lng};
      }

      this.loadScript();
      
    }
};
</script>