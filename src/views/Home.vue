<template>
  <div id="home">

    <vue-headful
      title="What's Left?"
      description="What's Left? Crowed Sourced Stock Tracking!"
    />

    <Header />

    <div class="intro m-4">
      <h1 class="text-xl font-semibold">Shops</h1>
      <p>in Ihrer Umgebung</p>
    </div>

    <Map
      :userPositionProp="userPosition"
    ></Map>

    <Listings
      :userPositionProp="userPosition"
    ></Listings>

  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Listings from "@/components/Listings.vue";
import Map from "@/components/Map.vue";
// import ProductFilter from "./components/Filter.vue";
export default {
  components: {
    Header,
    Listings,
    Map
  },
  props: {
    userPosition: Object,
  }
};
</script>

<style lang="scss">
#home {
  padding: 0 30px;
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
