const express = require("express");
const router = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');

/**
 * @swagger
 * /refresh:
 *  get:
 *    tags:
 *    - Autoryzacja JWT
 *    summary: Refresh JWT - nie wymaga podawania żadnych informacji
 *    responses:
 *      200:
 *        description: Odświeżono token
 *      401:
 *        description: Unauthorized - użytkownik nie zalogowany
 *      403:
 *        description: Forbidden - brak dostępu
 */
router.route("/")
  .get(refreshTokenController.handleRefreshToken);

module.exports = router;