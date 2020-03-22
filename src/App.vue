<template>
  <div id="app" class="container h-full mx-auto px-4 bg-100">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {}
};
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

/*
show the app in production
*/
.vue-map {
  overflow: visible !important;
  height: 100% !important;
  width: 100% !important;
}
.vue-map-container {
  overflow: hidden;
}
</style>
