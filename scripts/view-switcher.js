class ViewSwitcher {

  constructor(marketView, cartView, mapView) {

    this.marketView = document.querySelector(`#${marketView}`);
    this.marketViewNav = document.querySelector(`#nav-${marketView}`);
    this.cartView = document.querySelector(`#${cartView}`);
    this.cartViewNav = document.querySelector(`#nav-${cartView}`);
    this.mapView = document.querySelector(`#${mapView}`);
    this.mapViewNav = document.querySelector(`#nav-${mapView}`);
    
  }

  showMarkets() {

    this.marketView.classList.add('visible');
    this.marketViewNav.classList.add('active');

    this.cartView.classList.remove('visible');
    this.cartViewNav.classList.remove('active');

    this.mapView.classList.remove('visible');
    this.mapViewNav.classList.remove('active');
    
  }

  showCart() {

    this.marketView.classList.remove('visible');
    this.marketViewNav.classList.remove('active');

    this.cartView.classList.add('visible');
    this.cartViewNav.classList.add('active');

    this.mapView.classList.remove('visible');
    this.mapViewNav.classList.remove('active');

    
  }

  showMap() {

    this.marketView.classList.remove('visible');
    this.marketViewNav.classList.remove('active');
    
    this.cartView.classList.remove('visible');
    this.cartViewNav.classList.remove('active');
    
    this.mapView.classList.add('visible');
    this.mapViewNav.classList.add('active');
    
    
  }
  
}