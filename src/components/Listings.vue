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
      :zip="market.zip"
    ></MarketInListing>
  </div>
</template>

<script>
// import Market from "./Market.vue";
import MarketInListing from "@/components/MarketInListing.vue";
// import Market from "@/assets/js/market";
// import API from "@/assets/js/api";

export default {
  name: "Listing",
  components: {
    MarketInListing
  },
  data: function() {
    return {
      // loaded: false,
      // markets: [],
      // rawMarkets: [],
      // API: new API('https://wvvcrowdmarket.herokuapp.com/ws/rest'),
    };
  },
  // watch: {
  //   center: {
  //     handler: function() {
        
  //       console.log('center updated');
  //       this.loaded = true;

  //       this.loadRawMarkets();
        
  //     }
  //   },
  //   radius: {
  //     handler: function() {
        
  //       console.log('radius updated');
  //       this.loadRawMarkets();
        
  //     }
  //   },
  //   rawMarkets: {
  //     handler: function(newRawMarkets) {

  //       this.markets = [];

  //       newRawMarkets.forEach(rawMarket => {
  //         this.markets.push(
  //           new Market(
  //             rawMarket.id,
  //             rawMarket.name,
  //             rawMarket.city,
  //             rawMarket.street,
  //             rawMarket.lat,
  //             rawMarket.lng,
  //             rawMarket.distance,
  //             rawMarket.open,
  //             rawMarket.products,
  //             rawMarket.mapsId
  //           )
  //         );
  //       });
        
  //     }
  //   }
  // },
  computed: {
    // center: function() {
    //   return this.$store.getters.center;
    // },
    // radius: function() {
    //   return this.$store.getters.radius;
    // },
    markets: function() {
      return this.$store.getters.markets;
    }
  },
  // methods: {
  //   loadRawMarkets() {

  //     this.API.loadMarkets(this.center.lat, this.center.lng, this.radius).then(rawMarkets => {
  //         console.log('rawMarkets:', rawMarkets);
  //         this.rawMarkets = rawMarkets;
  //       })
      
  //   }
  // // },
  // mounted() {
    
  //   if (!this.loaded) {
  //     this.loadRawMarkets();
  //   }
    
  // }
};
</script>
