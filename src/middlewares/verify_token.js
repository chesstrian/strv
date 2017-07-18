'use strict';

import config from 'config';
import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.body.token;

  if (token) {
    jwt.verify(token, config.get('jwt.secret'), (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Failed to authenticate token.',
        });
      } else {
        req.body.email = decoded._doc.email;
        next();
      }
    });
  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    });
  }
};
