'use strict';

import bodyParser from 'body-parser';
import Express from 'express';
import morgan from 'morgan';

import { Logger, MongoDB } from './resources';
import { API, Docs } from './routes';

const app = new Express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('tiny'));

app.use('/', Docs);
app.use('/api/v1', API);

MongoDB();

export default app.listen(3000, () => {
  Logger('Server running');
});
