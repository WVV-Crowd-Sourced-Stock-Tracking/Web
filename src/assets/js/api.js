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
            latitude: lat,
            longitude: lng,
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

  loadMarket(id) {
    return new Promise((resolve, reject) => {

      fetch(this.baseUrl + `/market/details`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id)
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

  loadAllProducts() {
    return new Promise((resolve, reject) => {
    
      fetch(this.baseUrl + `/product/scrape`, {
        mode: 'cors',
        method: 'POST',
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

  updateMarketStock(marketId, products) {
    return new Promise((resolve, reject) => {
    
      let bulkArray = [];

      products.forEach(product => {

        bulkArray.push({
          market_id: marketId,
          product_id: product.id,
          quantity: product.quantity,
        })
        
      });
      
      fetch(this.baseUrl + `/market/transmit`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bulk: bulkArray,
        })
      })
      .then(response => {
        return response.json();
      })
      .then(result => {
        console.log('result:', result);
        return resolve(result);
      })
      .catch(err => {
        console.error(err);
        return reject(`An error occured during the request!`);
      })
    
    })
  }
  
}