'use strict';

const
  expect = require('chai').expect,
  co = require('co'),
  harness = require('../helpers/harness'),
  db = require('../helpers/db');

describe('DROP databases', function () {

  harness.suite();

  let dbName = 'rethinklab_mocha_test';

  beforeEach(function* () {
    yield co(db.drop(dbName));
  });

  it('should return 400 db no exists', function* () {

    let res = yield this.harness.api()
      .del(`/v1/wrong_db`)
      .send()
      .end();

    expect(res.status).to.equal(400);
    expect(res.body).to.an('object');

    expect(res.body.message).to.equal( `Database 'wrong_db' does not exist`);
  });

  it('should drop database', function* () {

    let res = yield this.harness.api()
      .post(`/v1/${dbName}`)
      .send()
      .end();

    expect(res.status).to.equal(200);
    expect(res.body).to.an('object');

    expect(res.body.dbs_created).to.equal(1);
    expect(res.body.config_changes[0].new_val.name).to.equal(dbName);

    let res2 = yield this.harness.api()
      .del(`/v1/${dbName}`)
      .send()
      .end();

    expect(res2.status).to.equal(200);
    expect(res2.body).to.an('object');

    expect(res2.body.dbs_dropped).to.equal(1);
    expect(res2.body.config_changes[0].old_val.name).to.equal(dbName);
  });
});
