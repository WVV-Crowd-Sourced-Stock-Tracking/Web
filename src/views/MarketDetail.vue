<template>
  <div class="card">
    <div class="header">
      <h2>{{ this.$route.params.name }}</h2>
    </div>

    <div class="main">
      <div class="zwei-spalten">
        <div class="address">
          <h1 class="text-m font-semibold">Addresse:</h1>
          {{ this.$route.params.address }}
        </div>
        <div>
          <h1 class="text-m font-semibold">Öffnungszeiten:</h1>
          <div class="status">
            <span v-bind:class="this.$route.params.status.class">{{
              this.$route.params.status.text
            }}</span>
          </div>
        </div>
      </div>
      <div class="map w-full"> 

      </div>
      

      <table class="table-auto w-full">
        <thead>
          <tr>
            <th class="px-4 py-2">Produkte</th>
            <th class="px-4 py-2">Verfügbarkeit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in this.$route.params.products" :key="item.name">
            <td class="border px-4 py-2">{{ item.name }}</td>
            <td class="border px-4 py-2">
              <div class="verfugbarkeit-item">
                <span v-if="item.availability === 'high'">vorrätig</span>
              <span v-else-if="item.availability === 'medium'"
                >fast ausverkauft</span
              >
              <span v-else>ausverkauft</span>

              <div
                class="h-5 w-5 rounded-full bg-green-500"
                v-if="item.availability === 'high'"
              ></div>
              <div
                class="h-5 w-5 rounded-full bg-yellow-500"
                v-else-if="item.availability === 'medium'"
              ></div>
              <div class="h-5 w-5 rounded-full bg-red-500" v-else></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- {{ this.$route.params.products }} -->
    </div>
  </div>
</template>

<script>

import API from "../assets/js/api";

export default {
  name: 'MarketDetail',
  props: {
    userPosition: {
      lat: Number,
      lng: Number,
    }
  },
  data() {
    return {
      API: new API('https://wvvcrowdmarket.herokuapp.com/ws/rest'),
      products: [],
    }
  },
  methods: {
    async loadData() {

      let rawProducts;

      console.log('this.$route.params.id:', this.$route.params.id);

      try {
        rawProducts = this.API.loadMarketStock(this.$route.params.id);
      } catch (err) {
        console.error(err);
      }

      this.products = rawProducts;
      
    }
  },
  async mounted() {
    this.userPosition.then(pos => {
      console.log('pos:', pos);
    })
    this.loadData();
  }
}
</script>

<style lang="sass">
.zwei-spalten
  display: grid
  grid-template-columns: 1fr 1fr
.map
  height: 300px
  background: black

.verfugbarkeit-item 
  display: flex
  align-items: center
  justify-content: center

  * 
    padding-right: 10px

.card 
  display: block
  position: relative
  margin-top: 2%
  width: 100%
  border-radius: 0.5rem
  overflow: hidden

.card .header 
  display: block
  width: 100%
  height: auto
  background-color: #006bab
  padding-left: 1rem
  color: white

.card .header h2 
  display: inline-block
  position: relative
  top: 0
  height: 100%
  font-size: calc(var(--header-height) / 2)
  font-weight: bold
  line-height: 2.5rem

.card .header img 
  display: inline-block
  position: absolute
  right: 0
  top: 0
  width: calc(var(--header-height))
  height: calc(var(--header-height))
  filter: invert(1)

.card .main 
  width: 100%
  padding: 3%
  background-color: white
  line-height: 2rem

.card .main .address 
  display: inline-block

.card .main .distance 
  display: inline-block
  position: absolute
  right: 2rem

.card .main .status span 
  font-weight: bold

.card .main .status span.opened 
  color: limegreen

.card .main .status span.closed 
  color: crimson

.card .main .categories 
  display: block
  width: 100%
  margin-top: 1rem

.card .main .categories ul 
  display: flex
  flex-direction: right

.card .main .categories ul li .traffic-light 
  display: inline-block
  width: 1rem
  height: 1rem
  border-radius: 100%

.card .main .categories ul li .label 
  margin-left: 0.5rem

.card .main .categories ul li 
  margin-right: 2rem

.card .main .updated 
  width: 100%
  text-align: center
  margin-top: 0.5rem
  color: #c8cbcd

</style>
