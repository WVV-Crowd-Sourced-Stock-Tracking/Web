<template>
  <nav>
    <ul>
      <li id="nav-list" class="active" @click="showMarkets()">
        <a>
          <img src="/media/icons/search.svg" alt="Suche" />
          <br />
          <span>Suche</span>
        </a>
      </li>
      <li id="nav-shopping-list" @click="showCart()">
        <a>
          <img src="/media/icons/shopping-cart.svg" alt="Einkaufsliste" />
          <br />
          <span>Einkaufsliste</span>
        </a>
      </li>
      <li id="nav-map" @click="showMap()">
        <a>
          <img src="/media/icons/map-2.svg" alt="Karte" />
          <br />
          <span>Karte</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'ViewSwitcher',
  props: {
    _marketView: String,
    _cartView: String,
    _mapView: String
  },
  methods: {
    showMarkets() {
      this.$emit('show', this._marketView);
    },

    showCart() {
      this.$emit('show', this._cartView);
    },

    showMap() {
      this.$emit('show', this._mapView);
    }
  }
}
</script>

<style scoped>
a {
  cursor: pointer;
}
</style>
