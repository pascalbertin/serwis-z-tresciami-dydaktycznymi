const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
const registerController = require('../controllers/registerController');
const wrongEndpointHandler = require('../helpers/wrongEndpointHandler');
const courseController = require('../controllers/courseController');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/roles_list');
const verifyJWT = require('../middleware/verifyJWT');

/**
 * @swagger
 * /api/users:
 *  get:
 *    tags:
 *    - Użytkownicy
 *    summary: Zwraca wszystkich użytkowników z bazy
 *    responses:
 *      200:
 *        description: Zwraca wszystkich użytkowników z bazy 
 *      500:
 *        description: Błąd po stronie serwera
 *  post:
 *    tags:
 *    - Użytkownicy
 *    summary: Tworzy użytkownika w bazie danych
 *    requestBody:
 *      description: "Tworzy i zapisuje użytkownika do bazy danych"
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
 *              username: nazwausera
 *              email: test@test.pl
 *              password: zaq12WSX
 *    responses:
 *      200:
 *        description: Pomyślnie dodano użytkownika do bazy danych
 *      400:
 *        description: Bad request, nie podano wszystkich parametrów
 *      409:
 *        description: Konflikt, użytkownik o podanej nazwie użytkownika już istnieje
 *      500:
 *        description: Błąd po stronie serwera
 */
router.route('/')
  .get(usersController.teacherGetAll)
  .post(registerController.handleRegistration)
  .patch(wrongEndpointHandler.errorHandler)
  .delete(wrongEndpointHandler.errorHandler);

/**
 * @swagger
 * /api/users/{username}:
 *  get:
 *    tags:
 *    - Użytkownicy
 *    summary: Zwraca danego użytkownika
 *    requestBody:
 *      description: "Zwraca użytkownika po jego nazwie wziętej z linku {username}"
 *    responses:
 *      200:
 *        description: Zwraca użytkownika
 *      404:
 *        description: Użytkownik o takiej nazwie nie istnieje w bazie danych
 *      500:
 *        description: Błąd po stronie serwera
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *    - Użytkownicy
 *    summary: Aktualizuje użytkownika
 *    requestBody:
 *      description: "Zmienia dane użytkownika, w tym momencie tylko hasło"
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              password:
 *                type: string
 *            example:
 *              password: zaq12WSX
 *    responses:
 *      200:
 *        description: Pomyślnie zaktualizowano dane użytkownika
 *      400:
 *        description: Bad request, nie podano wszystkich parametrów (hasła)
 *      404:
 *        description: Użytkownik z taką nazwą użytkownika nie istnieje
 *      500:
 *        description: Błąd po stronie serwera
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *    - Użytkownicy
 *    summary: Usuwa użytkownika
 *    requestBody:
 *      description: "Usuwa użytkownika z bazy po jego nazwie użytkownika wziętej z linka"
 *    responses:
 *      200:
 *        description: Pomyślnie usunięto użytkownika
 *      404:
 *        description: Użytkownik z taką nazwą użytkownika nie istnieje
 *      500:
 *        description: Błąd po stronie serwera
 */
router.route('/:username')
  .get(usersController.userGetByUsername)
  .post(wrongEndpointHandler.errorHandler)
  .patch(verifyJWT, usersController.userPatchByUsername)
  .delete(verifyJWT, verifyRoles(ROLES_LIST.Admin), usersController.userDeleteByUsername);

router.route('/:username/verification')
  .get(usersController.userVerifyAfterRegistration)
  .post(wrongEndpointHandler.errorHandler)
  .patch(usersController.userVerifyAfterRegistration)
  .delete(wrongEndpointHandler.errorHandler)
  
router.route('/:username/courses')
  .get(courseController.courseGetByAuthor);

module.exports = router;