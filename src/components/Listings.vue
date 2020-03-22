<template>
  <div class="listing">
    <MarketInListing
      :key="index"
      v-for="(market, index) in markets"
      :id="market.id"
      :name="market.name"
      :address="market.address"
      :distance="market.distance"
      :status="market.status"
      :mainProducts="market.products"
    ></MarketInListing>
  </div>
</template>

<script>
// import Market from "./Market.vue";
import MarketInListing from "./MarketInListing.vue";
import Market from "../assets/js/market";
import API from "../assets/js/api";

export default {
  name: "Listing",
  components: {
    MarketInListing
  },
  data: () => {
    return {
      markets: [],
      API: new API('https://wvvcrowdmarket.herokuapp.com/ws/rest'),
    };
  },
  methods: {
    async loadAll() {
      let rawMarkets;
      let markets = [];

      rawMarkets = await this.API.loadMarkets(this.$store.state.userPosition.lat, this.$store.state.userPosition.lng, 2000);
      console.log('rawMarkets:', rawMarkets);
      // rawMarkets = (
      //   await this.axios.get(`http://${window.location.hostname}:3000/markets`)
      // ).data;

      rawMarkets.forEach(rawMarket => {
        markets.push(
          new Market(
            rawMarket.id,
            rawMarket.name,
            rawMarket.city,
            rawMarket.street,
            rawMarket.lat,
            rawMarket.lng,
            rawMarket.distance,
            rawMarket.open,
            rawMarket.products
          )
        );
      });

      if (rawMarkets.length != markets.length) {
        throw new Error(`Conversion from raw to parsed markets failed!`);
      }

      this.markets = markets;
    },

    addItem() {}
  },
  mounted() {
    console.log('test:');
    this.$store.commit("getCurrentPosition");
    this.loadAll();
  }
};
</script>
