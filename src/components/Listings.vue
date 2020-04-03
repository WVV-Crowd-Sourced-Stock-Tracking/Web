<template>
  <div class="listing">

    <div v-if="markets.length == 0" class="w-full text-center text-2xl mt-10">
      Märkte werden geladen...
    </div>

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
      return this.$store.getters.filteredMarkets;
    }
  },
};
</script>
