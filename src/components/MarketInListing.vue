<template>
  <div class="card">
    <div class="header">
      <h2>{{ name }}</h2>

      <img
        src="../../public/media/icons/chevron-right.svg"
        alt="Markt anzeigen"
      />
    </div>

    <div class="main">
      <div class="address">
        {{ address }}
      </div>

      <span class="distance"> {{ distance }} m </span>

      <div class="status">
        <span v-bind:class="status.class">{{status.text}}</span>
        <!-- statusAction ist entweder 'Schließt' oder 'Öffnet', ne nachdem ob der Markt gerade offen ist.
        statusTime ist die Uhrzeit, zu der der Markt schließt/öffnet -->
      </div>

      <div class="categories">
        <ul>
          <li :key="index" v-for="(category, index) in mainProducts">
            <div v-bind:class="'traffic-light ' + category.availability"></div>
            <span class="label">{{ category.name }}</span>
          </li>
        </ul>
      </div>
<!-- 
      <div class="updated">

        zuletzt aktualisiert am {{updated.date}} um {{updated.time}}
        
      </div> -->
      
    </div>
  </div>
</template>

<style scoped>
.card {
  display: block;
  position: relative;
  margin-top: 2%;
  width: 100%;
  height: 14rem;
  border-radius: 0.5rem;
  overflow: hidden;
}

.card .header {
  display: block;
  position: absolute;
  top: 0;
  width: 100%;
  height: var(--header-height);
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

<script>
  export default {
    name: 'MarketInListing',
    props: {
      name: String, 
      address: String,
      distance: Number,
      status: {
        text: String,
        class: String,
      },
      mainProducts: Array,
      updated: {
        date: String,
        time: String,
      },
    },
    mainProducts: Array,
    updated: {
      date: String,
      time: String
    }
  };
</script>
