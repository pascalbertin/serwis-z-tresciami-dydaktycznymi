const express = require('express');
const router = express.Router();
const getAllTeachers = require('../controllers/getAllTeachers');
const verifyJWT = require('../middleware/verifyJWT');

/**
 * @swagger
 * /test:
 *  get:
 *    summary: Zwraca wszystkich użytkowników z bazy, jeżli jest się zalogowanym
 */
router.route('/')
    .get(verifyJWT, getAllTeachers.teacherGetAll);

module.exports = router;