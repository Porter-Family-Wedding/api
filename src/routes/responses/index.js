import { Router } from 'restify-router';

import create from './create';

const router = new Router();

router.post('/responses', create);

export default router;