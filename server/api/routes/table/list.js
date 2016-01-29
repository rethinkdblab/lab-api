'use strict';

function* listTables() {

  let dbName = this.params.dbName;
  if (!dbName || !dbName.length) {
    this.throw('Invalid database name', 400);
  }

  let tables = yield this.r
    .db(dbName)
    .tableList();

  this.status = 200;
  this.body = tables;
}


module.exports = listTables;
