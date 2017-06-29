const express = require('express');
const bodyParser = require('body-parser');
const latlng = require('./latlng-util');

const app = express();
const router = express.Router();

router.use(bodyParser.json());

// anythin with /api/v1 route it to our router
app.use('/api/v1', router);

// /api/v1/ping
router.get('/ping', (req, res) => {
  res.status(200).send({
    version: '1.0.0',
  })
});

// /api/v1/game:level
router.get('/game:level', function(req, res) {
  const level = req.params.level;
  console.log('level=', typeof level);
  console.time('getting_cities');
  res.status(200).send(JSON.parse(JSON.stringify({cities: latlng.getRandomList(parseInt(level))})));
  console.timeEnd('getting_cities');
});

// /api/v1/score
router.post('/score', function(req, res) {
  const coord1 = req.body.coord1;
  const coord2 = req.body.coord2;
  latlng.getScore(coord1, coord2, (score) => {
    res.status(200).send({score: score});
  });
});

module.exports = app;