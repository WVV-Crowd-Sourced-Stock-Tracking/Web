<template>
  <div class="card">
    <div class="header">
      <h2>{{ this.$route.params.name }}</h2>
    </div>

    <div class="main">
      <div class="address">
        <h1 class="text-m font-semibold">Addresse:</h1>
        {{ this.$route.params.address }}
      </div>
      <h1 class="text-m font-semibold">Öffnungszeiten:</h1>
      <div class="status">
        <span v-bind:class="this.$route.params.status.class">{{
          this.$route.params.status.text
        }}</span>
      </div>

      <table class="table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2"></th>
            <th class="px-4 py-2">Produkte</th>
            <th class="px-4 py-2">Bestand</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in this.$route.params.products" :key="item.name">
            <td class="border px-4 py-2">
              <div
                class="h-5 w-5 rounded-full bg-green-500"
                v-if="item.availability === 'high'"
              ></div>
              <div
                class="h-5 w-5 rounded-full bg-yellow-500"
                v-else-if="item.availability === 'medium'"
              ></div>
              <div class="h-5 w-5 rounded-full bg-red-500" v-else></div>
            </td>
            <td class="border px-4 py-2">{{ item.name }}</td>
            <td class="border px-4 py-2">
              <span v-if="item.availability === 'high'">vorrätig</span>
              <span v-else-if="item.availability === 'medium'"
                >fast ausverkauft</span
              >
              <span v-else>ausverkauft</span>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- {{ this.$route.params.products }} -->
    </div>
  </div>
</template>

<style scoped>
.card {
  display: block;
  position: relative;
  margin-top: 2%;
  width: 100%;
  height: 100vh;
  border-radius: 0.5rem;
  overflow: hidden;
}

.card .header {
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #006bab;
  padding-left: 1rem;
  color: white;
}

.card .header h2 {
  display: inline-block;
  position: relative;
  top: 0;
  width: 60%;
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
  filter: invert(1);
}

.card .main {
  position: absolute;
  top: var(--header-height);
  width: 100%;
  height: calc(100% - var(--header-height));
  padding: 3%;
  background-color: white;
  line-height: 2rem;
}

.card .main .address {
  display: inline-block;
}

.card .main .distance {
  display: inline-block;
  position: absolute;
  right: 2rem;
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
  margin-top: 1rem;
}

.card .main .categories ul {
  display: flex;
  flex-direction: right;
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

.card .main .categories ul li {
  margin-right: 2rem;
}

.card .main .updated {
  width: 100%;
  text-align: center;
  margin-top: 0.5rem;
  color: #c8cbcd;
}
</style>
