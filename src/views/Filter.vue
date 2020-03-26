<template>
  <div>
    <div class="my-5 bg-white p-6 rounded shadow">
      <h1 class="text-xl font-semibold my-5">Produkte</h1>
      <div v-for="item in this.products" :key="item.id">
        <label class="custom-label flex">
          <div
            class="bg-white shadow w-6 h-6 p-1 flex justify-center items-center mr-2"
          >
            <input :id="item.id" v-model="isCheckedAll" type="checkbox" c />
          </div>
          <span class="select-none"> {{ item }}</span>
        </label>
      </div>
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
        @click="this.uncheckAll()"
        class="w-full m-10 text-center underline"
        href="#"
        >Filter löschen</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductFilter",
  data() {
    return {
      products: [],
      isCheckedAll: true
    };
  },
  mounted() {
    this.loadFood();
  },
  methods: {
    async loadFood() {
      let markets = (
        await this.axios.get(`http://${window.location.hostname}:3000/markets`)
      ).data;
      markets.forEach(market => {
        market.products.forEach(product => {
          this.products.push(product.name);
        });
      });
    },
    uncheckAll() {
      this.isCheckedAll = false;
    }
  }
};
</script>
