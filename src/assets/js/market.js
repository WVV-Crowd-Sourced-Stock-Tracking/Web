export default class Market {
  constructor(
    id,
    name,
    city,
    street,
    lat,
    lng,
    distance,
    status,
    products,
    updated
  ) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.street = street;
    this.lat = lat;
    this.lng = lng;
    this.distance = distance;
    this.status = this.computeStatus(status);
    this.products = products;
    this.address = this.computeAddress();
    this.updated = updated;
  }

  computeAddress() {
    return `${this.street}, ${this.city} `;
  }

  computeStatus(rawStatus) {
    let status = {};

    if (rawStatus.open) {
      status.text = `Geöffnet`;
      status.action = `Schließt`;
      status.time = rawStatus.closes;
      status.class = `opened`;
    } else {
      status.text = `Geschlossen`;
      status.action = `Öffnet`;
      status.time = rawStatus.opens;
      status.class = `closed`;
    }

    return status;
  }
}
