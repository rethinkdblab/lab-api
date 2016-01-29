'use strict';

require('co-mocha');

const
  _ = require('lodash'),
  co = require('co'),
  db = require('./db'),
  supertest = require('co-supertest'),
  app = require('../../server/api');


// Start the server
const server = app.listen();

/**
 * Sets up a test suite.
 */
function suite() {

  beforeEach(function* () {

    let context = this;

    // Reset the database
    yield co(db.reset());

    context.harness = {

      // Create super test agent
      request: supertest.agent(server),

      // Sets defaul db name
      db,

      // API helper function
      api: function api() {
        return new ApiRequest(context);
      },

      /**
       * The common headers for all harness requests.
       */
      headers: {
        Host: 'api.localhost'
      }
    };
  });
}

/**
 * Wrapper around the supertest request object so that we
 * can automatically set the headers for the request which
 * is the standard case for most tests.
 */
function ApiRequest(context) {

  let self = this;

  let methods = ['get', 'post', 'put', 'patch', 'del', 'delete', 'options', 'head'];
  for (let i = 0; i < methods.length; i++) {
    self[methods[i]] = dispatch(methods[i]);
  }

  /**
   * Helper to dispatch an incoming call the the underlying
   * usertest request object.
   */
  function dispatch(method) {
    return function () {
      return context.harness.request[method]
        .call(context.harness.request, Array.prototype.slice.call(arguments))
        .set(_.cloneDeep(context.harness.headers));
    };
  }
}


module.exports = {

  /**
   * Sets up a test suite.
   */
  suite
};
