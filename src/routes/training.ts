import * as Router from 'koa-router';
import ProblemList from '../models/problemList';
import ProblemDetail from '../models/problemDetail';

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

training.get('/problem/:problemNo', async (ctx: Router.IRouterContext) => {
  const problemDetail = new ProblemDetail();
  const { problemNo } = ctx.params;
  ctx.body = await problemDetail.getProblemDetail(problemNo);
});

export default training;
