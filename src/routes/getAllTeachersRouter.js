const express = require('express');
const router = express.Router();
const getAllTeachers = require('../controllers/getAllTeachers');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/')
    .get(verifyJWT, getAllTeachers.teacherGetAll);

module.exports = router;