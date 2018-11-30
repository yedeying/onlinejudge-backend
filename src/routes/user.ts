import * as Router from 'koa-router';
import User from '$models/user';
import passport from '$middlewares/passport';
import KoaError from '$lib/error';
import { ErrorCode, StatusCode } from '$constants';

const user = new Router();

user.get('/info', ctx => {
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

user.post('/login', async (ctx, next) => {
  await passport.authenticate('local', async (err, user, info, status) => {
    if (err) {
      throw err;
    }
    if (status === 400 && info.message) {
      throw new KoaError(info.message, {
        statusCode: status,
        code: ErrorCode.PARAMS_INVALID
      });
    }
    if (!user) {
      throw new KoaError(info ? info.message : 'Login Failed', {
        statusCode: StatusCode.UNAUTHORIZED,
        code: ErrorCode.PARAMS_INVALID
      });
    }
    await ctx.login(user);
    ctx.body = 'login successfully';
  })(ctx, next);
});

user.post('/logout', async ctx => {
  await ctx.logout();
  ctx.body = 'logout successfully';
});

user.post('/register', async ctx => {
  const registerInfo = ctx.request.body;
  const user = new User();
  // todo
  ctx.body = await user.register(registerInfo);
});

export default user;
