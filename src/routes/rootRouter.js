const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`);
});

module.exports = router;
