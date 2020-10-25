import { Router } from 'restify-router';

import auth from 'src/middleware/auth';
import requiresPermission from 'src/middleware/requiresPermission';

import update from './update';

const router = new Router();

router.put('/addresses/:id', auth, requiresPermission('addresses.update'), update);

export default router;