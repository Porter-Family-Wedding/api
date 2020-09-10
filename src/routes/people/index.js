import { Router } from 'restify-router';

import auth from 'src/middleware/auth';

import me from './me';

const router = new Router();


router.get('/people/me', auth, me);

export default router;