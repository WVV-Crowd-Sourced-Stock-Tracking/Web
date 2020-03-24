<template>
  <div class="listing">
    <MarketInListing
      :key="index"
      v-for="(market, index) in markets"
      :id="market.id"
      :mapsId="market.mapsId"
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
  props: {
    userPosition: Object,
  },
  data: () => {
    return {
      markets: [],
      rawMarkets: [],
      API: new API('https://wvvcrowdmarket.herokuapp.com/ws/rest'),
    };
  },
  watch: {
    userPosition: {
      handler: function() {

        this.API.loadMarkets(this.userPosition.lat, this.userPosition.lng, 2000).then(rawMarkets => {
          console.log('rawMarkets:', rawMarkets);
          this.rawMarkets = rawMarkets;
        })
        
      }
    },
    rawMarkets: {
      handler: function(newRawMarkets) {

        this.markets = [];

        newRawMarkets.forEach(rawMarket => {
          this.markets.push(
            new Market(
              rawMarket.id,
              rawMarket.name,
              rawMarket.city,
              rawMarket.street,
              rawMarket.lat,
              rawMarket.lng,
              rawMarket.distance,
              rawMarket.open,
              rawMarket.products,
              rawMarket.mapsId
            )
          );
        });
        
      }
    }
  },
  methods: {
    async loadAll() {
      let rawMarkets;
      let markets = [];

      rawMarkets = await this.API.loadMarkets(this.userPosition.lat, this.userPosition.lng, 2000);
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
            rawMarket.products,
            rawMarket.mapsId
          )
        );
      });

      if (rawMarkets.length != markets.length) {
        throw new Error(`Conversion from raw to parsed markets failed!`);
      }

      console.log('markets:', markets);

      this.markets = markets;
    },
  },
  mounted() {
    // this.$store.commit("getCurrentPosition");
    // this.loadAll();
  }
};
</script>
