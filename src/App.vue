<template>
  <div id="app" class="container h-full mx-auto px-4">
    
    <MarketInListing

      :name= "'REWE'"
      :address= "'Marktplatz 3, Frankfurt a. M.'"
      :distance= "'200 m'"
      :status = "{text: 'Geschlossen', action: 'Öffnet', time: '12 Uhr', class: 'closed'}"
      :mainCategories= "[ {name: 'Toilettenpapier', availability: 'high'}, {name: 'Seife', availability: 'medium'}, {name: 'Milch', availability: 'low'}, ]"
      :modified= "{date: '19.03.', time: '16:45 Uhr'}"

    ></MarketInListing>
    
  </div>
</template>

<script>
import { google } from 'vue2-google-maps'
// import ViewSwitcher from './components/ViewSwitcher.vue'
// import MapContext from './components/MapContext.vue'
// import API from './components/API.vue'
// import Listing from './components/Listing.vue'
// import AppFilter from './components/Filter.vue'
import MarketInListing from './components/MarketInListing.vue'

export default {
  name: "App",
  components: {
    // ViewSwitcher,
    // MapContext,
    // API,
    // Listing,
    // AppFilter,
    MarketInListing
  },
  data() {
    return {
      show: 'list'
    }
  },
  props: {
    map: Object
  },
  async mounted() {
    document.documentElement.style.setProperty(
      "--vh",
      `${window.innerHeight * 0.01}px`
    );

    try {
      this.map = await this.initMap();
    } catch (err) {
      console.error(err);
    }
    console.log("map:", this.map);
  },
  methods: {
    initMap() {
      return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
          console.log("Geolocation is not supported by your browser");
        } else {
          console.log("Locating…");
          navigator.geolocation.getCurrentPosition(
            position => {
              console.log("position:", position);

              return resolve(
                new google.maps.Map(this.$el.querySelector("#map-embedded"), {
                  center: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                  },
                  zoom: 15
                })
              );
            },
            err => {
              reject(err);
            }
          );
        }
      });
    }
  }
};
</script>

<style>

  :root {
    --nav-bar-height: 7%;
    --category-list-width: 50%;
    --category-item-list-width: calc(var(--category-list-width));
    --market-height: calc(var(--vh, 1vh) * (100/5));
    --filter-height: calc(var(--vh, 1vh) * 7);
    --filter-list-height: 60%;

    --header-height: 2.5rem;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-size: 1em;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    font-family: Arial, Helvetica, sans-serif;
  }

  #app {
    background-color: #E5E5E5;
    position: absolute;
    top: 0;
    left: 0;
  }

  .traffic-light.high {
    background-color: #6DD400;
  }

  .traffic-light.medium {
    background-color: #F7B500;
  }

  .traffic-light.low {
    background-color: #E02020;
  }

</style>
