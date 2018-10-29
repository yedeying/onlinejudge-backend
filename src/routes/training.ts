import * as Router from 'koa-router';
import { Context } from 'koa';

const training = new Router();

training.get('/noList', async (ctx: Context) => {
  ctx.body = [{
    id: 0,
    no: 'A'
  }, {
    id: 0,
    no: 'B'
  }];
});

training.get('/problemList/:pageId', async (ctx: Context) => {
  ctx.body = [{
    id: 101,
    no: 'A00',
    title: 'A + B'
  }];
});

export default training;