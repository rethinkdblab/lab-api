'use strict';

// This file provides global hooks that are run once for all
// mocha test files

let co = require('co');
require('co-mocha');

after(function* () {
  yield co(require('./db').drop());
});
