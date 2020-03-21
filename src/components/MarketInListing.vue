<template>

  <div class="card">

    <div class="header">

      <h3>{{ name }}</h3>
      
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