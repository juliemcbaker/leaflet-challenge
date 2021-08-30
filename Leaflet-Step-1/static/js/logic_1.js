// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
  // styleInfo(data.features); //adding
});

function markerSize(magnitude) {
  return Math.sqrt(magnitude + 1) * 50;
};

// function styleInfo(earthquakeData) {
//   var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
//   });

//   for (var i = 0; i < earthquakeData.length; i++) {

//     // set locations to make easier to call
//     var lat = earthquakeData[i].geometry.coordinates[1]
//     var lon = earthquakeData[i].geometry.coordinates[0]
//     var depth = earthquakeData[i].geometry.coordinates[2]
//     var lat_long = [lat, lon]

// }
// feature.geometry.coordinates

function markerColor(depth) {
  for (var i = 0; i < earthquakeData.length; i++) {
    if (depth > 200) {
        color = "#00134d";
      }
      else if (depth > 100) {
        color = "#002080";
      }
      else if (depth > 50) {
        color = "#0033cc";
      }
      else if (depth > 25) {
        color = "#1a53ff";
      }
      else if (depth > 10) {
        color = "#4d79ff";
      }
      else {
        color = "#99b3ff";
      };
    return color;
  };
  
};

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><h4>Magnitude: ${feature.properties.mag}</h4><hr>
    <h4>Depth: ${feature.geometry.coordinates[2]}</h4><hr><p>${new Date(feature.properties.time)}</p>`);
  };

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature
  });
  console.log(earthquakes)
  console.log(earthquakeData)


// // loop through earthquake array & assign marker colors for each
  for (var i = 0; i < earthquakeData.length; i++) {

    // set locations to make easier to call
    var lat = earthquakeData[i].geometry.coordinates[1]
    var lon = earthquakeData[i].geometry.coordinates[0]
    var depth = earthquakeData[i].geometry.coordinates[2]
    var lat_long = [lat, lon]

    // conditionals
    // var color = "";
    // if (depth > 200) {
    //   color = "#00134d";
    // }
    // else if (depth > 100) {
    //   color = "#002080";
    // }
    // else if (depth > 50) {
    //   color = "#0033cc";
    // }
    // else if (depth > 25) {
    //   color = "#1a53ff";
    // }
    // else if (depth > 10) {
    //   color = "#4d79ff";
    // }
    // else {
    //   color = "#99b3ff";
    // };
    // Add circles to the map.
    var circle = L.circleMarker(earthquakeData[i].lat_long, {
      fillOpacity: 0.80,
      color: "red",
      fillColor: "green",
      // Adjust the radius.
      radius: markerSize(earthquakeData[i].properties.mag)
    });
    
    
    // console.log(color);
    
    
  
  };

  

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
  circle.addTo(earthquakes);
  
};



function createMap(earthquakes) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      // 37.09, -95.71
      0, 0
    ],
    zoom: 2,
    layers: [street, earthquakes]
  });

  
  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

};

// Create legend
// var legend = L.control({position: 'bottomright'});
// legend.onAdd = function (map) {
//   var div = L.DomUtil.create('div', 'info legend'),
//       grades = [0, 0.5, 1, 1.5, 2, 2.5],
//       colors = ["#99b3ff", "#4d79ff", "#1a53ff", "#0033cc", "#002080", "#00134d"];
//   // loop through our density intervals and generate a label with a colored square for each interval
//   for (var i = 0; i < grades.length; i++) {
//       div.innerHTML +=
//           '<i style="background:' + colors[i] + '"></i> ' +
//           grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
//   }
//   return div;
// };
// legend.addTo(myMap);
;