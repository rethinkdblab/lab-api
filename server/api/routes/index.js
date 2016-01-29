'use strict';

const
  Router = require('koa-router');

function routes(app) {

  let appRouter = new Router();

  appRouter.get('/', function* () {
    this.status = 200;
    this.body = { name: 'rethinkdblab-api', version: '1.0.0' };
  });

  // db
  appRouter.get('/v1/dbs', require('./database/list'));
  appRouter.post('/v1/dbs/:dbName', require('./database/post'));

  app
    .use(appRouter.routes())
    .use(appRouter.allowedMethods());
}

module.exports = routes;
