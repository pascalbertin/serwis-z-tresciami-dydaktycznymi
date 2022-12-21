const express = require("express");
const router = express.Router();
const getAllTeachers = require('../controllers/getAllTeachers');
const registerController = require('../controllers/registerController');
const loginController = require('../controllers/loginController');
const refreshTokenController = require('../controllers/refreshTokenController');
const logoutController = require('../controllers/logoutController');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/')
    .get(getAllTeachers.teacherGetAll)
    .post(registerController.handleRegistration);

router.route('/:username')
    .get(getAllTeachers.userGetByUsername)
    .patch(verifyJWT, getAllTeachers.userPatchByUsername)
    .delete(verifyJWT, getAllTeachers.userDeleteByUsername);

router.route('/auth/login')
    .post(loginController.handleLogin);

router.route('/auth/refresh')
    .get(refreshTokenController.handleRefreshToken);

router.route("/auth/logout")
    .get(logoutController.handleLogout);

module.exports = router;