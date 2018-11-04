import { IRouterContext } from 'koa-router';

export const home = (ctx: IRouterContext) => {
  ctx.body = {
    message: 'welcome'
  };
};
