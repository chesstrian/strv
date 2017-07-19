'use strict';

import config from 'config';
import firebase from 'firebase';

const fbApp = firebase.initializeApp(config.get('firebase'));

export default fbApp.database();
