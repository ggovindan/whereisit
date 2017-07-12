const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const csv = require('csv');
const geo = require('node-geo-distance');
const _ = require('lodash');


class LatLng {
  constructor() {
    this.citiesList = [];
    this.levels = [];
    this.capitals = [];
    // read all the cities data
    fs.readFileAsync('static/world-capitals.csv', 'utf8')
      .then((rows) => {
        csv.parse(rows, (err, capitals) => {
          if (err) {
            throw new Error('error=', err);
          }
          // dont need the header
          capitals.shift();

          for (let i = 0; i < capitals.length; i += 1) {
            const elem = {
              city: capitals[i][1],
              country: capitals[i][0],
            };
            this.capitals.push(elem);
          }
        });

        // now read all the cities
        fs.readFileAsync('static/simplemaps-worldcities-basic.csv', 'utf8')
          .then((data) => {
            csv.parse(data, (err, data) => { // eslint-disable-line no-shadow
              if (err) {
                throw new Error('error=', err);
              }
              // we dont want the header
              data.shift();

              for (let i = 0; i < data.length; i += 1) {
                const value = {
                  city: data[i][0],
                  lat: data[i][2],
                  lng: data[i][3],
                  country: data[i][5],
                  code_iso2: data[i][6],
                  code_iso3: data[i][7],
                  province: data[i][8],
                  capital: false,
                };

                // mark the city that is a capital with a flag
                if(_.find(this.capitals, {'city': data[i][0], 'country': data[i][5]})) {
                  value.capital = true;
                }
                // mark the city that is a capital with a flag
                // if (this.capitals.indexOf(data[i][0]) > -1) {
                //   value.capital = true;
                // }
                this.citiesList.push(value);
              }

              // lets filter out the cities based on levels
              // level 0 is capitals
              this.levels[0] = this.citiesList.filter(city => city.capital === true);
            });
          });
      });
  }

  getScore(coord1, coord2, callback) { // eslint-disable-line class-methods-use-this
    // Get crow flies
    if (coord1.lat) {
      coord1.latitude = coord1.lat; // eslint-disable-line no-param-reassign
      coord1.longitude = coord1.lng; // eslint-disable-line no-param-reassign
    }
    if (coord2.lat) {
      coord2.latitude = coord2.lat; // eslint-disable-line no-param-reassign
      coord2.longitude = coord2.lng; // eslint-disable-line no-param-reassign
    }
    geo.vincenty(coord1, coord2, (dist) => {
      // Now calculate points
      console.log('distance=', dist);
      const distKms = dist / 1000;
      const inverse = 1 / distKms;
      if (isFinite(inverse)) {
        console.log('score=', Math.floor(inverse * 10000));
        callback(Math.floor(inverse * 10000));
        return;
      }
      callback(1000);
    });
  }

  getRandomList(level) {
    const citiesList = this.levels[level];
    const gameList = [];

    for (let i = 0; i < 10; i += 1) {
      const city = citiesList[Math.floor(Math.random() * citiesList.length)];
      gameList.push(city);
    }
    return gameList;
  }
}

module.exports = new LatLng();
