'use strict';

import { addContact } from './api/contacts';
import { login, register } from './api/users';

export const Users = { login, register };
export const Contacts = { save: addContact };
