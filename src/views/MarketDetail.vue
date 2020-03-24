<template>
  <div>

    <vue-headful
      :title="market.name"
      description="What's Left? Crowed Sourced Stock Tracking!"
    />

    <div v-if="loading.finished && loading.success">

      <router-link
        :to="{
          name: 'Home',
        }"
      >

        <div class="w-full h-32">
          <img class="w-full h-full object-cover object-center" src="/img/arch-bridge-clouds-814499.jpg" alt="Placeholder">
          <div class="absolute top-0 ml-4 mt-10 overflow-hidden rounded-full w-10 h-10">
            <div class="absolute w-full h-full bg-black opacity-75"></div>
            <img
              class="m-auto opacity-100 w-full h-full"
              style="filter: invert(1);"
              src="@/assets/icons/chevron-left.svg"
              alt="Markt anzeigen"
            />
          </div>
        </div>

      </router-link>

      <div class="bg-white text-gray-700 p-6">

        <div class="w-full whitespace-no-wrap overflow-hidden">
          <h2 class="text-3xl font-bold overflow-y-scroll">{{ market.name }}</h2>
        </div>

        <div class="my-4">
          <div class="text-m font-semibold">Addresse:</div>
          <div class="w-full my-2" >{{ market.address }}</div>
        </div>
        
        <div>
          <div class="text-m font-semibold">Öffnungszeiten:</div>
          <div class="w-full my-2"> {{market.status.text }} </div>
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

    <div v-else-if="!loading.finished">

      Marktinformationen werden geladen...

    </div>

    <div v-else>

      <div class="w-full rounded mt-4 p-4 bg-white">

        <h1 class="text-center text-2xl">Sorry, der Markt konnte nicht geladen werden!</h1>

        <router-link
          :to="{
            name: 'Home',
          }"
        >
          <div class="inline-block ml-4 mt-10 p-2 shadow bg-gray-100">
            <h2 class="text-2xl text-blue-500">zurück zur Startseite</h2>
          </div>
        </router-link>
          
      </div>

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
      loading: {
        finished: false,
        success: true,
      },
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

      console.log('this.$route.params.id:', this.$route.params.mapsId);

      try {
        rawMarket = (await this.API.loadMarket({mapsId: this.$route.params.mapsId})).supermarket;
      } catch (err) {
        console.error(err);
        this.loading = {finished: true, success: false};
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
        rawMarket.mapsId,
        rawMarket.zip,
      );

      console.log('market:', market);

      this.market = market;
      this.loading = {finished: true, success: true};
      
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
    if (this.$route.params.name != undefined) {
      this.market = this.$route.params;
      this.loading = {finished: true, success: true};
    } else {
      this.loadData();
    }
    // this.getCurrentPosition();
    // this.loadDistance();
  },
}
</script>
