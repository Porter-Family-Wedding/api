import { Router } from 'restify-router';

import login from './login';

const router = new Router();


router.post('/login', login);

export default router;