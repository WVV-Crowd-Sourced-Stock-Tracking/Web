<template>
  <div id="app" class="container h-full mx-auto px-4">
    <!-- <ProductFilter /> -->
    <Header />

    <div class="intro m-4">
      <h1 class="text-xl font-semibold">Shops</h1>
      <p>in Ihrer Umgebung</p>
    </div>

    <Map></Map>

    <Listings></Listings>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Listings from "./components/Listings.vue";
import Map from "./components/Map.vue";
// import ProductFilter from "./components/Filter.vue";

export default {
  name: "App",
  components: {
    // ProductFilter,
    Header,
    Listings,
    Map
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
