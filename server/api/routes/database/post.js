'use strict';

function* createDb() {
  let dbName = this.params.dbName;
  if (!dbName || !dbName.length) {
    this.throw('Invalid database name', 400);
  }

  try {
    let result = yield this.r.dbCreate(dbName);

    this.status = 200;
    this.body = result;
  }
  catch (error) {
    if (error.name === 'ReqlOpFailedError') {
      this.status = 400;
      this.body = { message: `Database '${dbName}' already exists` };
      return;
    }

    throw error;
  }
}


module.exports = createDb;
