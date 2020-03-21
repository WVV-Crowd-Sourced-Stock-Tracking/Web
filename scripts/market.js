class Market {

  constructor (id, name, city, street, gpsLength, gpsWidth) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.street = street;
    this.gpsLength = gpsLength;
    this.gpsWidth = gpsWidth;
  }

  getHeader() {
    return `${this.name} (${this.city})`;
  }

  getBody() {

  }
  
}