const express = require("express");
const router = express.Router();
const studentController = require('../controllers/studentController');

/**
 * @swagger
 * /api/student/codeGenerate:
 *  patch:
 *    tags:
 *    - Uczeń
 *    summary: Generuje kod dla ucznia
 *    requestBody:
 *      description: "Podajemy ID kursu i email ucznia"
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *              email:
 *                type: string
 *            example:
 *              _id: 62ae0a8665b471175a9e374c
 *              email: test@test.pl
 */
router.route("/codeGenerate")
    .patch(studentController.courseGenerateCode);

    /**
 * @swagger
 * /api/student/codeUse:
 *  patch:
 *    tags:
 *    - Uczeń
 *    summary: Wykorzystuje kod
 *    requestBody:
 *      description: "Podajemy ID kursu i kod do wykorzystania"
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              _id:
 *                type: string
 *              code:
 *                type: string
 *            example:
 *              _id: 62b0ebbfe8c19c8936bea112
 *              code: $2b$10$ZScVY.oi/jEaETUMU/e2U.tAcklfvf0K5sDl897.tRL8.LEABDnOu
 */
router.route("/codeUse")
    .patch(studentController.courseUseCode);

module.exports = router;