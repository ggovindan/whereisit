/**
1. From the CSV file generate a list of all the cities in the world and their latitude longitude
2. From the static list of capitals generate a list.
    * This makes the first level
3. Create a REST API method that will return the list of 10 cities and latlngs given the level.
4. This list above should be decided based on game level where we pick random cities from the US, UK, AUS, FR, GER, SPAIN, PORTUGAL.
5. Create another REST API which when given a couple of latlngs will calculate crow flies.
*/

// utility to calculate geo-distance
const geo = require('node-geo-distance');
const Promise = require('bluebird');

/**
// White house
var coord1 = {
  latitude: 38.8977330,
  longitude: -77.0365310
}

// Washington Monument
var coord2 = {
  latitude: 38.8894840,
  longitude: -77.0352790
}

geo.vincenty(coord1, coord2, function(dist) {
  console.log(dist);
});
*/

/**
Utility to get all the cities and the coordinates into an array
*/
