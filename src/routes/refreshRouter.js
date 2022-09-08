const express = require("express");
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');

/**
 * @swagger
 * /refresh:
 *  get:
 *    summary: Refresh JWT
 */
router.route("/")
  .get(refreshTokenController.handleRefreshToken);

module.exports = router;