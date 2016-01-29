'use strict';

const config = require('../../config');

/**
 * Adds default error handlers to ensure messages are
 * consistent.
 */
function init(app) {

  // The order of the middlewares below is really important
  // do not change unless you know what you are doing.

  app.use(_404);
  app.use(_500);
  app.use(_401);
  app.use(_log);
}

function* _log(next) {

  try {
    yield next;
  }
  catch (err) {

    // Check if we threw it or was it unhandled, and accordingly

    console.error((!config.debug && err.status)
      ? `${err.name}: ${err.message}`
      : `${err.stack}`);

    throw err;
  }
}

/**
 * Captures all unhandled errors ensures they
 * return a consistent error message.
 */
function* _500(next) {

  // If there is a specific status and error message
  // that is not a 500, then use its message otherwise
  // we should default to the default safe message

  try {
    yield next;
  }
  catch (err) {

    let message = err.message;
    if (!config.debug) {
      message = err.status && err.status !== 500
        ? err.message
        : 'Server error';
    }

    this.status = err.status || 500;
    this.body = {
      message
    };
  }
}

/**
 * Captures all route invalid errors and ensures they
 * return a consistent error message.
 */
function* _404(next) {

  yield next;

  // If its a valid response then, just skip it otherwise
  // we should assume they were requesting a path that is
  // not supported by the routers

  if (this.body || !this.idempotent) {
    return;
  }

  this.status = 404;
  this.body = {
    message: 'Path not supported'
  };
}

/**
 * Captures all unauthenticated errors and ensures they
 * return a consistent error message.
 */
function* _401(next) {

  try {
    yield next;
  }
  catch (err) {

    // If the error message is not an authentication one,
    // then let it bubble up to the _500 middleware

    if (err.status !== 401) {
      throw err;
    }

    console.log('Auth :: Authentication failed', err);

    this.status = 401;
    this.body = {
      message: 'Protected resource, use Authorization header to get access'
    };
  }
}

module.exports = init;
