'use strict';

import { Router } from 'express';

import { ApiDocs } from '../resources';

const router = new Router({ caseSensitive: true });

router.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(ApiDocs);
});

export default router;
