let map; 

// using setTimeout to wait for OpenWeatherMap API data for map coordinates
setTimeout(function (){

  var lat = coldest.lat;
  var lon = coldest.lon;

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: lon },
    zoom: 10,
  });
}, 350); 
