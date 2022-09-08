const express = require("express");
const router = express.Router();
const studentController = require('../controllers/studentController');

/**
 * @swagger
 * /api/student/codeGenerate:
 *  patch:
 *    summary: Generuje kod dla ucznia
 */
router.route("/codeGenerate")
    .patch(studentController.courseGenerateCode);

    /**
 * @swagger
 * /api/student/codeUse:
 *  patch:
 *    summary: Wykorzystuje kod
 */
router.route("/codeUse")
    .patch(studentController.courseUseCode);

module.exports = router;