'use strict';

const
  http   = require('http'),
  api    = require('./api'),
  config = require('./config');


// Server
let server = http.createServer(api.callback());

// Listen
server.listen(config.api.port, '0.0.0.0');
console.info('Listening on port ', config.api.port);
