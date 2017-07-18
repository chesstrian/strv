'use strict';

import config from 'config';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import 'mongoose-type-email';

const Email = mongoose.SchemaTypes.Email;
const SALT_WORK_FACTOR = config.get('salt_work_factor');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: Email,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  collection: 'user',
});

// We can't use arrow function because of no binding of `this`
UserSchema.pre('save', function (next) {
  let _this = this;

  if (!_this.isModified('password')) {
    return next();
  }

  bcrypt.genSalt(SALT_WORK_FACTOR, (error, salt) => {
    if (error) {
      return next(error);
    }

    bcrypt.hash(_this.password, salt, (error, hash) => {
      if (error) {
        return next(error);
      }

      _this.password = hash;
      return next();
    });
  });
});

UserSchema.methods.validPassword = function (password) {
  const _this = this;
  return bcrypt.compare(password, _this.password);
};

export default mongoose.model('user', UserSchema);
