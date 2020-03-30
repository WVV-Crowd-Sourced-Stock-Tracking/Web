<template>
  <div id="home" class="text-gray-800">

    <vue-headful
      title="Home - WhatsLeft"
      description="What's Left? Crowed Sourced Stock Tracking!"
    />

    <Prompt
      type="location"
    />

    <Header />

    <div class="intro m-4">
      <h1 class="text-xl font-semibold">Shops</h1>
      <p>in Ihrer Umgebung</p>
    </div>

    <div class="px-2">

      <Map
        :userPositionProp="userPosition"
      ></Map>

      <Listings
        :userPositionProp="userPosition"
      ></Listings>

    </div>

  </div>
</template>

<script>

  import Header from "@/components/Header.vue";
  import Listings from "@/components/Listings.vue";
  import Map from "@/components/Map.vue";
  import Prompt from "@/components/Prompt.vue";

  export default {
    components: {
      Header,
      Listings,
      Map,
      Prompt
    },
    props: {
      userPosition: Object,
    }
  };

</script>
