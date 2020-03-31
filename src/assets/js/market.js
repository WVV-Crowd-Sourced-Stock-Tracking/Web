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

    let now = new Date();
    let opens = new Date();
    let closes = new Date();
    let dayInfo = this.periods[now.getDay()];
    let status = {};
    
    opens.setHours(dayInfo.opens.substr(0, 2));
    opens.setMinutes(dayInfo.opens.substr(3, 2));

    closes.setHours(dayInfo.closes.substr(0, 2));
    closes.setMinutes(dayInfo.closes.substr(3, 2));
    
    if (opens.getTime() <= now.getTime() && now.getTime() < closes.getTime()) {

      status.text = `Geöffnet`;
      status.class = `opened`;

      status.next = {
        text: `Schließt`,
        time: dayInfo.closes
      }

    } else {

      status.text = `Geschlossen`;
      status.class = `closed`;

      if (opens.getTime() < now.getTime()) {
        status.next = {
          text: `Öffnet`,
          time: now.getDay() == 6 ? this.periods[0].opens : this.periods[now.getDay()+1].opens
        }
      } else {
        status.next = {
          text: `Öffnet`,
          time: dayInfo.opens
        }
      }
      
    }
    

    return status;
  }

  parsePeriods(periods) {

    //TODO if a store isn't open on a day, it won't return info for that day. Handle this.

    let parsedPeriods = [];

    periods.forEach(day => {

      parsedPeriods[day.open_day_id] = {
        opens: day.open_time,
        closes: day.close_time
      }
      
    })
    
    return parsedPeriods;
    
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
