'use strict';

const
  expect = require('chai').expect,
  co = require('co'),
  harness = require('../helpers/harness');

describe('List tables', function () {

  harness.suite();

  let tableName = 'my_table';

  beforeEach(function* () {
    yield co(this.harness.db.createTable(tableName));
  });

  it('should list tables', function* () {

    let res = yield this.harness.api()
      .get(`/v1/${this.harness.db.name}`)
      .send()
      .end();

    expect(res.status).to.equal(200);
    expect(res.body).to.an('array');
    expect(res.body.length).to.be.at.least(1);
    expect(res.body).to.include.members([tableName]);
  });
});
