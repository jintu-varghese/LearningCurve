 var myLatLng = {lat: -25.363, lng: 131.044};

var map= new GMaps({
  div: '.map',
  lat: -12.043333,
  lng: -77.028333
});


map.addMarker({
  lat: -12.043333,
  lng: -77.028333,
  title: 'Lima',
  click: function(e) {
    alert('You clicked in this marker');
  }
});


map.addMarker({
  lat: -25.363,
  lng: 131.044,
  title: 'ttt',
  click: function(e) {
    alert('You  in this marker');
  }
});
