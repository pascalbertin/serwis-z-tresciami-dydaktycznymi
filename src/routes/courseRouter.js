const express = require("express");
const router = express.Router();
const courseController = require('../controllers/courseController');

/** 
 * @swagger
 * /api/course/addCourse:
 *  post:
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
 *    summary: Zwraca kurs o zadanym ID
 *  delete:
 *    summary: Usuwa kurs o zadanym ID
 *  patch:
 *    summary: Modyfikuje informacje o kursie o zadanym ID
 */
router.route("/manageCourseById")
    .get(courseController.courseGetById)
    .delete(courseController.courseDeleteById)
    .patch(courseController.coursePatchById);

/**
 * @swagger
 * /api/course/getAll:
 *  get:
 *    summary: Zwraca wszystkie kursy z bazy
 */
router.route("/getAll")
    .get(courseController.courseGetAll);

/**
 * @swagger
 * /api/course/manageCourseBySubject:
 *  get:
 *    summary: Zwraca kurs po przedmiocie
 */
router.route("/manageCourseBySubject")
    .get(courseController.courseGetBySubject)

/**
 * @swagger
 * /api/course/manageCourseByAuthor:
 *  get:
 *    summary: Zwraca kursy konkretnego autora
 */
router.route("/manageCourseByAuthor")
    .get(courseController.courseGetByAuthor)


module.exports = router;