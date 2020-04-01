<template>
  <div class="listing">

    <MarketInListing
      :key="market.id"
      v-for="market in markets"
      :market="market"
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
