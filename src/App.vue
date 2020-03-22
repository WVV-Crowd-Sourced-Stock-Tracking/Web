<template>
  <div id="app" class="container h-full mx-auto px-4">
    <Header />

    <div class="intro m-4">
      <h1 class="text-xl font-semibold">Shops</h1>
      <p>in Ihrer Umgebung</p>
    </div>

    <Map></Map>

    <Listings></Listings>

    <MarketInListing
      :name="'REWE'"
      :address="'Marktplatz 3, Frankfurt a. M.'"
      :distance="'200 m'"
      :status="{
        text: 'Geschlossen',
        action: 'Öffnet',
        time: '12 Uhr',
        class: 'closed'
      }"
      :mainCategories="[
        { name: 'Toilettenpapier', availability: 'high' },
        { name: 'Seife', availability: 'medium' },
        { name: 'Milch', availability: 'low' }
      ]"
      :modified="{ date: '19.03.', time: '16:45 Uhr' }"
    ></MarketInListing>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Listings from "./components/Listings.vue";
// import ViewSwitcher from "./components/ViewSwitcher.vue";
import Map from "./components/Map.vue";
import MarketInListing from "./components/MarketInListing.vue";
// import API from "./components/API.vue";

export default {
  name: "App",
  components: {
    Header,
    Listings,
    MarketInListing,
    // API,
    // ViewSwitcher,
    Map
    // AppFilter
  },
  data() {
    return {
      show: "list"
    };
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
</style>
