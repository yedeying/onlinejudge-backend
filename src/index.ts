import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as session from 'koa-session';
import * as logger from 'koa-logger';
import * as CSRF from 'koa-csrf';
import * as cors from '@koa/cors';
import * as error from 'koa-json-error';
import router from './routes';
import config from './config';

export const app = new Koa();

// logger
app.use(logger());

// bodyParser
app.use(bodyParser());

// jsonResponse
app.use(json({ pretty: false, param: 'pretty' }));

// session
app.keys = [config.site.secret];
app.use(session(app));

// cors
app.use(cors());

// csrf
app.use(new CSRF({
  invalidSessionSecretMessage: 'Invalid session secret',
  invalidSessionSecretStatusCode: 403,
  invalidTokenMessage: 'Invalid CSRF token',
  invalidTokenStatusCode: 403,
  excludedMethods: ['GET', 'HEAD', 'OPTIONS'],
  disableQuery: false
}));

// error parser
app.use(error({
  format: (err: any) => ({
    code: err.code,
    status: err.status,
    message: err.message
    // stack: err.stack,
  })
}));

app.use(async (ctx: Koa.Context, next) => {
  try {
    await next();
  } catch (e) {
    ctx.body = { message: e.message };
    ctx.res.statusCode = 500;
  }
});

app.use(router.routes());

console.log(`${config.site.name} is now listening on port ${config.site.port}`);
app.listen(config.site.port);

process.on('SIGINT', () => process.exit());
