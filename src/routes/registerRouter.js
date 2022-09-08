const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

/**
 * @swagger
 * /register:
 *  post:
 *    tags:
 *    - Autoryzacja JWT
 *    summary: Rejestracja użytkownika
 *    requestBody:
 *      description: "Podajemy username, email, password"
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              username:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *            example:
 *              username: uzytkownik
 *              email: test@test.pl
 *              password: password
 *    responses:
 *      400:
 *        description: Username, e-mail and password are required.
 *      409:
 *        description: User already exists.
 *      201:
 *        description: User created.
 *      500:
 *        description: Server error.
 */
router.post('/', registerController.handleRegistration);

module.exports = router;