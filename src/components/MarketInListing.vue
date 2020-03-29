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
    <div class="flex flex-row justify-between w-full h-40 bg-white my-3 p-4 shadow-md rounded-md text-gray-700 leading-relaxed border-solid border-l-4 border-blue-600">

      <div class="w-11/12 pr-4">

        <h2 class="text-xl h-10 overflow-hidden text-gray-800">{{ name }}</h2>

          <div class="flex flex-row justify-between mb-1">

            <div class="w-full whitespace-no-wrap overflow-hidden">
              {{ address }}
            </div>

            <div class="w-20 text-right"> {{ distance }} m </div>

          </div>

          <div :class="[status.class=='opened' ? 'text-green-700' : 'text-red-700']">{{ status.text }}</div>

          <div>

            <ul v-if="mainProducts.length > 0" class="flex flex-row flex-wrap h-6 mt-2 overflow-hidden">
              <li :key="index" v-for="(product, index) in mainProducts" class="mr-4">
                <div v-if="product.availability == 'high'" class="inline-block w-4 h-4 rounded-full align-baseline" style="background-color:#6DD400;"></div>
                <div v-else-if="product.availability == 'medium'" class="inline-block w-4 h-4 rounded-full align-baseline" style="background-color:#F7B500;"></div>
                <div v-else-if="product.availability == 'low'" class="inline-block w-5 h-5 rounded-full align-baseline" style="background-color:#E02020;"></div>
                <div v-else class="inline-block w-5 h-5 rounded-full bg-gray-600 align-baseline" ></div>
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
          class="w-1/12 text-center"
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

<style scoped>

  /* .traffic-light.high {
    background-color: #6dd400;
  }
  .traffic-light.medium {
    background-color: #f7b500;
  }
  .traffic-light.low {
    background-color: #e02020;
  }

  .card {
    display: block;
    position: relative;
    margin-top: 1rem;
    width: 100%;
    height: 12rem;
    border-radius: 0.5rem;
    overflow: hidden;
    background: white;
  }
  
  .card .header {
    display: block;
    top: 0;
    width: 100%;
    padding-left: 1rem;
  }
  
  .card .header h2 {
    display: inline-block;
    position: relative;
    top: 0;
    width: 90%;
    height: 100%;
    font-size: calc(var(--header-height) / 2);
    font-weight: bold;
    line-height: 2.5rem;
  }
  
  .card .header img {
    display: inline-block;
    position: absolute;
    right: 0;
    top: 0;
    width: calc(var(--header-height));
    height: calc(var(--header-height));
  }
  
  .card .main {
    position: absolute;
    top: var(--header-height);
    width: 100%;
    height: calc(100% - var(--header-height));
    padding: 1rem;
    background-color: white;
    line-height: 2rem;
  }
  
  .card .main .address {
    display: inline-block;
    line-height: 1.5rem;
    width: 85%;
  }
  
  .card .main .distance {
    display: inline-block;
    position: absolute;
    right: 1rem;
  }
  
  .card .main .status span {
    font-weight: bold;
  }
  
  .card .main .status span.opened {
    color: limegreen;
  }
  
  .card .main .status span.closed {
    color: crimson;
  }
  
  .card .main .categories {
    display: block;
    width: 100%;
    margin-top: .5rem;
  }
  
  .card .main .categories ul {
    display: flex;
    flex-direction: right;
    flex-wrap: wrap;
    height: 2rem;
    overflow: hidden;
  }

  .card .main .categories ul li {
    margin-right: 1rem;
  }
  
  .card .main .categories ul li .traffic-light {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 100%;
  }
  
  .card .main .categories ul li .label {
    margin-left: 0.5rem;
  }
  
  .card .main .updated {
    width: 100%;
    text-align: center;
    margin-top: 0.5rem;
    color: #c8cbcd;
  } */
  </style>