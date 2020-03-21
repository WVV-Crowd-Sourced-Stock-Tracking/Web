<template>
  <div id="app" class="container mx-auto px-4">
    <h1>Shops</h1>
    <p>in Ihrer Umgebung</p>
    <Listings />
  </div>
</template>

<script>
import Listings from "./components/Listings.vue";

export default {
  name: "App",
  components: {
    Listings
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
