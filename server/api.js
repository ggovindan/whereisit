const express = require('express');
const bodyParser = require('body-parser');

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

});

module.exports = app;