const express = require("express");
const router = express.Router();
const wrongEndpointHandler = require('../helpers/wrongEndpointHandler');
const payuController = require('../controllers/payuController');

router.route("/generateOrder")
  .get(wrongEndpointHandler.errorHandler)
  .post(payuController.generatePayuOrder)
  .patch(wrongEndpointHandler.errorHandler)
  .delete(wrongEndpointHandler.errorHandler);

module.exports = router;