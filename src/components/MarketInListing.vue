<template>
  <router-link
    :to="{
      name: 'MarketDetail',
      params: {
        id: id,
        mapsId: mapsId,
        name: name,
        address: address,
        status: status,
        products: mainProducts,
        zip: zip
      }
    }"
  >
    <div class="flex flex-row justify-between w-full h-40 bg-white my-3 p-4 shadow-md rounded-md text-gray-700 leading-relaxed border-solid border-l-4" style="border-color: #006BAB;">

      <div class="w-11/12 pr-4">

        <h2 class="text-xl h-10 overflow-hidden text-gray-800">{{ name }}</h2>

          <div class="flex flex-row justify-between mb-1">

            <div class="w-full whitespace-no-wrap overflow-hidden">
              {{ address }}
            </div>

            <div class="w-20 text-right"> {{ distance }} m </div>

          </div>

          <div :class="[status.class=='opened' ? 'text-green-700' : 'text-red-700']">{{ status.text }}</div>
          {{status.next}}

          <div>

            <ul v-if="mainProducts.length > 0" class="flex flex-row flex-wrap h-6 mt-2 overflow-hidden">
              <li :key="index" v-for="(product, index) in mainProducts" class="mr-4">
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
export default {
  name: "MarketInListing",
  props: {
    id: Number,
    mapsId: String,
    name: String,
    address: String,
    distance: Number,
    status: {
      text: String,
      class: String
    },
    mainProducts: Array,
    zip: Number,
  },
};
</script>
