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
 *        content:
 *          application/json:
 *            $ref: '#/components/schemas/Teachers'
 *      404:
 *        description: USER_NOT_FOUND - Nie znaleziono użytkowników
 *      5XX:
 *        description: SERVER_ERROR - Błąd po stronie serwera
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
 *            required:
 *              - username
 *              - email
 *              - password
 *              - verification
 *              - accountBalance
 *              - avatar
 *            properties:
 *              username:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                format: password
 *              verification:
 *                type: boolean
 *                default: false
 *              accountBalance:
 *                type: number
 *                format: double
 *                default: 0
 *              avatar:
 *                type: string
 *                default: https://storage.googleapis.com/tutorsalpha-user-avatar/tutorsalpha_default_avatar.jpg
 *            example:
 *              username: nazwausera
 *              email: test@test.pl
 *              password: zaq12WSX
 *    responses:
 *      200:
 *        description: USER_CREATED - Pomyślnie dodano użytkownika do bazy danych
 *      400:
 *        description: USER_MISSING_PARAMETERS - Bad request, nie podano wszystkich parametrów
 *      409:
 *        description: USER_DUPLICATE - Konflikt, użytkownik o podanej nazwie użytkownika już istnieje
 *      5XX:
 *        description: SERVER_ERROR - Błąd po stronie serwera
 */
router.route('/')
  .get(usersController.teacherGetAll)
  .post(registerController.handleRegistration)
  .patch(usersController.userPasswordReset)
  .delete(wrongEndpointHandler.errorHandler);

/**
 * @swagger
 * /api/users/{username}:
 *  get:
 *    parameters:
 *      - in: path
 *        name: username
 *        required: true
 *        schema:
 *          type: string
 *        description: Nazwa użytkownika
 *    tags:
 *    - Użytkownicy
 *    summary: Zwraca użytkownika o zadanej nazwie podanej w parametrach
 *    requestBody:
 *      description: "Zwraca użytkownika po jego nazwie wziętej z linku {username}"
 *    responses:
 *      200:
 *        description: Zwraca użytkownika
 *      404:
 *        description: USER_NOT_FOUND - Użytkownik o takiej nazwie nie istnieje w bazie danych
 *      5XX:
 *        description: SERVER_ERROR - Błąd po stronie serwera
 *  patch:
 *    parameters:
 *      - in: path
 *        name: username
 *        required: true
 *        schema:
 *          type: string
 *        description: Nazwa użytkownika
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
 *                format: password
 *            example:
 *              password: zaq12WSX
 *    responses:
 *      200:
 *        description: Pomyślnie zaktualizowano dane użytkownika
 *      400:
 *        description: USER_MISSING_PASSWORD - Bad request, nie podano wszystkich parametrów (hasła)
 *      401:
 *        description: USER_UNAUTHORIZED - Niepoprawne dane logowania
 *      403:
 *        description: USER_FORBIDDEN - Brak dostępu
 *      404:
 *        description: USER_NOT_FOUND - Użytkownik z taką nazwą użytkownika nie istnieje
 *      5XX:
 *        description: SERVER_ERROR - Błąd po stronie serwera
 *  delete:
 *    parameters:
 *      - in: path
 *        name: username
 *        required: true
 *        schema:
 *          type: string
 *        description: Nazwa użytkownika
 *    security:
 *      - bearerAuth: []
 *    tags:
 *    - Użytkownicy
 *    summary: Usuwa użytkownika
 *    requestBody:
 *      description: "Usuwa użytkownika z bazy po jego nazwie użytkownika wziętej z linka"
 *    responses:
 *      200:
 *        description: USER_DELETED - Pomyślnie usunięto użytkownika
 *      401:
 *        description: USER_UNAUTHORIZED - Brak dostępu
 *      404:
 *        description: USER_NOT_FOUND - Użytkownik z taką nazwą użytkownika nie istnieje
 *      5XX:
 *        description: SERVER_ERROR - Błąd po stronie serwera
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
  .get(courseController.courseGetByAuthor)
  .post(wrongEndpointHandler.errorHandler)
  .patch(wrongEndpointHandler.errorHandler)
  .delete(wrongEndpointHandler.errorHandler);

router.route('/:username/withdrawMoney')
  .get(wrongEndpointHandler.errorHandler)
  .post(wrongEndpointHandler.errorHandler)
  .patch(verifyJWT, usersController.userWithdrawMoney)
  .delete(wrongEndpointHandler.errorHandler);


module.exports = router;