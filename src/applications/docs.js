'use strict';

import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import { ApiDocs } from '../resources';

const router = new Router({ caseSensitive: true });

router.use('/explore', swaggerUi.serve, swaggerUi.setup(ApiDocs));

export default router;
