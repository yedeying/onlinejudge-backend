import * as Router from 'koa-router';
import ProblemList from '../models/problemList';

const training = new Router();

training.get('/noList', async (ctx: Router.IRouterContext) => {
  const problemList = new ProblemList();
  ctx.body = await problemList.getNoList();
});

training.get('/problemList/:pageId', async (ctx: Router.IRouterContext) => {
  const problemList = new ProblemList();
  const { pageId } = ctx.params;
  ctx.body = await problemList.getProblemListByPage(pageId);
});

export default training;
