<template>
  <div>
    <!-- <ProductFilter /> -->

    <div class="intro m-4">
      <h1 class="text-xl font-semibold">Shops</h1>
      <p>in Ihrer Umgebung</p>
    </div>

    <Map></Map>

    <Listings></Listings>
  </div>
</template>

<script>
import Listings from "@/components/Listings.vue";
import Map from "@/components/Map.vue";
// import ProductFilter from "./components/Filter.vue";
export default {
  components: {
    // ProductFilter,
    Listings,
    Map
  }
};
</script>

<style lang="scss">
#home {
  padding-bottom: 25px;
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
