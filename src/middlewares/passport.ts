import passport from 'koa-passport';
import { Strategy } from 'passport-local';
import User from '$models/user';
import KoaError from '$lib/error';
import { IUser } from '$types';
import { ErrorCode, StatusCode } from '$constants';

passport.serializeUser((user: IUser, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  const model = new User();
  try {
    const user = await model.getUserById(id);
    if (user) {
      done(null, user);
    } else {
      done(new KoaError('Could not found user by id', {
        code: ErrorCode.PARAMS_INVALID,
        statusCode: StatusCode.UNAUTHORIZED
      }));
    }
  } catch (e) {
    done(e);
  }
});

passport.use(new Strategy(async (username, password, done) => {
  const model = new User();
  const user = await model.getUserByName(username);
  if (!user) {
    return done(new KoaError('User Not Found', {
      statusCode: StatusCode.UNAUTHORIZED,
      code: ErrorCode.PARAMS_INVALID
    }), null);
  }
  if (User.hashPassword(password, user.salt) !== user.password) {
    return done(new KoaError('Password incorrect', {
      statusCode: StatusCode.UNAUTHORIZED,
      code: ErrorCode.PARAMS_INVALID
    }), null);
  }
  done(null, user);
}));

export default passport;
