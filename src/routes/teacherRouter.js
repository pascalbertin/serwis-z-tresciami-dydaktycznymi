const express = require("express");
const router = express.Router();
const teacherController = require('../controllers/teacherController');

router.route("/register")
  .post(teacherController.teacherRegister);

router.route("/login")
  .post(teacherController.teacherLogin);

module.exports = router;