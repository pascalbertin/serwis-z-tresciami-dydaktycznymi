const express = require("express");
const router = express.Router();
const courseController = require('../controllers/courseController');
const codesController = require('../controllers/codesController');
const wrongEndpointHandler = require('../helpers/wrongEndpointHandler');
const verifyJWT = require('../middleware/verifyJWT');

router.route("/")
    .get(courseController.courseGetAll)
    .post(verifyJWT, courseController.courseCreate)
    .patch(wrongEndpointHandler.errorHandler)
    .delete(wrongEndpointHandler.errorHandler);
    
router.route("/:title")
    .get(courseController.courseGetByTitle)
    .post(wrongEndpointHandler.errorHandler)
    .patch(verifyJWT, courseController.coursePatchByTitle)
    .delete(verifyJWT, courseController.courseDeleteByTitle);

router.route("/:title/order")
    .get(wrongEndpointHandler.errorHandler)
    .post(wrongEndpointHandler.errorHandler)
    .patch(codesController.courseGenerateCode)
    .delete(wrongEndpointHandler.errorHandler);

router.route("/:title/usage")
    .get(wrongEndpointHandler.errorHandler)
    .post(wrongEndpointHandler.errorHandler)
    .patch(codesController.courseUseCode)
    .delete(wrongEndpointHandler.errorHandler);

router.route("/test/test")
    .get(courseController.courseGetFiltered);

module.exports = router;