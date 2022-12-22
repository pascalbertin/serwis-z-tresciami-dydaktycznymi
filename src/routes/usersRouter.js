const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
const registerController = require('../controllers/registerController');
const wrongEndpointHandler = require('../helpers/wrongEndpointHandler');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/')
  .get(usersController.teacherGetAll)
  .post(registerController.handleRegistration)
  .patch(wrongEndpointHandler.errorHandler)
  .delete(wrongEndpointHandler.errorHandler);

router.route('/:username')
  .get(usersController.userGetByUsername)
  .post(wrongEndpointHandler.errorHandler)
  .patch(verifyJWT, usersController.userPatchByUsername)
  .delete(verifyJWT, usersController.userDeleteByUsername);

module.exports = router;