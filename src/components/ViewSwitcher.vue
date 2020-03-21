<template>
  <nav>
    <ul>
      <li id="nav-list" class="active" onclick="viewSwitcher.showMarkets();">
        <img src="/media/icons/search.svg" alt="Suche" />
        <br />
        <span>Suche</span>
      </li>
      <li id="nav-shopping-list" onclick="viewSwitcher.showCart();">
        <img src="/media/icons/shopping-cart.svg" alt="Einkaufsliste" />
        <br />
        <span>Einkaufsliste</span>
      </li>
      <li id="nav-map" onclick="viewSwitcher.showMap();">
        <img src="/media/icons/map-2.svg" alt="Karte" />
        <br />
        <span>Karte</span>
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
  mounted() {
    this.marketView = this.$el.querySelector(`#${this.marketView}`);
    this.marketViewNav = this.$el.querySelector(`#nav-${this.marketView}`);
    this.cartView = this.$el.querySelector(`#${this.cartView}`);
    this.cartViewNav = this.$el.querySelector(`#nav-${this.cartView}`);
    this.mapView = this.$el.querySelector(`#${this.mapView}`);
    this.mapViewNav = this.$el.querySelector(`#nav-${this.mapView}`);
  },
  methods: {
    showMarkets() {
      this.marketView.classList.add('visible');
      this.marketViewNav.classList.add('active');

      this.cartView.classList.remove('visible');
      this.cartViewNav.classList.remove('active');

      this.mapView.classList.remove('visible');
      this.mapViewNav.classList.remove('active');
    },

    showCart() {
      this.marketView.classList.remove('visible');
      this.marketViewNav.classList.remove('active');

      this.cartView.classList.add('visible');
      this.cartViewNav.classList.add('active');

      this.mapView.classList.remove('visible');
      this.mapViewNav.classList.remove('active');
    },

    showMap() {
      this.marketView.classList.remove('visible');
      this.marketViewNav.classList.remove('active');

      this.cartView.classList.remove('visible');
      this.cartViewNav.classList.remove('active');

      this.mapView.classList.add('visible');
      this.mapViewNav.classList.add('active');
    }
  }
}
</script>
