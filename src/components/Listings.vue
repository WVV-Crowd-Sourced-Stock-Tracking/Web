<template>

  <div class="listing">

    <MarketInListing :key="index" v-for="(market, index) in markets"
      :name= "market.name"
      :address= "market.address"
      :distance= "market.distance"
      :status = "market.status"
      :mainProducts= "market.products"
      :updated= "market.updated"
    ></MarketInListing>

  </div>


</template>

<script>
// import API from "./API.vue";
// import Market from "./Market.vue";
import MarketInListing from "./MarketInListing.vue";
import Market from "../classes/market";

export default {
  name: "Listing",
  components: {
    MarketInListing,
  },
  // props: {
  //   markets: [{
  //     name: String, 
  //     address: String,
  //     distance: String,
  //     status: {
  //       text: String,
  //       action: String,
  //       time: String,
  //     },
  //     mainCategories: Array,
  //     modified: {
  //       date: String,
  //       time: String,
  //     },
  //   }]
  // },
  data: () => {
    return {
      markets: [],
    }
  },
  methods: {
    async loadAll() {

      let rawMarkets;
      let markets = [];
      
      // rawMarkets = await API.loadMarkets();
      rawMarkets = (await this.axios.get(`http://${window.location.hostname}:3000/markets`)).data;

      console.log('rawMarkets:', rawMarkets);

      rawMarkets.forEach(rawMarket => {
        console.log('rawMarket:', rawMarket);
        markets.push(new Market(
          rawMarket.id,
          rawMarket.name,
          rawMarket.city,
          rawMarket.street,
          rawMarket.gps_length,
          rawMarket.gps_width,
          rawMarket.distance,
          rawMarket.status,
          rawMarket.products,
          rawMarket.updated
        ));
      });

      if (rawMarkets.length != markets.length) {
        throw new Error(`Conversion from raw to parsed markets failed!`);
      }

      this.markets = markets;

      console.log('this.markets:', this.markets);
      
    },

    addItem() {}
  },
  mounted() {
    this.loadAll();
  }
};
</script>
