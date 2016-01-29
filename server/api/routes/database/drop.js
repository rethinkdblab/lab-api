'use strict';

function* dropDb() {
  let dbName = this.params.dbName;
  if (!dbName || !dbName.length) {
    this.throw('Invalid database name', 400);
  }

  try {
    let result = yield this.r.dbDrop(dbName);

    this.status = 200;
    this.body = result;
  }
  catch (error) {
    if (error.name === 'ReqlOpFailedError') {
      this.status = 400;
      this.body = { message: `Database '${dbName}' does not exist` };
      return;
    }

    throw error;
  }
}


module.exports = dropDb;
