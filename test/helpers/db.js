'use strict';

const
  _ = require('lodash'),
  config = require('../../server/config'),
  rethink = require('../../server/db');


// database name
const name = config.rethinkdb.db;

/**
 * Drops the database
 */
function* drop(dbName) {

  // If database does not exist, a simple token generate call
  // will instantiate the models and create db and structure.
  // Otherwise we dont need to drop and create, since reset will
  // clean tables. Drop Everytime is dangerous and causes tests
  // to fail most of the time on the first run.
  let dropName = dbName || name;

  let conn = rethink.create();

  let exists = yield conn.dbList().contains(dropName).run();

  if (exists) {
    yield conn.dbDrop(dropName).run();
  }
}

/**
 * Resets the database between test runs.
 */
function* reset() {

  let conn = rethink.create();

  let exists = yield conn.dbList().contains(name).run();
  if (!exists) {
    yield conn.dbCreate(name);
    yield conn.db(name).wait();
  }

  let tables = yield conn.db(name).tableList().run();
  for (let i = 0; i < tables.length; i++) {
    let table = tables[i];
    yield conn.db(name).table(table).wait().run();
    yield conn.db(name).table(table).delete().run();
  }
}

/**
 * Waits for an index ready.
 */
function* ensureIndex(table, indexName) {

  let conn = rethink.create(name);

  yield conn.db(name).table(table).wait().run();

  let tableIndexes = yield conn.table(table).indexList().run();
  if (!_.includes(tableIndexes, indexName)) {
    yield conn.table(table).indexCreate(indexName).run();
  }

  yield conn.table(table).indexWait(indexName).run();
}

module.exports = {
  drop,
  reset,
  ensureIndex
};
