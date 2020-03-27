<template>
  <div>

    <vue-headful
      :title="market.name"
      description="What's Left? Crowed Sourced Stock Tracking!"
    />

    <div
      v-if="loading.finished && loading.success"
      class="h-screen"
      >

      <router-link
        :to="{
          name: 'Home',
        }"
      >

        <div class="flex flex-both justify-center fixed top-0 left-0 ml-4 mt-10 overflow-hidden rounded-full w-12 h-12 z-10">
            <div class="absolute w-full h-full bg-black opacity-75"></div>
            <img
              class="w-3/4 h-3/4 z-10"
              src="@/assets/icons/Chevron_Left_White.svg"
              alt="Zurück"
            />
          </div>

      </router-link>

      <div class="w-full h-32">
        <img class="w-full h-full object-cover object-center" src="/media/items-organized-on-shelves-3687999.jpg" alt="Photo by Mehrad Vosoughi from Pexels" title="Photo by Mehrad Vosoughi from Pexels">
      </div>

      <div class="bg-white w-full min-h-full h-auto pb-16">

        <div class="w-full h-full p-6">

          <div class="w-full whitespace-no-wrap overflow-hidden">
            <h2 class="text-3xl text-gray-700 font-bold overflow-y-scroll tracking-tight">{{ market.name }}</h2>
          </div>

          <div class="my-4">
            <div class="text-m text-gray-800 font-semibold tracking-wider">Addresse:</div>
            <div class="w-full my-1 text-gray-700" >{{ market.address }}</div>
          </div>

          <div>
            <div class="text-m text-gray-800 font-semibold tracking-wider">Öffnungszeiten:</div>
            <div class="w-full my-1 text-gray-700">
              <span v-if="market.status.class == 'opened'" class="text-green-600">{{market.status.text }}</span>
              <span v-else class="text-red-600">{{market.status.text }}</span>
            </div>
          </div>
          
        </div>

        <form onsubmit="event.preventDefault();">
          <table class="relative mt-4 table-fixed w-full">
            <thead class="bg-gray-100 opacity-75 shadow-md text-left tracking-wide">
              <tr class="h-16">
                <th class="w-1/2 pl-6 font-medium">Produkt</th>
                <th class="w-1/2 pl-6 font-medium">
                  <span v-if="!editMode">Bestand</span>
                  <div v-if="editMode" class="flex flex-row justify-center text-center">
                    <span class="inline-block w-12 mx-3" style="color: #E02020">leer</span>
                    <span class="inline-block w-12 mx-3" style="color: #F7B500">wenig</span>
                    <span class="inline-block w-12 mx-3" style="color: #6DD400">viel</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="product in market.products"
                :key="product.name"
              >
                <td class="relative h-16 text-left align-middle border-t pl-6">
                  <div class="inline-block font-bold text-gray-800">
                    {{ product.name }}
                  </div>
                </td>

                <td v-if="editMode" class="relative h-full text-center align-middle border-t pl-6">

                    <div class="flex flex-row justify-center h-full">

                      <div class="flex flex-col justify-center h-12 w-16 mr-1 rounded" :style="'background-color:'+[product.availability == 'low' ? '#E02020' : '#F9D2D2']">
                        <input type="radio" v-model="product.availability" :name="'product-' + product.id" value="low" class="form-radio m-auto focus:border-none focus:shadow-none focus:outline-none text-red-400">
                      </div>
                      <div class="flex flex-col justify-center h-12 w-16 mr-1 rounded" :style="'background-color:'+[product.availability == 'medium' ? '#F7B500' : '#FDF0CC']">
                        <input type="radio" v-model="product.availability" :name="'product-' + product.id" value="medium" class="form-radio m-auto focus:border-none focus:shadow-none focus:outline-none text-yellow-400">
                      </div>
                      <div class="flex flex-col justify-center h-12 w-16 mr-1 rounded" :style="'background-color:'+[product.availability == 'high' ? '#6DD400' : '#E2F6CC']">
                        <input type="radio" v-model="product.availability" :name="'product-' + product.id" value="high" class="form-radio m-auto focus:border-none focus:shadow-none focus:outline-none text-green-400">
                      </div>

                    </div>

                </td>
                <td v-else class="relative h-full border-t text-left pl-6">

                  <div class="inline-block h-4 w-4 rounded-full overflow-hidden align-text-bottom">
                    <div v-if="product.availability === 'high'" class="w-full h-full bg-green-500"></div>
                    <div v-else-if="product.availability === 'medium'" class="w-full h-full bg-yellow-500"></div>
                    <div v-else-if="product.availability === 'low'" class="w-full h-full bg-red-500"></div>
                    <div v-else class="w-full h-full bg-gray-600"></div>
                  </div>

                  <div class="inline-block ml-4">
                    <span v-if="product.availability === 'high'">verfügbar</span>
                    <span v-else-if="product.availability === 'medium'">fast ausverkauft</span>
                    <span v-else-if="product.availability === 'low'">ausverkauft</span>
                    <span v-else>sorry, keine Daten...</span>
                  </div>

                </td>

              </tr>
            </tbody>
          </table>
        </form>

        <button class="fixed bottom-0 right-0 mr-5 mb-5 w-16 h-16 rounded-full focus:outline-none overflow-hidden" v-on:click="toggleEdit">
          <div class="flex flex-col justify-center w-full h-full" style="background-color: #006BAB">
            <img v-if="editMode" src="@/assets/icons/Save_White.svg" class="m-auto w-1/2 h-1/2"/>
            <img v-else src="@/assets/icons/Edit_white.svg" class="m-auto w-1/2 h-1/2"/>
          </div>
        </button>
        
      </div>

    </div>

    <div v-else-if="!loading.finished">

      <div class="w-full rounded mt-4 p-4 bg-white">

        <h1 class="text-center text-2xl">Marktinformationen werden geladen...</h1>
          
      </div>

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
        id: '',
        mapsId: '',
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
  computed: {
    // use this function so keep the list sorted based on availability/quantity
    // this probably shouldn't be a computed property, because it will reorder the elements as soon as the user selects a radio button
    // make this a function which is called after the market and the products are loaded and also after the user submits the stock info
    // TO USE THIS FUNCITON: just use 'productsSorted' in the v-for directive that creates the product list
    productsSorted: function() {
      let copy = [...this.market.products];
      copy.sort((a, b) => {
        if (a.availability == b.availability) {
          return 0;
        } else {
          switch (a.availability) {
            case 'high':
              return 1;

            case 'medium':
              if (b.availability == 'low') {
                return 1;
              } else {
                return -1;
              }

            case 'low':
              return -1;

          }
        }
      });
      console.log('copy:', copy);
      return copy;
    }
  },
  watch: {
    editMode: {
      handler: function(isEditMode) {
        if (isEditMode == false) {
          this.submitStock();
        }
      }
    }
  },
  methods: {
    toggleEdit: function() {
      this.editMode = !this.editMode;
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
        rawMarket.products.reverse(),
        rawMarket.mapsId,
        rawMarket.zip,
      );

      console.log('market:', market);

      this.market = market;
      this.loading = {finished: true, success: true};

      this.loadAllProducts();

    },
    async loadAllProducts() {
      
      let allProducts, allProductsFiltered;
      
      try {
        allProducts = await this.API.loadAllProducts();
        // temporary fix until backend is cleaned up
        allProducts.map(product => {
          product.name = product.product_name;
          product.id = product.product_id;
          product.quantity = NaN; // quantity unknown
        })

        allProducts = this.market.products.concat(allProducts);

      } catch (err) {
        console.error(err);
      }

      allProductsFiltered = allProducts.filter((product, index) => {
        let foundProduct = allProducts.find(x => x.id == product.id);
        return allProducts.indexOf(foundProduct) === index;
      });

      this.market.products = allProductsFiltered;
      
    },
    async submitStock() {

      let filteredProducts, result;

      // filter products with no data, where the user didn't update the stock
      filteredProducts = this.market.products.filter(product => product.availability != undefined);

      // set the quantity according to the availability, because only the availability is changed by selecting a radio
      filteredProducts.map(product => {
        if (product.availability == 'low') {
          product.quantity = 0;
        } else if (product.availability == 'medium') {
          product.quantity = 50;
        } else {
          product.quantity = 100;
        }
      })

      try {
        result = await this.API.updateMarketStock(this.market.id, filteredProducts);
      } catch (err) {
        console.error(err);
      }

      console.log('result:', result);
      
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
    this.loadAllProducts();
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // this.getCurrentPosition();
    // this.loadDistance();
  },
}
</script>
