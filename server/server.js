
const Promise = require('bluebird');
const logger = require('morgan');
const api = require('./api');

const port = 8080;


const server = require('http').createServer(api);

server.listen(port, function() {
  console.log('listening on port ' + port)
})