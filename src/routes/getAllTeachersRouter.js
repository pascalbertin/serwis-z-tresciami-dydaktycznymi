const express = require('express');
const router = express.Router();
const getAllTeachers = require('../controllers/getAllTeachers');
const verifyJWT = require('../middleware/verifyJWT');

/**
 * @swagger
 * /test:
 *  get:
 *    tags:
 *    - Autoryzacja JWT
 *    summary: Zwraca wszystkich użytkowników z bazy, jeżli jest się zalogowanym
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Courses'
 *      404:
 *        description: Nie znaleziono
 *      401:
 *        description: Użytkownik nie jest zalogowany
 *      500:
 *        description: Server error
 */
router.route('/')
    .get(verifyJWT, getAllTeachers.teacherGetAll);

module.exports = router;