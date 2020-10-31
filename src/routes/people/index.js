import { Router } from 'restify-router';

import auth from 'src/middleware/auth';

import me from './me';
import create from './create';
import update from './update';

const router = new Router();


router.get('/people/me', auth, me);
router.post('/people', auth, create);
router.put('/people/:id', auth, update);

export default router;