<template>
  <div class="listing">

    <MarketInListing
      :key="market.id"
      v-for="market in markets"
      :id="market.id"
      :mapsId="market.mapsId"
      :name="market.name"
      :address="market.address"
      :distance="market.distance"
      :status="market.status"
      :mainProducts="market.products"
      :zip="market.zip"
    />

  </div>
</template>

<script>
import MarketInListing from "@/components/MarketInListing.vue";

export default {
  name: "Listing",
  components: {
    MarketInListing
  },
  computed: {
    markets: function() {
      return this.$store.getters.markets;
    }
  },
};
</script>
