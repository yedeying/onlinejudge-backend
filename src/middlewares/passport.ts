import * as passport from 'koa-passport';
import { Strategy } from 'passport-local';
import User from '../models/user';
import KoaError from '../lib/error';
import { IUser } from '../common/types';
import { ErrorCode, StatusCode } from '../common/constants';

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
      done(new KoaError('could not found user by id', {
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
  if (user && username === user.username &&
    User.hashPassword(password, user.salt) === password) {
    done(null, user);
  } else {
    done(null, false);
  }
}));

export default passport;
