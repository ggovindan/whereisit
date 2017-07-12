const express = require('express');
const apiRoutes = require('./middleware');
const bodyParser = require('body-parser');

const app = express();

app.engine('html', require('ejs').renderFile);

app.set('views', `${__dirname}/views`);
app.set('view engine', 'html');
app.use(express.static(`${__dirname}/`));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/game:level', apiRoutes.newGame);

app.get('/ping', apiRoutes.ping);

app.post('/score', apiRoutes.score);

app.listen(process.env.PORT || 5000, () => {
  console.log('listening on http://localhost:5000');
});
