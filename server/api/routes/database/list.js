'use strict';

function* getBadgeTypes() {

  let dbs = yield this.r.dbList();

  this.status = 200;
  this.body = dbs;
}


module.exports = getBadgeTypes;
