'use strict';

import config from 'config';
import firebase from 'firebase';

export const addContact = (req, res) => {
  const { type, value, email, firstName, lastName } = req.body;

  if (!type || !value) {
    return res.status(400).json({
      success: false,
      message: 'Missing required params.',
    });
  }

  const contact = {
    type, value, email,
  };

  contact.firstName = firstName || '';
  contact.lastName = lastName || '';

  firebase.initializeApp(config.get('firebase'));

  firebase
    .auth()
    .signInAnonymously()
    .then(() => {
      const contactsRef = firebase.app().database().ref().child('contacts');

      return contactsRef.push(contact);
    })
    .then(() => {
      delete contact.email;

      return res.status(201).json({
        success: true,
        message: 'Contact created.',
        contact: contact,
      });
    })
    .catch(err => res.status(500).send(err))
  ;
};
