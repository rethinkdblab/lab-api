'use strict';

function* getBadgeTypes() {
  let dbName = this.params.dbName;
  if (!dbName || !dbName.length) {
    this.throw('Invalid database name', 400);
  }

  let result = yield this.r.dbCreate(dbName);

  this.status = 200;
  this.body = result;
}


module.exports = getBadgeTypes;
