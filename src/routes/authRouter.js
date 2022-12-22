const express = require("express");
const router = express.Router();
const loginController = require('../controllers/loginController');
const refreshTokenController = require('../controllers/refreshTokenController');
const logoutController = require('../controllers/logoutController');
const wrongEndpointHandler = require('../helpers/wrongEndpointHandler');

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *    tags:
 *    - Autoryzacja JWT
 *    summary: Logowanie użytkownika
 *    requestBody:
 *      description: "Podajemy username, email i password"
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
 *        description: Bad request, nie podano wszystkich parametrów
 *      401:
 *        description: Niepoprawne dane logowania
 *      500:
 *        description: Błąd po stronie serwera
 */
router.route('/login')
  .get(wrongEndpointHandler.errorHandler)
  .post(loginController.handleLogin)
  .patch(wrongEndpointHandler.errorHandler)
  .delete(wrongEndpointHandler.errorHandler);

/**
 * @swagger
 * /api/auth/refresh:
 *  get:
 *    tags:
 *    - Autoryzacja JWT
 *    summary: Refresh JWT - nie wymaga podawania żadnych informacji
 *    responses:
 *      200:
 *        description: Odświeżono token
 *      401:
 *        description: Unauthorized - użytkownik nie zalogowany
 *      403:
 *        description: Forbidden - brak dostępu
 *      500:
 *        description: Błąd po stronie serwera
 */
router.route('/refresh')
  .get(refreshTokenController.handleRefreshToken)
  .post(wrongEndpointHandler.errorHandler)
  .patch(wrongEndpointHandler.errorHandler)
  .delete(wrongEndpointHandler.errorHandler);

/**
 * @swagger
 * /api/auth/logout:
 *  get:
 *    tags:
 *    - Autoryzacja JWT
 *    summary: Wylogowanie - nie wymaga podania żadnych informacji
 *    responses:
 *      204:
 *        description: No content, wyczyszczono cookies z tokena
 */
router.route("/logout")
  .get(logoutController.handleLogout)
  .post(wrongEndpointHandler.errorHandler)
  .patch(wrongEndpointHandler.errorHandler)
  .delete(wrongEndpointHandler.errorHandler);

module.exports = router;