<template>
  <div class="card">
    <div class="header">
      <h2>{{ market.name }}</h2>
    </div>

    <div class="main">

      <div class="zwei-spalten">
        <div class="address">
          <h1 class="text-m font-semibold">Addresse:</h1>
          {{ market.address }}
        </div>
        <div>
          <h1 class="text-m font-semibold">Öffnungszeiten:</h1>
          <div class="status">
            <span v-bind:class="market.status.class">{{
              market.status.text
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
          <tr v-for="item in market.products" :key="item.name">
            <td class="border px-4 py-2">{{ item.name }}</td>
            <td class="border px-4 py-2" v-if="editMode">
                <div class="editButtons">
                  <div><div class="h-5 w-5 rounded-full bg-green-500"></div></div>
                  <div><div class="h-5 w-5 rounded-full bg-yellow-500"></div></div>
                  <div><div class="h-5 w-5 rounded-full bg-red-500"></div></div>
                </div>
            </td>
            <td class="border px-4 py-2" v-else>
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

      <button class="EditButton" v-on:click="toggleEdit">
        <span v-if="editMode">Bestand senden</span>
        <span v-else>Bestand aktualisieren</span>
      </button>
    </div>
  </div>
</template>

<script>

import Market from "../assets/js/market";
import API from "../assets/js/api";

export default {
  name: 'MarketDetail',
  data() {
    return {
      API: new API('https://wvvcrowdmarket.herokuapp.com/ws/rest'),
      market: {
        name: '',
        address: '',
        status: {
          text: '',
          class: '',
        },
        products: [],

      },
      editMode: false,
      userPosition: {
        lat: 0,
        lng: 0
      },
    }
  },
  methods: {
    toggleEdit: function() {
      this.editMode = !this.editMode
      console.log(this.editMode)
    },
    async loadData() {

      let rawMarket;

      console.log('this.$route.params.id:', this.$route.params.id);

      try {
        rawMarket = (await this.API.loadMarket(this.$route.params.id)).supermarket;
      } catch (err) {
        console.error(err);
      }

      console.log('rawMarket:', rawMarket);

      let market = new Market(
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
      );

      console.log('market:', market);

      this.market = market;
      
    },
    async loadDistance() {

      let rawMarkets, rawCurrentMarket, currentMarket;

      console.log('this.userPosition.lat:', this.userPosition.lat);

      try {
        rawMarkets = await this.API.loadMarkets(this.userPosition.lat, this.userPosition.lng, 5000);
      } catch (err) {
        console.error(err);
      }

      [rawCurrentMarket] = rawMarkets.filter(market => market.id == this.$route.params.id);

      currentMarket = new Market(
        rawCurrentMarket.id,
        rawCurrentMarket.name,
        rawCurrentMarket.city,
        rawCurrentMarket.street,
        rawCurrentMarket.lat,
        rawCurrentMarket.lng,
        rawCurrentMarket.distance,
        rawCurrentMarket.open,
        rawCurrentMarket.products,
        rawCurrentMarket.mapsId
      );

      this.market.distance = currentMarket.distance;
      
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
          this.loadDistance();
          
        }
      
    }
  },
  mounted() {
    // this.$store.commit("getCurrentPosition");
    // if params are missing, this will cause errors because of missing nested objects
    this.market = this.$route.params;
    this.loadData();
    // this.getCurrentPosition();
    // this.loadDistance();
  },
}
</script>

<style lang="sass">
.EditButton 
  position: relative
  left: 50%
  transform: translate(-50%)
  background: blue
  padding: 10px
  border-radius: 10px
  color: white
  margin-top: 30px

.editButtons 
  display: grid
  grid-template-columns: 1fr 1fr 1fr
  > div
    text-align: center
    margin: 0 10px

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
