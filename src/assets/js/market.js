export default class Market {

  constructor (id, name, city, street, lat, lng, distance, products, mapsId, zip, iconUrl, periods) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.street = street;
    this.lat = parseFloat(lat);
    this.lng = parseFloat(lng);
    this.distance = parseInt(distance);
    this.products = this.parseProducts(products);
    this.address = this.computeAddress();
    this.mapsId = mapsId;
    this.zip = zip;
    this.iconUrl = iconUrl;
    this.periods = this.parsePeriods(periods);
  }

  computeAddress() {
    // return `${this.street}, ${this.zip} ${this.city} `;
    return `${this.street}, ${this.city} `;
  }

  get status() {

    let status = {};

    status.text = `Geöffnet`;
    status.class = `opened`;

    return status;
  }

  parsePeriods(periods) {

    return periods;
    
  }
  
  parseProducts(products) {

    products.map(product => {
      
      // quantity is a number between 0 and 100, availability is a string
      
      product.quantity = product.availability;
      product.id = product.product_id;
      product.name = product.product_name;
      
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
