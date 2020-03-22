export default class Market {

  constructor (id, name, city, street, lat, lng, distance, isOpen, products) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.street = street;
    this.lat = parseFloat(lat);
    this.lng = parseFloat(lng);
    this.distance = distance;
    this.status = this.computeStatus(isOpen);
    this.products = this.computeAvailability(products);
    this.address = this.computeAddress();
  }

  computeAddress() {
    return `${this.street}, ${this.city} `;
  }

  computeStatus(isOpen) {

    let status = {};

    if (isOpen) {

      status.text = `Geöffnet`;
      status.class = `opened`;
    } else {
      status.text = `Geschlossen`;
      status.class = `closed`;
    }

    return status;
  }

  computeAvailability(products) {

    products.map(product => {
      
      if (product.availability >= 80) {
        product.availability = 'high';
      } else if (product.availability < 80 && product.availability >= 30) {
        product.availability = 'medium';
      } else {
        product.availability = 'low';
      }
      
    });

    return products;
    
  }
  
}
