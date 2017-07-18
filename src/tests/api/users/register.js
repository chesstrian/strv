'use strict';

import chai from 'chai';
import chaiHttp from 'chai-http';

import server from '../../..';
import { User } from '../../../models';

chai.use(chaiHttp);
chai.should();

describe('Tests for Register API Service', () => {

  before((done) => {
    User.remove(done);
  });

  const url = '/api/v1/users/register';

  it('it should not register without email', (done) => {
    chai
      .request(server)
      .post(url)
      .send({ password: 'any' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.errors.email.message.should.be.eql('Path `email` is required.');

        done();
      })
    ;
  });

  it('it should not register with an invalid email', (done) => {
    chai
      .request(server)
      .post(url)
      .send({ email: 'any', password: 'any' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.errors.email.message.should.be.eql('invalid email address');

        done();
      })
    ;
  });

  it('it should not register without password', (done) => {
    chai
      .request(server)
      .post(url)
      .send({ email: 'any@domain.io' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.errors.password.message.should.be.eql('Path `password` is required.');

        done();
      })
    ;
  });

  it('it should not register with empty password', (done) => {
    chai
      .request(server)
      .post(url)
      .send({ email: 'any@domain.io', password: '' })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.errors.password.message.should.be.eql('Path `password` is required.');

        done();
      })
    ;
  });

  it('it should register with email and password', (done) => {
    chai
      .request(server)
      .post(url)
      .send({ email: 'any@domain.io', password: 'p4ssw0rd' })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.created.should.be.eql(true);
        res.body.email.should.be.eql('any@domain.io');

        done();
      })
    ;
  });

});
