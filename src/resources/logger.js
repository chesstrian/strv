'use strict';

import debug from 'debug';
import util from 'util';

const logger = debug('strv');

export default (...log) => {
  logger(util.format(...log));
};
