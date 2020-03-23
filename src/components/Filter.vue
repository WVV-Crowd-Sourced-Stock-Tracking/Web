<template>
  <div>
    <h1 class="text-xl font-semibold">Produkte</h1>
    <div v-for="item in this.products" :key="item.id">
      <label class="custom-label flex">
        <div
          class="bg-white shadow w-6 h-6 p-1 flex justify-center items-center mr-2"
        >
          <input type="checkbox" checked />
        </div>
        <span class="select-none"> {{ item }}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductFilter",
  data() {
    return {
      products: []
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
    }
  }
};
</script>
