'use strict';

import config from 'config';
import swaggerJSDoc from 'swagger-jsdoc';

const options = config.get('swagger_options');

export default swaggerJSDoc(options);
