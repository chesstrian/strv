'use strict';

import chai from 'chai';

import { User } from '../../models';

chai.should();

describe('Tests for User Model', () => {

  before((done) => {
    User.remove(() => {
      User.create({
        email: 'any@domain.io',
        password: 'p4ssw0rd',
      }, done);
    });
  });

  it('it should not save clear password', (done) => {
    User.findOne((err, user) => {
      user.email.should.be.eql('any@domain.io');
      user.password.should.not.be.eql('p4ssword');

      done();
    });
  });

  it('it should check password', (done) => {
    User.findOne((err, user) => {
      user.validPassword('P4ssw0rd').then((result) => {
        result.should.be.eql(false);

        user.validPassword('p4ssw0rd').then((result) => {
          result.should.be.eql(true);
          done();
        });
      });
    });
  });

});
