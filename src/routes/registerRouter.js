const express = require('express');
const router = express.Router();
const registerController = require('../controllers/registerController');

/**
 * @swagger
 * /register:
 *  post:
 *    summary: Rejestracja użytkownika
 */
router.post('/', registerController.handleRegistration);

module.exports = router;