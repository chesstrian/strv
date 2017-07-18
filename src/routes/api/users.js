'use strict';

import config from 'config';
import jwt from 'jsonwebtoken';

import { User } from '../../models';

export const login = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      throw err;
    }

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication failed. User not found',
      });
    } else {
      user.validPassword(req.body.password).then((result) => {
        if (result) {
          const token = jwt.sign(user, config.get('jwt.secret'), {
            expiresIn: config.get('jwt.expiration'),
          });

          return res.json({
            success: true,
            message: 'Successful Authentication. Here is your token',
            token: token,
          });
        } else {
          return res.status(401).json({
            success: false,
            message: 'Authentication failed. Password does not match',
          });
        }
      });
    }
  });
};

export const register = (req, res) => {
  const user = new User(req.body);

  user.save((err, result) => {
    if (err) {
      return res.status(400).json(err);
    } else {
      return res.status(201).json({
        email: result.email,
        created: true,
      });
    }
  });
};
