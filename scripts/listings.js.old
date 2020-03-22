class Listing {

  async loadAll() {
  
    let rawMarkets, markets;
    
    try {
      rawMarkets = await API.loadMarkets();
    } catch (err) {
      throw err;      
    }

    rawMarkets.forEach(rawMarket => {
      markets.push(new Market(rawMarket.id, rawMarket.name, rawMarket.city, rawMarkets.street, rawMarket.gps_length, rawMarket.gps_width));
    });

    if (rawMarkets.length != markets.length) {
      throw new Error(`Conversion from raw to parsed markets failed!`);
    }
    
  }
  
  addItem(listElement, item) {
  
  
    
  }

}


