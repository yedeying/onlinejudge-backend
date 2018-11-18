import * as Router from 'koa-router';
import { home } from './home';
import training from './training';
import user from './user';

const router = new Router();
const api = new Router();

api.use('/training', training.routes(), training.allowedMethods());
api.use('/user', user.routes(), user.allowedMethods());

router.get('/', home);
router.use('/api', api.routes(), api.allowedMethods());

export default router;
