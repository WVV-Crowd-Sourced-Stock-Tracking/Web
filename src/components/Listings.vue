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
      userPosition: {
        lat: 0,
        lng: 0
      },
    };
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
            rawMarket.products
          )
        );
      });

      if (rawMarkets.length != markets.length) {
        throw new Error(`Conversion from raw to parsed markets failed!`);
      }

      this.markets = markets;
    },
    async getCurrentPosition() {
      
        if (!navigator.geolocation) {
          console.error('Geolocation is not supported by your browser');
        } else {
          console.log('Locating…');
          let position;

          try {
            position = await (async () => {
              return new Promise((resolve, reject) => {
              
                navigator.geolocation.getCurrentPosition(position => {

                console.log('user lat:', position.coords.latitude);
                console.log('user lng:', position.coords.longitude);

                resolve({lat: position.coords.latitude, lng: position.coords.longitude});
                
              }, err => {
                console.error(`Couldn't acces user's position:`, err);
                reject({lat: 0, lng: 0});
              });
              
              })
            })();
          } catch (err) {
            console.error(err);
          }

          this.userPosition = position;
          this.loadAll();
          
        }
      
    }
  },
  mounted() {
    // this.$store.commit("getCurrentPosition");
    // this.loadAll();
    this.getCurrentPosition();
  }
};
</script>
