'use strict';

import { Router } from 'express';

import { Users, Contacts } from '../routes';

const router = new Router({ caseSensitive: true });

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Login a user
 *     tags:
 *       - Users
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: password
 *           example: {
 *             "email": "username@email.co",
 *             "password": "p4ssw0rd"
 *           }
 *     responses:
 *       200:
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             message:
 *               type: string
 *             token:
 *               type: string
 *         examples:
 *           application/json: {
 *             "success": true,
 *             "message": "Successful Authentication. Here is your token",
 *             "token": "<random-token>"
 *           }
 *       401:
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             message:
 *               type: string
 *         examples:
 *           application/json: {
 *             "success": false,
 *             "message": "Authentication failed. User not found",
 *           }
 */
router.post('/users/login', Users.login);

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Sign up a new user
 *     tags:
 *       - Users
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: password
 *           example: {
 *             "email": "username@email.co",
 *             "password": "p4ssw0rd"
 *           }
 *     responses:
 *       201:
 *         schema:
 *           type: object
 *           properties:
 *             created:
 *               type: boolean
 *             email:
 *               type: string
 *         examples:
 *           application/json: {
 *             "created": true,
 *             "email": "username@email.co"
 *           }
 *       400:
 *         schema:
 *           type: object
 *           properties:
 *             errors:
 *               type: object
 *         examples:
 *           application/json: {
 *             errors: {
 *               email: {
 *                 message: 'Path `email` is required.',
 *                 name: 'ValidatorError',
 *                 properties: {
 *                   type: 'required',
 *                   message: 'Path `{PATH}` is required.',
 *                   path: 'email'
 *                 },
 *                 kind: 'required',
 *                 '$isValidatorError': true
 *               }
 *             },
 *             _message: 'user validation failed',
 *             message: 'user validation failed: email: Path `email` is required.',
 *             name: 'ValidationError'
 *           }
 */
router.all('/users/register', Users.register);

/**
 * @swagger
 * /api/v1/contacts:
 *   post:
 *     summary: Create a contact
 *     tags:
 *       - Contacts
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - type
 *             - value
 *           properties:
 *             first_name:
 *               type: string
 *             last_name:
 *               type: string
 *             type:
 *               type: string
 *             value:
 *               type: password
 *           example: {
 *             "type": "email",
 *             "value": "username@email.co",
 *             "first_name": "My",
 *             "last_name": "Contact"
 *           }
 *     responses:
 *       201:
 *         schema:
 *           type: object
 *           properties:
 *             created:
 *               type: boolean
 *             contact:
 *               type: object
 *         examples:
 *           application/json: {
 *             "created": true,
 *             "contact": {
 *               "type": "email",
 *               "value": "username@email.co",
 *               "first_name": "My",
 *               "last_name": "Contact"
 *             }
 *           }
 *       400:
 *         schema:
 *           type: object
 *           properties:
 *             errors:
 *               type: object
 *         examples:
 *           application/json: {
 *             errors: {
 *               type: {
 *                 message: 'Path `type` is required.',
 *               }
 *             }
 *           }
 *       401:
 *        schema:
 *          type: object
 *          properties:
 *            errors:
 *              type: object
 *        examples:
 *          application/json: {
 *            errors: {
 *              name: "Error",
 *              code: "AUTHORIZATION_REQUIRED"
 *            }
 *          }
 */
router.post('/contacts', Contacts.save);

export default router;
