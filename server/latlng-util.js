const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const csv = require('csv');
const geo = require('node-geo-distance');

const sh = require('shelljs');

//level 1
const level0 = ['USA', 'GBR', 'FRA', 'ITA', 'ESP', 'MEX', 'AUS', 'CAN'];
const level1 = ['IND', 'CHN', 'JPN', 'EGY'];


class LatLng {
  constructor() {
    this.citiesList = [];
    this.levels = [];
    //read all the cities data
    fs.readFileAsync('static/simplemaps-worldcities-basic.csv', 'utf8')
      .then((data) => {
        csv.parse(data, (err, data) => {
          if (err) {
            throw new Error('error=', err);
          }
          //we dont want the header
          data.shift();

          for (var i=0; i<data.length; i++) {
            var value = {
              city: data[i][0],
              lat: data[i][2],
              lng: data[i][3],
              country: data[i][5],
              code_iso2: data[i][6],
              code_iso3: data[i][7],
              province: data[i][8],
            };
            this.citiesList.push(value);
          }
          console.log('this.citiesList.length=', this.citiesList.length);
          console.time('filter_level1');
          //first lets filter out the cities based on level
          this.levels[0] = this.citiesList.filter((city) => {
            return (level0.indexOf(city.code_iso3) > -1);
          });
          console.timeEnd('filter_level1');

          console.time('filter_level2');
          this.levels[1] = this.citiesList.filter((city) => {
            return (level1.indexOf(city.code_iso3) > -1);
          });
          console.timeEnd('filter_level2');
        });
      });
    console.timeEnd('reading_from_csv');
  }

  getScore(coord1, coord2, callback) {
    // Get crow flies

    geo.vincenty(coord1, coord2, (dist) => {

      //Now calculate points
      const distKms = dist/1000;
      const inverse = 1/distKms;
      if (isFinite(inverse)) {
        console.log('score=', Math.floor(inverse * 1000));
        callback(Math.floor(inverse * 1000));
        return;
      }
      callback(1000);
    });
  }

  getRandomList(level) {
    const citiesList = this.levels[level];
    console.log('citiesList=', citiesList);
    const gameList = [];

    for (var i=0; i<10; i++) {
      const city = citiesList[Math.floor(Math.random() * citiesList.length)];
      console.log(city);
      gameList.push(city);
    }
    console.log('gameList=', gameList);
    return gameList;
  }
}

 module.exports = new LatLng();
