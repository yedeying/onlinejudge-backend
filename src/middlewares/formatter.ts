import { Context } from 'koa';
import { ErrorCode, StatusCode } from '$constants';
import KoaError from '$lib/error';

export default async (ctx: Context, next: () => Promise<any>) => {
  try {
    await next();
    const oriBody = ctx.body;
    ctx.body = {
      code: ErrorCode.OK,
      statusCode: ctx.res.statusCode
    };
    // body为string直接添加到message
    if (typeof oriBody === 'string') {
      ctx.body.message = oriBody;
    } else if (oriBody) {
      ctx.body.data = oriBody;
    } else if (ctx.res.statusCode === StatusCode.NOT_FOUND) {
      ctx.body.message = 'Not Found';
    }
  } catch (e) {
    if (e instanceof KoaError) {
      ctx.body = { message: e.message, ...e.options };
    } else {
      ctx.body = {
        message: e.message,
        statusCode: StatusCode.INTERNAL_SERVER_ERROR,
        code: ErrorCode.SERVER_ERROR
      };
    }
    // ctx.body.stack = e.stack;
    ctx.res.statusCode = ctx.body.statusCode || StatusCode.OK;
  }
};
