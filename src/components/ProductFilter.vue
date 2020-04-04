<template>
  <div class="fixed flex flex-col justify-center w-screen h-screen z-10 px-6 py-20" style="background-color: rgba(0, 0, 0, 0.6);">
    <div class="flex flex-col w-auto h-full bg-white rounded-md shadow-md p-6 text-left text-gray-900">

      <h3 class="text-xl font-medium px-4">Shops filtern:</h3>

      <ul class="w-full h-auto overflow-y-scroll px-4 my-3 pb-16">

        <li
          v-for="product in products" :key="product.id"
          class="leading-10"
        >
          <label :for="'filter-product-'+product.id" class="inline-block w-5/6">
            {{product.emoji}} {{product.name}}
          </label>

          <div class="inline-block w-1/6 text-right">
            <input type="checkbox" name="filter" :value="product.id" :id="'filter-product-'+product.id" v-model="filter">
          </div>

        </li>
        
      </ul>

      <button @click="$store.dispatch('toggleShowFilter');" class="block w-full h-16 text-xl text-center font-medium text-gray-100 rounded tracking-wide py-5" style="background-color: #006BAB;">
        Supermärkte anzeigen
      </button>

      <button @click="filter=[]; $store.dispatch('toggleShowFilter');" class="underline text-md mt-4 focus:outline-none">
        Filter zurücksetzen
      </button>

    </div>
  </div>
</template>

<script>

import API from '@/assets/js/api';

export default {
  name: 'ProductFilter',
  data() {
    return {
      API: new API('https://wvv2.herokuapp.com/ws/rest'),
    }
  },
  computed: {
    filter: {
      get: function() {
        return this.$store.getters.filter;
      },
      set: function(newFilter) {
        this.$store.dispatch('updateFilter', newFilter);
      }
    },
    products: function() {
      return this.$store.getters.products;
    }
  },
}
</script>