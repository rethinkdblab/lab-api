'use strict';

const
  expect = require('chai').expect,
  co = require('co'),
  harness = require('../helpers/harness'),
  db = require('../helpers/db');

describe('POST databases', function () {

  harness.suite();

  let dbName = 'rethinklab_mocha_test';

  beforeEach(function* () {
    yield co(db.drop(dbName));
  });

  it('should create database', function* () {

    let res = yield this.harness.api()
      .post(`/v1/dbs/${dbName}`)
      .send()
      .end();

    expect(res.status).to.equal(200);
    expect(res.body).to.an('object');

    expect(res.body.dbs_created).to.equal(1);
    expect(res.body.config_changes[0].new_val.name).to.equal(dbName);

    yield db.drop(dbName);
  });
});
