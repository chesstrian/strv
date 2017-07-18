'use strict';

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../..';
import { User } from '../../../models';

chai.use(chaiHttp);
chai.should();

describe('Tests for Login API Service', () => {

  before((done) => {
    User.remove(() => {
      User.create({
        email: 'any@domain.io',
        password: 'p4ssw0rd',
      }, done);
    });
  });

  const url = '/api/v1/users/login';

  it('it should not login with unregistered email', (done) => {
    chai
      .request(server)
      .post(url)
      .send({ email: 'other@domain.io', password: 'p4ssw0rd' })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.success.should.be.eql(false);
        res.body.message.should.be.eql('Authentication failed. User not found');
        res.body.should.not.have.property('token');

        done();
      })
    ;
  });

  it('it should not login with invalid password', (done) => {
    chai
      .request(server)
      .post(url)
      .send({ email: 'any@domain.io', password: 'P4ssw0rd' })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.success.should.be.eql(false);
        res.body.message.should.be.eql('Authentication failed. Password does not match');
        res.body.should.not.have.property('token');

        done();
      })
    ;
  });

  it('it should login with valid credentials', (done) => {
    chai
      .request(server)
      .post(url)
      .send({ email: 'any@domain.io', password: 'p4ssw0rd' })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.success.should.be.eql(true);
        res.body.message.should.be.eql('Successful Authentication. Here is your token');
        res.body.should.have.property('token');

        done();
      })
    ;
  });

});
