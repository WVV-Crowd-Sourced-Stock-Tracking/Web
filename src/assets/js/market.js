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
    this.zip = parseInt(zip);
    this.iconUrl = iconUrl;
    this.periods = this.parsePeriods(periods);
  }

  computeAddress() {
    // return `${this.street}, ${this.zip} ${this.city} `;
    return `${this.street}, ${this.city} `;
  }

  get status() {
    //TODO check if finding next open day works

    if (this.periods == true) {
      return {
        text: `Geöffnet`,
        class: `opened`,
        next: `(durchgängig)`,
      }
    }
    
    let now = new Date();
    let opens = new Date();
    let closes = new Date();
    let dayInfo = this.periods[now.getDay()];
    let status = {};

    if (!dayInfo) {

      status.text = `Geschlossen`;
      status.class = `closed`;

      let index = now.getDay();
      let nextOpen = this.periods[index];
      let counter = 0;

      do {

        index = index == 6 ? 0 : index+1;
        nextOpen = this.periods[index];
        counter++;
        
      } while (!nextOpen && counter < 7);

      if (counter == 7) {
        status.text = `Öffnungszeiten unbekannt`;
        status.class = `unknown`;
        status.next = ``;
      } else {
        status.next = `(Öffnet am ${nextOpen.day} um ${nextOpen.opens} Uhr)`;
      }

    } else {

      opens.setHours(dayInfo.opens.substr(0, 2));
      opens.setMinutes(dayInfo.opens.substr(3, 2));
  
      closes.setHours(dayInfo.closes.substr(0, 2));
      closes.setMinutes(dayInfo.closes.substr(3, 2));
      
      if (opens.getTime() <= now.getTime() && now.getTime() < closes.getTime()) {
  
        status.text = `Geöffnet`;
        status.class = `opened`;
  
        status.next = `(Schließt um ${dayInfo.closes})`;
      } else {
  
        status.text = `Geschlossen`;
        status.class = `closed`;
  
        if (opens.getTime() < now.getTime()) {
  
          let index = now.getDay();
          let nextOpen = this.periods[index];
  
          do {
  
            index = index == 6 ? 0 : ++index;
            nextOpen = this.periods[index];
            console.log('loop');
            
          } while (!nextOpen);
          
          status.next = `(Öffnet am ${nextOpen.day} um ${nextOpen.opens} Uhr)`;
          // status.next = `(Öffnet um ${now.getDay() == 6 ? this.periods[0].opens : this.periods[now.getDay()+1].opens} Uhr)`;
          
        } else {
          status.next = `(Öffnet heute um ${dayInfo.opens} Uhr)`;
        }
        
      }

    }

    return status;
  }

  parsePeriods(periods) {

    let parsedPeriods = [];

    if (periods.length == 1 && periods[0].open_time == '0000') {
      parsedPeriods = true;
    } else {

      for (let i = 0; i < 7; i++) {
        const day = periods.find(day => day.open_day_id == i);
  
        if (day != undefined) {
          parsedPeriods[i] = {
            day: day.open_name,
            opens: day.open_time,
            closes: day.close_time
          }
        } else {
          parsedPeriods[i] = false; // not open on this day
        }
        
      }

    }
    
    return parsedPeriods;
    
  }
  
  parseProducts(products) {

    let parsedProducts = [...products];

    parsedProducts.map(product => {
      
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

    // filter dups
    parsedProducts = parsedProducts.filter((product, index) => parsedProducts.indexOf(parsedProducts.find(x => x.id == product.id)) === index);

    return parsedProducts;
    
  }
  
}
