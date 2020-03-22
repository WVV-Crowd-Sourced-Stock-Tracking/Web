<template>
  <div id="home" >

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

