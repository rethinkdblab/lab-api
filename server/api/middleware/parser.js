'use strict';

const
  koaBody = require('koa-body');

/**
 * Adds body parsing support for JSON & multipart/form-data.
 */
function init(app) {

  // Enable koa-body parser
  app.use(koaBody());
}

module.exports = init;
