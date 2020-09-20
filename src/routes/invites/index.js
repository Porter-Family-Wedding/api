import { Router } from 'restify-router';

import auth from 'src/middleware/auth';
import requiresPermission from 'src/middleware/requiresPermission';

import list from './list';
import create from './create';
import getById from './getById';

const router = new Router();

router.get('/invites', auth, requiresPermission('invites.list'), list);
router.post('/invites', auth, requiresPermission('invites.create'), create);
router.get('/invites/:id', auth, requiresPermission('invites.read'), getById);

export default router;