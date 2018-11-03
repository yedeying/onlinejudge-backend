import * as Router from 'koa-router';

const training = new Router();

training.get('/noList', (ctx: Router.IRouterContext) => {
  ctx.body = [{
    id: 'A',
    title: 'A'
  }, {
    id: 'B',
    title: 'B'
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
