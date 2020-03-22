<template>
  <div class="listing">

    <MarketInListing :key="index" v-for="(market, index) in markets"
      :name= "market.name"
      :address= "market.address"
      :distance= "market.distance"
      :status = "market.status"
      :mainProducts= "market.products"
    ></MarketInListing>
  </div>
</template>

<script>
// import API from "./API.vue";
// import Market from "./Market.vue";
import MarketInListing from "./MarketInListing.vue";
import Market from "../assets/js/market";

export default {
  name: "Listing",
  components: {
    MarketInListing
  },
  data: () => {
    return {
      markets: []
    };
  },
  methods: {
    async loadAll() {
      let rawMarkets;
      let markets = [];

      // rawMarkets = await API.loadMarkets();
      rawMarkets = (
        await this.axios.get(`http://${window.location.hostname}:3000/markets`)
      ).data;

      rawMarkets.forEach(rawMarket => {
        console.log('rawMarket:', rawMarket);
        markets.push(new Market(
          rawMarket.id,
          rawMarket.name,
          rawMarket.city,
          rawMarket.street,
          rawMarket.lat,
          rawMarket.lng,
          rawMarket.distance,
          rawMarket.open,
          rawMarket.products
        ));
      });

      if (rawMarkets.length != markets.length) {
        throw new Error(`Conversion from raw to parsed markets failed!`);
      }

      this.markets = markets;
    },

    addItem() {}
  },
  mounted() {
    this.loadAll();
  }
};
</script>
