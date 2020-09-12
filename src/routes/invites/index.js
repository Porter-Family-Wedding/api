import { Router } from 'restify-router';

import auth from 'src/middleware/auth';

import list from './list';

const router = new Router();


router.get('/invites', list);

export default router;