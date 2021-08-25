// https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson

var magnitude = data.features.properties.mag 
var title = data.features.properties.title // includes magnitude & place
var place = data.features.properties.place // just place name
var coord = data.features.geometry.coordinates
var lon = coord[1]
var lat = coord[0]
var depth = coord[2]