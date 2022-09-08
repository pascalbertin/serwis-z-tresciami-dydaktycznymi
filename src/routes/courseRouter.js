const express = require("express");
const router = express.Router();
const courseController = require('../controllers/courseController');

/** 
 * @swagger
 * /api/course/addCourse:
 *  post:
 *    tags:
 *    - Kursy
 *    summary: Dodaje kurs do bazy danych
 *    operationId: addCourse
 *    requestBody:
 *      description: "Trzeba podać wartości: tytuł, opis, cenę, autora, przedmiot, poziom trudności, link do video, link do miniaturki"
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *              price:
 *                type: number
 *              author:
 *                type: string
 *              subject:
 *                type: string
 *              level:
 *                type: integer
 *              video:
 *                type: string
 *              thumbnail:
 *                type: string
 *            example:
 *              title: Kurs z matematyki 1
 *              description: Dzięki temu kursowi będziesz w stanie bez problemu wykonywać wszytkie obliczenia!
 *              price: 100
 *              author: Jan Kowalski
 *              subject: Matematyka
 *              level: 4
 *              video: https://drive.google.com/file/d/1xR4-XdrmVJ0JZth5xKOIwCqD7lLDbcFn/view?usp=sharing
 *              thumbnail: https://drive.google.com/file/d/185TLx5pDLeRt7ItxgFQUtpf1j6Qx2b10/view?usp=sharing
 *      required: true
 *    responses:
 *      200:
 *        description: Kurs został dodany do bazy danych
 */
router.route("/addCourse")
    .post(courseController.courseCreate);

/**
 * @swagger
 * /api/course/manageCourseById:
 *  get:
 *    tags:
 *    - Kursy
 *    summary: Zwraca kurs o zadanym ID
 *    requestBody:
 *      description: "Podajemy ID kursu"
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *            example:
 *              _id: 62ae0a8665b471175a9e374c
 *  delete:
 *    tags:
 *    - Kursy
 *    summary: Usuwa kurs o zadanym ID
 *    requestBody:
 *      description: "Podajemy ID kursu"
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *            example:
 *              _id: 62ae0a8665b471175a9e374c
 *  patch:
 *    tags:
 *    - Kursy
 *    summary: Modyfikuje informacje o kursie o zadanym ID
 *    requestBody:
 *      description: "Podajemy ID kursu"
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *            example:
 *              _id: 62ae0a8665b471175a9e374c
 */
router.route("/manageCourseById")
    .get(courseController.courseGetById)
    .delete(courseController.courseDeleteById)
    .patch(courseController.coursePatchById);

/**
 * @swagger
 * /api/course/getAll:
 *  get:
 *    tags:
 *    - Kursy
 *    summary: Zwraca wszystkie kursy z bazy
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Courses'
 */
router.route("/getAll")
    .get(courseController.courseGetAll);

/**
 * @swagger
 * /api/course/manageCourseBySubject:
 *  get:
 *    tags:
 *    - Kursy
 *    summary: Zwraca kurs po przedmiocie
 *    parameters:
 *      - in: query
 *        name: subject
 *        description: Nazwa przedmiotu
 *        required: true
 *        schema:
 *          type: string
 *        example: matematyka
 */
router.route("/manageCourseBySubject")
    .get(courseController.courseGetBySubject)

/**
 * @swagger
 * /api/course/manageCourseByAuthor:
 *  get:
 *    tags:
 *    - Kursy
 *    summary: Zwraca kursy konkretnego autora
 *    parameters:
 *      - in: query
 *        name: author
 *        required: true
 *        schema:
 *          type: string
 */
router.route("/manageCourseByAuthor")
    .get(courseController.courseGetByAuthor)


module.exports = router;