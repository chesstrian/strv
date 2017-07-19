'use strict';

import config from 'config';
import mongoose from 'mongoose';

import { Logger } from './';

const DB_CONFIG = config.get('db.mongodb');

export default () => {
  let uri;
  if (process.env.MONGODB_URI) {
    uri = process.env.MONGODB_URI;
  } else {
    uri = `${DB_CONFIG.protocol}://${DB_CONFIG.host}:${DB_CONFIG.port}/${DB_CONFIG.db_name}`;
  }

  mongoose.connect(uri, { useMongoClient: true, });
  mongoose.Promise = global.Promise;
};

const db = mongoose.connection;
db.once('open', () => {
  Logger('Connected to MongoDB');
});
