<template>
  <div></div>
</template>

<script>
import API from './API.vue'
import Market from './Market.vue'

export default {
  name: 'Listing',
  methods: {
    async loadAll() {
      let rawMarkets, markets;

      rawMarkets = await API.loadMarkets();

      rawMarkets.forEach(rawMarket => {
        markets.push(new Market(rawMarket.id, rawMarket.name, rawMarket.city, rawMarkets.street, rawMarket.gps_length, rawMarket.gps_width));
      });

      if (rawMarkets.length != markets.length) {
        throw new Error(`Conversion from raw to parsed markets failed!`);
      }
    },

    addItem() {
    }
  }
}
</script>
