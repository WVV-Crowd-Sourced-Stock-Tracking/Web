<template>
  <router-link
    :to="{
      name: 'MarketDetail',
      params: {
        mapsId: market.mapsId,
        market: market
      }
    }"
  >
    <div class="flex flex-row justify-between w-full h-40 bg-white my-3 p-4 shadow-md rounded-md text-gray-700 leading-relaxed border-solid border-l-4" style="border-color: #006BAB;">

      <div class="w-11/12 pr-4">

        <h2 class="text-xl h-10 overflow-hidden text-gray-800">{{ market.name }}</h2>

          <div class="flex flex-row justify-between mb-1">

            <div class="w-full whitespace-no-wrap overflow-hidden">
              {{ market.address }}
            </div>

            <div class="w-20 text-right"> {{ market.distance }} m </div>

          </div>

          <div>
            <span v-if="market.status.class == 'opened'" class="font-medium text-green-700">{{ market.status.text }}</span>
            <span v-else-if="market.status.class == 'closed'" class="font-medium text-red-700">{{ market.status.text }}</span>
            <span v-else class="font-medium italic">{{ market.status.text }}</span>
            {{market.status.next}}
          </div>

          <div>

            <ul v-if="market.products.length > 0" class="flex flex-row flex-wrap h-6 mt-2 overflow-hidden">
              <li :key="index" v-for="(product, index) in market.products" class="mr-4">
                <div v-if="product.availability == 'high'" class="inline-block w-3 h-3 rounded-full align-center" style="background-color:#6DD400;"></div>
                <div v-else-if="product.availability == 'medium'" class="inline-block w-3 h-3 rounded-full align-center" style="background-color:#F7B500;"></div>
                <div v-else-if="product.availability == 'low'" class="inline-block w-3 h-3 rounded-full align-center" style="background-color:#E02020;"></div>
                <div v-else class="inline-block w-3 h-3 rounded-full bg-gray-600 align-center" ></div>
                <div class="inline-block ml-1 text-lg">{{ product.name }}</div>
              </li>
            </ul>

            <div v-else class="mt-2 italic">
              Keine Produktinformationen
            </div>

          </div>

      </div>

        <img
          src="@/assets/icons/Chevron_Right_Blue.svg"
          alt="Markt anzeigen"
          class="w-1/12"
        />
        <!-- 
        <div class="updated">

          zuletzt aktualisiert am {{updated.date}} um {{updated.time}}
          
        </div> -->
    </div>

  </router-link>
  
</template>

<script>

import Market from '@/assets/js/market';

export default {
  name: "MarketInListing",
  props: {
    // market: {
    //   id: Number,
    //   name: String,
    //   city: String,
    //   street: String,
    //   lat: Number,
    //   lng: Number,
    //   distance: Number,
    //   products: [],
    //   mapsId: String,
    //   zip: Number,
    //   iconUrl: String,
    //   periods: [],
    //   lastUpdated: Date,
    // }
    market: Market,
  },
};
</script>
