import * as Router from 'koa-router';

const training = new Router();

training.get('/noList', (ctx: Router.IRouterContext) => {
  ctx.body = [{
    id: 0,
    no: 'A'
  }, {
    id: 0,
    no: 'B'
  }];
});

training.get('/problemList/:pageId', (ctx: Router.IRouterContext) => {
  ctx.body = [{
    id: 101,
    no: 'A00',
    title: 'A + B'
  }];
});

export default training;
