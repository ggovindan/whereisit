const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const csv = require('csv');
const geo = require('node-geo-distance');


class LatLng {
  constructor() {
    this.citiesList = [];
    this.levels = {
      level1: ['USA', 'GBR', 'FRA', 'ITA', 'ESP', 'MEX', 'AUS', 'CAN'],
      level2: ['IND', 'CHN', 'JPN', 'EGY'],
    }
    //read all the cities data
    fs.readFileAsync('../static/simplemaps-worldcities-basic.csv', 'utf8')
      .then((data) => {
        csv.parse(data, (err, data) => {
          if (err) {
            throw new Error('error=', err);
          }
          csv.transform(data, (data) => {
            var value = {
              city: data[0],
              lat: data[2],
              lng: data[3],
              country: data[5],
              code_iso2: data[6],
              code_iso3: data[7],
              province: data[8],
            };
            this.citiesList.push(value);
            this.citiesList.sort((a, b) => {
              return a.code_iso3 < b.code_iso3;
            });
          });
        });
      });
  }

  getCrowFlies(coord1, coord2) {
    return geo.vincenty(coord1, coord2, (dist) => {
      console.log(dist);
      return dist;
    });
  }

  getRandomList(level) {

  }
}

 module.exports = LatLng;