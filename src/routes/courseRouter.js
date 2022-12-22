const express = require("express");
const router = express.Router();
const courseController = require('../controllers/courseController');
const codesController = require('../controllers/codesController');
const wrongEndpointHandler = require('../helpers/wrongEndpointHandler');
const verifyJWT = require('../middleware/verifyJWT');

/**
 * @swagger
 * /api/courses:
 *  get:
 *    tags:
 *    - Kursy
 *    summary: Zwraca wszystkie kursy z bazy
 *    responses:
 *      200:
 *        description: Zwraca dany kurs po jego tytule
 *      404:
 *        description: Nie znaleziono kursu o takim tytule
 *      500:
 *        description: Błąd po stronie serwera
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *    - Kursy
 *    summary: Dodaje kurs do bazy danych
 *    requestBody:
 *      description: "Po podaniu każdego parametru, następuje utworzenie i zapisanie kursu do bazy danych"
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *          properties:
 *            title:
 *              type: string
 *            description:
 *              type: string
 *            price:
 *              type: number
 *            author:
 *              type: string
 *            subject:
 *              type: string
 *            level:
 *              type: number
 *            video:
 *              type: string
 *            thumbnail:
 *              type: string
 *          example:
 *            title: Mnożenie i dzielenie
 *            description: Opis kursu mnożenie i dzielenie dla początkujących
 *            price: 100
 *            author: Jan Kowalski
 *            subject: Matematyka
 *            level: 1
 *            video: linkdovideo
 *            thumbnail: linkdominiaturki
 *    responses:
 *      200:
 *        description: Dodaje kurs do bazy danych
 *      400:
 *        description: Bad request, nie uzupełniono wszystkich parametrów
 *      409:
 *        description: Konflikt, kurs o takim tytule istnieje już w bazie danych
 *      500:
 *        description: Błąd po stronie serwera
 */
router.route("/")
    .get(courseController.courseGetAll)
    .post(verifyJWT, courseController.courseCreate)
    .patch(wrongEndpointHandler.errorHandler)
    .delete(wrongEndpointHandler.errorHandler);

/**
 * @swagger
 * /api/courses/{title}:
 *  get:
 *    tags:
 *    - Kursy
 *    summary: Zwraca kurs po tytule - {title}
 *    requestBody:
 *      description: "W odnośniku trzeba podać poprawny tytuł kursu"
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *    responses:
 *      200:
 *        description: Zwraca dany kurs po jego tytule
 *      404:
 *        description: Nie znaleziono kursu o takim tytule
 *      500:
 *        description: Błąd po stronie serwera
 *  patch:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *    - Kursy
 *    summary: Aktualizuje kurs o podane (opcjonalne) parametry w zapytaniu
 *    requestBody:
 *      description: "W zapytaniu podajemy pola, które chcemy zmienić. Jeżeli nie podamy żadnego to kurs nie ulegnie zmianie"
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *          properties:
 *            description:
 *              type: string
 *          example:
 *            description: zmieniony opis
 *    responses:
 *      200:
 *        description: Zaktualizowano kurs o podane dane
 *      404:
 *        description: Nie znaleziono kursu o takim tytule
 *      500:
 *        description: Błąd po stronie serwera
 *  delete:
 *    security:
 *      - bearerAuth: []
 *    tags:
 *    - Kursy
 *    summary: Usuwa kurs o podanym w linku tytule
 *    requestBody:
 *      description: "Tytuł jest pobierany z odnośnika i na jego podstawie kurs jest usuwany z bazy"
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *    responses:
 *      200:
 *        description: Usunięto kurs z bazy danych
 *      404:
 *        description: Nie znaleziono kursu o takim tytule
 *      500:
 *        description: Błąd po stronie serwera
 */
router.route("/:title")
    .get(courseController.courseGetByTitle)
    .post(wrongEndpointHandler.errorHandler)
    .patch(verifyJWT, courseController.coursePatchByTitle)
    .delete(verifyJWT, courseController.courseDeleteByTitle);

/**
 * @swagger
 * /api/courses/{title}/order:
 *  patch:
 *    tags:
 *    - Kod
 *    summary: Generuje kod dla ucznia i wysyła na podanego e-maila
 *    requestBody:
 *      description: "Podajemy jako parametr e-mail, na którego ma być wysłany kod. {title} jest brany z odnośnika"
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *            example:
 *              email: test@test.pl
 *    responses:
 *      200:
 *        description: Wysyła wygenerowany kod na maila i zapisuje go w bazie danych
 *      400:
 *        description: Nie podano adresu email w requescie
 *      404:
 *        description: Nie znaleziono kursu o takim tytule
 *      500:
 *        description: Błąd po stronie serwera
 */
router.route("/:title/order")
    .get(wrongEndpointHandler.errorHandler)
    .post(wrongEndpointHandler.errorHandler)
    .patch(codesController.courseGenerateCode)
    .delete(wrongEndpointHandler.errorHandler);

/**
 * @swagger
 * /api/courses/{title}/usage:
 *  patch:
 *    tags:
 *    - Kod
 *    summary: Wykorzystuje kod
 *    requestBody:
 *      description: "Po podaniu poprawnego kodu użytkownik dostaje dostęp do kursu. Baza danych aktualizuje się o -1 wykorzystanie kodu"
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              code:
 *                type: string
 *            example:
 *              code: $2b$10$ZScVY.oi/jEaETUMU/e2U.tAcklfvf0K5sDl897.tRL8.LEABDnOu
 *    responses:
 *      200:
 *        description: Zwraca dostęp do kursu i aktualizuje bazę danych o jedno użycie kodu
 *      204:
 *        description: Wykorzystano kod trzykrotnie
 *      400:
 *        description: Nie podano kodu w requescie
 *      404:
 *        description: Nie znaleziono kursu o takim tytule
 *      406:
 *        description: Podano niepoprawny kod dostępowy
 *      500:
 *        description: Błąd po stronie serwera
 */
router.route("/:title/usage")
    .get(wrongEndpointHandler.errorHandler)
    .post(wrongEndpointHandler.errorHandler)
    .patch(codesController.courseUseCode)
    .delete(wrongEndpointHandler.errorHandler);

router.route("/test/test")
    .get(courseController.courseGetFiltered);

module.exports = router;