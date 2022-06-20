const express = require("express");
const router = express.Router();
const studentController = require('../controllers/studentController');

router.route("/code")
    .patch(studentController.courseGenerateCode);


module.exports = router;