import * as Router from 'koa-router';
import ProblemList from '$models/problemList';
import ProblemDetail from '$models/problemDetail';

const training = new Router();

training.get('/pageList', async ctx => {
  const problemList = new ProblemList();
  ctx.body = await problemList.getPageList();
});

training.get('/problemList/:pageId', async ctx => {
  const problemList = new ProblemList();
  const { pageId } = ctx.params;
  ctx.body = await problemList.getProblemListByPage(pageId);
});

training.get('/problem/:problemNo', async ctx => {
  const problemDetail = new ProblemDetail();
  const { problemNo } = ctx.params;
  ctx.body = await problemDetail.getProblemDetail(problemNo);
});

export default training;
