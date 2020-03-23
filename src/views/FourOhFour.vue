<template>
  <div>

    <vue-headful
      title="Seite nicht gefunden!"
      description="What's Left? Crowed Sourced Stock Tracking!"
    />

    <div class="w-full rounded mt-4 p-4 bg-white">

      <h1 class="text-center text-4xl">Diese Seite existiert leider nicht!</h1>

      <img src="https://http.cat/404" alt="404" class="w-1/2 rounded m-auto mt-10">

      <a href="/" class="inline-block ml-4 mt-10 p-2 shadow bg-gray-100"><h2 class="text-2xl text-blue-500">zurück zur Startseite</h2></a>
        
    </div>
    
    
  </div>
</template>

<script>
export default {
  name: 'FourOhFour',
};
</script>

<style lang="scss">
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
