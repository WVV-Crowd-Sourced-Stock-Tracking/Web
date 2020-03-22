<template>
  <div id="home" class="container h-full mx-auto px-4 bg-gray-100">

    <div class="ml-4 my-2">
      <h1 class="text-2xl font-semibold">Shops</h1>
      <p>in Ihrer Umgebung</p>
    </div>

    <Map></Map>

    <Listings></Listings>

  </div>
</template>

<script>
// @ is an alias to /src
import Listings from "@/components/Listings.vue";
import Map from "@/components/Map.vue";

export default {
  name: 'Home',
  components: {
    Listings,
    Map
  },
  data() {
    return {
      show: "list"
    };
  },
}
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
#app {
  background-color: #E5E5E5;
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