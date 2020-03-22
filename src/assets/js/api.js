export default class API {

  constructor(baseUrl) {

    this.baseUrl = baseUrl;
    
  }

  loadMarkets(lat, lng, radius) {
    return new Promise((resolve, reject) => {

        fetch(this.baseUrl + `/market/scrape`, {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            gps_width: lat,
            gps_length: lng,
            radius: radius,
          })
        })
        .then(response => {
          return response.json();
        })
        .then(result => {
          return resolve(result.supermarket);
        })
        .catch(err => {
          console.error(err);
          return reject(`An error occured during the request!`);
        })
    
    })
  }

  loadMarket(googleId) {
    return new Promise((resolve, reject) => {
    
      fetch(this.baseUrl + `/market/stock`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          google_id: googleId,
        })
      })
      .then(response => {
        return response.json();
      })
      .then(result => {
        return resolve(result);
      })
      .catch(err => {
        console.error(err);
        return reject(`An error occured during the request!`);
      })
    
    })
  }  

  loadMarketStock(googleId) {
    return new Promise((resolve, reject) => {

        fetch(this.baseUrl + `/market/stock`, {
          mode: 'cors',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            google_id: googleId,
          })
        })
        .then(response => {
          return response.json();
        })
        .then(result => {
          return resolve(result.product);
        })
        .catch(err => {
          console.error(err);
          return reject(`An error occured during the request!`);
        })
    
    })
  }
  
}