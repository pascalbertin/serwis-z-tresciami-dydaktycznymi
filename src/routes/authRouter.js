const express = require("express");
const router = express.Router();
const loginController = require('../controllers/loginController');
const refreshTokenController = require('../controllers/refreshTokenController');
const logoutController = require('../controllers/logoutController');
const wrongEndpointHandler = require('../helpers/wrongEndpointHandler');

router.route('/login')
  .get(wrongEndpointHandler.errorHandler)
  .post(loginController.handleLogin)
  .patch(wrongEndpointHandler.errorHandler)
  .delete(wrongEndpointHandler.errorHandler);

router.route('/refresh')
  .get(refreshTokenController.handleRefreshToken)
  .post(wrongEndpointHandler.errorHandler)
  .patch(wrongEndpointHandler.errorHandler)
  .delete(wrongEndpointHandler.errorHandler);

router.route("/logout")
  .get(logoutController.handleLogout)
  .post(wrongEndpointHandler.errorHandler)
  .patch(wrongEndpointHandler.errorHandler)
  .delete(wrongEndpointHandler.errorHandler);

module.exports = router;