// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('./authController');

router.post('/autenticar', authController.autenticar);
router.post('/cadastrar', authController.cadastrar);

module.exports = router;
