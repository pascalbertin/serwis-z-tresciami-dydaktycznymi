const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

/**
 * @swagger
 * /user/login:
 *  post:
 *    summary: Logowanie użytkownika
 */
router.post('/', loginController.handleLogin);

module.exports = router;