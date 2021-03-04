var myMap = L.map("map", {
    center: [38.8003, -102.6216],
    zoom: 4
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

  // Function to choose color
function Color(depth){
    if (depth < 10){
      return "#99ff99";
    }
    else if (depth < 30){
      return "#66ff66"
    }
    else if (depth < 50){
      return "#33cc33"
    }
    else if (depth < 70){
      return "#009933"
    }
    else{
      return "#003300";
    };
  };

  d3.json(url, function(response) {
    var response = response.features;
    console.log(response);

  
    for (var i = 0; i < response.length; i++) {
      var earthquake = response[i];
      console.log(earthquake);

      // Creates variables that hold properties from the geojson
      var latlng = [earthquake.geometry.coordinates[1],earthquake.geometry.coordinates[0]];
      var depth = earthquake.geometry.coordinates[2];
      var mag = earthquake.properties.mag;
      var location = earthquake.properties.place;
      
      // Creates the markers for each earthquake.
      L.circleMarker(latlng,{
        color: "black",
        fillColor: Color(depth),
        fillOpacity: .5,
        radius: mag * 3,
        // Binds a pop up to the markers.
      }).bindPopup(`<strong>Location:</strong> ${location} <br> <strong>Magnitude:</strong> ${mag} 
      <br> <strong>Depth: </strong> ${depth} km`)
        .addTo(myMap)
      
    }
  
    console.log(heatArray);
    console.log(location.accidents);
  
    // var heat = L.heatLayer(heatArray, {
    //   radius: 50,
    //   blur: 350
    // }).addTo(myMap);
  
  });
  