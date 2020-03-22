<template>
  <div id="app" class="container mx-auto px-4">
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
// import ViewSwitcher from "./components/ViewSwitcher.vue";
import Map from "./components/Map.vue";
// import API from "./components/API.vue";

export default {
  name: "App",
  components: {
    Header,
    Listings,
    // API,
    // ViewSwitcher,
    Map
    // API,
    // AppFilter
  },
  data() {
    return {
      show: "list"
    };
  }
};
</script>
