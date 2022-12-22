const express = require("express");
const router = express.Router();
const getAllTeachers = require('../controllers/usersController');
const registerController = require('../controllers/registerController');
const wrongEndpointHandler = require('../helpers/wrongEndpointHandler');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/')
  .get(getAllTeachers.teacherGetAll)
  .post(registerController.handleRegistration)
  .patch(wrongEndpointHandler.errorHandler)
  .delete(wrongEndpointHandler.errorHandler);

router.route('/:username')
  .get(getAllTeachers.userGetByUsername)
  .post(wrongEndpointHandler.errorHandler)
  .patch(verifyJWT, getAllTeachers.userPatchByUsername)
  .delete(verifyJWT, getAllTeachers.userDeleteByUsername);

module.exports = router;