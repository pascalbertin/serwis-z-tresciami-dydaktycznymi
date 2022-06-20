const express = require("express");
const router = express.Router();
const courseController = require('../controllers/courseController');

router.route("/addCourse")
    .post(courseController.courseCreate);

router.route("/manageCourseById")
    .get(courseController.courseGetById)
    .delete(courseController.courseDeleteById)
    .patch(courseController.coursePatchById);

router.route("/manageCourseBySubject")
    .get(courseController.courseGetBySubject)

router.route("/manageCourseByAuthor")
    .get(courseController.courseGetByAuthor)


module.exports = router;