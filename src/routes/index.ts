import * as Router from 'koa-router';
import { home } from './home';

const router = new Router();

router.get('/', home);
// router.all('/sample', sample);

export default router;