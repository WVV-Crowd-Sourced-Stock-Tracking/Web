class API {

  constructor(baseUrl) {

    this.baseUrl = baseUrl;
    
  }

  loadMarkets(gpsLength, gpsWidth, radius) {
    return new Promise(async (resolve, reject) => {

      let response, result;
    
      try {
        
        response = await fetch(this.baseUrl + `/market`, {
          method: 'POST',
          body: JSON.stringify({
            gps_length: gpsLength,
            gps_width: gpsWidth,
            radius: radius,
          })
        })

      } catch (err) {
        console.error(err);
        return reject(`An error occured during the request!`);
      }
      
      try {
        result = await response.json();
      } catch (err) {
        console.error(`The server's response was invalid: ${err} `);
        return reject(`The server's response was invalid!`);
      }

      return resolve(result);
    
    })
  }
  
}