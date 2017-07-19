'use strict';

import bodyParser from 'body-parser';
import Express from 'express';
import morgan from 'morgan';

import { API, Docs } from './applications';
import { Logger, MongoDB } from './resources';

const app = new Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
if (!~['test', 'production'].indexOf(process.env.NODE_ENV)) {
  app.use(morgan('tiny'));
}

app.use('/', Docs);
app.use('/api/v1', API);

MongoDB();

export default app.listen(3000, () => {
  Logger('Server running');
});
