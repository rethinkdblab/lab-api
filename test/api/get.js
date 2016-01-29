'use strict';

const
  expect = require('chai').expect,
  harness = require('../helpers/harness');

describe('Api', function () {

  harness.suite();

  it('should answer request', function* () {

    let res = yield this.harness.api()
      .get('/')
      .send()
      .end();

    expect(res.status).to.equal(200);
    expect(res.body).to.an('object');
    expect(res.body.name).to.equal('rethinkdblab-api');
    expect(res.body.version).to.equal('1.0.0');
  });
});
