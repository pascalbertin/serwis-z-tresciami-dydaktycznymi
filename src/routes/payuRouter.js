const express = require("express");
const router = express.Router();
const wrongEndpointHandler = require('../helpers/wrongEndpointHandler');
const payuController = require('../controllers/payuController');


/**
 * @swagger
 * /api/payu/generateOrder:
 *  post:
 *    tags:
 *    - PayU
 *    summary: Tworzy zamówienie
 *    requestBody:
 *      description: Tworzy zamówienie PayU
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *              - price
 *              - description
 *              - email
 *            properties:
 *              title:
 *                type: string
 *              email:
 *                type: string
 *                format: email
 *              price:
 *                type: number
 *                format: double
 *              description:
 *                type: string
 *    responses:
 *      200:
 *        description: Zwraca wygenerowany odnośnik do zamówienia PayU
 *      5XX:
 *        description: SERVER_ERROR - Błąd po stronie serwera
 */
router.route("/generateOrder")
  .get(wrongEndpointHandler.errorHandler)
  .post(payuController.generatePayuOrder)
  .patch(wrongEndpointHandler.errorHandler)
  .delete(wrongEndpointHandler.errorHandler);

module.exports = router;