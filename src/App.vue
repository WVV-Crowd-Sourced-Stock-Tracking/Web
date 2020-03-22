<template>
  <div id="app" class="container h-full mx-auto px-4 bg-gray-100">
    <Header />
    <router-view/>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";


export default {
  name: 'App',
  components: {
    Header
  },
  data() {
    return {
      show: "list"
    };
  },
}
</script>

<style>

:root {
  --header-height: 2.5rem;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  font-size: 1em;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: Arial, Helvetica, sans-serif;
  background-color: #E5E5E5;
}
#app {
  background-color: #E5E5E5;
  height: auto;
  padding-bottom: 50px;
}
#home {
  padding-bottom: 25px;
}
.traffic-light.high {
  background-color: #6dd400;
}
.traffic-light.medium {
  background-color: #f7b500;
}
.traffic-light.low {
  background-color: #e02020;
}
</style>