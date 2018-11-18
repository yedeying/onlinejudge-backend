import * as Router from 'koa-router';
import User from '../models/user';

const user = new Router();

user.get('/', ctx => {
  if (ctx.isAuthenticated()) {
    ctx.body = {
      logStatus: true,
      user: ctx.state.user
    };
  } else {
    ctx.body = {
      logStatus: false
    };
  }
});

user.post('/login', async (ctx: Router.IRouterContext) => {
  const user = new User();
  // todo
  ctx.body = await user.login();
});

user.post('/register', async (ctx: Router.IRouterContext) => {
  const user = new User();
  // todo
  ctx.body = await user.register();
});

export default user;
