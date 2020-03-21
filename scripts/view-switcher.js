class ViewSwitcher {

  constructor(marketView, cartView, mapView) {

    this.marketView = marketView;
    this.cartView = cartView;
    this.mapView = mapView;
    
  }

  showMarkets() {

    this.marketView.classList.add('visible');
    this.cartView.classList.remove('visible');
    this.mapView.classList.remove('visible');
    
  }

  showCart() {

    this.marketView.classList.remove('visible');
    this.cartView.classList.add('visible');
    this.mapView.classList.remove('visible');
    
  }

  showMap() {

    this.marketView.classList.remove('visible');
    this.cartView.classList.remove('visible');
    this.mapView.classList.add('visible');
    
  }
  
}