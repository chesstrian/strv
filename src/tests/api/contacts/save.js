'use strict';

import chai from 'chai';
import chaiHttp from 'chai-http';
import config from 'config';
import firebase from 'firebase';

import { FirebaseApp } from '../../../resources';
import server from '../../..';
import { User } from '../../../models';

chai.use(chaiHttp);
chai.should();

describe('Tests for Contact Saving API Service', () => {

  let token;

  before((done) => {
    const user = {
      email: 'any@domain.io',
      password: 'p4ssw0rd',
    };

    User.remove(() => {
      User.create(user, () => {
        chai
          .request(server)
          .post('/api/v1/users/login')
          .send(user)
          .end((err, res) => {
            token = res.body.token;

            firebase
              .auth()
              .signInAnonymously()
              .then(() => FirebaseApp.ref(config.get('firebase_ref')).remove(done))
            ;
          })
        ;
      });
    });
  });

  const url = '/api/v1/contacts';

  it('it should not create a contact if a token is not provided', (done) => {
    chai
      .request(server)
      .post(url)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.success.should.be.eql(false);
        res.body.message.should.be.eql('No token provided.');

        done();
      })
    ;
  });

  it('it should not create a contact with an invalid token', (done) => {
    chai
      .request(server)
      .post(url)
      .send({ token: 'abc123' })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.success.should.be.eql(false);
        res.body.message.should.be.eql('Failed to authenticate token.');

        done();
      })
    ;
  });

  it('it should not create a contact with a missing param', (done) => {
    chai
      .request(server)
      .post(url)
      .send({ token: token })
      .end((err, res) => {
        res.should.have.status(400);
        res.body.success.should.be.eql(false);
        res.body.message.should.be.eql('Missing required params.');

        done();
      })
    ;
  });

  it('it should create a contact', (done) => {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => FirebaseApp.ref().child(config.get('firebase_ref')).once('value'))
      .then((snapshot) => {
        const contacts = snapshot.val();
        const keys = Object.keys(contacts);
        keys.length.should.be.eql(1);

        const contact = contacts[keys[0]];
        contact.type.should.be.eql('phone');
        contact.value.should.be.eql('(+57) 321 234 5678');

        done();
      })
    ;

    chai
      .request(server)
      .post(url)
      .send({ token: token, type: 'phone', value: '(+57) 321 234 5678' })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.success.should.be.eql(true);
        res.body.message.should.be.eql('Contact created.');
        res.body.contact.type.should.be.eql('phone');
        res.body.contact.value.should.be.eql('(+57) 321 234 5678');
      })
    ;
  });

  it('it should not create a contact with a valid token after expiration time', (done) => {
    setTimeout(() => {
      chai
        .request(server)
        .post(url)
        .send({ token: token, type: 'phone', value: '(+57) 321 234 5678' })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.success.should.be.eql(false);
          res.body.message.should.be.eql('Failed to authenticate token.');

          done();
        })
      ;
    }, 6000);
  });

});
