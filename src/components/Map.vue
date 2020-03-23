<template>
  <div class="w-full rounded overflow-hidden shadow-lg">
    
    <div class="bg-white">
      <div class="font-bold text-xl px-4 py-2">Karte</div>
      
      <div id="map" class="w-full h-40"></div>

    </div>

  </div>
</template>

<script>
// import { gmapApi } from "vue2-google-maps";
import Market from "../assets/js/market";
import API from "../assets/js/api";

export default {
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
  mounted() {

    let mapsApiScript = document.createElement('script');
    mapsApiScript.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCIHJCRgVNdpdHQigIEebTzT4RDiTwt6jk');
    document.body.appendChild(mapsApiScript);
    mapsApiScript.onload = this.initMap;

  },
  // computed: {
  //   google: gmapApi
  // },
  methods: {
    initMap() {

      this.map = new window.google.maps.Map(document.getElementById('map'), {
          center: this.center,
          zoom: this.zoom,
          gestureHandling: 'greedy',
          // zoomControl: false, == default (only show in fullscreen)
          // mapTypeControl: false, == default (only show in fullscreen)
          scaleControl: true,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: true
        });

      this.homeMarker = new window.google.maps.Marker({
        position: this.center,
        map: this.map,
        title: 'Dein Standort',
      });

      this.map.addListener('click', () => {
        console.log('tesgdsagjdlskjhgdsahgdjsk'); 
      })

      this.map.addListener('zoom_changed', () => {
        this.zoom = this.map.getZoom();
      })

      // reload markets in the vicinity when the user drags the map
      this.map.addListener('dragend', () => {
        this.center = {lat: this.map.center.lat(), lng: this.map.center.lng()};
      })

      this.centerOnUser().then(() => {

        this.homeMarker.setMap(null);

        this.homeMarker = new window.google.maps.Marker({
          position: this.center,
          map: this.map,
          title: 'Dein Standort',
        })

        this.map.panTo(this.center);
        this.zoom = 14;
        this.map.setZoom(this.zoom);

        // initial loading of markers for user position
        this.loadAll().then(markets => {

          markets.forEach(market => {
            this.mapMarkers.push(
              new window.google.maps.Marker({
                position: {lat: market.lat, lng: market.lng},
                map: this.map,
              })
            )
          });
          
        })
        
      })
      
    },
    centerOnUser() {
      return new Promise((resolve, reject) => {
      
        if (!navigator.geolocation) {
          console.error('Geolocation is not supported by your browser');
        } else {
          console.log('Locating…');
          navigator.geolocation.getCurrentPosition(position => {

            this.center.lat = position.coords.latitude;
            this.center.lng = position.coords.longitude;

            this.zoom = 15;

            resolve();
            
          }, err => {
            console.error(`Couldn't acces user's position:`, err);
            reject();
          });
        }
      
      })
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
    getAllMarkers() {
      //TODO get from api
      this.axios.get("http://localhost:3000/markets").then(response => {
        // console.log(response.data);
        response.data.forEach(market => {
          // console.log(market);
          this.markers.push({
            position: {
              lat: parseFloat(market.lat),
              lng: parseFloat(market.lng)
            }
          });
        });
      })
    }
  }
};
</script>