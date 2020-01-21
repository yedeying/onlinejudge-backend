import { Context } from 'koa';

export const home = (ctx: Context) => {
  ctx.body = {
    message: 'welcome'
  };
};
