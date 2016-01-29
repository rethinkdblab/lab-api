'use strict';

const
  koa           = require('koa'),
  cors          = require('kcors'),
  logger        = require('koa-logger'),
  gzip          = require('koa-gzip'),
  timeout       = require('koa-timeout'),
  errors        = require('./middleware/errors'),
  db            = require('./middleware/db'),
  parser        = require('./middleware/parser'),
  routes        = require('./routes');

const app = koa();

// Logging
app.use(logger());

// Gzip all the time
app.use(gzip());

// Reject slow requests
app.use(timeout(5000));

// Cors
app.use(cors());

// Error messages
errors(app);

// Body parsing
parser(app);

// DB connection
db(app);

// Routers
routes(app);

module.exports = app;
