const express = require("express");
const router = express.Router();
const studentController = require('../controllers/studentController');

router.route("/codeGenerate")
    .patch(studentController.courseGenerateCode);

router.route("/codeUse")
    .patch(studentController.courseUseCode);

module.exports = router;