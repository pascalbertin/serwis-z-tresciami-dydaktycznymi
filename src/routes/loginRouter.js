const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

/**
 * @swagger
 * /user/login:
 *  post:
 *    tags:
 *    - Autoryzacja JWT
 *    summary: Logowanie użytkownika
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
 *      200:
 *        description: Zalogowano pomyślnie
 *      400:
 *        description: Username, e-mail and password are required.
 *      401:
 *        description: Brak dostępu
 */
router.post('/', loginController.handleLogin);

module.exports = router;