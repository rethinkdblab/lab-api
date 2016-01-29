'use strict';

const
  http      = require('http'),
  rethinkdb = require('../../db');


function db(app) {
  app.use(createDbConnection);
}

function* createDbConnection(next) {

  try {
    this.r = rethinkdb.create();
  }
  catch (err) {
    console.error(err);
    this.status = 500;
    this.body = err.message || http.STATUS_CODES[this.status];
    return;
  }

  yield next;
}

module.exports = db;
