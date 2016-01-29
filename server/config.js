'use strict';

if (!process.env.NODE_ENV || process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}


module.exports = {

  /**
   * Flag that controls debug messages should be logged to console.
   */
  debug: (process.env.APP_DEBUG === 'true') || true,

  /**
   * Flag that controls if rethink DB events should be logged.
   */
  traceRethink: (process.env.RETHINK_TRACE === 'true') || false,

  /**
   * The API hosting configuration.
   */
  api: {
    /**
     * The port that the API should be hosted on.
     */
    port: process.env.PORT || 8020
  },

  rethinkdb: {
    host: process.env.RETHINK_HOST || '192.168.99.100',
    port: process.env.RETHINK_PORT || 32769,
    db: process.env.RETHINK_DB || 'rethinkdblab_tests',
    authKey: process.env.RETHINK_AUTHKEY || ''
  }
};
