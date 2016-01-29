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
  appRouter.get('/v1', require('./database/list'));
  appRouter.post('/v1/:dbName', require('./database/post'));
  appRouter.del('/v1/:dbName', require('./database/drop'));

  // table
  appRouter.get('/v1/:dbName', require('./table/list'));

  app
    .use(appRouter.routes())
    .use(appRouter.allowedMethods());
}

module.exports = routes;
