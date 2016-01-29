'use strict';

const
  expect = require('chai').expect,
  harness = require('../helpers/harness');

describe('List databases', function () {

  harness.suite();

  it('should list databases', function* () {

    let res = yield this.harness.api()
      .get('/v1/dbs')
      .send()
      .end();

    expect(res.status).to.equal(200);
    expect(res.body).to.an('array');
    expect(res.body.length).to.be.at.least(1);
    expect(res.body).to.include.members(['rethinkdb']);
  });
});
