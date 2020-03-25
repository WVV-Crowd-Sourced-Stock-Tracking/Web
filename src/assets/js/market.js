export default class Market {

  constructor (id, name, city, street, lat, lng, distance, isOpen, products, mapsId, zip) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.street = street;
    this.lat = parseFloat(lat);
    this.lng = parseFloat(lng);
    this.distance = parseInt(distance);
    this.status = this.computeStatus(isOpen);
    this.products = this.computeAvailability(products);
    this.address = this.computeAddress();
    this.mapsId = mapsId;
    this.zip = zip;
  }

  computeAddress() {
    // return `${this.street}, ${this.zip} ${this.city} `;
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
        product.availability = product.picked = 'high';
      } else if (product.availability < 80 && product.availability >= 30) {
        product.availability = product.picked = 'medium';
      } else {
        product.availability = product.picked = 'low';
      }
      
    });

    return products;
    
  }
  
}
