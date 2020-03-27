<template>
  <div>
    <div class="my-5 bg-white p-6 rounded shadow">
      <h1 class="text-xl font-semibold my-5">Produkte</h1>
      <div v-for="item in products" :key="item.id">
        <label class="custom-label flex">
          <div
            class="bg-white shadow w-6 h-6 p-1 flex justify-center items-center mr-2"
          >
            <input :id="item.product_id" v-model="$store.state.filter" type="checkbox" :value="item.product_id" />
          </div>
          <span class="select-none"> {{ item.product_name }} {{item.product_id}}</span>
        </label>
      </div>
      <div>{{$store.state.filter}}</div>
    </div>
    <router-link
      :to="{
          name: 'Home',
        }"
      class="bg-blue-500 hover:bg-blue-400 w-full text-white py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
    >
      Supermärkte anzeigen
    </router-link>
    <div class="w-full flex content-center flex-wrap">
      <a
        @click="checkAll()"
        class="w-full m-10 text-center underline"
        href="#"
        >Filter löschen</a
      >
    </div>
  </div>
</template>

<script>
import API from "../assets/js/api";

export default {
  name: "ProductFilter",
  data() {
    return {
      API: new API('https://wvvcrowdmarket.herokuapp.com/ws/rest'),
      products: [],
      isCheckedAll: false
    };
  },
  mounted() {
    this.loadAllProducts();
  },
  methods: {
    async loadFood() {
      let markets = (
        await this.axios.get(`https://wvvcrowdmarket.herokuapp.com/ws/rest/product/scrape`)
      ).data;
      markets.forEach(market => {
        market.products.forEach(product => {
          this.products.push(product.name);
        });
      });
    },
    checkAll: function(){
      this.$store.state.filter = [];
    },
    async loadAllProducts() {  
      let allProducts, allProductsFiltered;
      
      try {
        allProducts = await this.API.loadAllProducts();
        // temporary fix until backend is cleaned up
        allProducts.map(product => {
          product.quantity = NaN; // quantity unknown
        })

      } catch (err) {
        console.error(err);
      }

      this.products = allProducts;
    }
  }
};
</script>
