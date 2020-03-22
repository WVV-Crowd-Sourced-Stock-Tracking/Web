<template>
  <div id="app" class="container h-full mx-auto px-4">
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
  background-color: #e5e5e5;
}
#app {
  background-color: #e5e5e5;
  height: auto;
  padding-bottom: 50px;
}
</style>
