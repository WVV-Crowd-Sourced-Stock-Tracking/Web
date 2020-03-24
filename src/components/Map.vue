<template>
  <div class="w-full rounded overflow-hidden shadow-lg">
    
    <div class="bg-white">
      <div class="font-bold text-xl px-4 py-2 shadow-lg">Karte</div>
      
      <div id="map" class="w-full h-40">
        <!-- Content inside of the div#map will be overwritten once the map is loaded -->

        <div class="w-full h-full text-xl text-center pt-12">
          Warte auf GPS-Daten...
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
    userPosition: Object,
  },
  data() {
    return {
      API: new API('https://wvvcrowdmarket.herokuapp.com/ws/rest'),
      map: {},
      homeMarker: {},
      mapMarkers: [],
      // Berlin as Center :D
      center: {
        lat: 52.5204579,
        lng: 13.3885896
      },
      zoom: 4,
    };
  },
  watch: {
    userPosition: {
      handler: function() {
        
        this.loadScript();

      }
    },
    zoom: {
      handler: function(newZoomLevel) {

        switch (newZoomLevel) {
          case 11:
            this.radius = 14000;
            break;
          case 12:
            this.radius = 7000;
            break;
          case 13:
            this.radius = 3500;
            break;
          case 14:
            this.radius = 1400;
            break;
          case 15:
            this.radius = 700;
            break;
          case 16:
            this.radius = 350;
            break;
          case 17:
            this.radius = 140;
            break;
          case 18:
            this.radius = 70;
            break;
          case 19:
            this.radius = 35;
            break;
          case 20:
            this.radius = 14;
            break;
        
          default:
            this.radius = 15000;
            break;
        }

        console.log('this.radius:', this.radius);
        
      }
    },
    center: {
      handler: function(newCenter) {

        console.log('newCenter:', newCenter);
        
        this.loadAll().then(markets => {

          console.log('markegasdgadsts:', markets);

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
        
      }
    }
  },
  // computed: {
  //   google: gmapApi
  // },
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
        this.center = {lat: this.map.center.lat(), lng: this.map.center.lng()};
      })

      this.homeMarker = new window.google.maps.Marker({
        position: this.userPosition,
        map: this.map,
        title: 'Dein Standort',
      })

      this.map.panTo(this.userPosition);
      this.zoom = 14;
      this.map.setZoom(this.zoom);
      this.center = this.userPosition;

    },
    async loadAll() {
      let rawMarkets;
      let markets = [];

      console.log('this.center:', this.center);

      console.log('1000 * 10/this.zoom:', 1000 * 10/this.zoom);
      rawMarkets = await this.API.loadMarkets(this.center.lat, this.center.lng, 2000);
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

      if (rawMarkets.length != markets.length) {
        throw new Error(`Conversion from raw to parsed markets failed!`);
      }

      return markets;

    },
  }
};
</script>