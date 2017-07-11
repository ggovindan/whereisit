const express = require('express');

const latlng = require('../server/latlng-util');

const router = express.Router();

exports.ping = (req, res) => {
  console.log('hitting ping');
  res.status(200).send({
    version: '1.0.0',
  })
};

exports.newGame = (req, res) => {
  const level = req.params.level;
  console.time('getting_cities');
  res.status(200).send(JSON.parse(JSON.stringify({cities: latlng.getRandomList(parseInt(level))})));
  console.timeEnd('getting_cities');
}

exports.score = (req, res) => {
  const coord1 = req.body.coord1;
  const coord2 = req.body.coord2;
  latlng.getScore(coord1, coord2, (score) => {
    res.status(200).send({score: score});
  });
}

exports.router = router;