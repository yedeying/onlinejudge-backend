import * as Router from 'koa-router';
import { home } from './home';
import training from './training';

const router = new Router();
const api = new Router();

api.use('/training', training.routes(), training.allowedMethods());

router.get('/', home);
router.use('/api', api.routes(), api.allowedMethods());

export default router;
