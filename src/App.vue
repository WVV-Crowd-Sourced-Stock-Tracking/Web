<template>
  <div id="app" class="container mx-auto px-4">
    
    <MarketInListing>

      :name= "'REWE'"
      :address= "'Testadresse'"
      :distance= "'5 km'"
      :statusText= "'Closed'"
      :statusAction= "'opens'"
      :statusTime= "'12 Uhr'"
      :mainCategories= "[ {name: 'Test', availability: 'high'}, {name: 'Test1', availability: 'medium'}, {name: 'Test2', availability: 'low'}, ]"
      
    </MarketInListing>
    
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

/* VIEWS */

.view {
  position: fixed;
  width: 100%;
  height: calc(100% - var(--nav-bar-height));
  display: none;
  /* border: 3px solid red; */
}

.view.visible {
  display: block;
}

/* MARKET VIEW */

.view#list #filter-button {
  width: 100%;
  height: var(--filter-height);
  padding: 2%;
  font-size: 1.5rem;
}

.view#list #filter-overlay {
  display: none;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 3;
  backdrop-filter: blur(3px);
}

.view#list #filter-overlay.visible {
  display: block;
}

.view#list #filter-overlay #filters {
  position: fixed;
  top: 20%;
  left: 5%;
  width: 90%;
  height: var(--filter-list-height);
  z-index: 5;
  background-color: #eeeeee;
  border-radius: 5%;
  padding: 5%;
  overflow: hidden;
}

.view#list #filter-overlay #filters #filter-list {
  position: absolut;
  list-style-type: none;
  overflow: scroll;
}

.view#list #filter-overlay #filters #filter-list li {
  height: 3rem;
  font-size: 2rem;
  text-align: left;
}

.view#list #filter-overlay #filters #filter-list li input[type="checkbox"] {
  position: absolute;
  right: 2rem;
  width: 2rem;
  height: 2rem;
}

.view#list #filter-overlay #filters #done-button {
  position: fixed;
  bottom: 25%;
  width: 80%;
  left: 10%;
  height: 2rem;
  font-size: 1.5rem;
  z-index: 5;
}

.view#list ul {
  width: 100%;
  height: calc(100% - var(--filter-height));
}

.view#list ul li.market {
  position: relative;
  width: 100%;
  height: var(--market-height);
  padding: 2%;
}

.view#list ul li.market h2 {
  /* text-align: center; */
  margin-bottom: .5rem;
}

.view#list ul li.market hr {
  position: absolute;
  bottom: .5rem;
  width: 100%;
}

.view#list ul li.market .stock-info ul.category-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style-type: none;
  width: var(--category-list-width);
}

.view#list ul li.market .stock-info ul.category-list li.category {
  width: var(--category-item-list-width);
  height: 2rem;
}

/* .view#list ul li.market .stock-info ul.category-list li.category img {
  width: 20px;
  height: 20px;
} */

.view#list ul li.market .stock-info ul.category-list li.category .availability {
  display: inline-block;
  width: 15px;
  height: 15px;
  border-radius: 100%;
}

.availability.high {
  background-color: #00d400;
}

.availability.medium {
  background-color: #ffc107;
}

.availability.low {
  background-color: #f44336;
}

.availability.unknown {
  background-color: #9e9e9e;
}

.view#list ul li.market .distance {
  position: absolute;
  bottom: 0;
  right: 0rem;
  width: 5rem;
  height: 2rem;
  text-align: right;
  font-size: 1.2rem;
  padding-right: .5rem;
}

/* MAP VIEW */

.view#map #map-embedded {
  width: 100%;
  height: 100%;
}

/* NAV BAR */

nav {
  position: fixed;
  bottom: 0;
  height: var(--nav-bar-height);
  width: 100%;
  text-align: center;
  /* border: 3px solid red; */
}

nav ul {
  display: flex;
  flex-direction: row;
  width: 100;
  height: 100%;
  list-style-type: none;
}

nav ul li {
  width: calc(100%/3);
  height: 100%;
  font-size: .8rem;
  /* font-weight: s; */
}

nav ul li.active {
  color: #0228b6;
}
</style>
