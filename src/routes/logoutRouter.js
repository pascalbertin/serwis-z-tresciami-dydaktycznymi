const express = require("express");
const router = express.Router();
const logoutController = require('../controllers/logoutController');

/**
 * @swagger
 * /logout:
 *  get:
 *    tags:
 *    - Autoryzacja JWT
 *    summary: Wylogowanie - nie wymaga podania żadnych informacji
 *    responses:
 *      204:
 *        description: No content - po prostu OK
 */
router.route("/")
  .get(logoutController.handleLogout);

module.exports = router;