// authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('./authController');

router.post('/autenticar', authController.autenticar);
router.post('/cadastrar', authController.cadastrar);
router.get('/getCurrentUser', authController.getCurrentUser);
router.post('/logout', authController.logout); // Adicionando a rota de logout

module.exports = router;
