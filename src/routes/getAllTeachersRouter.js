const express = require('express');
const router = express.Router();
const getAllTeachers = require('../controllers/getAllTeachers');

router.route('/')
    .get(getAllTeachers.teacherGetAll);

module.exports = router;