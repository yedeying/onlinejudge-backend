import { Context } from 'koa';

export const home = async (ctx: Context) => {
  ctx.body = {
    message: 'welcome'
  };
};