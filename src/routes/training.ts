import Router from 'koa-router';
import ProblemList from '$models/problemList';
import ProblemDetail from '$models/problemDetail';
import StatusList from '$models/statusList';
import KoaError from '$lib/error';
import { ReqBody } from '$types';
import { Context } from 'koa';

const training = new Router<any, Context>();

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

training.post('/statusList', async ctx => {
  const statusList = new StatusList();
  const body: ReqBody = ctx.request.body;
  if (!body) {
    throw new KoaError('empty request body');
  }
  const { searchOption, pageNum, pageSize } = body;
  ctx.body = await statusList.getStatusList(searchOption, pageNum, pageSize);
});

export default training;
