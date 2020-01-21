import Router from 'koa-router';
import { home } from './home';
import training from './training';
import user from './user';
import { Context } from 'koa';

const router = new Router<any, Context>();
const api = new Router<any, Context>();

api.use('/training', training.routes(), training.allowedMethods());
api.use('/user', user.routes(), user.allowedMethods());

router.get('/', home);
router.use('/api', api.routes(), api.allowedMethods());

export default router;
