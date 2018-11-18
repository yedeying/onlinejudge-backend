import * as Router from 'koa-router';
import User from '../models/user';

const user = new Router();

user.post('/login', async (ctx: Router.IRouterContext) => {
  const user = new User();
  ctx.body = await user.login();
});

user.post('/register', async (ctx: Router.IRouterContext) => {
  const user = new User();
  ctx.body = await user.register();
});

export default user;
