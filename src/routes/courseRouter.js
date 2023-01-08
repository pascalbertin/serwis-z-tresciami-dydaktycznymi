const express = require("express");
const router = express.Router();
const courseController = require('../controllers/courseController');
const codesController = require('../controllers/codesController');
const wrongEndpointHandler = require('../helpers/wrongEndpointHandler');
const verifyRoles = require('../middleware/verifyRoles');
const ROLES_LIST = require('../config/roles_list');
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
 *        description: COURSE_NOT_FOUND - Nie znaleziono kursu o takim tytule
 *      5XX:
 *        description: SEVER_ERROR - Błąd po stronie serwera
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
 *            $ref: '#/components/schemas/Courses'
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
 *        description: COURSE_CREATED - Dodaje kurs do bazy danych
 *      400:
 *        description: COURSE_MISSING_PARAMETERS - Bad request, nie uzupełniono wszystkich parametrów
 *      409:
 *        description: COURSE_DUPLICATE - Konflikt, kurs o takim tytule istnieje już w bazie danych
 *      5XX:
 *        description: SEVER_ERROR - Błąd po stronie serwera
 */
router.route("/")
    .get(courseController.courseGetFiltered)
    .post(verifyJWT, courseController.courseCreate)
    .patch(wrongEndpointHandler.errorHandler)
    .delete(wrongEndpointHandler.errorHandler);

/**
 * @swagger
 * /api/courses/{title}:
 *  get:
 *    parameters:
 *      - in: path
 *        name: title
 *        required: true
 *        schema:
 *          type: string
 *        description: Tytuł kursu
 *    tags:
 *    - Kursy
 *    summary: Zwraca kurs po tytule - {title}
 *    requestBody:
 *      description: "W odnośniku trzeba podać poprawny tytuł kursu"
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Courses'
 *    responses:
 *      200:
 *        description: Zwraca dany kurs po jego tytule
 *      404:
 *        description: COURSE_NOT_FOUND - Nie znaleziono kursu o takim tytule
 *      5XX:
 *        description: SEVER_ERROR - Błąd po stronie serwera
 *  patch:
 *    parameters:
 *      - in: path
 *        name: title
 *        required: true
 *        schema:
 *          type: string
 *        description: Tytuł kursu
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
 *      401:
 *        description: USER_UNAUTHORIZED - Nie jesteś zalogowany
 *      403:
 *        description: USER_FORBIDDEN - Brak dostępu
 *      404:
 *        description: COURSE_NOT_FOUND - Nie znaleziono kursu o takim tytule
 *      500:
 *        description: SEVER_ERROR - Błąd po stronie serwera
 *  delete:
 *    parameters:
 *      - in: path
 *        name: title
 *        required: true
 *        schema:
 *          type: string
 *        description: Tytuł kursu
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
 *        description: COURSE_DELETED, COURSE_TO_BE_DELETED - Usunięto kurs z bazy danych, Ustawia kurs do usunięcia gdy użytkownicy wykorzystają wszystkie kody
 *      401:
 *        description: USER_UNAUTHORIZED - Nie jesteś zalogowany
 *      403:
 *        description: USER_FORBIDDEN - Brak dostępu
 *      404:
 *        description: COURSE_NOT_FOUND - Nie znaleziono kursu o takim tytule
 *      5XX:
 *        description: SEVER_ERROR - Błąd po stronie serwera
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
 *    parameters:
 *      - in: path
 *        name: title
 *        required: true
 *        schema:
 *          type: string
 *        description: Tytuł kursu
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
 *                format: email
 *            example:
 *              email: test@test.pl
 *    responses:
 *      200:
 *        description: Wysyła wygenerowany kod na maila i zapisuje go w bazie danych. Aktualzuje stan konta użytkownika
 *      400:
 *        description: COURSE_MISSING_EMAIL - Nie podano adresu email w requescie
 *      404:
 *        description: COURSE_NOT_FOUND - Nie znaleziono kursu o takim tytule
 *      5XX:
 *        description: SEVER_ERROR - Błąd po stronie serwera
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
 *    parameters:
 *      - in: path
 *        name: title
 *        required: true
 *        schema:
 *          type: string
 *        description: Tytuł kursu
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
 *              code: 20c1186481fb057ebfe39a623bb2bc73
 *    responses:
 *      200:
 *        description: Zwraca dostęp do kursu i aktualizuje bazę danych o jedno użycie kodu
 *      204:
 *        description: COURSE_CODE_OUT_OF_USES - Wykorzystano kod trzykrotnie
 *      400:
 *        description: COURSE_CODE_MISSING - Nie podano kodu w requescie
 *      404:
 *        description: COURSE_NOT_FOUND - Nie znaleziono kursu o takim tytule
 *      406:
 *        description: COURSE_INCORRECT_CODE - Podano niepoprawny kod dostępowy
 *      5XX:
 *        description: SEVER_ERROR - Błąd po stronie serwera
 */
router.route("/:title/usage")
    .get(wrongEndpointHandler.errorHandler)
    .post(wrongEndpointHandler.errorHandler)
    .patch(codesController.courseUseCode)
    .delete(wrongEndpointHandler.errorHandler);

/**
 * @swagger
 * /api/courses/{title}/verification:
 *  patch:
 *    parameters:
 *      - in: path
 *        name: title
 *        required: true
 *        schema:
 *          type: string
 *        description: Tytuł kursu
 *    security:
 *      - bearerAuth: []
 *    tags:
 *    - Kursy
 *    summary: Pozytywnie weryfikuje kurs
 *    requestBody:
 *      description: Tylko użytkownik z rolą Admina może zweryfikować kurs. Po weryfikacji kurs jest widoczny na stronie
 *    responses:
 *      200:
 *        description: Zwraca zweryfikowany kurs
 *      401:
 *        description: USER_UNAUTHORIZED - Nie jesteś zalogowany
 *      403:
 *        description: USER_FORBIDDEN - Brak dostępu
 *      404:
 *        description: COURSE_NOT_FOUND - Nie znaleziono kursu o takim tytule
 *      5XX:
 *        description: SEVER_ERROR - Błąd po stronie serwera
 */
router.route("/:title/verification")
    .get(wrongEndpointHandler.errorHandler)
    .post(wrongEndpointHandler.errorHandler)
    .patch(verifyJWT, verifyRoles(ROLES_LIST.Admin), courseController.courseVerifyByAdministrator)
    .delete(wrongEndpointHandler.errorHandler);

router.route("/test/test")
    .get(courseController.courseGetFiltered);

/**
 * @swagger
 * /api/admin/notVerified:
 *  get:
 *    tags:
 *    - Kursy
 *    security:
 *      - bearerAuth: []
 *    summary: Zwraca niezweryfikowane kursy
 *    responses:
 *      200:
 *        description: Zwraca niezweryfikowane kursy
 *      404:
 *        description: COURSE_NOT_FOUND - Nie znaleziono kursu o takim tytule
 *      5XX:
 *        description: SEVER_ERROR - Błąd po stronie serwera
 */
router.route("/admin/notVerified")
    .get(verifyJWT, verifyRoles(ROLES_LIST.Admin), courseController.courseGetByToVerification);

module.exports = router;