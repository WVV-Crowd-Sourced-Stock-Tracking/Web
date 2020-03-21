class MapContext {

  constructor (map) {

    this.map = map;
    this.markers = [];

    this.addMarker(map.center.lat(), map.center.lng());
    
  }

  addMarker(latitude, longitude, icon = null, name = false) {

    console.log('latitude:', latitude);
    console.log('longitude:', longitude);

    let markerOptions = {
      position: {lat: latitude, lng: longitude},
      map: this.map,
    };

    if (icon != null) {
      console.log('icon:', icon);
      markerOptions.icon = icon;
    }

    let marker = new google.maps.Marker(markerOptions);

    // set the marker to the array index it will be at, or to the given id
    marker.name = name === false ? this.markers.length : name;

    this.markers.push(marker);
    
  }

  getAllMarkers() {
    return this.markers;
  }
  
}