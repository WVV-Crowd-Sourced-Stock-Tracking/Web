<template>

  <div class="card">

    <div class="header">

      <h2>{{ name }}</h2>
      
      <img src="../../public/media/icons/chevron-right.svg" alt="Markt anzeigen">
      
    </div>

    <div class="main">

      <div class="address">
        {{address}}
      </div>

      <span class="distance">
        {{distance}}
      </span>

      <div class="status">
        <span>{{statusText}}</span> ({{statusAction}} um {{statusTime}})
        <!-- statusAction ist entweder 'Schließt' oder 'Öffnet', ne nachdem ob der Markt gerade offen ist.
        statusTime ist die Uhrzeit, zu der der Markt schließt/öffnet -->
      </div>

      <div class="categories">

        <ul>

          <li :key="index"
          v-for="(category, index) in mainCategories">
            <div v-bind:class="'traffic-light '+ category.availability"></div>
            <span class="label">{{category.name}}</span>  
          </li>

        </ul>
        
      </div>
      
    </div>
  
  </div>

</template>

<style scoped>

  .card {
    display: block;
    position: relative;
    width: 100%;
    left: 0%;
    height: 15rem;
    border-radius: .5rem;
    overflow: hidden;
  }

  .card .header {
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: var(--header-height);
    background-color: #006BAB;
    padding-left: 1%;
    color: white;
  }

  .card .header h2 {
    display: inline-block;
    position: relative;
    top: 0;
    width: 60%;
    font-size: calc(var(--header-height) / 2);
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
    padding: 3%;
    background-color: white;
  }

</style>

<script>
  export default {
    name: 'MarketInListing',
    props: {
      name: String, 
      address: String,
      distance: String,
      // status: {
      //   text: String,
      //   action: String,
      //   time: String,
      // },
      statusText: String,
      statusAction: String,
      statusTime: String,
      mainCategories: Array,
    },
    methods: {
      
    }
  }
</script>